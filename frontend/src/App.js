import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import Channel from './components/Channel';
import Splash from './components/splash';
import SignupFormPage from './components/SignupFormPage';

function App() {
  return (
    <Switch>
        <Route path='/login' component={LoginFormPage}/>
        <Route path='/signup' component={SignupFormPage}/>
        <Route path='/channels' component={Channel} />
        <Route exact path='/' component={Splash} />
  </Switch>
  );
}

export default App;
