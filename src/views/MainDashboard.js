import React from 'react';
import { Link } from 'react-router-dom';
import { StyledButton } from '../styled';
import { signOut } from '../actions';
import { useStateValue } from '../hooks/useStateValue';

const MainDashboard = () => {
  const [ state, dispatch ] = useStateValue();
  return ( <div>
    { !state.auth.loggedIn ? ( <><Link to={ '/login' }/>
        <Link to={ '/create-org' }/>
      </> ) : <StyledButton onClick={ () => signOut( dispatch ) }>Log
      out</StyledButton> }
    <h1>Shows a list of events.</h1>
  </div> );
};

export default MainDashboard;