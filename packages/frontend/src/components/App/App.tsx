import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Game, Home } from '~/pages';

export const App: FC<{}> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/:lang/:seed" component={Game} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};
