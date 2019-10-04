import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {Collapse} from 'antd';
import {findNext} from '../../utility/findNextRecurEvent';
import {StyledCard, StyledButton} from '../../styled';

const {Panel} = Collapse;

export const UserEvents = ({ events, selectedDate, displayAll }) => {

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
          <h2>{selectedDate && moment.unix(selectedDate).format('LL')}</h2>
          <StyledButton onClick={displayAll} width='200px'>Display All Events</StyledButton>
        </UpperDiv>
      ) : (
        <div>You have not signed up for any events yet</div>
      )}
      {selectedEvents.length > 0 && (
        <Collapse accordion bordered={false} style={{background: '#E8E8E8'}}>
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

  h2{
      margin: 0;
  }
  button {
    margin: 0 auto;
    margin-top: 20px;
  }
`;

const CustomStyledCard = styled(StyledCard)`
  && {
    width: 500px;
    background-color: #E8E8E8;
    border-radius: 0px;
  }
`
export default UserEvents;
