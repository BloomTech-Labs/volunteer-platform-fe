import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router';
import { signedIn, signedOut } from './actions/auth';
import { useStateValue } from './hooks/useStateValue';
import firebase from './firebase/FirebaseConfig';
import MainDashboard from './views/MainDashboard';
import UploadImage from './components/UploadImage';
import Login from './views/Login';
import CreateOrg from './views/CreateOrg';
import CreateEvent from './views/CreateEvent';
import OrganizationDashboard from './views/OrganizationDashboard';
import Signup from './views/Signup';
import {
  ProtectedRoute,
  LoginRoute,
  SignupRoute,
  OrganizationRoute,
  CreateOrgRoute,
} from './routes/index';
import Navigation from './components/Navigation';
import styled from 'styled-components';
import {
  getInterestTags,
  getRequirementTags,
  subscribeToUserOrganizations,
} from './actions';
import { Layout, Menu, Icon } from 'antd';
import LandingPage from './views/LandingPage';
import HeaderDiv from './components/HeaderDiv'


const { Sider, Footer, Content } = Layout;


function App() {
  const [state, dispatch] = useStateValue();
  const [collapsed, setCollapsed] = useState(false);

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
    getInterestTags(dispatch);
    getRequirementTags(dispatch);
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
  }, []);

  useEffect(() => {
    debugger;
    if (state.auth.googleAuthUser && state.auth.googleAuthUser.uid) {
      subscribeToUserOrganizations(state.auth.googleAuthUser.uid, dispatch);
    }
  }, state.auth.googleAuthUser);

  const updateDimensions = () => {
    if (window.innerWidth < 900) {
      setCollapsed(true);
    }
  };

  return (
    <StyledApp className="App">
      <Layout>
        {state.auth.signedIn && <StyledSider
          breakpoint="md"
          collapsedWidth="0"
          theme={'light'}
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          trigger={null}
          collapsed={collapsed}
          reverseArrow={true}
        >
          <Navigation />
        </StyledSider>}
        <Layout>
          <Content>
            <StyledHeader style={{ background: '#fff', padding: 0 }}>
              {state.auth.signedIn && <StyledMenuButton
                collapsed={collapsed}
                className="trigger"
                type={collapsed ? 'menu-fold' : 'menu-unfold'}
                onClick={() => setCollapsed(!collapsed)}
              />}
            </StyledHeader>
            <Switch>
              <ProtectedRoute path={'/'} component={MainDashboard} exact />
              <LoginRoute path={'/login'} component={Login} />
              <CreateOrgRoute path={'/create-org'} component={CreateOrg} />
              <OrganizationRoute
                path={'/org-dashboard/create-event'}
                component={CreateEvent}
              />
              <OrganizationRoute
                path={'/org-dashboard'}
                component={OrganizationDashboard}
              />
              <SignupRoute path={'/signup'} component={Signup} />
              <Route path={'/upload-image'} component={UploadImage} />
              <Route path={'/landing-page'} component={LandingPage} />
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </StyledApp>
  );
}

const StyledMenuButton = styled(Icon)`
  && {
    margin-right: ${props => (props.collapsed ? '30px' : '230px')};
    font-size: 2rem;
    margin-top: 20px;
    transition: all 0.2s;
  }
`;

const StyledHeader = styled(HeaderDiv)`
  && {
    display: flex;
    justify-content: space-between;
  }
`;

const StyledSider = styled(Sider)`
  position: absolute;
  right: 0;
  z-index: 10;
  min-height: 100%;
  height: 100%;
`;

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
`;

export default App;
