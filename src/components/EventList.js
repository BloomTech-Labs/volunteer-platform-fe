import React from 'react';
import Event from './Event';
import styled from 'styled-components';

export const EventList = ({ events }) => {
  return (
    <StyledEventList>
      {events.map(event => (
        <Event key={event.eventId} event={event} />
      ))}
    </StyledEventList>
  );
};

const StyledEventList = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

export default EventList;
