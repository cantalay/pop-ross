import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UserService } from '../user/user.service';
import { ArtistService } from '../artist/artist.service';
import { Subscription } from './entities/subscription.entity';
import { Artist } from '../artist/entities/artist.entity';
import { SubscriptionResponseInterface } from './interfaces/subscription-response.interface';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: MongoRepository<Subscription>,
    private userService: UserService,
    private artistService: ArtistService,
  ) {}

  async subscribe(artistID: string, userID: string) {
    const subscriptedArtist: Artist = await this.artistService.findOne(
      artistID,
    );
    if (!subscriptedArtist) {
      throw new NotFoundException('Subscribed artist not found please check.');
    }

    const alreadySubscribe = await this.subscriptionRepository.findOneBy({
      artistID: artistID,
      userID: userID,
    });
    if (alreadySubscribe) {
      throw new ConflictException('Already subscribe this artist.');
    }
    const subscriptionModel: Subscription = this.subscriptionRepository.create({
      userID: userID,
      artistID: artistID,
    });
    return this.subscriptionRepository.save(subscriptionModel);
  }

  async unsubscribe(userID: string, artistID: string) {
    const subscriptedArtist: Artist = await this.artistService.findOne(
      artistID,
    );
    if (!subscriptedArtist) {
      throw new NotFoundException('Subscribed user not found please check.');
    }
    const deletedObj = await this.subscriptionRepository.findOne({
      where: { userID: userID, artistID: artistID },
    });
    if (deletedObj) {
      return this.subscriptionRepository.remove(deletedObj);
    } else {
      throw new NotFoundException('Subscription not found.');
    }
  }

  async getUserSubscriptions(
    userID: string,
  ): Promise<SubscriptionResponseInterface> {
    const [data, count] = await this.subscriptionRepository.findAndCountBy({
      userID: userID,
    });
    return {
      data: data,
      count: count,
    };
  }

  async getUserSubscriptionsCount(userID: string) {
    const count: number = await this.subscriptionRepository.count({
      userID: userID,
    });
    return { count: count };
  }

  async getSubscribers(
    artistID: string,
  ): Promise<SubscriptionResponseInterface> {
    const [data, count] = await this.subscriptionRepository.findAndCountBy({
      artistID: artistID,
    });
    return {
      data: data,
      count: count,
    };
  }

  async getSubscribersCount(artistID: string) {
    const count: number = await this.subscriptionRepository.count({
      artistID: artistID,
    });
    return { count: count };
  }
}
