import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {message} from 'antd';
import {useStateValue} from '../hooks/useStateValue';
import {
  EventList,
  FilteredComponent,
  FilterTopbar,
  NoEventsFound,
} from '../components/MainDashboard';
import {getAllEventsByState, getAllRecurringEventsByState} from '../actions';
import {stateConversion} from '../utility/stateConversion';
import {StyledLoader} from '../styled'

export const MainDashboard = () => {
  const [state, dispatch] = useStateValue();
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [filtersTouched, setFiltersTouched] = useState(false);
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
    location: {state: '', city: ''},
    tags: {interests: [], requirements: [], causeAreas: []},
  });
  
  useEffect(() => {
    const tagCollections = ['interests', 'requirements', 'causeAreas'];
    let collectionMeta = {};
    tagCollections.forEach(collectionName => {
      collectionMeta[ collectionName ] = {};
      state.tags[ collectionName ].forEach(
        tag => (collectionMeta[ collectionName ][ tag ] = false),
      );
    });
    setTagFilterState(collectionMeta);
  }, []);
  
  //fetching user's location by IP
  useEffect(() => {
    axios
      .get(`https://geoip-db.com/json/${process.env.REACT_APP_ipinfoKey}`)
      .then(res => {
        let stateAbbrev = Object.keys(stateConversion).find(
          key => stateConversion[ key ] === res.data.state,
        );
        let userCity = res.data.city;
        if (stateAbbrev){
          setInputState({
            ...inputState,
            location: {
              ...inputState.location,
              state: stateAbbrev,
              city: userCity,
            },
          });
        }else{
          message.warning(
            'Unable to get your location. Please enter your state below.',
          );
        }
      })
      .catch(err => {
        console.log('Error detecting location');
        message.warning(
          'Unable to get your location. Please enter your state below.',
        );
      })
      .finally(() => setLoadingEvents(false));
  }, []);
  
  useEffect(() => {
    if (inputState.location.state.length === 2){
      setLoadingEvents(true);
      getAllEventsByState(inputState.location.state, dispatch);
      getAllRecurringEventsByState(inputState.location.state, dispatch);
      setTimeout(() => {
        setLoadingEvents(false);
      }, 500);
      setTimeout(() => {
        setFiltersTouched(true);
      }, 500);
    }
  }, [inputState.location.state]);
  
  const onChange = e => {
    setInputState({...inputState, [ e.target.name ]: e.target.value});
  };
  const onLocationChange = e => {
    setInputState({
      ...inputState,
      location: {...inputState.location, [ e.target.name ]: e.target.value},
    });
  };
  
  const onTagsChange = (e, name, collection) => {
    setFiltersTouched(true);
    setTagFilterState({
      ...tagFilterState,
      [ collection ]: {...tagFilterState[ collection ], [ name ]: e},
    });
  };
  
  const toggleTagExpand = collectionName => {
    setTagExpandState({
      ...tagExpandState,
      [ collectionName ]: !tagExpandState[ collectionName ],
    });
  };
  
  const FilteredEventList = FilteredComponent(EventList);
  const [activeTabKey, setActiveTabKey] = useState('Events');
  
  return (
    <div className="main-content" style={{maxWidth: 1020, margin: '0 auto'}}>
      <h2>Browse {activeTabKey}</h2>
      <FilterTopbar
        changeHandlers={{onChange, onLocationChange, onTagsChange}}
        inputState={inputState}
        tagFilterState={tagFilterState}
        tagExpandState={tagExpandState}
        toggleTagExpand={toggleTagExpand}
        activeTab={activeTabKey}
        setActiveTabKey={setActiveTabKey}
      />
      <div style={{minHeight: 400, margin: '0 auto'}}>
        {loadingEvents ? (
          <StyledLoader/>
        ) : filtersTouched && !state.events.events.length ? (
          <NoEventsFound filtersTouched={true}/>
        ) : (
          <FilteredEventList
            events={state.events.events}
            recurringEvents={state.events.recurringEvents}
            filter={inputState}
            tagFilter={tagFilterState}
          />
        )
        }
      
      </div>
    </div>
  );
};


export default MainDashboard;
