import { createContext } from 'react';

import { ChatStore, GameStore, RoomStore, WebsocketStore } from '~/stores';

export interface StoresContext {
  chatStore: ChatStore;
  gameStore: GameStore;
  roomStore: RoomStore;
  websocketStore: WebsocketStore;
}

export const storesContext = createContext<StoresContext | null>(null);
