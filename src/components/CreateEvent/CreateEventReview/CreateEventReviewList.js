import React from 'react';
import { StyledButton, StyledCancelButton } from '../../../styled';
import { Icon, Tag } from 'antd';
import styled from 'styled-components';
import createEventImg from '../../../assets/undraw_blooming_jtv6.svg';
import RecurringInfoReview from './RecurringInfoReview';

export const CreateEventReviewList = props => {
  const { localState, handleReviewSubmit, handlePageBack, setEdit } = props;

  const editForm = () => {
    setEdit(true);
  };

  return (
    <StyledDiv className={'flex center'}>
      <div>
        <StyledButtons>
          <div className="icon" onClick={editForm}>
            <Icon type="edit" />
          </div>
        </StyledButtons>
      </div>

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
        {localState.recurringInfo.recurringEvent === 'Yes' && (
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
        <h4>Other Notes</h4>
        <p>{localState.otherNotes}</p>
      </div>
      <div className="buttonStyles">
        <StyledCancelButton
          key="cancel"
          type="second"
          onClick={() => handlePageBack()}
        >
          Back
        </StyledCancelButton>

        <StyledButton
          key="submit"
          type="primary"
          onClick={() => handleReviewSubmit()}
        >
          Confirm
        </StyledButton>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

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

export default CreateEventReviewList;
