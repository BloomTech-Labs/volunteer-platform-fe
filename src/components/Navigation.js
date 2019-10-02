import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {checkUserRegistered, signOut} from '../actions';
import {Menu, Tooltip} from 'antd';
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
    }
  };
  
  const NavbarMenuLink = ({to, disabled, children, ...rest}) => {
    const NavbarLink = ({...props}) => {
      return (
        <Link to={to} {...props}>
          {children}
        </Link>
      );
    };
    return disabled ? (
      <Tooltip placement="left" trigger="click" title="Coming soon!">
        <NavbarLink style={{color: '#00000033'}}/>
      </Tooltip>
    ) : (
      <NavbarLink/>
    );
  };
  
  return (
    <StyledNavigation>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="inline">
        <Menu.Item className="nav-name">
          {state.auth.registeredUser &&
          (state.auth.registeredUser.firstName
            ? `${state.auth.registeredUser.firstName} ${
              state.auth.registeredUser.lastName[ 0 ]
              }.`
            : 'Welcome!')}
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
          <NavbarMenuLink to="#" disabled>
            Profile
          </NavbarMenuLink>
        </Menu.Item>
        <Menu.Item>
          <NavbarMenuLink to="/messages">
            Messages
          </NavbarMenuLink>
        </Menu.Item>
        <Menu.Item key="Home">
          <Link to={'/dashboard'}>Browse</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="#">Upcoming Events</Link>
        </Menu.Item>
        {state.org.createdOrg && (
          <Menu.Item key={'Org Dashboard'}>
            <Link to={'/org-dashboard'}>
              Your Organization{state.org.userOrganizations.length > 1 && 's'}
            </Link>
          </Menu.Item>
        )}
        {state.auth.loggedIn &&
        (state.auth.registeredUser &&
          state.auth.registeredUser.firstName) && (
          <Menu.Item key={'Create Org'}>
            <Link to={'/create-org'}>Create Organization</Link>
          </Menu.Item>
        )}
        <Menu.Divider/>
        <Menu.Item
          className="nav-bottom"
          key={state.auth.loggedIn ? 'Logout' : 'Login'}
        >
          {state.auth.loggedIn ? (
            <Link to="/dashboard">Logout</Link>
          ) : (
            <Link to={'/login'}>Login</Link>
          )}
        </Menu.Item>
        <Menu.Item className="nav-bottom">
          <Link to="#">Support</Link>
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
