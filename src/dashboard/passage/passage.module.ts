import { WebPassages } from './../../../entities/WebPassages';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassageController } from './passage.controller';
import { PassageService } from './passage.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([WebPassages])],
  controllers: [PassageController],
  providers: [PassageService]
})
export class PassageModule {

}



