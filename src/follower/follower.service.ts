import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Follower } from './entities/follower.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { FollowerListResponseInterface } from './interfaces/follower-list-response.interface';

@Injectable()
export class FollowerService {
  constructor(
    @InjectRepository(Follower)
    private followerRepository: MongoRepository<Follower>,
    private userService: UserService,
  ) {}

  async follow(followedID: string, followerID: string) {
    const followedUser: User = await this.userService.findOneById(followedID);
    if (!followedUser) {
      throw new NotFoundException('Followed user not found please check.');
    }

    const follow = await this.followerRepository.findOneBy({
      followed: followedID,
      follower: followerID,
    });
    if (follow) {
      throw new ConflictException('Already follow this user.');
    }
    const followerModel: Follower = this.followerRepository.create({
      followed: followedID,
      follower: followerID,
    });
    return this.followerRepository.save(followerModel);
  }

  async unfollow(followedID: string, followerID: string) {
    const unfollowedUser: User = await this.userService.findOneById(followedID);
    if (!unfollowedUser) {
      throw new NotFoundException('Followed user not found please check.');
    }
    const deletedObj = await this.followerRepository.findOne({
      where: { followed: followedID, follower: followerID },
    });
    if (deletedObj) {
      return this.followerRepository.remove(deletedObj);
    } else {
      throw new NotFoundException('Follower not found.');
    }
  }

  async getFollowedUser(
    userID: string,
  ): Promise<FollowerListResponseInterface> {
    const [data, count] = await this.followerRepository.findAndCountBy({
      follower: userID,
    });
    return {
      data: data,
      count: count,
    };
  }

  async getFollowedUserCount(userID: string) {
    const count: number = await this.followerRepository.count({
      follower: userID,
    });
    return { count: count };
  }

  async getFollowerUser(
    userID: string,
  ): Promise<FollowerListResponseInterface> {
    const [data, count] = await this.followerRepository.findAndCountBy({
      followed: userID,
    });
    return {
      data: data,
      count: count,
    };
  }

  async getFollowerUserCount(userID: string) {
    const count: number = await this.followerRepository.count({
      followed: userID,
    });
    return { count: count };
  }
}
