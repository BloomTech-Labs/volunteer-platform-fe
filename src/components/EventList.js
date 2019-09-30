import React, { useState } from 'react';
import styled from 'styled-components';
import Event from './Event';
import { NoEventsFound } from './NoEventsFound';
import { Pagination } from 'antd';

export const EventList = ({ events }) => {
  const itemPerPage = 10;
  const [current, setCurrent] = useState(1);
  const [displayEvents, setDisplayEvents] = useState(
    events.slice(0, itemPerPage)
  );

  const changePage = page => {
    setCurrent(page);
    setDisplayEvents(
      events.slice(itemPerPage * (page - 1), itemPerPage * page)
    );
    window.scrollTo(0, 0);
  };

  return displayEvents.length ? (
    <StyledEventList>
      {displayEvents.map(event => (
        <Event key={event.eventId} event={event} />
      ))}
      <Pagination
        current={current}
        onChange={changePage}
        total={events.length}
      />
    </StyledEventList>
  ) : (
    <NoEventsFound />
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
