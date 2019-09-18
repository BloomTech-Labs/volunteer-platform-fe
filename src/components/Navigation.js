import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signOut } from '../actions';
import { Menu, Icon, Button } from 'antd';
import styled from 'styled-components';
import { useStateValue } from '../hooks/useStateValue';

const { SubMenu } = Menu;

const Navagation = ( props ) => {
  const [ state, dispatch ] = useStateValue();
  const [ current, setCurrent ] = useState( 'Home' );
  
  useEffect( () => {
    if( props.location.pathname === '/' ){
      setCurrent( 'Home' );
    }
    
  }, [ props.location.pathname ] );
  
  const handleClick = e => {
    console.log( 'click ', e );
    if( e.key === 'Logout' ){
      signOut( dispatch );
      return;
    }
    setCurrent( e.key );
  };
  
  return ( <StyledNavigation>
    <Menu onClick={ handleClick } selectedKeys={ [ current ] }
          mode="horizontal">
      
      <Menu.Item key={ state.auth.loggedIn ? 'Logout' : 'Login' }>
        { state.auth.loggedIn ? <><Icon type={ 'logout' }/>Logout</> :
          <Link to={ '/login' }><Icon type={ 'login' }/>Login</Link> }
      </Menu.Item>
      
      < Menu.Item key='Home'>
        <Link to={ '/' }>
          <Icon type='home'/>
          Home
        </Link>
      </Menu.Item>
      { state.auth.loggedIn && <Menu.Item key={ 'Create Org' }>
        <Link to={ '/create-org' }><Icon type="plus-circle"/>Create
          Organization</Link>
      </Menu.Item> }
      { state.org.createdOrg && <Menu.Item key={ 'Organization Dashboard' }>
        <Link to={ '/org-dashboard' }><Icon type="dashboard"/>Organization
          Dashboard</Link>
      </Menu.Item> }
    </Menu>
  </StyledNavigation> );
  
};

const StyledNavigation = styled.div`
      margin: 0 0 3rem 0;
      
      `;

export default withRouter( Navagation );