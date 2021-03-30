import { WebArticlesprojet } from './../../entities/WebArticlesprojet';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebReparationsreformes } from '../../entities/WebReparationsreformes';

@Injectable()
export class ReparationService {

    constructor(
        @InjectRepository(WebReparationsreformes) private repoWeb: Repository<WebReparationsreformes>,
        @InjectRepository(WebArticlesprojet) private repoWebArticlesprojet: Repository<WebArticlesprojet>
    ) { }

    // 1er Page de réparation
    async getByCodebarre({ cbarre, site, dep, skip, take, page }, idActeur: number): Promise<unknown> {
        cbarre = (cbarre.length == 0 || cbarre == 0) ? '%' : cbarre
        site = (site.length == 0 || site == 0) ? '%' : site
        dep = (dep.length == 0 || dep == 0) ? '%' : dep

        const res = {
            data: await this.queryParams(cbarre, site, dep, skip, take, page, idActeur),
            count: await this.queryParamsCounts(cbarre, site, dep, page, idActeur)
        }
        return { res }
    }

    private queryParams(cbarre: string, site: string, dep: string, skip: number, take: number, page: string, idActeur: number): Promise<unknown> {
        const queryDatas = `
        SELECT 
            r.ddemande_webrr AS demande_date,
            r.codereparationreforme_webrr AS rep_code,
            s.intitule_wsiteacteur AS site,
            s.ref_wsiteacteur AS siteID,
            d.intitule_wdepsite AS dep,
            d.ref_wdepsite AS depID,
            a.intitulearticle_artpweb AS article,
            r.porteur_webrr AS porteur,
            r.repar_type_webrr AS types,
            r.etat_rr AS statut,
            r.codebarre_webrr AS ccode
        FROM web_reparationsreformes AS r
        INNER JOIN web_mouvements AS m
        ON r.refserieetiq_webrr = m.refserieetiq_wmvt
        LEFT JOIN web_articlesprojet AS a
        ON r.refarticleprojet_webrr = a.refarticleprojet_artpweb
        LEFT JOIN web_acteurs_sites AS s
        ON m.refsite_wmvt = s.ref_wsiteacteur
        LEFT JOIN web_acteurs_sites_departements AS d
        ON m.refdep_wmvt = d.ref_wdepsite
        WHERE r.refclient_webrr = '${idActeur}'
        AND r.codebarre_webrr LIKE '${cbarre}'
        AND m.refsite_wmvt LIKE '${site}'
        AND m.refdep_wmvt LIKE '${dep}'
        AND r.type_webrr LIKE '${page}'
        AND r.flag_webrr = 'A'
        GROUP BY r.ref_webrr
        LIMIT ${skip},${take}
        `;
        return this.repoWeb.query(queryDatas);
    }

    private async queryParamsCounts(cbarre: string, site: string, dep: string, page: string, idActeur: number): Promise<unknown> {
        const count = await this.repoWeb.query(`
        SELECT 
            r.ref_webrr
        FROM web_reparationsreformes AS r 
        LEFT JOIN web_mouvements AS m
        ON r.refserieetiq_webrr = m.refserieetiq_wmvt
        LEFT JOIN web_articlesprojet AS a
        ON r.refarticleprojet_webrr = a.refarticleprojet_artpweb
        LEFT JOIN web_acteurs_sites AS s
        ON m.refsite_wmvt = s.ref_wsiteacteur
        LEFT JOIN web_acteurs_sites_departements AS d
        ON m.refdep_wmvt = d.ref_wdepsite
        WHERE r.refclient_webrr = '${idActeur}'
        AND r.codebarre_webrr LIKE '${cbarre}'
        AND m.refsite_wmvt LIKE '${site}'
        AND m.refdep_wmvt LIKE '${dep}'
        AND r.type_webrr LIKE '${page}'
        AND r.flag_webrr = 'A'
        GROUP BY r.ref_webrr
        `);

        return count.length
    }

