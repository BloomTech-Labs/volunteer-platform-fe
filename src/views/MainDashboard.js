import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useStateValue } from '../hooks/useStateValue';
import {
  ResultList,
  FilteredComponent,
  FilterTopbar,
  NoResultsFound,
} from '../components/MainDashboard';
import {
  getAllEventsByState,
  getAllRecurringEventsByState,
  getOrganizationsByState,
} from '../actions';
import { stateConversion } from '../utility/stateConversion';
import { StyledLoader } from '../styled';

export const MainDashboard = () => {
  const [{ events, tags, org }, dispatch] = useStateValue();
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [filtersTouched, setFiltersTouched] = useState(false);
  const [tagFilterState, setTagFilterState] = useState({
    interests: {},
    requirements: {},
    causeAreas: {},
  });
  const [selectedTags, setSelectedTags] = useState({
    interests: [],
    requirements: [],
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
  const [activeTabKey, setActiveTabKey] = useState('Events');
  const [initialResults, setInitialResults] = useState([]);

  useEffect(() => {
    const tagCollections = ['interests', 'requirements', 'causeAreas'];
    let collectionMeta = {};
    tagCollections.forEach(collectionName => {
      collectionMeta[collectionName] = {};
      tags[collectionName].forEach(
        tag => (collectionMeta[collectionName][tag] = false)
      );
    });
    setTagFilterState(collectionMeta);
  }, []);

  useEffect(() => {
    let newTags = {};
    Object.keys(selectedTags).forEach(collection => {
      let newCollection = {};
      Object.keys(tagFilterState[collection]).forEach(
        tag => (newCollection[tag] = false)
      );
      selectedTags[collection].forEach(tag => (newCollection[tag] = true));
      newTags[collection] = newCollection;
    });
    setTagFilterState({ ...tagFilterState, ...newTags });
  }, [selectedTags]);

  //fetching user's location by IP
  useEffect(() => {
    axios
      .get(`https://geoip-db.com/json/${process.env.REACT_APP_ipinfoKey}`)
      .then(res => {
        let stateAbbrev = Object.keys(stateConversion).find(
          key => stateConversion[key] === res.data.state
        );
        let userCity = res.data.city;
        if (stateAbbrev) {
          setInputState({
            ...inputState,
            location: {
              ...inputState.location,
              state: stateAbbrev,
              city: userCity,
            },
          });
        } else {
          message.warning(
            'Unable to get your location. Please enter your state below.'
          );
        }
      })
      .catch(err => {
        console.log('Error detecting location');
        message.warning(
          'Unable to get your location. Please enter your state below.'
        );
      })
      .finally(() => setLoadingEvents(false));
  }, []);

  useEffect(() => {
    if (inputState.location.state.length === 2) {
      setLoadingEvents(true);
      getAllEventsByState(inputState.location.state, dispatch);
      getAllRecurringEventsByState(inputState.location.state, dispatch);
      getOrganizationsByState(inputState.location.state, dispatch);
      setTimeout(() => {
        setLoadingEvents(false);
      }, 1000);
      setTimeout(() => {
        setFiltersTouched(true);
      }, 1000);
    }
  }, [inputState.location.state]);

  useEffect(() => {
    if (activeTabKey === 'Events')
      setInitialResults([...events.events, ...events.recurringEvents]);
    else setInitialResults([...org.organizations]);
  }, [activeTabKey]);

  useEffect(() => {
    setInitialResults([...events.events, ...events.recurringEvents]);
  }, [events]);

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
    setFiltersTouched(true);
    if (e === null)
      setTagFilterState({
        ...tagFilterState,
        [collection]: {
          ...tagFilterState[collection],
          [name]: !tagFilterState[collection][name],
        },
      });
    else
      setTagFilterState({
        ...tagFilterState,
        [collection]: { ...tagFilterState[collection], [name]: e },
      });
  };

  const onSelectedChange = (selected, collection) => {
    setFiltersTouched(true);
    selected.forEach(tag => {
      console.log(tag);
      onTagsChange(true, tag, collection);
    });
    setSelectedTags({ ...selectedTags, [collection]: selected });
  };

  const toggleTagExpand = collectionName => {
    setTagExpandState({
      ...tagExpandState,
      [collectionName]: !tagExpandState[collectionName],
    });
  };

  const FilteredList = FilteredComponent(ResultList);

  return (
    <div className="main-content" style={{ maxWidth: 1020, margin: '0 auto' }}>
      <h2>Browse {activeTabKey}</h2>
      <FilterTopbar
        changeHandlers={{
          onChange,
          onLocationChange,
          onTagsChange,
          onSelectedChange,
        }}
        inputState={inputState}
        tagFilterState={tagFilterState}
        selectedTags={selectedTags}
        tagExpandState={tagExpandState}
        toggleTagExpand={toggleTagExpand}
        activeTab={activeTabKey}
        setActiveTabKey={setActiveTabKey}
      />
      <div style={{ minHeight: 400, margin: '0 auto' }}>
        {loadingEvents ? (
          <StyledLoader />
        ) : filtersTouched && !initialResults.length ? (
          <NoResultsFound filtersTouched={true} />
        ) : (
          <FilteredList
            events={events.events}
            recurringEvents={events.recurringEvents}
            filter={inputState}
            tagFilter={tagFilterState}
            organizations={org.organizations}
            activeTab={activeTabKey}
          />
        )}
      </div>
    </div>
  );
};

export default MainDashboard;
