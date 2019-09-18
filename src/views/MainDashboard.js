import React, { useState, useEffect } from 'react';
import { StyledForm, StyledInput } from '../styled';
import { useStateValue } from '../hooks/useStateValue';
import EventList from '../components/EventList';
import { getAllEventsByState } from '../actions';

const MainDashboard = () => {
  const [ state, dispatch ] = useStateValue();
  const [ localState, setInputState ] = useState( { state: '' } );
  
  useEffect( () => {
    
    if( localState.state.length === 2 ){
      getAllEventsByState( localState.state, dispatch );
    }
  }, [ localState ] );
  
  const onChange = e => {
    setInputState( { ...localState, [ e.target.name ]: e.target.value } );
  };
  return ( <div>
    <h1>Shows a list of events.</h1>
    <div style={ { display: 'flex', justifyContent: 'center' } }>
      <StyledForm maxWidth='500px'>
        <StyledInput
          values={ localState }
          name={ 'State' }
          onChange={ onChange }
          placeholder="Enter State Initials"
        />
      </StyledForm>
    </div>
    <EventList events={ state.events.events }/>
  </div> );
};

export default MainDashboard;