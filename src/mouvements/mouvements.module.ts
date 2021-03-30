import { WebProgressColors } from './../../entities/WebProgressColors';
import { WebContrats } from './../../entities/WebContrats';
import { HelpersModule } from './../helpers/helpers.module';
import { WebMouvements } from './../../entities/WebMouvements';
import { Module } from '@nestjs/common';
import { MouvementsController } from './mouvements.controller';
import { MouvementsService } from './mouvements.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([WebMouvements, WebContrats, WebProgressColors]),
    HelpersModule
  ],
  controllers: [MouvementsController],
  providers: [MouvementsService]
})
export class MouvementsModule { }
