import { Module } from '@nestjs/common';
import { ArtService } from './art.service';
import { ArtController } from './art.controller';
import { memoryStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { S3LoaderService } from '../s3-loader/s3-loader.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Art } from './entities/art.entity';
import { UserRoleModule } from '../user-role/user-role.module';
import { SubscriptionModule } from '../subscription/subscription.module';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
    TypeOrmModule.forFeature([Art]),
    UserRoleModule,
    SubscriptionModule,
  ],
  controllers: [ArtController],
  providers: [ArtService, S3LoaderService],
})
export class ArtModule {}
