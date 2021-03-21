import { WebUsers } from './../../entities/WebUsers';
import { HelpersModule } from './../helpers/helpers.module';
import { WebFacturation } from './../../entities/WebFacturation';
import { Module } from '@nestjs/common';
import { FacturationController } from './facturation.controller';
import { FacturationService } from './facturation.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([WebFacturation, WebUsers]),
    HelpersModule
  ],
  controllers: [FacturationController],
  providers: [FacturationService]
})
export class FacturationModule { }
