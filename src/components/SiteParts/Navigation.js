import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { checkUserRegistered, signOut } from '../../actions';
import { Menu, Tooltip, Badge } from 'antd';
import styled from 'styled-components';
import { useStateValue } from '../../hooks/useStateValue';

export const Navigation = props => {
  const [state, dispatch] = useStateValue();
  const [current, setCurrent] = useState('Home');
  let numberOfUnreadMessages = 0;
  if (Object.keys(state.messages.messages).length > 0) {
    Object.keys(state.messages.messages).forEach(key => {
      const unreadMessages = state.messages.messages[key].reduce(
        (acc, messageThread) => {
          return acc + messageThread.unreadMessages;
        },
        0
      );
      numberOfUnreadMessages += unreadMessages;
    });
  }

  const pathNames = {
    '/dashboard': 'Home',
    '/create-org': 'Create Org',
    '/org-dashboard': 'Org Dashboard',
    '/login': state.auth.loggedIn ? 'Logout' : 'Login',
  };

  useEffect(() => {
    setCurrent(pathNames[props.location.pathname]);
  }, [props.location.pathname]);

  const handleClick = e => {
    if (e.key === 'Logout') {
      signOut(dispatch);
    }
  };

  const getUnreadMessages = uid => {
    if (state.messages.messages[uid]) {
      const numberOfUnread = state.messages.messages[uid].reduce(
        (acc, thread) => {
          return acc + thread.unreadMessages;
        },
        0
      );
      return numberOfUnread;
    }
    return 0;
  };

  const NavbarMenuLink = ({ to, disabled, children, ...rest }) => {
    const NavbarLink = ({ ...props }) => {
      return (
        <Link to={to} {...props}>
          {children}
        </Link>
      );
    };
    return disabled ? (
      <Tooltip placement="left" trigger="click" title="Coming soon!">
        <NavbarLink style={{ color: '#00000033' }} />
      </Tooltip>
    ) : (
      <NavbarLink />
    );
  };
  const { SubMenu } = Menu;
  return (
    <StyledNavigation>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="inline">
        <Menu.Item className="nav-name">
          {state.auth.registeredUser &&
            (state.auth.registeredUser.firstName
              ? `${state.auth.registeredUser.firstName} ${
                  state.auth.registeredUser.lastName[0]
                }.`
              : 'Welcome!')}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          {state.auth.googleAuthUser && <NavbarMenuLink to={`/profile/${state.auth.googleAuthUser.uid}`}>Profile</NavbarMenuLink>}
        </Menu.Item>
        <SubMenu
          key={'sub1'}
          title={
            <Badge
              count={numberOfUnreadMessages}
              style={{
                color: '#fff',
                backgroundColor: '#1890ff',
                marginBottom: '30px',
              }}
            >
              <span style={{ marginRight: '1rem' }}>Messages</span>
            </Badge>
          }
        >
          <Menu.Item key={'Messages'}>
            <Link
              to={{
                pathname: '/messages',
                state: {
                  uid: state.auth.googleAuthUser
                    ? state.auth.googleAuthUser.uid
                    : null,
                },
              }}
            >
              <span style={{ marginRight: '1rem' }}>User Messages</span>
              <Badge
                className={'colorless-badge'}
                count={
                  state.auth.googleAuthUser
                    ? getUnreadMessages(state.auth.googleAuthUser.uid)
                    : 0
                }
                style={{
                  backgroundColor: '#fff',
                  boxShadow: '0 0 0 1px #d9d9d9 inset',
                }}
              />
            </Link>
          </Menu.Item>
          {state.org.userOrganizations &&
            state.org.userOrganizations.map(org => {
              return (
                <Menu.Item key={org.orgId}>
                  <Link
                    to={{ pathname: '/messages', state: { uid: org.orgId } }}
                  >
                    <span style={{ marginRight: '.2rem' }}>
                      {org.organizationName}
                    </span>
                    <Badge
                      className={'colorless-badge'}
                      count={getUnreadMessages(org.orgId)}
                      style={{
                        backgroundColor: '#fff',
                        boxShadow: '0 0 0 1px #d9d9d9 inset',
                      }}
                    />
                  </Link>
                </Menu.Item>
              );
            })}
        </SubMenu>
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
        <Menu.Divider />
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
  text-align: left;
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
  span > p {
    color: white;
  }

  .colorless-badge > sup > span > p {
    color: #999;
  }
`;

export default withRouter(Navigation);
