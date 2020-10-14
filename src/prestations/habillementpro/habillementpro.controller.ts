import { GetUser } from './../../get-user.decorator';
import { WebUsers } from './../../../entities/WebUsers';
import { InterfaceQuery } from '../../helpers/interface.query';
import { HabillementproService } from './habillementpro.service';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import search from './interface';

@Controller('habillementpro')
@UseGuards(AuthGuard())
export class HabillementproController {
    constructor(private srv: HabillementproService) { }

    @Post('search')
    getdata(@Query() query: InterfaceQuery, @GetUser() user: WebUsers, @Body() search: search): Promise<unknown> {
        console.log(query);
        console.log(search);

        return this.srv.search(query, user.refacteurWuser, search)
    }

    @Get('/filter')
    getdataFilter(@GetUser() user: WebUsers): Promise<unknown> {
        return this.srv.getFilterData(user.refacteurWuser)
    }
}
