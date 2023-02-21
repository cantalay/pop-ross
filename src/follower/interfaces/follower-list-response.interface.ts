import { Follower } from '../entities/follower.entity';

export interface FollowerListResponseInterface {
  data: Follower[];
  count: number;
}
