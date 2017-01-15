import React from 'react';

//models
import { Route } from 'mobx-router';
import AuthService from 'utils/AuthService'

//components
import SplashScreen from '../screens/splashScreen';
import LoginScreen from '../screens/loginScreen';
import Dashboard from '../screens/dashboard';
import IssuesScreen from '../screens/issuesScreen';

const auth = new AuthService('4NGvwveTZk4wNQrg3Vw2BErSq33vpcDM', 'floridaelago.auth0.com');

// validate authentication for private routes
const requireAuth = (route, params, store) => {
  if (!auth.loggedIn()) {
    store.router.goTo(views.login)
  }
}

const views = {
  home: new Route({
    path: '/',
    component: <SplashScreen />
  }),
  dashboard: new Route({
    path: 'dashboard',
    component: <Dashboard />
  }),
  login: new Route({
    path: 'login',
    component: <LoginScreen auth={auth} />
  }),
  issues: new Route({
    path: 'issues',
    onEnter: requireAuth,
    component: <IssuesScreen />
  })
};

export default views;
