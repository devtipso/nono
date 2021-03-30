import { HelpersService } from './../../helpers/helpers.service';
import { getReceptionObject, InterfaceQuery } from './../../helpers/interface.query';
import { WebLivraisonsDetail } from './../../../entities/WebLivraisonsDetail';
import { WebLivraisons } from './../../../entities/WebLivraisons';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LivraisonService {
    constructor(
        @InjectRepository(WebLivraisons) private repoLivraison: Repository<WebLivraisons>,
        @InjectRepository(WebLivraisonsDetail) private repoDetails: Repository<WebLivraisonsDetail>,
        private srvHelpers: HelpersService
    ) { }

    async getALL(clientID: number, param: InterfaceQuery, body: getReceptionObject): Promise<unknown> {
        const { start, end } = this.srvHelpers.fixDate(body)
        const { take, skip } = param;

        const query = `SELECT * FROM web_livraisons AS r
        WHERE r.refclient_wlivraison = ${clientID}
        AND (r.datebl_wlivraison BETWEEN '${start}' AND '${end}')
        AND r.refsite_wlivraison LIKE '${(body.site) ? body.site : '%'}'
        LIMIT ${skip}, ${take}
        `
        const queryCount = `SELECT COUNT(*) as count FROM web_livraisons AS r
        WHERE r.refclient_wlivraison = ${clientID}
        AND (r.datebl_wlivraison BETWEEN '${start}' AND '${end}')
        AND r.refsite_wlivraison LIKE '${(body.site) ? body.site : '%'}'`

        const data = await this.repoLivraison.query(query)
        const count = await this.repoLivraison.query(queryCount)
        return { data, count: Number(count[0]['count']) }
    }

    async getArticleByID(id: number, { skip, take }): Promise<unknown> {
        const data = await this.repoDetails.findAndCount({ where: { refblWdlivraison: id }, skip, take })

        return { data: data[0], count: data[1] }
    }
}
