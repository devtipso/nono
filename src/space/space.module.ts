import { HelpersModule } from './../helpers/helpers.module';
import { WebActeursSitesDepartements } from './../../entities/WebActeursSitesDepartements';
import { WebContrats } from './../../entities/WebContrats';
import { WebUsers } from './../../entities/WebUsers';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceController } from './space.controller';
import { SpaceService } from './space.service';
import { WebActeursSites } from './../../entities/WebActeursSites';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([WebUsers, WebContrats, WebActeursSites, WebActeursSitesDepartements]),
    HelpersModule
  ],
  controllers: [SpaceController],
  providers: [SpaceService]
})
export class SpaceModule { }
