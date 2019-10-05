import React, {useEffect} from 'react';
import EventCard from '../components/EventCard';
import {getEventById} from '../actions/events';
import {useStateValue} from '../hooks/useStateValue';

const Event = (props) => {
  
  const [{events}, dispatch] = useStateValue();
  
  useEffect(() => {
    if (props.match.params.id){
      getEventById(props.match.params.id, dispatch);
    }
  }, [props.match.params]);
  return (
    <div>
      <EventCard event={events.event}/>
    </div>
  );
};

export default Event;