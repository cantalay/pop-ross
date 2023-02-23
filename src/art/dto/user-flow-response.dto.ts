import { Art } from '../entities/art.entity';

export interface UserFlowResponseDto {
  arts: Art[];
  count: number;
}
