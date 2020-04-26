import { createContext } from 'react';

import { AvailableLanguages } from '~/domain';

export interface GameFormContext {
  newLang: AvailableLanguages;
  setNewLang: (newLang: AvailableLanguages) => void;
}

export const gameFormContext = createContext<GameFormContext>(null);
