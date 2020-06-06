import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { ConnectDto, TokenPayload } from '@codenames/domain';

import { AuthenticationService } from '~/modules/authentication/authentication.service';

import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly roomService: RoomService
  ) {}

  @Get(':roomId')
  getRoom(@Param('roomId') roomId: string, @Res() res: Response): void {
    try {
      this.roomService.getRoom(roomId);
      res.status(HttpStatus.OK).send();
    } catch {
      res.status(HttpStatus.NO_CONTENT).send();
    }
  }

  @Post()
  connect(@Body() { roomId, username }: ConnectDto): TokenPayload {
    try {
      this.roomService.getUserInRoom(roomId, username);
      throw new ConflictException('Username already used in this room.');
    } catch (err) {
      if (err instanceof ConflictException) {
        throw err;
      }
      return this.authenticationService.createAccessToken({ roomId, username });
    }
  }
}
