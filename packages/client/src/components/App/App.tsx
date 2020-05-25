import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from '~/pages/Home';
import { Room } from '~/pages/Room';

export const App: FC<{}> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/:roomId" component={Room} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};
