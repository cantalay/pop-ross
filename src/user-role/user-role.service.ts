import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: MongoRepository<UserRole>,
  ) {}

  create(createUserRoleDto: CreateUserRoleDto) {
    const userRole: UserRole =
      this.userRoleRepository.create(createUserRoleDto);
    return this.userRoleRepository.save(userRole);
  }

  async findOneByUserID(userID: string): Promise<UserRole> {
    return await this.userRoleRepository.findOneBy(userID);
  }

  async findOneByArtistID(artistID: string): Promise<UserRole> {
    return await this.userRoleRepository.findOneBy(artistID);
  }

  update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    return `This action updates a #${id} and ${updateUserRoleDto.userID} userRole`;
  }

  remove(id: string) {
    return `This action removes a #${id} userRole`;
  }
}
