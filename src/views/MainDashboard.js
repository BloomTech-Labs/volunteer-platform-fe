import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateValue } from '../hooks/useStateValue';
import { EventList, FilteredComponent, FilterTopbar } from '../components';
import { getAllEventsByState } from '../actions';
import { stateConversion } from '../utility/stateConversion';

export const MainDashboard = () => {
  const [state, dispatch] = useStateValue();
  const [tagFilterState, setTagFilterState] = useState({
    interests: {},
    requirements: {},
    causeAreas: {},
  });
  const [tagExpandState, setTagExpandState] = useState({
    interests: false,
    requirements: false,
    causeAreas: false,
  });
  const [inputState, setInputState] = useState({
    location: { state: '', city: '' },
    tags: { interests: [], requirements: [], causeAreas: [] },
  });

  useEffect(() => {
    const tagCollections = ['interests', 'requirements', 'causeAreas'];
    let collectionMeta = {};
    tagCollections.forEach(collectionName => {
      collectionMeta[collectionName] = {};
      state.tags[collectionName].forEach(
        tag => (collectionMeta[collectionName][tag] = false)
      );
    });
    setTagFilterState(collectionMeta);
  }, []);

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

  const onTagsChange = (e, name, collection) => {
    setTagFilterState({
      ...tagFilterState,
      [collection]: { ...tagFilterState[collection], [name]: e },
    });
  };

  const toggleTagExpand = collectionName => {
    setTagExpandState({
      ...tagExpandState,
      [collectionName]: !tagExpandState[collectionName],
    });
  };

  const FilteredEventList = FilteredComponent(EventList);
  const [activeTabKey, setActiveTabKey] = useState('Events');

  return (
    <div className="main-content" style={{ maxWidth: 1020, margin: '0 auto' }}>
      <h2>Browse {activeTabKey}</h2>
      <FilterTopbar
        changeHandlers={{ onChange, onLocationChange, onTagsChange }}
        inputState={inputState}
        tagFilterState={tagFilterState}
        tagExpandState={tagExpandState}
        toggleTagExpand={toggleTagExpand}
        activeTab={activeTabKey}
        setActiveTabKey={setActiveTabKey}
      />
      <FilteredEventList
        events={state.events.events}
        filter={inputState}
        tagFilter={tagFilterState}
      />
    </div>
  );
};

export default MainDashboard;
