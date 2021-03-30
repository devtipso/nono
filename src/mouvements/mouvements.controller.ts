import { GetUser } from './../get-user.decorator';
import { WebUsers } from './../../entities/WebUsers';
import { MouvementsService } from './mouvements.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('mouvements')
@UseGuards(AuthGuard())
export class MouvementsController {
    constructor(private srv: MouvementsService) { }

    @Get()
    getByCode(@GetUser() user: WebUsers, @Query() query: { skip: number, take: number, cbarre: string, detail: boolean }): Promise<unknown> {
        return this.srv.getMouveByCodeBarre(query, user.refacteurWuser)
    }
}