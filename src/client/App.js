import React from 'react';
import { Provider } from "react-redux";
import { Switch } from 'react-router' // react-router v4/v5
import { ConnectedRouter } from "connected-react-router";
import Index from './pages/Index';
import Login from './pages/Login';
import Lessons from './pages/Lessons';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Game from './pages/Game';
import Translation from './pages/Translation';
import FancyRoute from './components/FancyRoute';
import configureStore, {
  history
} from "./states/configureStore";
const store = configureStore({});

const routes = [
  {
    title: 'Home',
    path: '/',
    exact: true,
    component: Index,
  },
  {
    title: 'Login',
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    title: 'Register',
    path: '/register',
    exact: true,
    component: Register,
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    exact: true,
    component: Dashboard,
  },
  {
    title: 'Lessons',
    path: '/dashboard/lessons/:topic',
    exact: true,
    component: Lessons,
  },
  {
    title: 'Game',
    path: '/dashboard/game',
    exact: true,
    component: Game,
  },
  {
    title: 'Translation',
    path: '/dashboard/translation',
    exact: true,
    component: Translation,
  },
];

function App() {
  return (
      <Provider store={store}>
          <ConnectedRouter history={history}>
            <Switch>
                {/* eslint-disable-next-line react/no-array-index-key,react/jsx-props-no-spreading */}
                {routes.map((route, i) => (
                    <FancyRoute key={i} {...route} />
                ))}
            </Switch>
          </ConnectedRouter>
      </Provider>
  );
}

export default App;
