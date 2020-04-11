import { createContext } from 'react';

import { GameStore } from '~/stores';

interface StoresContext {
  gameStore: GameStore;
}

export const storesContext = createContext<StoresContext | null>(null);
