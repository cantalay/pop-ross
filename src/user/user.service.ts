import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user: User = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    const userList: Array<User> = await this.usersRepository.find();
    if (userList.length > 0) {
      return userList;
    } else {
      throw new NotFoundException('No user found in here.');
    }
  }

  async findOne(userName: string) {
    const user: User = await this.usersRepository.findOneBy({
      userName: userName,
    });
    if (user) {
      return user;
    } else {
      throw new NotFoundException('User not found.');
    }
  }

  async findOneById(id: string) {
    const user: User = await this.usersRepository.findOneBy(id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException('User not found.');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user: User = await this.usersRepository.findOneBy(id);
    if (user) {
      user.userName = updateUserDto.userName
        ? updateUserDto.userName
        : user.userName;
      user.fullName = updateUserDto.fullName
        ? updateUserDto.fullName
        : user.fullName;
      return this.usersRepository.save(user);
    } else {
      throw new NotFoundException('User not found.');
    }
  }

  async remove(id: string) {
    const user: User = await this.usersRepository.findOneBy(id);
    if (user) {
      this.usersRepository.delete(id);
      return user;
    } else {
      throw new NotFoundException('User not found.');
    }
  }
}
