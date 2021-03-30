import { WebActeurs } from './../../entities/WebActeurs';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoncompteService {
    constructor(@InjectRepository(WebActeurs) private repoWebActeur: Repository<WebActeurs>) { }

    getActeurInfos(refacteurWacteur: number): Promise<unknown> {
        return this.repoWebActeur.findOne({ refacteurWacteur })
    }

    async update(refacteurWacteur: number, newData: unknown): Promise<unknown> {
        const data = await this.repoWebActeur.findOne({ refacteurWacteur })

        Object.keys(newData).forEach((key) => {
            data[key] = newData[key];
        });

        const res = await this.repoWebActeur.save(data)
        return { res }
    }
}
