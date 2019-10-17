import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledCard, StyledButton } from '../../styled';
import { useStateValue } from '../../hooks/useStateValue';
import moment from 'moment';
import { Tag } from 'antd';

export const EventCard = ({ event, tags }) => {
  //logic
  const [{ org, events, auth }, dispatch] = useStateValue();

  let ableToDelete = false;

  org.userOrganizations.forEach(organization => {
    if (organization.orgId === events.events.orgId) {
      ableToDelete = true;
    }
  });

  let selectedTags = [];
  let otherTags = [];

  const eventTags = [
    ...event.typesOfCauses,
    ...event.interest,
    ...event.volunteerRequirements,
  ];
  const filteredTags = {
    ...tags.causeAreas,
    ...tags.interests,
    ...tags.requirements,
  };

  eventTags.forEach(tag => {
    tag in filteredTags && filteredTags[tag] === true
      ? selectedTags.push(<EventCardTag color="blue">{tag}</EventCardTag>)
      : otherTags.push(<EventCardTag>{tag}</EventCardTag>);
  });

  return (
    <StyledEventCard margin={'0 0 20px 0'}>
      <div className="container">
        <div className="head">
          <h4>{event.nameOfEvent}</h4>
          <h5>
            {event.orgName && event.orgId && (
              <span>
                <a href={`/organization/${event.orgId}`}>{event.orgName}</a>
                <Spacer>•</Spacer>
              </span>
            )}
            {event.city}
          </h5>
          <h6>
            {selectedTags}
            {otherTags}
          </h6>
        </div>
        <div className="date">
          <h5>On: {moment.unix(event.nextDate).format('LL')}</h5>
          <h5>from: {moment.unix(event.startTimeStamp).format('LT')}</h5>
          <h5>to: {moment.unix(event.endTimeStamp).format('LT')}</h5>
          <h5>Spot(s) Remaining: {event.numberOfVolunteers}</h5>
        </div>
        {ableToDelete && <StyledButton type="danger">Delete</StyledButton>}
      </div>
      <button>
        <Link
          to={{
            pathname: `/events/${event.eventId}`,
            state: { selectedDate: event.nextDate },
          }}
        >
          {' '}
          View More{' '}
        </Link>
      </button>
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

const Spacer = styled.span`
  color: ${props => props.theme.gray4};
  margin: 0 8px;
`;

const EventCardTag = styled(Tag)`
  font-size: 75%;
  margin: 4px 4px 0 0;
`;

export default EventCard;
