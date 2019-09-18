import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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

  it( 'to have a twitter button', () => {
    const login = render( <StateProvider> <Login/> </StateProvider> );
    const twitterButton = login.getByText( /twitter/i );
    expect( twitterButton ).toBeVisible();
  } );

  it( 'should have a user name and password text input', () => {
    const login = render( <StateProvider> <Login/> </StateProvider> );
    const emailInput = login.getByTitle( /email/ );
    const passwordInput = login.getByTitle( /password/ );
    fireEvent.change( emailInput, { target: { value: 'jeremiah' } } );
    fireEvent.change( passwordInput, { target: { value: 'password' } } );
    expect( emailInput ).toHaveValue( 'jeremiah' );
    expect( passwordInput ).toHaveValue( 'password' );
  } );
} );
