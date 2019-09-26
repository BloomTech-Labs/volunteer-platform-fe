import React from 'react';
import styled from 'styled-components';
import Event from './Event';
import moment from 'moment';
import { findNext } from '../utility/findNextRecurEvent';

export const EventList = ({ events, recurringEvents, filtered }) => {
    console.log(events)
  !filtered && events.forEach(event => {
    event.nextDate = event.date;
  });
  recurringEvents.forEach(event => {
    event.nextDate = findNext(event.date, event.recurringInfo)
  });
  let allEvents = filtered ? events : [...events, ...recurringEvents].sort((a, b) => a.nextDate - b.nextDate)

  return (
    <StyledEventList>
      {allEvents.map(event => (
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
`;

export default EventList;
