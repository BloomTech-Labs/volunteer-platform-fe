import React, { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import {getAllEventsByState} from '../actions/events';
import { StyledButton, StyledForm, StyledInput, StyledLink } from '../styled';
import { signOut } from '../actions';
import { useStateValue } from '../hooks/useStateValue';

const MainDashboard = () => {
  const [ state, dispatch ] = useStateValue();
  const [ inputState, setInputState ] = useState( '' );

  useEffect( () => {   
      if(inputState.length === 2 ) {
        getAllEventsByState( state, dispatch );
      }
    }, [inputState] );

  const onChange = e => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };

  return ( 
    <div>
      { state.org.createdOrg &&
      <StyledLink to={ 'org-dashboard' }>Organization Dashboard</StyledLink> }
      { !state.auth.loggedIn ? <StyledLink to={ '/login' }>Login</StyledLink> :
        <><StyledLink to={ '/create-org' }>Create
          Organization</StyledLink><StyledButton
          onClick={ () => signOut( dispatch ) }>Log
          out</StyledButton> </> }
      <h1>Shows a list of events.</h1>
      <div style={{display:'flex', justifyContent:'center'}}>
        <StyledForm maxWidth='500px'>
        <StyledInput
          values={inputState}
          name={'State'}
          onChange={onChange}
          placeholder="Enter State Initials"
        />
        </StyledForm>
      </div>
      <EventList events={state.events.events} />
    </div> 
  );
};

export default MainDashboard;