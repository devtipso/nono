import { WebUsers } from './../../../entities/WebUsers';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './../../get-user.decorator';
import { FonctionnelleInfosService } from './fonctionnelle-infos.service';

@Controller('fonctionnelle-infos')
@UseGuards(AuthGuard())
export class FonctionnelleInfosController {
    constructor(private srv: FonctionnelleInfosService) { }

    @Get()
    getPassage(@GetUser() user:WebUsers): Promise<unknown> {
        return this.srv.get(user)
    }
}
