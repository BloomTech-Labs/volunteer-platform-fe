import React from 'react';
import { StyledButton, StyledCard } from '../../../styled';
import { Icon, Tag } from 'antd';
import styled from 'styled-components';
import createEventImg from '../../../assets/undraw_blooming_jtv6.svg';
import RecurringInfoReview from './RecurringInfoReview';

export const CreateEventReviewList = props => {
  const {
    localState,
    handleReviewSubmit,
    handlePageBack,
    setEdit,
    edit,
  } = props;

  const editForm = () => {
    setEdit(true);
  };

  return (
    <StyledDiv className={'flex center'}>
      <CustomStyledCard
        className={'flex center'}
        style={{ maxWidth: '900px', margin: '2rem 0 5rem 0' }}
      >
        <h1>Here's What We Got</h1>
        <StyledImg src={createEventImg} alt="undraw unexpected friends" />
        <StyledCreateEvent>
          <StyledButtons>
            <div className="icon" onClick={editForm}>
              <Icon type="edit" />
            </div>
          </StyledButtons>
          <div className="reviewWrapper">
            <h4>Event Name</h4>
            <p>{localState.nameOfEvent}</p>
            <h4>Location</h4>
            <p>{localState.streetAddress}</p>
            <p>{localState.city}</p>
            <p>{localState.state}</p>
            <h4>Tyeps of Causes</h4>
            <p>
              {localState.typesOfCauses &&
                localState.typesOfCauses.map(cause => {
                  return (
                    <div className={'causes'} key={cause}>
                      <Tag>{cause}</Tag>
                    </div>
                  );
                })}
            </p>
            <h4>Volunteer Requirments</h4>
            <p>
              {localState.volunteerRequirements &&
                localState.volunteerRequirements.map(req => {
                  return (
                    <div className={'reqs'} key={req}>
                      <Tag>{req}</Tag>
                    </div>
                  );
                })}
            </p>
            <h4>Volunteers Needed</h4>
            <p>{localState.numberOfVolunteers}</p>
            <h4>Interests</h4>
            <p>
              {localState.interest &&
                localState.interest.map(interest => {
                  return (
                    <div className={'interests'} key={interest}>
                      <Tag>{interest}</Tag>
                    </div>
                  );
                })}
            </p>
            <h4>Phone Number</h4>
            <p>{localState.phoneNumber}</p>
            <h4>Point of Contact</h4>
            <p>{localState.firstName}</p>
            <p>{localState.lastName}</p>
            <p>{localState.email}</p>
            <h4>Date</h4>
            <p>{localState.date.format('LL')}</p>
            {localState.recurringEvent === 'Yes' && (
              <RecurringInfoReview localState={localState} />
            )}
            <h4>Start Time</h4>
            <p>{localState.startTime.format('LT')}</p>
            <h4>End Time</h4>
            <p>{localState.endTime.format('LT')}</p>
            <h4>Event Details</h4>
            <p>{localState.eventDetails}</p>
            <h4>Website</h4>
            <p>{localState.website}</p>
            {localState.otherNotes && <h4>Other Notes</h4>}
            {localState.otherNotes && <p>{localState.otherNotes}</p>}
          </div>
          <StyledButton key="cancel" onClick={handlePageBack}>
            Cancel
          </StyledButton>
          ,
          <StyledButton key="submit" onClick={handleReviewSubmit}>
            Confirm
          </StyledButton>
        </StyledCreateEvent>
      </CustomStyledCard>
    </StyledDiv>
  );
};

const StyledButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
`;
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
  .reviewWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
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

export default CreateEventReviewList;
