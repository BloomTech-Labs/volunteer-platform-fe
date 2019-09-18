import React from 'react';
import { render } from '@testing-library/react';
import Login from '../views/Login';
import { StateProvider } from '../contexts/StateProvider';

describe( 'Login Page', () => {
  it( 'properly renders', async() => {
    const login = render( <StateProvider> <Login/> </StateProvider> );
    expect( login.getByText( /login with/i ) ).toBeInTheDocument();
    
  } );
  
  it( 'to have a google button', () => {
    const login = render( <StateProvider> <Login/> </StateProvider> );
    const googleLoginButton = login.getByText( /Google/ );
    expect( googleLoginButton ).toBeVisible();
  } );
  
  it( 'to have a facebook button', () => {
    const login = render( <StateProvider> <Login/> </StateProvider> );
    const facebookButton = login.getByText( /facebook/i );
    expect( facebookButton ).toBeVisible();
  } );
} );
