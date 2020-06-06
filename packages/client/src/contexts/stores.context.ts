import { createContext } from 'react';

import { ChatStore, GameStore, UiStore, WebsocketStore } from '~/stores';

export interface StoresContext {
  chatStore: ChatStore;
  gameStore: GameStore;
  uiStore: UiStore;
  websocketStore: WebsocketStore;
}

export const storesContext = createContext<StoresContext | null>(null);
