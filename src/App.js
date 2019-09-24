import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';
import firebase from './firebase/FirebaseConfig';
import { Layout, Icon, Affix } from 'antd';
import Form from './views/Form';
import { useStateValue } from './hooks/useStateValue';
import { subscribeToUserOrganizations, signedIn, signedOut } from './actions';
import { StyledUploadImage, HeaderDiv, FooterDiv } from './components';
import Navigation from './components/Navigation';
import {
  MainDashboard,
  OrganizationDashboard,
  Signup,
  CreateEvent,
  CreateOrg,
  Login,
  LandingPage,
} from './views';

import {
  RegisteredAndLoggedInRoute,
  LoginRoute,
  SignupRoute,
  OrganizationRoute,
  ProtectedRoute,
  RegisterRoute,
} from './routes/index';

const { Sider, Content } = Layout;

function App(){
  const [ state, dispatch ] = useStateValue();
  const [ collapsed, setCollapsed ] = useState( false );
  const [ dimensions, setDimensions ] = useState( {
    width: window.innerWidth, height: document.body.scrollHeight,
  } );
  
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
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
  }, []);

  useEffect(() => {
    if (state.auth.googleAuthUser && state.auth.googleAuthUser.uid) {
      subscribeToUserOrganizations(state.auth.googleAuthUser.uid, dispatch);
    }
  }, [ state.auth.googleAuthUser ] );
  
  const updateDimensions = () => {
    setDimensions( {
      width: window.innerWidth, height: document.body.scrollHeight,
    } );
    if( window.innerWidth < 900 ){
      setCollapsed( true );
    }
  };
  
  return ( <StyledApp className="App">
    <Layout>
      { state.auth.loggedIn && <StyledSider
        height={ dimensions.height }
        breakpoint="md"
        collapsedWidth="0"
        theme={ 'light' }
        onBreakpoint={ broken => {
          console.log( broken );
        } }
        onCollapse={ ( collapsed, type ) => {
          console.log( collapsed, type );
        } }
        trigger={ null }
        collapsed={ collapsed }
        reverseArrow={ true }
      >
        <Affix>
          <Navigation/>
        </Affix>
      </StyledSider> }
      <Layout>
        <Content>
        <HeaderDiv
              loggedIn={state.auth.loggedIn}
              style={{ background: '#fff', padding: 0 }}
            >
              {state.auth.loggedIn && (
                <StyledMenuButton
                  collapsed={collapsed}
                  className="trigger"
                  type={collapsed ? 'menu-fold' : 'menu-unfold'}
                  onClick={() => setCollapsed(!collapsed)}
                />
              )}
            </HeaderDiv>
            <Switch>
              <Route exact path={'/'} component={LandingPage} />
              <RegisteredAndLoggedInRoute
                path={'/dashboard'}
                component={MainDashboard}
              />
              <LoginRoute path={'/login'} component={Login} />
              <LoginRoute path={'/signup'} component={Login} />
              <ProtectedRoute path={'/create-org'} component={Form} />
              <OrganizationRoute
                path={'/org-dashboard/create-event'}
                component={CreateEvent}
              />
              <OrganizationRoute
                path={'/org-dashboard'}
                component={OrganizationDashboard}
              />
              <RegisterRoute path={'/register'} component={Signup} />
              <Route path={'/upload-image'} component={StyledUploadImage} />
              <Route path={'/'} component={StyledUploadImage} />
            </Switch>
          </Content>
          <FooterDiv />
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

const StyledSider = styled( Sider )`
  &&{position: absolute;
  right: 0;
  z-index: 10;
  min-height: 100vh;
  height: ${ props => props.height ? `${ props.height }px` : '100%' };
  }
`;

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledContent = styled( Content )`
&& {
margin-right: ${ props => props.width > 900 ? '15rem' : 0 }
}

`;

export default App;
