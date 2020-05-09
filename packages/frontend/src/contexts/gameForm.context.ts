import { createContext } from 'react';

import { AvailableLanguages } from '~/domain';

export interface GameFormContext {
  joinGame: (gameId: string) => void;
  newLang: AvailableLanguages;
  setNewLang: (newLang: AvailableLanguages) => void;
}

export const gameFormContext = createContext<GameFormContext | null>(null);
