import { HelpersModule } from './../helpers/helpers.module';
import { WebArticlesprojet } from './../../entities/WebArticlesprojet';
import { WebReparationsreformes } from './../../entities/WebReparationsreformes';
import { Module } from '@nestjs/common';
import { ReparationController } from './reparation.controller';
import { ReparationService } from './reparation.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([WebReparationsreformes, WebArticlesprojet]),
    HelpersModule
  ],
  controllers: [ReparationController],
  providers: [ReparationService]
})
export class ReparationModule { }
