import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router';
import { signedIn, signedOut } from './actions/auth';
import { useStateValue } from './hooks/useStateValue';
import firebase from './firebase/FirebaseConfig';
import MainDashboard from './views/MainDashboard';
import './App.css';
import Login from './views/Login';
import CreateOrg from './views/CreateOrg';
import CreateEvent from './views/CreateEvent';
import OrganizationDashboard from './views/OrganizationDashboard';
import Signup from './views/Signup';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginRoute from './routes/LoginRoute';
import SignupRoute from './routes/SignupRotue';
import OrgDashboardRoute from './routes/OrgDashboardRoute';
import CreateOrgRoute from './routes/CreateOrgRoute';
import Navigation from './components/Navigation';
import styled from 'styled-components';
import {getInterestTags, getRequirementTags, getCauseAreas} from './actions'

function App() {
  const [state, dispatch] = useStateValue();

  /**
   * Set up google auth on change event handler.
   */
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        signedIn(user, dispatch);
      } else {
        signedOut(dispatch);
      }
    });
  }, []);

  useEffect(() => {
    getInterestTags(dispatch)
    getRequirementTags(dispatch)
    getCauseAreas(dispatch)
  }, [])
  
  return (
    <StyledApp className="App">
      <Navigation />
      <Switch>
        <ProtectedRoute path={'/'} component={MainDashboard} exact />
        <LoginRoute path={'/login'} component={Login} />
        <CreateOrgRoute path={'/create-org'} component={CreateOrg} />
        <OrgDashboardRoute
          path={'/org-dashboard/create-event'}
          component={CreateEvent}
        />
        <OrgDashboardRoute
          path={'/org-dashboard'}
          component={OrganizationDashboard}
        />
        <SignupRoute path={'/signup'} component={Signup} />
      </Switch>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
`;

export default App;
