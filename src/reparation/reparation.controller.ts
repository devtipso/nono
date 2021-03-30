import { WebUsers } from './../../entities/WebUsers';
import { GetUser } from './../get-user.decorator';
import { WebReparationsreformes } from './../../entities/WebReparationsreformes';
import { editFileName, imageFileFilter, dir } from './../helpers/helpers.service';
import { ReparationService } from './reparation.service';
import { Controller, Get, Post, Query, Body, UploadedFiles, UseInterceptors, Param, UseGuards } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

@Controller('reparation')
@UseGuards(AuthGuard())
export class ReparationController {
    constructor(private srv: ReparationService, @InjectRepository(WebReparationsreformes) private repoWeb: Repository<WebReparationsreformes>) { }

    // Get Data page "Réparations" avec Pagination
    @Get()
    getRepar(@Query() query: { cbarre, site, dep, skip, take, page }, @GetUser() user: WebUsers): Promise<unknown> {
        return this.srv.getByCodebarre(query, user.refacteurWuser)
    }
    // Get Data Page "Demande de réparation" Article by Code de réparation
    @Get('/demande')
    getReparDemande(@Query() query: { codebarre: string, codeRepar: string }): Promise<unknown> {
        console.log(query);

        return this.srv.getDemandebyCode(query)
    }

    // Get Data Page "Demande de réparation" Article by Code à barre
    @Get('/demande/:id')
    getDemande(@Param('id') id: string, @GetUser() user: WebUsers): Promise<unknown> {
        return this.srv.demandeReparation(id, user.refacteurWuser)
    }
    // Save new demande réparation article
    @Post()
    async saveDemande(@Body() body: unknown, @Query('type') typeQ: string): Promise<unknown> {
        return this.srv.saveDemande(body, body['codebarreWebrr'], typeQ)
    }

    // Save Images in Sources folder
    @Post('/multiple')
    @UseInterceptors(
        FilesInterceptor('image', 20, {
            storage: diskStorage({
                destination: dir,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async uploadMultipleFiles(@UploadedFiles() files): Promise<unknown> {
        const response = [];
        files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                filename: file.filename
            };
            response.push(fileReponse);
        });
        return response;
    }
}
