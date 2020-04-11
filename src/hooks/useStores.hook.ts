import { useContext } from 'react';

import { storesContext } from '~/contexts';

export const useStores = () => {
  const stores = useContext(storesContext);
  if (!stores) {
    throw new Error('useStores must be used within a StoresProvider.');
  }
  return stores;
};
