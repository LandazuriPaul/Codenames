import { useContext } from 'react';

import { StoresContext, storesContext } from '~/contexts';

export const useStores = (): StoresContext => {
  const stores = useContext(storesContext);
  if (!stores) {
    throw new Error('useStores must be used within a StoresProvider.');
  }
  return stores;
};
