import { WebFacturation } from './../../entities/WebFacturation';
import { WebActeursSitesDepartements } from './../../entities/WebActeursSitesDepartements';
import { WebContrats } from './../../entities/WebContrats';
import { WebActeursSites } from './../../entities/WebActeursSites';
import { HelpersService } from './helpers.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpersController } from './helpers.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([WebActeursSites, WebContrats, WebActeursSitesDepartements, WebFacturation]),
        PassportModule.register({ defaultStrategy: 'jwt' })
    ],
    exports: [HelpersService],
    providers: [HelpersService],
    controllers: [HelpersController],
})
export class HelpersModule { }
