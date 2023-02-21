import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { FollowerService } from './follower.service';

@Controller('follower')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Post('follow/:followedID')
  follow(@Param('followedID') followedID: string, @Request() req) {
    return this.followerService.follow(followedID, req.user.userID);
  }

  @Post('unfollow/:followedID')
  @HttpCode(200)
  unfollow(@Param('followedID') followedID: string, @Request() req) {
    return this.followerService.unfollow(followedID, req.user.userID);
  }

  @Get('followed')
  getFollowedUser(@Param('followedID') followedID: string, @Request() req) {
    return this.followerService.getFollowedUser(req.user.userID);
  }

  @Get('followedCount')
  getFollowedUserCount(
    @Param('followedID') followedID: string,
    @Request() req,
  ) {
    return this.followerService.getFollowedUserCount(req.user.userID);
  }

  @Get('follower')
  getFollowerUser(@Param('followedID') followedID: string, @Request() req) {
    return this.followerService.getFollowerUser(req.user.userID);
  }

  @Get('followerCount')
  getFollowerUserCount(
    @Param('followedID') followedID: string,
    @Request() req,
  ) {
    return this.followerService.getFollowerUserCount(req.user.userID);
  }
}
