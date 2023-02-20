import { IsString, MaxLength } from 'class-validator';

export class CreateArtDto {
  @IsString()
  @MaxLength(50)
  name: string;
}
