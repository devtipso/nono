import { WebUsers } from './../../entities/WebUsers';
import { GetUser } from './../get-user.decorator';
import { MoncompteService } from './moncompte.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('moncompte')
@UseGuards(AuthGuard())
export class MoncompteController {
    constructor(private srv: MoncompteService) { }

    @Get()
    async getActeur(@GetUser() user: WebUsers): Promise<unknown> {
        const res = await this.srv.getActeurInfos(user.refacteurWuser)
        return { res }
    }

    @Post()
    updateRefacteur(@GetUser() user: WebUsers, @Body() body: unknown): Promise<unknown> {
        return this.srv.update(user.refacteurWuser, body)
    }
}
