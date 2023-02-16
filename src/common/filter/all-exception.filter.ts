import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  MongoError,
  QueryFailedError,
} from 'typeorm';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message = (exception as any).message;
    let code = 'HttpException';

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    console.log(exception);

    switch (exception.constructor) {
      case HttpException:
        status = (exception as HttpException).getStatus();
        break;
      case BadRequestException:
        status = (exception as BadRequestException).getStatus();
        message = (exception as BadRequestException).getResponse()['message'];
        code = (exception as any).code;
        break;
      case QueryFailedError: // this is a TypeOrm error
        status = HttpStatus.CONFLICT;
        message = (exception as QueryFailedError).message;
        code = (exception as any).code;
        break;
      case EntityNotFoundError: // this is another TypeOrm error
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as EntityNotFoundError).message;
        code = (exception as any).code;
        break;
      case CannotCreateEntityIdMapError: // and another
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as CannotCreateEntityIdMapError).message;
        code = (exception as any).code;
        break;
      case UnauthorizedException:
        status = HttpStatus.UNAUTHORIZED;
        message = (exception as UnauthorizedException).message;
        code = (exception as any).code;
        break;
      case MongoError:
        status = HttpStatus.BAD_GATEWAY;
        message = (exception as any).message;
        code = (exception as any).code;
        break;
    }

    response.status(status).send({
      statusCode: status,
      message: message,
      code: code,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
