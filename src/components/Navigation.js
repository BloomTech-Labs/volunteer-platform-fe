import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {
  signOut,
} from '../actions';
import {Menu} from 'antd';
import styled from 'styled-components';
import {useStateValue} from '../hooks/useStateValue';

export const Navigation = props => {
  const [state, dispatch] = useStateValue();
  const [current, setCurrent] = useState('Home');
  
  const pathNames = {
    '/dashboard': 'Home',
    '/create-org': 'Create Org',
    '/org-dashboard': 'Org Dashboard',
    '/login': state.auth.loggedIn ? 'Logout' : 'Login',
  };
  
  useEffect(() => {
    setCurrent(pathNames[ props.location.pathname ]);
  }, [props.location.pathname]);
  
  const handleClick = e => {
    if (e.key === 'Logout'){
      signOut(dispatch);
      return;
    }
  };
  
  return (
    <StyledNavigation>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="inline">
        <Menu.Item className='nav-name'>
          {state.auth.googleAuthUser && (state.auth.googleAuthUser.firstName ?
            `${state.auth.googleAuthUser.firstName} ${state.auth.googleAuthUser.lastName[0]}` :
            'Welcome!')}
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
          <Link to='#'>
            Profile
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='#'>
            Messages
          </Link>
        </Menu.Item>
        <Menu.Item key="Home">
          <Link to={'/dashboard'}>
            Browse
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='#'>
            Upcoming Events
          </Link>
        </Menu.Item>
<<<<<<< HEAD
        {state.org.createdOrg && (
          <Menu.Item key={'Org Dashboard'}>
            <Link to={'/org-dashboard'}>
              Your Organization{state.org.userOrganizations.length > 1 && 's'}
            </Link>
          </Menu.Item>
        )}
        {state.auth.loggedIn && (
          <Menu.Item key={'Create Org'}>
            <Link to={'/create-org'}>
              Create Organization
            </Link>
          </Menu.Item>
        )}
        <Menu.Divider />
=======
        <Menu.Divider/>
>>>>>>> 9735dcb44fb105f60f53a71c6464485e006dccec
        <Menu.Item className='nav-bottom'
                   key={state.auth.loggedIn ? 'Logout' : 'Login'}
        >
          {state.auth.loggedIn ? (
            <Link to="/dashboard">
              Logout
            </Link>
          ) : (
            <Link to={'/login'}>
              Login
            </Link>
          )}
        </Menu.Item>
        <Menu.Item className='nav-bottom'>
          <Link to='#'>
            Support
          </Link>
        </Menu.Item>
      </Menu>
    </StyledNavigation>
  );
};

const StyledNavigation = styled.div`
  text-align: center;
  font-size: 14px;
  
  a {
    color: black;
  }
  
  .nav-name {
    text-align: left;
    color: ${props => props.theme.primary};
    font-size: 16px;
    padding: 10px 0 40px 10px;
  }

  .nav-bottom a {
    color: ${props => props.theme.gray7};
  }

  .nav-bottom a:hover {
    color: ${props => props.theme.primary8};
  }

  .avatar {
    display: flex;
      justify-content: center;
      margin: 3rem 0;
    }
    
`;

export default withRouter(Navigation);
