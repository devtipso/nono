import { WebMouvements } from './../../../entities/WebMouvements';
import { ParamListeTailles } from './../../../entities/ParamListeTailles';
import { WebPorteurs } from './../../../entities/WebPorteurs';
import { InterfaceQuery } from '../../helpers/interface.query';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import search, { InterfaceUpdateTaille } from './interface';

@Injectable()
export class HabillementproService {

    constructor(
        @InjectRepository(WebPorteurs) private repoWebPorteurs: Repository<WebPorteurs>,
        @InjectRepository(ParamListeTailles) private repoParamListeTailles: Repository<ParamListeTailles>,
        @InjectRepository(WebMouvements) private repoWebMouvements: Repository<WebMouvements>,
    ) { }

    async getFilterData(refacteurWdotporteur: number): Promise<unknown> {

        const obj_contart = await this.queryFilterMaker(
            refacteurWdotporteur,
            "refcontrat_wdotporteur as id FROM web_porteurs",
            "group by refcontrat_wdotporteur"
        )

        const obj_site = await this.queryFilterMaker(
            refacteurWdotporteur,
            "refsite_wdotporteur as id,codesite_wdotporteur as name FROM web_porteurs",
            "group by refsite_wdotporteur"
        )

        const obj_depot = await this.queryFilterMaker(
            refacteurWdotporteur,
            "refdep_wdotporteur as id,codedep_wdotporteur as name FROM web_porteurs",
            "group by refdep_wdotporteur"
        )

        const obj_metier = await this.queryFilterMaker(
            refacteurWdotporteur,
            "refmetier_wdotporteur as id,metier_wdotporteur as name FROM web_porteurs",
            "group by refmetier_wdotporteur"
        )

        return { res: { obj_contart, obj_site, obj_depot, obj_metier } }
    }

    async search(query: InterfaceQuery, refacteur_wdotporteur: number, dataSearch: search): Promise<unknown> {
        let data = []
        let toCount = []
        let A_AV_check: any = []
        dataSearch.contrat = (dataSearch.contrat.length < 1) ? '%' : dataSearch.contrat
        dataSearch.site = (dataSearch.site.length < 1) ? '%' : dataSearch.site
        dataSearch.dept = (dataSearch.dept.length < 1) ? '%' : dataSearch.dept
        dataSearch.metier = (dataSearch.metier.length < 1) ? '%' : dataSearch.metier
        dataSearch.search = (dataSearch.search.length < 1) ? '' : `%${dataSearch.search}%`

        data = await this.repoWebPorteurs.query(this.queryFunc(refacteur_wdotporteur, dataSearch, query));
        if (dataSearch.detail) {
            toCount = await this.toCountData(toCount, refacteur_wdotporteur, dataSearch);
        } else {
            const data = { select_data: ",refsite_wdotporteur,article_ref_wdotporteur", group_by: " group by article_ref_wdotporteur,refsite_wdotporteur" }
            toCount = await this.toCountData(toCount, refacteur_wdotporteur, dataSearch, data);
        }
        A_AV_check = await this.repoWebPorteurs.query(`
        SELECT COUNT(*) as a FROM  web_porteurs
        WHERE refacteur_wdotporteur = ${refacteur_wdotporteur} AND  flag_wdotporteur = 'A'
        AND (etat_wdotporteur != 'AV' OR taille_wdotporteur = '')
        `)

        // if detail true ADD taille options (xs m l s ...)
        data = await this.addTailleOptions(dataSearch, data);

        return { data, count: toCount.length, dialog: false, validated: (A_AV_check[0].a == 0) ? true : false }
    }

    getPorteurByID(id: number): Promise<WebPorteurs> {
        return this.repoWebPorteurs.findOne({ refWdotporteur: id })
    }

    async updateTaille(newData: InterfaceUpdateTaille): Promise<any> {
        const data = await this.getPorteurByID(newData.refWdotporteur)

        Object.keys(newData).forEach((key) => {
            data[key] = newData[key];
        });

        const res = this.repoWebPorteurs.save(data)
        return { taille: (await res).tailleWdotporteur, id: (await res).refWdotporteur }
    }

    async saveProd(refacteurWdotporteur: number): Promise<any> {
        const data = await this.repoWebPorteurs.findAndCount({ refacteurWdotporteur, flagWdotporteur: 'A', tailleWdotporteur: '' })
        const search: search = {
            detail: true,
            contrat: "",
            site: "",
            dept: "",
            metier: "",
            search: ""
        }
        const querysearch: InterfaceQuery = { skip: 0, take: 5, order: 'DESC' }
        if (data[1] == 0) {
            // chnage flagWdotporteur A => AV
            await this.repoWebPorteurs.query(
                `UPDATE web_porteurs SET etat_wdotporteur = 'AV'
                WHERE refacteur_wdotporteur = ${refacteurWdotporteur} AND flag_wdotporteur = 'A'`
            )
            return this.search(querysearch, refacteurWdotporteur, search)
        } else {

            const queryData = await this.repoWebPorteurs.query(
                `SELECT * FROM  web_porteurs
                WHERE refacteur_wdotporteur = ${refacteurWdotporteur} AND flag_wdotporteur = 'A' AND taille_wdotporteur = ''`
            )

            const result = await this.addTailleOptions(search, queryData)
            return { data: result, count: data[1], dialog: true, validated: false }
        }
    }

