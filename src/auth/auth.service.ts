import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterRequestDto } from './dto/register-request.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateArtistDto } from '../artist/dto/create-artist.dto';
import { ArtistService } from '../artist/artist.service';
import { Artist } from '../artist/entities/artist.entity';
import { UserRoleService } from '../user-role/user-role.service';
import { CreateUserRoleDto } from '../user-role/dto/create-user-role.dto';
import { Role } from '../common/enums/role.enum';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private artistService: ArtistService,
    private userRoleService: UserRoleService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      userName: user.userName,
      id: user._id,
      fullName: user.fullName,
    };
    return this.jwtService.sign(payload);
  }

  async register(registerRequestDto: RegisterRequestDto) {
    const user: User = await this.userService.create(
      registerRequestDto as CreateUserDto,
    );
    if (user) {
      if (registerRequestDto.asArtist) {
        const createArtistDto: CreateArtistDto = {
          artistName: registerRequestDto.userName,
          userID: user._id.toString(),
          artistInfo: registerRequestDto.fullName,
        };
        const artist: Artist = await this.artistService.create(createArtistDto);
        if (artist) {
          const userRole: CreateUserRoleDto = {
            userID: user._id.toString(),
            artistID: artist._id.toString(),
            role: Role.Admin,
          };
          await this.userRoleService.create(userRole);
        }
      }
    }
    return user;
  }

  async setPermission(userRole: Role, userID: string, adminID: string) {
    const user: User = await this.userService.findOneById(userID);
    if (user) {
      console.log(adminID);
      const artist: Artist = await this.artistService.findByUserID(adminID);
      if (artist) {
        const createUserRoleDto: CreateUserRoleDto = {
          userID: user._id.toString(),
          artistID: artist._id.toString(),
          role: userRole,
        };
        await this.userRoleService.create(createUserRoleDto);
      } else {
        throw new UnauthorizedException(
          'You are not authorized for setting permission.',
        );
      }
    } else {
      throw new NotFoundException('User not found.');
    }
  }
}
