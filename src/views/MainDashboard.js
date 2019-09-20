import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledForm, StyledInput } from '../styled';
import { useStateValue } from '../hooks/useStateValue';
import EventList from '../components/EventList';
import { getAllEventsByState } from '../actions';
import { stateConversion } from '../utility/stateConversion';

const MainDashboard = () => {
  const [ state, dispatch ] = useStateValue();
  const [ localState, setInputState ] = useState( { state: '' } );
  
  //fetching user's location by IP
  useEffect( () => {
    axios
      .get( `https://geoip-db.com/json/${ process.env.REACT_APP_ipinfoKey }` )
      .then( res => {
        console.log( res );
        let stateAbbrev = Object.keys( stateConversion )
          .find( key => stateConversion[ key ] === res.data.state );
        if( stateAbbrev ){
          setInputState( {
            ...localState, state: stateAbbrev,
          } );
        }
      } )
      .catch( err => {
        console.log( 'Error detecting location' );
      } );
  }, [] );
  
  useEffect( () => {
    if( localState.state.length === 2 ){
      getAllEventsByState( localState.state, dispatch );
    }
  }, [ localState ] );
  
  const onChange = e => {
    setInputState( { ...localState, [ e.target.name ]: e.target.value } );
  };
  return ( <div>
      <h2>Browse Events</h2>
      <div style={ { display: 'flex', justifyContent: 'center' } }>
        <StyledForm>
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
