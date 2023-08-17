import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import Channel from './components/Channel';
import Splash from './components/splash';
import SignupFormPage from './components/SignupFormPage';
import FourOhOFour from './components/404';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  const currentUserId = useSelector(state => state.session.user?.id);


  return (
    <Switch>
        <Route exact path='/' component={Splash} />
        <Route path='/login' component={LoginFormPage}/>
        <Route path='/signup' component={SignupFormPage}/>
        <Route exact path='/channels/:serverId'>{<Channel/>}</Route>
        <Route path='/channels/'>{<Channel/>}</Route>
        <Route path='*' component={FourOhOFour}/>
  </Switch>
  );
}

export default App;
