import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { EventCard } from './EventCard';
import { StyledCard, StyledButton } from '../styled';
import { useStateValue } from '../hooks/useStateValue';
import moment from 'moment';
import { Tag } from 'antd';

export const Event = ({ event }) => {
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

  return (
    
      <StyledEventCard margin={'0 0 20px 0'}>
        <div className="container">
          <div className="head">
            <h4>{event.nameOfEvent}</h4>
            <h5>Host Organization: {event.orgName} </h5>
            <h5>City: {event.city} </h5>
            <h5>Causes: {causes}</h5>
            <h5>Interests: {interest} </h5>
            <h5>Requirements: {requirements}</h5>
          </div>
          <div className="date">
            <h5>On: {moment.unix(event.nextDate).format('LL')}</h5>
            <h5>from: {event.startTime}</h5>
            <h5>to: {event.endTime}</h5>
            <h5>Spot(s) Remaining: {event.numberOfVolunteers}</h5>
          </div>
          {ableToDelete && <StyledButton type="danger">Delete</StyledButton>}
        </div>
        <button><Link to={{pathname: `/events/${event.eventId}`}}> View More </Link></button>
      </StyledEventCard>
  );
};

const StyledEventCard = styled(StyledCard)`
  margin-bottom: 20px;
  .ant-card-body {
    width: 100%;
  }
  .head {
    padding-bottom: 10px;
  }
  .date {
    display: flex;
    justify-content: space-evenly;
    text-align: justify;
  }
`;
export default Event;
