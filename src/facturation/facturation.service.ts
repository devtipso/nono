import { WebFacturation } from './../../entities/WebFacturation';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class FacturationService {
    constructor(@InjectRepository(WebFacturation) private repoWebFacture: Repository<WebFacturation>) { }


    async searchFacture({ showAll, start, end, take, skip }: QueryInterface, acteurID: number): Promise<unknown> {
        const startFacture = moment(start, 'DD/MM/YYYY').format('YYYY-MM-DD')
        const endFacture = moment(end, 'DD/MM/YYYY').format('YYYY-MM-DD')
        const queryData = `
        SELECT * FROM web_facturation AS f
        WHERE f.refacteur_wfact = '${acteurID}'
        AND f.etat_wfact LIKE '${(showAll == true) ? '%' : 'AR'}'
        AND (f.date_wfact BETWEEN '${startFacture}' AND '${endFacture}')
        AND f.flag_wfact = 'A'
        LIMIT ${skip},${take}`
        const queryDataCount = `
        SELECT COUNT(*) as count FROM web_facturation AS f
        WHERE f.refacteur_wfact = '${acteurID}'
        AND f.etat_wfact LIKE '${(showAll == true) ? '%' : 'AR'}'
        AND (f.date_wfact BETWEEN '${startFacture}' AND '${endFacture}')
        AND f.flag_wfact = 'A'`
        const data = await this.repoWebFacture.query(`${queryData}`)
        const count = await this.repoWebFacture.query(`${queryDataCount}`)
        const res = { data, count: Number(count[0].count) }
        return res
    }

    async getLibByID(id: string): Promise<unknown> {
        return await { id }
    }
}

export class QueryInterface { showAll: boolean; start: string; end: string; take: number; skip: number }