import { createContext } from 'react';

import { GameStore, UiStore } from '~/stores';

export interface StoresContext {
  gameStore: GameStore;
  uiStore: UiStore;
}

export const storesContext = createContext<StoresContext | null>(null);
