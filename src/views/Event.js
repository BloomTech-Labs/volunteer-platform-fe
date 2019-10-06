import React, {useEffect} from 'react';
import EventCard from '../components/EventCard';
import {getEventById} from '../actions/events';
import {useStateValue} from '../hooks/useStateValue';
import {deleteCommentClearSuccess} from '../actions';
import {message} from 'antd';

const Event = (props) => {
  
  const [{events, comments}, dispatch] = useStateValue();
  
  useEffect(() => {
    if (comments.deletedComment){
      message.success('Comment deleted successfully.');
      deleteCommentClearSuccess(dispatch);
    }
  }, [comments.deletedComment]);
  
  useEffect(() => {
    
    if (props.match.params.id){
      getEventById(props.match.params.id, dispatch);
    }
  }, []);
  return (
    <div>
      <EventCard event={events.event}/>
    </div>
  );
};

export default Event;