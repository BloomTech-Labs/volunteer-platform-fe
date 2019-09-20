import React from 'react';
import { StyledCard, StyledButton } from '../styled';
import { Button } from 'antd';

import { useStateValue } from '../hooks/useStateValue';

export const Event = ({ event }) => {
  //logic
  const [{ org, events }, dispatch] = useStateValue();

  let ableToDelete = false;

  org.userOrganizations.forEach(organization => {
    if (organization.orgId === events.events.orgId) {
      ableToDelete = true;
    }
  });
  console.log(event);
  return (
    <StyledCard>
      <h1>{event.volunteerType}</h1>
      <h1>{event.numberOfPeople}</h1>
      <h1>{event.startTime}</h1>
      <h1>{event.stopTime}</h1>
      <h1>{event.pointOfContact}</h1>
      <h1>{event.tags.interests}</h1>
      <h1>{event.tags.requirments}</h1>
      <h1>{event.description}</h1>
      <h1>{event.volunteerRequirements}</h1>
      {ableToDelete && <StyledButton type="danger">Delete</StyledButton>}
    </StyledCard>
  );
};

export default Event;

/* 
    Title
    Organization
    Description...cut off with ellipsis
    City, State
    time and date
*/
