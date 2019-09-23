import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signOut } from '../actions';
import { Menu, Icon, Affix } from 'antd';
import styled from 'styled-components';
import { useStateValue } from '../hooks/useStateValue';

const { SubMenu } = Menu;

export const Navigation = props => {
  const [state, dispatch] = useStateValue();
  const [current, setCurrent] = useState('Home');

  const pathNames = {
    '/': 'Home',
    '/create-org': 'Create Org',
    '/org-dashboard': 'Organization Dashboard',
    '/login': state.auth.loggedIn ? 'Logout' : 'Login',
  };

  useEffect(() => {
    setCurrent(pathNames[props.location.pathname]);
  }, [props.location.pathname]);

  const handleClick = e => {
    if (e.key === 'Logout') {
      signOut(dispatch);
      return;
    }
  };

  return (
    <StyledNavigation>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="inline">
        <Menu.Item
          key={state.auth.loggedIn ? 'Logout' : 'Login'}
          style={{ height: '52px' }}
        >
          {state.auth.loggedIn ? (
            <>
              <Link to="/dashboard">
                <Icon type={'logout'} />
                Logout
              </Link>
            </>
          ) : (
            <Link to={'/login'}>
              <Icon type={'login'} />
              Login
            </Link>
          )}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="Home">
          <Link to={'/dashboard'}>
            <Icon type="home" />
            Home
          </Link>
        </Menu.Item>
        {state.auth.loggedIn && (
          <Menu.Item key={'Create Org'}>
            <Link to={'/create-org'}>
              <Icon type="plus-circle" />
              Create Organization
            </Link>
          </Menu.Item>
        )}
        {state.org.createdOrg && (
          <Menu.Item key={'Organization Dashboard'}>
            <Link to={'/org-dashboard'}>
              <Icon type="dashboard" />
              Organization Dashboard
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </StyledNavigation>
  );
};

const StyledNavigation = styled.div``;

export default withRouter(Navigation);
