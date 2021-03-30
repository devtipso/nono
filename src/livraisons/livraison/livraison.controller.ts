import { InterfaceQuery, getReceptionObject } from './../../helpers/interface.query';
import { GetUser } from './../../get-user.decorator';
import { WebUsers } from './../../../entities/WebUsers';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LivraisonService } from './livraison.service';

@Controller('livraison')
@UseGuards(AuthGuard())
export class LivraisonController {
    constructor(private srv: LivraisonService) { }

    @Get(':id')
    getArticle(@Param('id') refArticle: number, @Query() paginate: InterfaceQuery): Promise<unknown> {
        return this.srv.getArticleByID(refArticle, paginate)
    }


    @Post()
    get(@GetUser() user: WebUsers, @Query() param: InterfaceQuery, @Body() body: getReceptionObject): Promise<unknown> {
        return this.srv.getALL(user.refacteurWuser, param, body)
    }

}
