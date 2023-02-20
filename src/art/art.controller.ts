import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ArtService } from './art.service';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from './sharp.pipe';
import { Roles } from '../auth/decorators/roles.decoorator';
import { Role } from '../common/enums/role.enum';

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

  @Get()
  findAll() {
    return this.artService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtDto: UpdateArtDto) {
    return this.artService.update(+id, updateArtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artService.remove(+id);
  }
}
