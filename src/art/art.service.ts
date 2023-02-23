import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateArtDto } from './dto/create-art.dto';
import { S3LoaderService } from '../s3-loader/s3-loader.service';
import { MongoRepository } from 'typeorm';
import { Art } from './entities/art.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleService } from '../user-role/user-role.service';
import { UserRole } from '../user-role/entities/user-role.entity';
import { ArtModelInterface } from './interfaces/art-model.interface';
import { SubscriptionService } from '../subscription/subscription.service';
import { UserFlowResponseDto } from './dto/user-flow-response.dto';

@Injectable()
export class ArtService {
  private readonly PAGE_SIZE: number = 10;

  constructor(
    private s3LoaderService: S3LoaderService,
    private userRoleService: UserRoleService,
    private subscriptionService: SubscriptionService,
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
        'Please check your account role. Notify me.',
      );
    }
  }

  async getArt(artID: string, artistID: string, artKey: string) {
    return this.s3LoaderService.getFile(artistID, artID, artKey);
  }

  async userFlow(userID: string, page: number): Promise<UserFlowResponseDto> {
    const subscriptions = await this.subscriptionService.getUserSubscriptions(
      userID,
    );
    if (subscriptions.count > 0) {
      const artistIDS = subscriptions.data.map((value) => value.artistID);
      const query = {
        where: {
          $and: [],
        },
        take: this.PAGE_SIZE,
        skip: page * this.PAGE_SIZE,
      };
      query.where.$and.push({ artistID: { $in: [...artistIDS] } });
      const [arts, count] = await this.artRepository.findAndCount(query);
      return { arts: arts, count: count };
    }
  }
}
