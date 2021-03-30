import { GetUser } from './../../get-user.decorator';
import { getReceptionObject, InterfaceQuery } from './../../helpers/interface.query';
import { WebUsers } from './../../../entities/WebUsers';
import { ReceptionService } from './reception.service';
import { Body, Controller, Post, UseGuards, Query, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('reception')
@UseGuards(AuthGuard())
export class ReceptionController {
    constructor(private srv: ReceptionService) { }

    @Get()
    getSitesbyRefActeur(@GetUser() user: WebUsers): Promise<unknown> {
        return this.srv.getSites(user.refacteurWuser)
    }

    @Get(':id')
    getArticle(@Param('id') refArticle: number, @Query() paginate: InterfaceQuery): Promise<unknown> {
        return this.srv.getArticleByID(refArticle, paginate)
    }

    @Post()
    get(@GetUser() user: WebUsers, @Query() param: InterfaceQuery, @Body() body: getReceptionObject): Promise<unknown> {
        return this.srv.getALL(user.refacteurWuser, param, body)
    }
}
