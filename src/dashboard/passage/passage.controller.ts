import { WebUsers } from './../../../entities/WebUsers';
import { PassageService } from './passage.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './../../get-user.decorator';

@Controller('passage')
@UseGuards(AuthGuard())
export class PassageController {
    constructor(private srv: PassageService) { }

    @Get()
    getPassage(@GetUser() user:WebUsers): Promise<unknown> {
        return this.srv.getPassages(user)
    }
}
