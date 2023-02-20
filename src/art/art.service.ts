import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';
import { S3LoaderService } from '../s3-loader/s3-loader.service';
import { MongoRepository } from 'typeorm';
import { Art } from './entities/art.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleService } from '../user-role/user-role.service';
import { UserRole } from '../user-role/entities/user-role.entity';
import { ArtModelInterface } from './interfaces/art-model.interface';

@Injectable()
export class ArtService {
  constructor(
    private s3LoaderService: S3LoaderService,
    private userRoleService: UserRoleService,
    @InjectRepository(Art)
    private artRepository: MongoRepository<Art>,
  ) {}

  async create(
    createArtDto: CreateArtDto,
    artFiles: Array<Uint8Array>,
    requestUser,
  ) {
    const roleDetail: UserRole = await this.userRoleService.findOneByUserID(
      requestUser.userID,
    );
    if (roleDetail) {
      const artistID = roleDetail.artistID;
      const artistModel: ArtModelInterface = {
        artistID: artistID,
        name: createArtDto.name,
        userID: requestUser.userID,
      };
      const art: Art = await this.artRepository.save(artistModel);
      await this.s3LoaderService.upload(artFiles, artistID, art._id.toString());
    } else {
      throw new UnauthorizedException(
        'You are not an artist or editor. Please check your account.',
      );
    }
  }

  findAll() {
    return `This action returns all art`;
  }

  findOne(id: number) {
    return `This action returns a #${id} art`;
  }

  update(id: number, updateArtDto: UpdateArtDto) {
    return `This action updates a #${updateArtDto} art`;
  }

  remove(id: number) {
    return `This action removes a #${id} art`;
  }
}
