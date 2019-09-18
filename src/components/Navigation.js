import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../actions';
import { Menu, Icon, Button } from 'antd';
import styled from 'styled-components';
import { useStateValue } from '../hooks/useStateValue';

const { SubMenu } = Menu;

const Navagation = ( props ) => {
  const [ state, dispatch ] = useStateValue();
  const [ current, setCurrent ] = useState( 'Home' );
  
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
        { state.auth.loggedIn ? <Icon type={ 'Logout' }>Logout</Icon> :
          <Link to={ '/login' }><Icon type={ 'login' }/>Login</Link> }
      </Menu.Item>
      
      < Menu.Item key='Home'>
        <Link to={ '/' }>
          <Icon type='home'/>
          Home
        </Link>
      </Menu.Item>
      
      <SubMenu
        title={ <span className="submenu-title-wrapper">
          <Icon type="setting"/>
          Navigation Three - Submenu
          </span> }
      >
        <Menu.ItemGroup title='Item 1'>
          <Menu.Item key='setting:1'>Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item>
    </Menu>
  </StyledNavigation> );
  
};

const StyledNavigation = styled.div`
        margin: 0 0 3rem 0;
        
        `;

export default Navagation;