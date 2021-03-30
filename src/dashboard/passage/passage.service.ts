import { WebUsers } from './../../../entities/WebUsers';
import { WebPassages } from './../../../entities/WebPassages';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PassageService {
    constructor(@InjectRepository(WebPassages) private repoWeb: Repository<WebPassages>) { }
    async getPassages(user:WebUsers): Promise<unknown> {
        const res = await this.repoWeb.findAndCount({ visuPassage: 'o', refacteurPassage: user.refacteurWuser })

        return { res }
    }
}
