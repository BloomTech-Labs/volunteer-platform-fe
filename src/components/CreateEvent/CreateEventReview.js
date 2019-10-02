import React from 'react';
import { StyledButton, StyledCard } from '../../styled';
import styled from 'styled-components';
import createEventImg from '../../assets/undraw_blooming_jtv6.svg';
import RecurringInfoReview from './RecurringInfoReview';

export const CreateEventReview = props => {
  const { localState, handleReviewSubmit, handlePageBack } = props;

  return (
    <StyledDiv className={'flex center'}>
      <CustomStyledCard
        className={'flex center'}
        style={{ maxWidth: '900px', margin: '2rem 0 5rem 0' }}
      >
        <h1>Let's Create An Event</h1>
        <StyledImg src={createEventImg} alt="undraw unexpected friends" />
        <StyledCreateEvent>
          <div>
            <label>Name of Event</label>
            <p>{localState.nameOfEvent}</p>
            <label>Tyeps of Causes</label>
            <p>{localState.typesOfCauses}</p>
            <label>Location</label>
            <p>{localState.streetAddress}</p>
            <p>{localState.city}</p>
            <p>{localState.state}</p>
            <label>Phone Number</label>
            <p>{localState.phoneNumber}</p>
            <label>Point of Contact</label>
            <p>{localState.firstName}</p>
            <p>{localState.lastName}</p>
            <p>{localState.email}</p>
            <label>Date</label>
            <p>{localState.date}</p>
            <label>Start Time</label>
            <p>{localState.startTime}</p>
            <label>End Time</label>
            <p>{localState.endTime}</p>
            {localState.recurringEvent === 'Yes' && (
              <RecurringInfoReview localState={localState} />
            )}
            <label>Volunteer Requirments</label>
            <p>{localState.volunteerRequirements}</p>
            <label>Interests</label>
            <p>{localState.interest}</p>
            <label>Event Details</label>
            <p>{localState.eventDetails}</p>
            <label>Website</label>
            <p>{localState.website}</p>
            <label>Volunteers Needed</label>
            <p>{localState.numberOfVolunteers}</p>
            {localState.otherNotes && <label>Other Notes</label>}
            {localState.otherNotes && <p>{localState.otherNotes}</p>}
          </div>
          <StyledButton key="cancel" onClick={handlePageBack}>
            Cancel
          </StyledButton>
          ,
          <StyledButton key="submit" onClick={handleReviewSubmit}>
            Submit
          </StyledButton>
        </StyledCreateEvent>
      </CustomStyledCard>
    </StyledDiv>
  );
};
const StyledCreateEvent = styled.div`
  width: 100%;
  font-weight: bold;
  text-align: left;
  padding: 8rem;
  border: 1px solid grey;
  .inline {
    width: 50%;
  }

  .buttonStyles {
    display: flex;
    justify-content: space-around;
  }

  label {
    color: ${props => props.theme.primary8};
  }
  small {
    color: #bfbfbf;
  }
`;

const StyledDiv = styled.div`
  background: #003d61;

  h1 {
    color: ${props => props.theme.primary8};
  }

  h4 {
    color: ${props => props.theme.primary8};
  }
  padding: 2rem;
`;

const CustomStyledCard = styled(StyledCard)`
  &&& {
    background: #fafafa;

    margin: 3rem;
    text-align: center;
    cursor: default;
    transition: none;
    max-width: 1088px;
    &:hover {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
  }
`;

const StyledImg = styled.img`
  width: 211px;
  margin: 2rem auto;
`;

export default CreateEventReview;
