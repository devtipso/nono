import { GetUser } from './../get-user.decorator';
import { WebUsers } from './../../entities/WebUsers';
import { HelpersService } from './helpers.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('helpers')
@UseGuards(AuthGuard())
export class HelpersController {
    constructor(private srv: HelpersService) { }

    @Get('/sites')
    getSitesByRefActeur(@GetUser() user: WebUsers): Promise<unknown> {
        return this.srv.sites(user.refacteurWuser)
    }

    @Get('/contrats')
    getcontratsByRefActeur(@GetUser() user: WebUsers): Promise<unknown> {
        return this.srv.contrats(user.refacteurWuser)
    }

    @Get('/departements')
    getDepartementsByRefActeur(@GetUser() user: WebUsers): Promise<unknown> {
        return this.srv.departements(user.refacteurWuser)
    }

    @Get('/departements-by-site/:id')
    getDepartementsBySiteID(@Param('id') id: number): Promise<unknown> {
        return this.srv.departementsBySiteID(id)
    }

    @Get('/facture-etats')
    getEtatsFacture(@GetUser() user: WebUsers): Promise<unknown> {
        return this.srv.etatsFacture(user.refacteurWuser)
    }
}
