import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import PageLoading from '../Components/Loading';

import App from '../views/App/';
import Welcome from '../views/Welcome';

const Foo = Loadable({
  /* webpackChunkName: Foo */
  loader: () => import('../views/Foo'),
  loading: PageLoading
});

const Hello = Loadable({
  /* webpackChunkName: Hello */
  loader: () => import('../views/Hello'),
  loading: PageLoading
});

const Routes = () => {
  return (
    <App>
      <Switch>
        <Route path="/hello" component={Hello} />
        <Route path="/foo" component={Foo} />
        <Route path="/" component={Welcome} />
      </Switch>
    </App>
  );
};

export default Routes;
