export interface RoomJoinedEnvelope {
  isHost: boolean;
  roomId: string;
  usernames: string[];
}
