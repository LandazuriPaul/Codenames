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

import { SocketService } from '~/modules/socket/socket.service';

@Controller('room')
export class RoomController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly socketService: SocketService
  ) {}

  @Get(':roomId')
  getRoom(@Param('roomId') roomId: string, @Res() res: Response): void {
    const previousRoom = this.socketService.getRoom(roomId);
    const status =
      previousRoom === undefined ? HttpStatus.NO_CONTENT : HttpStatus.OK;
    res.status(status).send();
  }

  @Post()
  connect(@Body() { roomId, username }: ConnectDto): TokenPayload {
    const previousUser = this.socketService.getUserInRoom(roomId, username);
    if (previousUser) {
      throw new ConflictException('Username already used in this room.');
    }
    return this.authenticationService.createAccessToken({ roomId, username });
  }
}
