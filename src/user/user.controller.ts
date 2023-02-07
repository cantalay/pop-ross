import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuditLogInterceptor } from '../auditlog/audit-log.interceptor';
import { ActionTypeEnum } from '../common/enums/action-type.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Patch(':id')
  @UseInterceptors(AuditLogInterceptor(ActionTypeEnum.USER_UPDATE))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseInterceptors(AuditLogInterceptor(ActionTypeEnum.USER_DELETE))
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
