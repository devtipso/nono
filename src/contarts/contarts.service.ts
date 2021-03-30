import { searchParamsContarts } from './../helpers/interface.query';
import { HelpersService, InitQueryData } from './../helpers/helpers.service';
import { WebContrats } from './../../entities/WebContrats';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContartsService {
    constructor(
        @InjectRepository(WebContrats) private repoWebR: Repository<WebContrats>,
        private srvDate: HelpersService
    ) { }

    async searchContrat({ take, skip }, body: searchParamsContarts, acteurID: number): Promise<unknown> {
        const { start, end } = this.srvDate.fixDate(body.date)
        body = await InitQueryData(body)

        const queryData = `
        SELECT 
            c.ref_wcontrat,
            c.refcontrat_wcontrat,
            c.entretien_wcontrat,
            c.location_wcontrat,
            c.code_wcontrat,
            c.du_wcontrat,
            c.au_wcontrat,
            c.datemiseenplace_wcontrat,
            c.note_wcontrat,
            c.etat_wcontrat,
            c.dureecontratmois_wcontrat
        FROM web_contrats AS c
        WHERE c.refacteur_wcontrat = '${acteurID}'
        AND c.entretien_wcontrat LIKE '${body.entretien}'
        AND c.location_wcontrat LIKE '${body.location}'
        AND c.code_wcontrat LIKE '${body.code}'
        AND (c.du_wcontrat BETWEEN '${start}' AND '${end}')
        AND ${this.FrontendData(body.etat)}
        LIMIT ${skip}, ${take}`
        console.log({ queryData });


        const queryDataCount = `
        SELECT COUNT(*) as count
        FROM web_contrats AS c
        WHERE c.refacteur_wcontrat = '${acteurID}'
        AND c.entretien_wcontrat LIKE '${body.entretien}'
        AND c.location_wcontrat LIKE '${body.location}'
        AND c.code_wcontrat LIKE '${body.code}'
        AND (c.du_wcontrat BETWEEN '${start}' AND '${end}')
        AND ${this.FrontendData(body.etat)}`
        const data = await this.repoWebR.query(`${queryData}`)
        const count = await this.repoWebR.query(`${queryDataCount}`)
        const res = { data, count: Number(count[0].count) }
        return res
    }
    FrontendData(data: string): string {
        if (data.length != 0 && data == "enc") {
            return "c.etat_wcontrat in('enc','act')"
        } else if (data.length != 0 && data != "enc") {
            return `c.etat_wcontrat LIKE '${data}'`
        } else {
            return `c.etat_wcontrat LIKE '%'`
        }
    }
}


