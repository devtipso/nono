import { WebUsers } from './../../entities/WebUsers';
import { GetUser } from './../get-user.decorator';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { FacturationService, QueryInterface } from './facturation.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('facturation')
@UseGuards(AuthGuard())
export class FacturationController {
    constructor(private srv: FacturationService) { }

    @Get(':ref')
    getLibsByIDs(@Param('ref') id: string, @Query() paginate: { skip: number, take: number }): Promise<unknown> {
        return this.srv.getLibByID(id, paginate)
    }

    @Post()
    getSitesbyRefActeur(@Body() query: QueryInterface, @GetUser() user: WebUsers): Promise<unknown> {
        return this.srv.searchFacture(query, user.refacteurWuser)
    }

}
