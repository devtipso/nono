import { WebFacturationDetail } from './../../entities/WebFacturationDetail';
import { WebFacturation } from './../../entities/WebFacturation';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class FacturationService {
    constructor(
        @InjectRepository(WebFacturation) private repoWebFacture: Repository<WebFacturation>,
        @InjectRepository(WebFacturationDetail) private repoWebFactureDetail: Repository<WebFacturationDetail>,
    ) { }


    async searchFacture({ showAll, start, end, take, skip }: QueryInterface, acteurID: number): Promise<unknown> {
        const startFacture = moment(start, 'DD/MM/YYYY').format('YYYY-MM-DD')
        const endFacture = moment(end, 'DD/MM/YYYY').format('YYYY-MM-DD')
        const queryData = `
        SELECT * FROM web_facturation AS f LEFT JOIN web_facturation_detail AS fd
        ON f.reffact_wfact = fd.reffact_wdfactbl
        WHERE f.refacteur_wfact = '${acteurID}'
        AND f.etat_wfact LIKE '${(showAll.length < 1) ? '%' : showAll}'
        AND (f.date_wfact BETWEEN '${startFacture}' AND '${endFacture}')
        AND f.flag_wfact = 'A'
        GROUP BY f.ref_wfact
        LIMIT ${skip},${take}`
        const queryDataCount = `
        SELECT COUNT(*) as count FROM web_facturation AS f LEFT JOIN web_facturation_detail AS fd
        ON f.reffact_wfact = fd.reffact_wdfactbl
        WHERE f.refacteur_wfact = '${acteurID}'
        AND f.etat_wfact LIKE '${(showAll.length < 1) ? '%' : showAll}'
        AND (f.date_wfact BETWEEN '${startFacture}' AND '${endFacture}')
        AND f.flag_wfact = 'A'
        `
        let data = await this.repoWebFacture.query(`${queryData}`)
        data = this.checkDates(data);
        const count = await this.repoWebFacture.query(`${queryDataCount}`)
        const res = { data, count: Number(count[0].count) }
        return res
    }

    private checkDates(data: any) {
        const temp = data
        temp.forEach(e => {
            const echeance = moment(e.decheance_wfact);
            const tenFromNow = moment(e.decheance_wfact).subtract(10, 'days');
            const now = moment().format();
            if (moment(now).isAfter(echeance) && e.etat_wfact == "AR") {
                // si la date depasser l'echeance
                e.class_it = 'bg-danger'
            } else if (moment(now).isBetween(tenFromNow, echeance) && e.etat_wfact == "AR") {
                // si la date enter 10 jours avant l'echeance
                e.class_it = 'bg-warning'
            } else e.class_it = 'bg-normal'
        });
        return data
    }

    async getLibByID(id: string, { skip, take }): Promise<unknown> {
        const queryData = `
        SELECT * FROM web_facturation_detail AS fd
        WHERE fd.reffact_wdfactbl = ${id} 
        AND fd.flag_wdfactbl = 'A' 
        LIMIT ${skip},${take}`
        const data = await this.repoWebFactureDetail.query(`${queryData}`)
        const queryDataCount = `
        SELECT COUNT(codebl_wdfactbl) AS counts FROM web_facturation_detail AS fd
        WHERE fd.reffact_wdfactbl = ${id} 
        AND fd.flag_wdfactbl = 'A'`
        const count = await this.repoWebFactureDetail.query(`${queryDataCount}`)
        return { data, count: Number(count[0]['counts']) }
    }
}

export class QueryInterface { showAll: string; start: string; end: string; take: number; skip: number }