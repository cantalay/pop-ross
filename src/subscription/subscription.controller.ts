import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('subscribe/:artistID')
  subscribe(@Param('artistID') artistID: string, @Request() req) {
    return this.subscriptionService.subscribe(artistID, req.user.userID);
  }

  @Post('unsubscribe/:artistID')
  @HttpCode(200)
  unsubscribe(@Param('artistID') artistID: string, @Request() req) {
    return this.subscriptionService.unsubscribe(artistID, req.user.userID);
  }

  @Get('user/:userID')
  getUserSubscriptions(@Param('userID') userID: string) {
    return this.subscriptionService.getUserSubscriptions(userID);
  }

  @Get('user/:userID/count')
  getUserSubscriptionsCount(@Param('userID') userID: string) {
    return this.subscriptionService.getUserSubscriptionsCount(userID);
  }

  @Get('artist/:artistID')
  getArtistSubscriber(@Param('artistID') artistID: string) {
    return this.subscriptionService.getSubscribers(artistID);
  }

  @Get('artist/:artistID/count')
  getArtistSubscriberCount(@Param('artistID') artistID: string) {
    return this.subscriptionService.getSubscribersCount(artistID);
  }
}
