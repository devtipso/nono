import { WebUsers } from './../../entities/WebUsers';
import { InterfaceQuery } from './../helpers/interface.query';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SpaceService {

    constructor(
        @InjectRepository(WebUsers) private repoWebUsers: Repository<WebUsers>,
    ) { }


    async getAll(search: { contrat: number | string, site: number | string, dept: number | string, metier: number | string }, paginate: InterfaceQuery, refacteurWuser: number): Promise<any> {
        // Update Veribles like 😎
        search.contrat = (search.contrat != 0) ? search.contrat : '%';
        search.site = (search.site != 0) ? search.site : '%';
        search.dept = (search.dept != 0) ? search.dept : '%';
        // Query in Variable 🎈
        const dataSearch = `
        SELECT
            u.ref_wuser,
            u.refacteur_wuser AS refacteurWuser,
            s.ref_wsiteacteur,
            s.intitule_wsiteacteur,
            d.intitule_wdepsite,
            u.nom_wuser ,
            u.prenom_wuser ,
            u.accesespace_wuser ,
            u.etat_wuser,
            u.refprofil_wuser as profile
        FROM web_users AS u 
            INNER JOIN web_contrats AS c ON u.refacteur_wuser = c.refacteur_wcontrat
            INNER JOIN web_acteurs_sites AS s ON u.refsite_wuser = s.ref_wsiteacteur
            INNER JOIN web_acteurs_sites_departements AS d ON u.refdep_wuser = d.ref_wdepsite
        WHERE u.refacteur_wuser = ${refacteurWuser} 
            AND s.ref_wsiteacteur LIKE '${search.site}' 
            AND c.refcontrat_wcontrat LIKE '${search.contrat}' 
            AND d.ref_wdepsite LIKE '${search.dept}'
        
        GROUP BY u.login_wuser,u.password_wuser
        ORDER BY s.intitule_wsiteacteur ,d.ordre_wdepsite,u.nom_wuser ,u.prenom_wuser
        LIMIT ${paginate.skip},${paginate.take}
        `
        const dataCount = `
        SELECT
            *
            FROM web_users AS u 
            INNER JOIN web_contrats AS c ON u.refacteur_wuser = c.refacteur_wcontrat
            INNER JOIN web_acteurs_sites AS s ON u.refsite_wuser = s.ref_wsiteacteur
            INNER JOIN web_acteurs_sites_departements AS d ON u.refdep_wuser = d.ref_wdepsite
            WHERE u.refacteur_wuser = ${refacteurWuser} 
            AND s.ref_wsiteacteur LIKE '${search.site}' 
            AND c.refcontrat_wcontrat LIKE '${search.contrat}' 
            AND d.ref_wdepsite LIKE '${search.dept}'
            GROUP BY u.login_wuser,u.password_wuser
        `
        // Get data search with search and paginated
        const res = await this.repoWebUsers.query(dataSearch)
        // Add Sites for options update
        const data = await this.buildSpace(res);
        // Get Count with search parames for pagination
        const count = await this.repoWebUsers.query(dataCount)
        // return Rsultes data + count 
        return await { data, count: Number(count.length) }
    }

    private async buildSpace(res) {

        const data = res;
        if (res) {
            for (let i = 0; i < res.length; i++) {
                const user = res[i];
                data[i]['sites'] = await this.getSitesByRefActeur(user.refacteurWuser);
            }
        }
        return data;
    }

    async getSitesByRefActeur(refacteurWuser: number): Promise<any> {
        const data = await this.repoWebUsers.query(`
        SELECT ref_wsiteacteur AS 'id', intitule_wsiteacteur AS 'name'
        FROM web_acteurs_sites
        WHERE refacteur_wsiteacteur = ${refacteurWuser}
        AND flag_wsiteacteur = 'A'
        `)
        return data
    }

    getUserByID(id: number): Promise<WebUsers> {
        return this.repoWebUsers.findOne({ refWuser: id })
    }

    async edit(id: number, data: WebUsers): Promise<unknown> {
        const user = await this.getUserByID(id)

        Object.keys(data).forEach((key) => {
            user[key] = data[key];
        });

        const res = this.repoWebUsers.save(user)
        return { res }
    }

}
