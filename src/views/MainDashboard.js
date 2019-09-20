import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledForm, StyledInput } from '../styled';
import { useStateValue } from '../hooks/useStateValue';
import { EventList, FilteredComponent } from '../components';
import { getAllEventsByState } from '../actions';
import { stateConversion } from '../utility/stateConversion';

export const MainDashboard = () => {
  const [state, dispatch] = useStateValue();
  const [inputState, setInputState] = useState({
    location: { state: '', city: '' },
    tags: { interests: '', requirements: '' },
  });

  //fetching user's location by IP
  useEffect(() => {
    axios
      .get(`https://geoip-db.com/json/${process.env.REACT_APP_ipinfoKey}`)
      .then(res => {
        console.log(res);
        let stateAbbrev = Object.keys(stateConversion).find(
          key => stateConversion[key] === res.data.state
        );
        if (stateAbbrev) {
          setInputState({
            ...inputState,
            state: stateAbbrev,
          });
        }
      })
      .catch(err => {
        console.log('Error detecting location');
      });
  }, []);

  useEffect(() => {
    console.log(inputState.location.state);
    if (inputState.location.state.length === 2) {
      getAllEventsByState(inputState.location.state, dispatch);
    }
  }, [inputState.location.state]);

  const onChange = e => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };
  const onLocationChange = e => {
    setInputState({
      ...inputState,
      location: { ...inputState.location, [e.target.name]: e.target.value },
    });
  };
  const onTagsChange = e => {
    setInputState({
      ...inputState,
      tags: { ...inputState.tags, [e.target.name]: e.target.value },
    });
  };

  const FilteredEventList = FilteredComponent(EventList);

  return (
    <div>
      <h2>Browse Events</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <StyledForm styled={{ maxWidth: '500px' }}>
          <StyledInput
            values={inputState.location}
            name={'state'}
            onChange={onLocationChange}
            placeholder="Enter State Initials"
          />
        </StyledForm>
      </div>
      <FilteredEventList filter={inputState} events={state.events.events} />
    </div>
  );
};

export default MainDashboard;
