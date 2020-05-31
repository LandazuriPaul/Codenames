import axios from 'axios';

import { ConnectDto, TokenPayload } from '@codenames/domain';

import { API_URL } from '~/config';

export async function isRoomUsed(roomId: string): Promise<boolean> {
  const { status } = await axios.get(`${API_URL}/room/${roomId}`);
  return status === 200;
}

export async function connect({
  roomId,
  username,
}: ConnectDto): Promise<TokenPayload> {
  const { data } = await axios.post(`${API_URL}/room/`, {
    roomId,
    username,
  });
  return data;
}
