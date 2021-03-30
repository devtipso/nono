import { WebUsers } from './../../../entities/WebUsers';
import { WebInfostoday } from './../../../entities/WebInfostoday';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FonctionnelleInfosService {
    constructor(@InjectRepository(WebInfostoday) private repoWeb: Repository<WebInfostoday>,) { }

    async get(user:WebUsers):Promise<unknown> {
        const res = await this.repoWeb.findAndCount({ where: { refinfotodayWtoday: user.refacteurWuser, flagWtoday: 'A' }, order: { ordreWtoday: 'DESC' } })
        if (!res) {
            throw new NotFoundException
        }

        return { res }
    }
}
