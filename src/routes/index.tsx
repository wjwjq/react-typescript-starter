import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import PageLoading from '../Components/Loading';

import App from '../views/App/';

const Foo = Loadable({
  loader:  () => import(/* webpackChunkName: Foo */ '../views/Foo'),
  loading: PageLoading
});

const Routes = () => {
  return (
      <Switch>
        <Route path="/foo" component={Foo} />
        <Route path="/" component={App} />
      </Switch>
  );
};

export default Routes;
