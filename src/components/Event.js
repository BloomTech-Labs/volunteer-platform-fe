import React from 'react';
import { StyledCard, StyledButton } from '../styled';
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

  return (
    <StyledCard>
      <h1>{event.nameOfEvent}</h1>
      <h1>{event.date}</h1>
      <h1>{event.startTime}</h1>
      <h1>{event.endTime}</h1>
      {/* <h1>{event.numberOfVolunteers}</h1> */}
      {/* <h1>{event.pointOfContact.firstName}</h1>
      <h1>{event.pointOfContact.lastName}</h1>
      <h1>{event.pointOfContact.email}</h1> */}
      {/* <h1>{event.website}</h1> */}
      {/* <h1>{event.tags.interests}</h1>
      <h1>{event.tags.requirments}</h1> */}
      {/* <h1>{event.volunteerRequirements}</h1>
      <h1>{event.otherNotes}</h1> */}
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