    async getdataQRs(refacteurWmvt: number, refporteurWmvt: string): Promise<unknown> {
        const res = await this.repoWebMouvements.query(`
        SELECT
            m.cbarre_wmvt AS qr
        FROM
            web_mouvements AS m  
        WHERE 
            m.flag_wmvt='A'
        AND 
            m.refacteur_wmvt = ${refacteurWmvt}
        AND 
            m.refporteur_wmvt = ${refporteurWmvt}
        group BY 
            m.cbarre_wmvt
        order BY 
            m.ref_wmvt
        `)
        return { res }
    }













    // Helpers functions
    private async toCountData(toCount: any[], refacteur_wdotporteur: number, dataSearch: search, data: any = { select_data: "", group_by: "" }) {
        toCount = await this.repoWebPorteurs.query(`SELECT
            codesite_wdotporteur${data.select_data}
            
            FROM
            web_porteurs
            
            WHERE 
            flag_wdotporteur='A'
            and refacteur_wdotporteur =${refacteur_wdotporteur}
            and web_porteurs.refcontrat_wdotporteur LIKE '${dataSearch.contrat}'
            and web_porteurs.refsite_wdotporteur like '${dataSearch.site}'
            and web_porteurs.refdep_wdotporteur like '${dataSearch.dept}'
            and web_porteurs.refmetier_wdotporteur like '${dataSearch.metier}'
            and (web_porteurs.nomprenom_wdotporteur like '${(dataSearch.search) ? dataSearch.search : '%'}' or web_porteurs.matricule_wdotporteur like '${(dataSearch.search) ? dataSearch.search : '%'}')

            ${data.group_by}
            `);
        return toCount;
    }

    private queryFunc(refacteur_wdotporteur: number, dataSearch: search, query: InterfaceQuery): string {
        let queryString = ""
        if (dataSearch.detail) {
            queryString = `SELECT
            etat_wdotporteur,
            ref_wdotporteur,
            codesite_wdotporteur,
            codedep_wdotporteur,
            metier_wdotporteur,
            article_intitule_wdotporteur,
            article_ref_wdotporteur,
            qtepardotation_wdotporteur,
            matricule_wdotporteur,
            nomprenom_wdotporteur,
            genre_wdotporteur,
            taille_wdotporteur,
            refgrilletaille_wdotporteur,
            refporteur_wdotporteur
    
            FROM
            web_porteurs
    
            WHERE 
            flag_wdotporteur='A'
            and etat_wdotporteur LIKE '%'
            and refacteur_wdotporteur =${refacteur_wdotporteur}
            and web_porteurs.refcontrat_wdotporteur LIKE '${dataSearch.contrat}'
            and web_porteurs.refsite_wdotporteur like '${dataSearch.site}'
            and web_porteurs.refdep_wdotporteur like '${dataSearch.dept}'
            and web_porteurs.refmetier_wdotporteur like '${dataSearch.metier}'
            and (web_porteurs.nomprenom_wdotporteur like '${(dataSearch.search) ? dataSearch.search : '%'}' or web_porteurs.matricule_wdotporteur like '${(dataSearch.search) ? dataSearch.search : '%'}')
    
            order by taille_wdotporteur
            LIMIT ${query.take} OFFSET ${query.skip}
            `;
        } else {
            queryString = `SELECT
            ref_wdotporteur,
            codesite_wdotporteur,
            codedep_wdotporteur,
            metier_wdotporteur,
            article_intitule_wdotporteur,
            article_ref_wdotporteur,
            qtepardotation_wdotporteur,
            count(refporteur_wdotporteur) as count
    
            FROM
            web_porteurs
    
            WHERE 
            flag_wdotporteur='A'
            and refacteur_wdotporteur =${refacteur_wdotporteur}
            and web_porteurs.refcontrat_wdotporteur LIKE '${dataSearch.contrat}'
            and web_porteurs.refsite_wdotporteur like '${dataSearch.site}'
            and web_porteurs.refdep_wdotporteur like '${dataSearch.dept}'
            and web_porteurs.refmetier_wdotporteur like '${dataSearch.metier}'
    
            
            group by taille_wdotporteur
    
            order by article_intitule_wdotporteur
            LIMIT ${query.take} OFFSET ${query.skip}
            `;
        }
        return queryString
    }

    async getTaillsByCategorieID(id: number): Promise<ParamListeTailles[]> {
        return await this.repoParamListeTailles.find({
            where: { refgrilletailleTaille: id, etatTaille: 'A' },
            select: ['refTaille', 'intituleTaille'],
            order: { ordreTaille: 'ASC' }
        })
    }

    private async queryFilterMaker(refacteurWdotporteur: number, select: string, group: string) {
        return await this.repoWebPorteurs.query(
            `SELECT ${select}
                WHERE flag_wdotporteur = 'A' 
                and refacteur_wdotporteur = ${refacteurWdotporteur} 
                ${group}`
        );
    }

    private async addTailleOptions(search: search, data: any[]) {
        if (search.detail) {
            const dataCopie = data;
            for (let i = 0; i < dataCopie.length; i++) {
                const item = dataCopie[i];
                data[i]['taille_Options'] = await this.getTaillsByCategorieID(item.refgrilletaille_wdotporteur);
            }
        }

        return data
    }

}
