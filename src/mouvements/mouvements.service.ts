import { WebProgressColors } from './../../entities/WebProgressColors';
import { WebContrats } from './../../entities/WebContrats';
import { WebMouvements } from './../../entities/WebMouvements';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MouvementsService {
    constructor(
        @InjectRepository(WebMouvements) private repoWeb: Repository<WebMouvements>,
        @InjectRepository(WebContrats) private repoWebContrat: Repository<WebContrats>,
        @InjectRepository(WebProgressColors) private repoWebProgress: Repository<WebProgressColors>,
    ) { }

    async getMouveByCodeBarre({ skip, take, cbarre, detail }, refacteurWmvt: number): Promise<unknown> {
        let res
        const codeBarre = (cbarre) ? cbarre : '%'
        if (detail == 'true') {
            // const pagination = (!cbarre) ? `LIMIT ${skip},${take}` : `LIMIT 0,1`
            const query = `
            SELECT
                web_mouvements.refserieetiq_wmvt AS id,
                ifnull(infoporteur.matricule_wdotporteur,'') AS matriculeporteur,
                ifnull(infoporteur.nomprenom_wdotporteur,'') AS nomprenomporteur,
                ifnull(siteporteur.codesite_wdotporteur,'') AS site,
                ifnull(depporteur.codedep_wdotporteur,'') AS dep,
                ifnull(web_contrats.code_wcontrat,'') AS codecontrat,
                web_contrats.refcontrat_wcontrat AS idcontrat,
                web_contrats.datemiseenplace_wcontrat AS datemisenplacecontrat,
                web_contrats.dureecontratmois_wcontrat as dureecontratmois,
                web_mouvements.designarticlep_wmvt  as intitulearticle,
                web_contrats.du_wcontrat  AS du,
                web_contrats.au_wcontrat AS au
            FROM web_mouvements
                left join web_porteurs as infoporteur on infoporteur.refporteur_wdotporteur=web_mouvements.refporteur_wmvt
                left join web_porteurs  as siteporteur on siteporteur.refsite_wdotporteur=web_mouvements.refsite_wmvt
                left join web_porteurs as depporteur on depporteur.refdep_wdotporteur=web_mouvements.refsite_wmvt
                left join web_contrats  on web_contrats.refcontrat_wcontrat=web_mouvements.refcontrat_wmvt
            where gtype_wmvt='traca'
            AND cbarre_wmvt LIKE '${codeBarre}'
            AND flag_wmvt = 'A'
            AND refacteur_wmvt= ${refacteurWmvt}
            group by cbarre_wmvt
        `

            res = await this.repoWeb.query(query)
            console.log(res);
            res[0].countREPAR = await this.repoWeb.count({ refacteurWmvt, cbarreWmvt: codeBarre, typeWmvt: 'REPAR' })

        } else {
            res = await this.repoWeb.query(`
            SELECT
                web_mouvements.ref_wmvt as id,
                web_mouvements.dpiece_wmvt as datemouvement,
                web_mouvements.type_wmvt as typemouvement,
                web_mouvements.intitulepiece_wmvt as infomouvement

            FROM
                web_mouvements
            where cbarre_wmvt LIKE '${codeBarre}'
            AND refacteur_wmvt= ${refacteurWmvt}
            AND flag_wmvt = 'A'

            LIMIT ${skip},${take}
            `)

            const temps = {
                data: res,
                count: await this.repoWeb.count({ refacteurWmvt, cbarreWmvt: codeBarre, flagWmvt: 'A' })
            }
            res = temps
        }

        res['progress'] = await this.progressBar(cbarre, refacteurWmvt)
        return { res }
    }

    async progressBar(codebarre: string, idActeur: number): Promise<unknown> {

        const idContrat = await this.repoWeb.findOne({ select: ['refcontratWmvt'], where: { cbarreWmvt: codebarre } })
        if (!idContrat) {
            throw new NotFoundException()
        }
        const res = await this.repoWebContrat.query(`
        SELECT
        (100*TIMESTAMPDIFF(MONTH,datemiseenplace_wcontrat,now())/dureecontratmois_wcontrat) as pourcent
        FROM
        web_contrats
        where web_contrats.refcontrat_wcontrat LIKE '${idContrat.refcontratWmvt}'
        `)
        let percent
        if (res[0].pourcent) {
            if (res[0].pourcent > 100) {
                percent = 100
            }
            if (res[0].pourcent < 0) {
                percent = 0
            }
        }

        return { percent: Number(parseFloat(percent).toFixed(2)) || 0, color: await this.getPercentColors(idActeur, percent) }
    }


    private async getPercentColors(idActeur: number, percent: any): Promise<string> {
        const data = await this.repoWebProgress.find({ select: ['controlleur', 'toPercent', 'colorHex'], where: { idActeur }, order: { toPercent: 'DESC' } })
        let color = "";
        if (data.length > 0) {
            data.forEach(one => {
                console.log(one.toPercent);
                if (percent <= one.toPercent) {
                    // console.log('true', one.toPercent, percent, 'color', one.colorHex);
                    color = one.colorHex;
                }
            });
        }
        return color
    }
}
