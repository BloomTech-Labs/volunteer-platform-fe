import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledCard, StyledButton } from '../../styled';
import { useStateValue } from '../../hooks/useStateValue';
import moment from 'moment';
import { Tag } from 'antd';

export const EventCard = ({ event }) => {
  //logic
  const [{ org, events, auth }, dispatch] = useStateValue();

  let ableToDelete = false;

  org.userOrganizations.forEach(organization => {
    if (organization.orgId === events.events.orgId) {
      ableToDelete = true;
    }
  });

  const causes = event.typesOfCauses.map(item => {
    return <Tag>{(item = [item])}</Tag>;
  });

  const interest = event.interest.map(item => {
    return <Tag>{(item = [item])}</Tag>;
  });

  const requirements = event.volunteerRequirements.map(item => {
    return <Tag>{(item = [item])}</Tag>;
  });

  const startTime = moment.unix(event.nextDate);
  const totalTime = event.endTimeStamp - event.startTimeStamp;
  const totalHours = (totalTime / 3600).toFixed(2);
  const isRecurring = 'recurringInfo' in event;

  return (
    <StyledEventCard margin={'0 0 20px 0'}>
      <div className="info">
        <div className="header"></div>
        <div className="about"></div>
      </div>
      <div className="CTAs">
        <div className="date-and-time">
          <span className="date">{startTime.format('MMMM Do')}</span>
          <span className="time">{`${startTime.format(
            'LT'
          )} (${totalHours} hours)`}</span>
        </div>
        <StyledButton>
          <Link to={{ pathname: `/events/${event.eventId}` }}>Register</Link>
        </StyledButton>
        {isRecurring && (
          <div className="other-date">
            <span>Other Dates Available</span>
          </div>
        )}
      </div>
    </StyledEventCard>
  );
};

const StyledEventCard = styled(StyledCard)`
  margin-bottom: 20px;
  .ant-card-body {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  .info {
    flex-grow: 2;
  }

  .CTAs {
    width: 200px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .date-and-time {
      display: flex;
      flex-direction: column;
      border: 1px solid ${({ theme }) => theme.gray5};
      border-radius: 2px;
      text-align: center;
      width: 100%;
      padding: 5px 12px;

      .date {
        font-size: 18px;
        line-height: 22px;
      }
    }
    button {
      background: ${({ theme }) => theme.primary7};
      width: 60%;
      border: 0;
      margin: 6px auto;
      min-width: 150px;
      border-radius: 4px;
      padding: 3px 12px;
      cursor: pointer;

      :hover{
          background: ${({theme}) => theme.primary8}
      }
      a {
        color: white;
      }
    }

    .other-date {
      font-size: 12px;
      line-height: 20px;
      border: 1px solid #ffbb96;
      border-radius: 4px;
      padding: 2px 5px;
      width: 60%;
      min-width: 150px;
    }
  }
`;
export default EventCard;
