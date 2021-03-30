import { HelpersModule } from './../helpers/helpers.module';
import { WebContrats } from './../../entities/WebContrats';
import { Module } from '@nestjs/common';
import { ContartsController } from './contarts.controller';
import { ContartsService } from './contarts.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([WebContrats]),
    HelpersModule
  ],
  controllers: [ContartsController],
  providers: [ContartsService]
})
export class ContartsModule { }
