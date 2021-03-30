import { HelpersModule } from './../helpers/helpers.module';
import { WebActeurs } from './../../entities/WebActeurs';
import { Module } from '@nestjs/common';
import { MoncompteController } from './moncompte.controller';
import { MoncompteService } from './moncompte.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([WebActeurs]),
    HelpersModule
  ],
  controllers: [MoncompteController],
  providers: [MoncompteService]
})
export class MoncompteModule { }
