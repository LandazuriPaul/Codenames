import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Layout } from '~/components/Layout';
import { NewGame } from '~/components/NewGame';

export const App: FC<{}> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/:lang/:seed" component={Layout} />
        <Route path="/" component={NewGame} />
      </Switch>
    </BrowserRouter>
  );
};
