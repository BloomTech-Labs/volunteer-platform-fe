import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router';
import { signedIn, signedOut } from './actions/auth';
import { useStateValue } from './hooks/useStateValue';
import firebase from './contexts/firebase/FirebaseConfig';
import MainDashboard from './views/MainDashboard';
import './App.css';
import Login from './views/Login';
import CreateOrg from './views/CreateOrg';
import CreateEvent from './views/CreateEvent';
import OrganizationDashboard from './views/OrganizationDashboard';
import Signup from './views/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import LoginRoute from './components/LoginRoute';
import SignupRoute from './components/SignupRotue';
import Navagation from './components/Navigation';
import styled from 'styled-components';

function App(){
  const [ state, dispatch ] = useStateValue();
  
  /**
   * Set up google auth on change event handler.
   */
  useEffect( () => {
    firebase.auth().onAuthStateChanged( user => {
      if( user ){
        signedIn( user, dispatch );
      }else{
        signedOut( dispatch );
      }
    } );
  }, [] );
  
  return ( <StyledApp className="App">
    <Navagation/>
    <Switch>
      <ProtectedRoute path={ '/' } component={ MainDashboard } exact/>
      <LoginRoute path={ '/login' } component={ Login }/>
      <ProtectedRoute path={ '/create-org' } component={ CreateOrg }/>
      <ProtectedRoute
        path={ '/org-dashboard/create-event' }
        component={ CreateEvent }
      />
      <ProtectedRoute
        path={ '/org-dashboard' }
        component={ OrganizationDashboard }
      />
      <SignupRoute path={ '/signup' } component={ Signup }/>
    </Switch>
  </StyledApp> );
}

const StyledApp = styled.div`
display: flex;
flex-direction: column;
`;

export default App;
