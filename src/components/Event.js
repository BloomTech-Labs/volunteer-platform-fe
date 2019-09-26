import React from 'react';
import { StyledCard, StyledButton } from '../styled';
import { useStateValue } from '../hooks/useStateValue';
import moment from 'moment';
import { Tag } from 'antd';

export const Event = ({ event }) => {
  //logic
  const [{ org, events }, dispatch] = useStateValue();

  let ableToDelete = false;

  org.userOrganizations.forEach(organization => {
    if (organization.orgId === events.events.orgId) {
      ableToDelete = true;
    }
  });
  
  const causes = event.typesOfCauses.map(item => {
    return <Tag>{item = [item]}</Tag>
  })

  const interest = event.interest.map(item => {
    return <Tag>{item = [item]}</Tag>
  })

  // comes back as undefined, even with actual data. 
  //it would still display that data with <h5>{events.volunteerRequirements[0]}</h5>
  // const requirements = event.volunteerRequirements.map(item => {
  //   return <Tag>{item = [item]}</Tag> 
  // })
  return (
    <StyledCard>
      <div className='container'>
        <div className='head'>
          <h4>{event.nameOfEvent}</h4>
          <h5>Host Organization: {event.orgName} </h5>
          <h5>{event.city} </h5>
          <h5>Causes: {causes}</h5>
          <h5>Interests: {interest} </h5>
          {/* <h5>Requirements: {requirements}</h5> */}
        </div>
        <div className='date'>
          <h5>On: {moment.unix(event.date).format('ll')}</h5>
          <h5>from: {event.startTime}</h5>
          <h5>to: {event.endTime}</h5>
        </div>
        <div className='contact'>
          <h5>{event.phoneNumber}</h5>
          <h5>{event.email}</h5>
          <h5>{event.firstName}</h5>
          <h5>{event.lastName}</h5>
          <h5>{event.website}</h5>
        </div>
        <div className='description'>
          <h5>Spot(s) Remaining: {event.numberOfVolunteers}</h5> 
          <h5>{event.description}</h5>
          <h5>{event.otherNotes}</h5>
          {ableToDelete && <StyledButton type="danger">Delete</StyledButton>}
        </div>
      </div>
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
