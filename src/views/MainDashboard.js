import React from 'react';
import { StyledButton, StyledLink } from '../styled';
import { signOut } from '../actions';
import { useStateValue } from '../hooks/useStateValue';

const MainDashboard = () => {
  const [ state, dispatch ] = useStateValue();
  return ( <div>
    { !state.auth.loggedIn ? <StyledLink to={ '/login' }>Login</StyledLink> :
      <><StyledLink to={ '/create-org' }>Create
        Organization</StyledLink><StyledButton
        onClick={ () => signOut( dispatch ) }>Log
        out</StyledButton> </> }
    <h1>Shows a list of events.</h1>
  </div> );
};

export default MainDashboard;