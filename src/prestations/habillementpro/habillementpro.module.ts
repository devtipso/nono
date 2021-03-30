import { WebMouvements } from './../../../entities/WebMouvements';
import { ParamListeTailles } from './../../../entities/ParamListeTailles';
import { WebPorteurs } from './../../../entities/WebPorteurs';
import { Module } from '@nestjs/common';
import { HabillementproController } from './habillementpro.controller';
import { HabillementproService } from './habillementpro.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([WebPorteurs, ParamListeTailles, WebMouvements]),
  ],
  controllers: [HabillementproController],
  providers: [HabillementproService]
})
export class HabillementproModule { }
