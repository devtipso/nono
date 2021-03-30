import { HelpersModule } from './../../helpers/helpers.module';
import { WebReceptionsDetail } from './../../../entities/WebReceptionsDetail';
import { WebReceptions } from './../../../entities/WebReceptions';
import { Module } from '@nestjs/common';
import { ReceptionController } from './reception.controller';
import { ReceptionService } from './reception.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([WebReceptions, WebReceptionsDetail]),
    HelpersModule
  ],
  controllers: [ReceptionController],
  providers: [ReceptionService]
})
export class ReceptionModule { }
