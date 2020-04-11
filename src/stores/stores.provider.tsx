import React, { FC, useEffect, useState } from 'react';

import { storesContext } from '~/contexts';

import { RootStore } from './root.store';

export const StoresProvider: FC<{}> = ({ children }) => {
  const [rootStore, setRootStore] = useState<RootStore | null>(null);
  useEffect(() => {
    const initStore = async () => {
      const newRootStore = await RootStore.instantiate();
      setRootStore(newRootStore);
    };
    initStore();
  }, []);

  if (!rootStore) {
    return <span>Loading...</span>;
  }
  return (
    <storesContext.Provider value={rootStore}>
      {children}
    </storesContext.Provider>
  );
};
