import { WebInfostoday } from '../../../entities/WebInfostoday';
import { Module } from '@nestjs/common';
import { FonctionnelleInfosController } from './fonctionnelle-infos.controller';
import { FonctionnelleInfosService } from './fonctionnelle-infos.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([WebInfostoday])
  ],
  controllers: [FonctionnelleInfosController],
  providers: [FonctionnelleInfosService]
})
export class FonctionnelleInfosModule { }
