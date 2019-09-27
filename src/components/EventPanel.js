import React from 'react';
import { Collapse } from 'antd';
import styled from 'styled-components';
import { findNext } from '../utility/findNextRecurEvent';
import moment from 'moment';
const { Panel } = Collapse;

export const EventPanel = ({ events, recurringEvents, selectedDate }) => {
  events.forEach(event => {
    event.nextDate = event.startTimeStamp || event.date;
  });

  recurringEvents.forEach(event => {
    let nextDate = findNext(
      event.startTimeStamp || event.date,
      event.recurringInfo
    );
    event.nextDate = moment(
      moment.unix(nextDate).format('LL') + ' ' + event.startTime
    ).unix();
  });

  const filterEvents = (arr, property) => {
    return arr.filter(event => {
      const isBigger = event[property] >= selectedDate;
      const lessThanNextDay =
        event[property] <
        moment
          .unix(selectedDate)
          .add(1, 'day')
          .startOf('day')
          .unix();

      if (isBigger && lessThanNextDay) {
        return true;
      }
      return false;
    });
  };

  let selectedEvents = [...recurringEvents, ...events];
  if (selectedDate) {
    let recurs = filterEvents(recurringEvents, 'nextDate');
    let regs = filterEvents(events, 'date');
    selectedEvents = [...recurs, ...regs];
  }
  selectedEvents.sort((a, b) => a.nextDate - b.nextDate);
  return (
    <Collapse accordion>
      {selectedEvents.map(event => {
        return (
          <StyledPanel
            header={event.nameOfEvent}
            key={event.startTimeStamp || event.date}
          >
            <p>Date: {moment.unix(event.nextDate).format('LL')}</p>
          </StyledPanel>
        );
      })}
    </Collapse>
  );
};

const StyledPanel = styled(Panel)`
  background: '#f7f7f7';
  border-radius: 4;
  margin-bottom: 24;
  border: 0;
  overflow: 'hidden';
`;
export default EventPanel;
