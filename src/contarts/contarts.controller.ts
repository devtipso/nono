import { ContartsService } from './contarts.service';
import { GetUser } from './../get-user.decorator';
import { WebUsers } from './../../entities/WebUsers';
import { searchParamsContarts } from './../helpers/interface.query';
import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('contarts')
@UseGuards(AuthGuard())
export class ContartsController {
    constructor(private srv: ContartsService) { }
    @Post()
    getSitesbyRefActeur(@Query() paginate: { skip: number, take: number }, @Body() body: searchParamsContarts, @GetUser() user: WebUsers): Promise<unknown> {
        return this.srv.searchContrat(paginate, body, user.refacteurWuser)
    }
}
