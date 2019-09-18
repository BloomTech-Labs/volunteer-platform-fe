import React from 'react';
import { render } from '@testing-library/react';
import Login from '../views/Login';

describe( 'Login Page', () => {
  it( 'properly renders', async() => {
   console.log("Starting the test");
    const login = render( <Login/> );
  } );
} );
