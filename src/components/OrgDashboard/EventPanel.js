import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Collapse } from 'antd';
import { findNext } from '../../utility/findNextRecurEvent';
import { StyledCard, StyledButton } from '../../styled';

const { Panel } = Collapse;

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
  let selectedEvents = [...events];
  let newEvent = [];
  recurringEvents.forEach(event => {
    for (let date in event.registeredVolunteers) {
      if (moment().unix() - date < 0) {
        newEvent = { ...event, nextDate: date, isRecurring: true };
        selectedEvents.push(newEvent);
      }
    }
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

  if (selectedDate) {
    selectedEvents = filterEvents(selectedEvents, 'nextDate');
  }
  selectedEvents.sort((a, b) => a.nextDate - b.nextDate);

  const PanelHeader = event => {
    return (
      <div className="panel-header">
        <span>{event.event.nameOfEvent}</span>
        <span>{moment.unix(event.event.nextDate).format('LL')}</span>
      </div>
    );
  };
  return (
    <ReStyledCard width={'60%'} margin={'0'}>
      {selectedEvents.length > 0 || selectedDate ? (
        <UpperDiv>
          {selectedDate && (
            <>
              <h4>{moment.unix(selectedDate).format('LL')}</h4>
              <StyledButton onClick={displayAll} width={'40%'}>
                Display All Events
              </StyledButton>
            </>
          )}
        </UpperDiv>
      ) : (
        <div>No events have been created yet.</div>
      )}
      {selectedEvents.length > 0 && (
        <Collapse accordion bordered={false}>
          {selectedEvents.map((event, i) => {
            return (
              <StyledPanel
                header={<PanelHeader event={event} />}
                key={event.eventId + i}
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
    </ReStyledCard>
  );
};

const ReStyledCard = styled(StyledCard)`
  height: 320px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.12);
  }

`;
const StyledPanel = styled(Panel)`
  && {
    background: ${({ theme }) => theme.gray2};
    border-radius: 4px;
    margin-bottom: 24px;
    overflow: hidden;

    .ant-collapse-header {
      border: 1px solid ${({ theme }) => theme.gray5};
    }

    .panel-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
`;

const UpperDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
  }
  button {
    margin: 0 auto;
    margin-top: 20px;
  }
`;
export default EventPanel;
