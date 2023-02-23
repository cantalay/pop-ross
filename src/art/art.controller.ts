import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ArtService } from './art.service';
import { CreateArtDto } from './dto/create-art.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from './sharp.pipe';
import { Roles } from '../auth/decorators/roles.decoorator';
import { Role } from '../common/enums/role.enum';
import { Public } from '../auth/decorators/public.decorator';

@Controller('art')
export class ArtController {
  constructor(private readonly artService: ArtService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  @Roles(Role.Admin, Role.Editor)
  async create(
    @UploadedFiles(SharpPipe) arts: Array<Uint8Array>,
    @Body() createArtDto: CreateArtDto,
    @Req() request,
  ) {
    await this.artService.create(createArtDto, arts, request.user);
  }

  @Get(':artistID/:artID/:artKey')
  @Public()
  findOne(
    @Param('artistID') artistID: string,
    @Param('artID') artID: string,
    @Param('artKey') artKey: string,
  ) {
    return this.artService.getArt(artID, artistID, artKey);
  }

  @Get('/flow/:page')
  getUserFlow(@Param('page') page = 1, @Request() req) {
    return this.artService.userFlow(req.user.userID, page);
  }
}
