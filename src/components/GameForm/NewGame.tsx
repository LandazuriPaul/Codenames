import React, { useContext } from 'react';

import { gameFormContext } from '~/contexts';

export const NewGame = () => {
  const { newLang, setNewLang } = useContext(gameFormContext);

  return <div></div>;
};
