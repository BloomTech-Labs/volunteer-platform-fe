import React from 'react';
import styled from 'styled-components';
import Event from './Event';
import moment from 'moment';
import { findNext } from '../utility/findNextRecurEvent';

export const EventList = ({ events, recurringEvents }) => {
  events.forEach(event => {
    event.nextDate = event.date;
  });
  recurringEvents.forEach(event => {
    event.nextDate = findNext(event.date, event.recurringInfo)
    console.log(event.nextDate)
  });

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
`;

export default EventList;
