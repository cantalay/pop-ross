import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: MongoRepository<Artist>,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const artist: Artist = this.artistRepository.create(createArtistDto);
    return this.artistRepository.save(artist);
  }

  async findOne(id: string): Promise<Artist> {
    return await this.artistRepository.findOneBy(id);
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} and ${updateArtistDto.artistName} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
