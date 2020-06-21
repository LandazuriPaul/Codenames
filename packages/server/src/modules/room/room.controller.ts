import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { ConnectDto, TokenPayload } from '@codenames/domain';

import { AuthenticationService } from '~/modules/shared/authentication/authentication.service';
import { UserService } from '~/modules/user/user.service';

import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  private logger = new Logger(RoomController.name);

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly roomService: RoomService,
    private readonly userService: UserService
  ) {}

  @Get(':roomId')
  async getRoom(
    @Param('roomId') roomId: string,
    @Res() res: Response
  ): Promise<void> {
    try {
      await this.roomService.getRoom(roomId);
      res.status(HttpStatus.OK).send();
    } catch {
      res.status(HttpStatus.NO_CONTENT).send();
    }
  }

  @Post()
  async connect(
    @Body() { roomId, username }: ConnectDto
  ): Promise<TokenPayload> {
    try {
      await this.userService.getUser(roomId, username);
      throw new ConflictException('Username already used in this room.');
    } catch (err) {
      if (err instanceof ConflictException) {
        throw err;
      }
      await this.roomService.addUserToRoom(roomId, username, true);
      return this.authenticationService.createAccessToken({ roomId, username });
    }
  }
}
