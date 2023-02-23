import { Subscription } from '../entities/subscription.entity';

export interface SubscriptionResponseInterface {
  data: Subscription[];
  count: number;
}
