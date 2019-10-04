import React, {useEffect, useState} from 'react';
import {Switch, Route} from 'react-router';
import styled from 'styled-components';
import firebase from './firebase/FirebaseConfig';
import {Layout, Icon, Affix} from 'antd';
import {useStateValue} from './hooks/useStateValue';
import {
  subscribeToUserOrganizations, signedIn, signedOut, subscribeToMessages,
  generateRandomEvents,
} from './actions';
import {HeaderDiv, FooterDiv} from './components';
import Navigation from './components/Navigation';
import {
  MainDashboard,
  OrganizationDashboard,
  Signup,
  CreateEvent,
  CreateOrg,
  Login,
  LandingPage,
  NotFound,
  UserProfile,
  Organization,
} from './views';

import EventCard from './components/EventCard'
import {
  RegisteredAndLoggedInRoute,
  LoginRoute,
  OrganizationRoute,
  ProtectedRoute,
  RegisterRoute,
} from './routes/index';
import Message from './views/Message';

const {Sider, Content} = Layout;

function App(){
  const [state, dispatch] = useStateValue();
  const [collapsed, setCollapsed] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: document.body.clientHeight,
  });
  const [subscriptions, setSubscriptions] = useState({});
  
  /**
   * Set up google auth on change event handler.
   */
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        signedIn(user, dispatch);
      }else{
        signedOut(dispatch);
      }
    });
  }, []);
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
  }, []);
  
  useEffect(() => {
    if (state.auth.googleAuthUser && state.auth.googleAuthUser.uid){
      const orgSub = subscribeToUserOrganizations(
        state.auth.googleAuthUser.uid,
        dispatch);
      const messageSub = subscribeToMessages(
        {type: 'users', uid: state.auth.googleAuthUser.uid},
        dispatch);
      setSubscriptions({orgSub, [ state.auth.googleAuthUser.uid ]: messageSub});
    }
    
  }, [state.auth.googleAuthUser]);
  
  useEffect(() => {
    
    state.org.userOrganizations.forEach(org => {
      
      if (!subscriptions[ org.orgId ]){
        const messageSub = subscribeToMessages({
          type: 'organizations',
          uid: org.orgId,
        }, dispatch);
        setSubscriptions({...subscriptions, [ org.orgId ]: messageSub});
      }
    });
  }, [state.org.userOrganizations]);
  
  const updateDimensions = () => {
    setDimensions({
      width: window.innerWidth,
      height: document.body.scrollHeight,
    });
    if (window.innerWidth < 900){
      setCollapsed(true);
    }
  };
  
  return (
    <StyledApp className="App">
      <Layout style={{background: 'white'}}>
        {state.auth.loggedIn && (
          <StyledSider
            height={'100%'}
            breakpoint="md"
            collapsedWidth="0"
            theme={'light'}
            onBreakpoint={broken => {
              //console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              //console.log(collapsed, type);
            }}
            trigger={null}
            collapsed={collapsed ? 1 : 0}
            reverseArrow={true}
          >
            <Affix>
              <Navigation/>
            </Affix>
          </StyledSider>
        )}
        <Layout style={{background: 'white'}}>
          <HeaderDiv loggedIn={state.auth.loggedIn}>
            {state.auth.loggedIn && (
              <StyledMenuButton
                collapsed={collapsed ? 1 : 0}
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={() => setCollapsed(!collapsed)}
              />
            )}
          </HeaderDiv>
          <StyledContent
            width={dimensions.width}
            loggedIn={state.auth.loggedIn}
          >
            <Switch>
              <LoginRoute path={'/login'} component={Login}/>
              <LoginRoute path={'/signup'} component={Login}/>
              <Route exact path={'/'} render={props => <LandingPage {...props}
                                                                    collapsed={collapsed}/>}/>
              <Route path={'/organization/:id'} component={Organization}/>
              <ProtectedRoute path={'/dashboard'} component={MainDashboard}/>
              <RegisteredAndLoggedInRoute
                path={'/create-org'}
                component={CreateOrg}
              />
              <OrganizationRoute
                path={'/org-dashboard/create-event'}
                component={CreateEvent}
              />
              <OrganizationRoute
                path={'/org-dashboard'}
                component={OrganizationDashboard}
              />
              <RegisterRoute path={'/register'} component={Signup}/>
              <Route path={'/messages'} render={props =>
                <Message {...props} width={dimensions.width}/>
              }
              />

              <Route 
                path={'/events/:id'}
                render = {(props) => <EventCard {...props} state={state} /> }
              />
              
              <RegisteredAndLoggedInRoute
                path={'/profile'}
                component={UserProfile}
              />
              <Route component={NotFound}/>
            </Switch>
          </StyledContent>
          <FooterDiv/>
        </Layout>
      </Layout>
    </StyledApp>
  );
}

const StyledMenuButton = styled(Icon)`
  && {
    margin-left: ${props => (props.collapsed ? '30px' : '230px')};
    font-size: 2rem;
    margin-top: 20px;
    transition: all 0.2s;
  }
`;

const StyledSider = styled(Sider)`
  &&& {
    position: absolute;
    left: 0;
    z-index: 100;
    min-height: 100vh;
    height: ${props => (props.height ? `${props.height}px` : '100%')};
  }
`;

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const StyledContent = styled(Content)`
  && {
    padding-bottom: ${props => props.theme.footerPadding};
  }
`;

export default App;
