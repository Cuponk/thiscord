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
        <Route path='/login' component={LoginFormPage}/>
        <Route path='/signup' component={SignupFormPage}/>
        <Route path='/channels/:serverId'>{ currentUserId ? <Channel/> : <Redirect to='/login'/> }</Route>
        <Route path='*' component={FourOhOFour}/>
        <Route exact path='/' component={Splash} />
  </Switch>
  );
}

export default App;