    async getDemandebyCode({ codeRepar }): Promise<unknown> {
        const qy = `
        SELECT 
            r.ddemande_webrr AS demande_date,
            r.codereparationreforme_webrr AS rep_code,
            s.ref_wsiteacteur AS site,
            d.ref_wdepsite AS dep,
            p.matricule_wdotporteur AS matriculeporteur,
            r.porteur_webrr AS porteur,
            r.type_webrr AS type,
            r.repar_type_webrr AS types,
            r.etat_rr AS statut,
            r.codebarre_webrr AS ccode,
            m.designarticlep_wmvt AS article,
            m.refarticlep_wmvt AS articleID,
            r.description_webrr AS remarque,
            r.photo1_chemin_webrr AS photo1,
            r.photo2_chemin_webrr AS photo2
        FROM web_reparationsreformes AS r 
        inner JOIN web_mouvements AS m
        ON r.refserieetiq_webrr = m.refserieetiq_wmvt
        left JOIN web_porteurs AS p ON p.refporteur_wdotporteur = m.refporteur_wmvt
        LEFT JOIN web_articlesprojet AS a
        ON r.refarticleprojet_webrr = a.refarticleprojet_artpweb
        LEFT JOIN web_acteurs_sites AS s
        ON m.refsite_wmvt = s.ref_wsiteacteur
        LEFT JOIN web_acteurs_sites_departements AS d
        ON m.refdep_wmvt = d.ref_wdepsite
        WHERE r.codereparationreforme_webrr like '${codeRepar}'
        AND r.flag_webrr = 'A'
        GROUP BY r.ref_webrr
        `;


        return { res: await this.repoWeb.query(qy) }
    }

    async saveDemande(newData: unknown, ccbarre: string, typeq: string): Promise<unknown> {
        newData['codebarreWebrr'] = ccbarre
        const d = new Date()
        const ye = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(d)
        const mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d)


        const res = await this.repoWeb.save(await this.increment(newData, ye, mo, typeq))
        return { res }
    }

    private async increment(newData: unknown, ye: string, mo: string, typeq: string) {
        // const res = await this.repoWeb.query(`select max(codereparationreforme_webrr) as id FROM web_reparationsreformes where codereparationreforme_webrr like '${typeq}%'`);
        // const temp1 = res[0]['id'].split(typeq);
        // console.log(res[0]['id'].split(typeq));
        // const temp2 = Number(temp1[1]) + 1;
        // temp1[1] = temp2
        // console.log(temp1);

        newData['codereparationreformeWebrr'] = `${typeq}${ye}${mo}${Math.floor(Math.random() * (9999 - 1111)) + 1111}`;
        return newData
    }

    async demandeReparation(code: string, id: number): Promise<unknown> {
        const data = await this.repoWebArticlesprojet.query(`
        SELECT 
            m.cbarre_wmvt AS codebarre,
            z.intitulearticle_artpweb AS article,
            m.refsite_wmvt AS siteID,
            m.refdep_wmvt AS depID,
            p.matricule_wdotporteur AS matricule,
            p.nomprenom_wdotporteur AS nomPorteur,
            m.refserieetiq_wmvt AS serieID,
            z.refarticleprojet_artpweb AS refArticle,
            m.refporteur_wmvt AS porteurID,
            m.refcontrat_wmvt AS contratID,
            m.refacteur_wmvt AS acteurID
        FROM web_mouvements AS m
        left JOIN web_porteurs AS p ON p.refporteur_wdotporteur = m.refporteur_wmvt
        left JOIN web_articlesprojet  AS z ON z.refarticleprojet_artpweb = m.refarticlep_wmvt
        WHERE m.cbarre_wmvt LIKE '${code}'
        AND m.refacteur_wmvt LIKE '${id}'
        GROUP BY m.cbarre_wmvt
        `)

        data[0].date_demande = new Date()

        return { res: data[0] }
    }
}
