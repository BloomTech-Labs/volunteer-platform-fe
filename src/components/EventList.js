import React from 'react';
import Event from './Event';
import { StyledEventList } from '../styled';
const EventList = ({ events }) => {
  return (
    <StyledEventList>
      {events.map(event => (
        <Event key={event.eventId} event={event} />
      ))}
    </StyledEventList>
  );
};

export default EventList;
