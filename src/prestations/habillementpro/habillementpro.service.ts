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

    async search(query: InterfaceQuery, refacteur_wdotporteur: number, search: search): Promise<unknown> {
        let data = []
        let toCount = []
        search.contrat = (search.contrat.length < 1) ? '%' : search.contrat
        search.site = (search.site.length < 1) ? '%' : search.site
        search.dept = (search.dept.length < 1) ? '%' : search.dept
        search.metier = (search.metier.length < 1) ? '%' : search.metier
        data = await this.repoWebPorteurs.query(this.queryFunc(refacteur_wdotporteur, search, query));
        if (search.detail) {
            toCount = await this.toCountData(toCount, refacteur_wdotporteur, search);
        } else {
            const data = { select_data: ",refsite_wdotporteur,article_ref_wdotporteur", group_by: " group by article_ref_wdotporteur,refsite_wdotporteur" }
            toCount = await this.toCountData(toCount, refacteur_wdotporteur, search, data);
        }

        // if detail true ADD taille options (xs m l s ...)
        data = await this.addTailleOptions(search, data);


        return { data, count: toCount.length }
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














    // Helpers functions
    private async toCountData(toCount: any[], refacteur_wdotporteur: number, search: search, data: any = { select_data: "", group_by: "" }) {
        toCount = await this.repoWebPorteurs.query(`SELECT
            codesite_wdotporteur${data.select_data}
            
            FROM
            web_porteurs
            
            WHERE 
            flag_wdotporteur='A'
            and refacteur_wdotporteur =${refacteur_wdotporteur}
            and web_porteurs.refcontrat_wdotporteur LIKE '${search.contrat}'
            and web_porteurs.refsite_wdotporteur like '${search.site}'
            and web_porteurs.refdep_wdotporteur like '${search.dept}'
            and web_porteurs.refmetier_wdotporteur like '${search.metier}'
            ${data.group_by}
            `);
        return toCount;
    }

    private queryFunc(refacteur_wdotporteur: number, search: search, query: InterfaceQuery): string {
        let queryString = ""
        if (search.detail) {
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
            refgrilletaille_wdotporteur
    
            FROM
            web_porteurs
    
            WHERE 
            flag_wdotporteur='A'
            and etat_wdotporteur LIKE 'A%'
            and refacteur_wdotporteur =${refacteur_wdotporteur}
            and web_porteurs.refcontrat_wdotporteur LIKE '${search.contrat}'
            and web_porteurs.refsite_wdotporteur like '${search.site}'
            and web_porteurs.refdep_wdotporteur like '${search.dept}'
            and web_porteurs.refmetier_wdotporteur like '${search.metier}'
    
            order by article_intitule_wdotporteur
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
            and web_porteurs.refcontrat_wdotporteur LIKE '${search.contrat}'
            and web_porteurs.refsite_wdotporteur like '${search.site}'
            and web_porteurs.refdep_wdotporteur like '${search.dept}'
            and web_porteurs.refmetier_wdotporteur like '${search.metier}'
    
            
            group by article_ref_wdotporteur,refsite_wdotporteur
    
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
