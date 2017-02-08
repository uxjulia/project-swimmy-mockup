import React from 'react';

//models
import { Route } from 'mobx-router';

//components
import SplashScreen from '../screens/splashScreen';
import LoginScreen from '../screens/loginScreen';
import Dashboard from '../screens/dashboard';
import IssuesScreen from '../screens/issuesScreen';
import ProfileScreen from '../screens/profileScreen';

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
    component: <LoginScreen />
  }),
  issues: new Route({
    path: 'issues',
    component: <IssuesScreen />
  }),
  profile: new Route({
    path: 'profile',
    component: <ProfileScreen />
  }),
};

export default views;
