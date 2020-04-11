import React from 'react';
import { render } from 'react-dom';
import 'mobx-react-lite/batchingForReactDom';

import { App } from '~/components/App';
import { APP_ROOT } from '~/config';
import { StoresProvider } from '~/stores';

const rootElement = document.getElementById(APP_ROOT);
function ReactApp() {
  return (
    <StoresProvider>
      <App />
    </StoresProvider>
  );
}
render(<ReactApp />, rootElement);
