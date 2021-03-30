import { HelpersModule } from './../../helpers/helpers.module';
import { WebLivraisonsDetail } from './../../../entities/WebLivraisonsDetail';
import { WebLivraisons } from './../../../entities/WebLivraisons';
import { Module } from '@nestjs/common';
import { LivraisonController } from './livraison.controller';
import { LivraisonService } from './livraison.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([WebLivraisons, WebLivraisonsDetail]),
    HelpersModule
  ],
  controllers: [LivraisonController],
  providers: [LivraisonService]
})
export class LivraisonModule { }
