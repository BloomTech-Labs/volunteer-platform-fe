import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Collapse, DatePicker, Button } from 'antd';
import { StyledCard } from '../../styled';

const {Panel} = Collapse;

export const UserEvents = ({ events, changePanel, calendarValue, selectDate, selectedDate, displayAll }) => {

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
  
  let selectedEvents = events ? [...events] : [];
  if (selectedDate){
    selectedEvents = filterEvents(selectedEvents, 'date');
  }
  selectedEvents.sort((a, b) => a.nextDate - b.nextDate);
  
  return (
    <CustomStyledCard  >
      {selectedEvents.length > 0 || selectedDate ? (
        <UpperDiv>
          <h2>Upcoming Events</h2>
          <DatePicker 
            onChange={selectDate} 
            onPanelChange={changePanel}
            allowClear={false}
            value={calendarValue}
            style={{margin: '1rem 0'}}/>
          {selectedDate && <p>Selected date: {moment.unix(selectedDate).format('LL')}</p>}
          <Button type='link' onClick={displayAll} width='200px'>Display All Events</Button>
        </UpperDiv>
      ) : (
        <div>You have not signed up for any events yet</div>
      )}
      {selectedEvents.length > 0 && (
        <Collapse accordion bordered={false} style={{background: 'white'}}>
          {selectedEvents.map(event => {
            return (
              <StyledPanel
                header={event.nameOfEvent}
                key={event.eventId}
              >
                <h5>Date: {moment.unix(event.date).format('LL')}</h5>
                <h5>Time: {`${event.startTime}~${event.endTime}`}</h5>
                <h5>Location: {event.location}</h5>
                <h5>Point of Contact</h5>
                <p>
                  {event.pointOfContact && event.pointOfContact.firstName + ' ' +  event.pointOfContact.lastName} 
                </p>
                <p>{event.pointOfContact && event.pointOfContact.email}</p>
              </StyledPanel>
            );
          })}
        </Collapse>
      )}
    </CustomStyledCard>
  );
};

const StyledPanel = styled(Panel)`
  && {
    background: white;
    border-radius: 4px;
    margin: 1rem 0;
    overflow: hidden;

    .ant-collapse-header {
      border: 1px solid ${({theme}) => theme.gray5};
      background: ${({theme}) => theme.gray2};
      border-radius: 0px 0px 4px 4px;
    }
  }
`;

const UpperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;

  h2{
      margin: 1rem 0;
  }
  
  button {
    margin: 0 auto;
    color: rgba(0, 0, 0, 0.6);
  }

  button:hover {
    color: ${({theme}) => theme.primary7};
  }
`;

const CustomStyledCard = styled(StyledCard)`
  && {
    width: 500px;
    background: white;
    border-radius: 0px;
    margin-top: 2rem;
  }
`
export default UserEvents;
