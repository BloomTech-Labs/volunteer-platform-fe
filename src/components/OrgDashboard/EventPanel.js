import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {Collapse} from 'antd';
import {findNext} from '../../utility/findNextRecurEvent';
import {StyledCard, StyledButton} from '../../styled';

const {Panel} = Collapse;

export const EventPanel = ({
  events,
  recurringEvents,
  selectedDate,
  displayAll,
}) => {
  events.forEach(event => {
    event.nextDate = event.startTimeStamp || event.date;
    event.isRecurring = false;
  });
  
  recurringEvents.forEach(event => {
    let nextDate = findNext(
      event.startTimeStamp || event.date,
      event.recurringInfo,
    );
    event.nextDate = moment(
      moment.unix(nextDate).format('LL') + ' ' + event.startTime,
    ).unix();
    event.isRecurring = true;
  });
  
  const filterEvents = (arr, property) => {
    return arr.filter(event => {
      const isBigger = event[ property ] >= selectedDate;
      const lessThanNextDay =
        event[ property ] <
        moment
          .unix(selectedDate)
          .add(1, 'day')
          .startOf('day')
          .unix();
      
      if (isBigger && lessThanNextDay){
        return true;
      }
      return false;
    });
  };
  
  let selectedEvents = [...recurringEvents, ...events];
  if (selectedDate){
    let recurs = filterEvents(recurringEvents, 'nextDate');
    let regs = filterEvents(events, 'date');
    selectedEvents = [...recurs, ...regs];
  }
  selectedEvents.sort((a, b) => a.nextDate - b.nextDate);
  
  return (
    <StyledCard backgroundcolor={'#E8E8E8'} borderRadius={'0px'}>
      {selectedEvents.length > 0 || selectedDate ? (
        <UpperDiv>
          <h2>Upcoming Events</h2>
          <h2>{selectedDate && moment.unix(selectedDate).format('LL')}</h2>
          <StyledButton onClick={displayAll}>Display All Events</StyledButton>
        </UpperDiv>
      ) : (
        <div>No events have been created yet.</div>
      )}
      {selectedEvents.length > 0 && (
        <Collapse accordion bordered={false} style={{background: '#E8E8E8'}}>
          {selectedEvents.map(event => {
            return (
              <StyledPanel
                header={event.nameOfEvent}
                key={event.startTimeStamp || event.date}
              >
                <h5>{moment.unix(event.nextDate).format('LL')}</h5>
                <p>{event.isRecurring && 'This is a recurring event.'}</p>
                <h5>Point of Contact</h5>
                <p>
                  {event.pointOfContact && event.pointOfContact.firstName}{' '}
                  {event.pointOfContact && event.pointOfContact.lastName}
                </p>
              </StyledPanel>
            );
          })}
        </Collapse>
      )}
    </StyledCard>
  );
};

const StyledPanel = styled(Panel)`
  && {
    background: white;
    border-radius: 4px;
    margin-bottom: 24px;
    overflow: hidden;

    .ant-collapse-header {
      border-bottom: 1px solid ${({theme}) => theme.gray4};
    }
  }
`;

const UpperDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 20px;
  button {
    width: 25%;
    margin: 0 auto;
  }
`;
export default EventPanel;
