import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WrappedAntForm, AntInput } from '../styled';
import { useStateValue } from '../hooks/useStateValue';
import EventList from '../components/EventList';
import { getAllEventsByState } from '../actions';
import { stateConversion } from '../utility/stateConversion';

export const MainDashboard = () => {
  const [state, dispatch] = useStateValue();
  const [inputState, setInputState] = useState({state: ''});

  //fetching user's location by IP
  useEffect(() => {
    axios
      .get(`https://geoip-db.com/json/${process.env.REACT_APP_ipinfoKey}`)
      .then(res => {
        let stateAbbrev = Object.keys(stateConversion).find(
          key => stateConversion[key] === res.data.state
        );
        if (stateAbbrev) {
          setInputState({state: stateAbbrev});
        }
      })
      .catch(err => {
        console.log('Error detecting location');
      });
  }, []);

  useEffect(() => {
    if (inputState.state.length >2) {
      getAllEventsByState(inputState.state, dispatch);
    }
  }, [inputState]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <WrappedAntForm styled={{ maxWidth: '500px' }} autofill={inputState} noButton={true}>
          <h2>Browse Events</h2>
          <AntInput
            name={'State'}
            placeholder="Enter State Initials"
          />
        </WrappedAntForm>
      </div>
      <EventList events={state.events.events} />
    </div>
  );
};

export default MainDashboard;
