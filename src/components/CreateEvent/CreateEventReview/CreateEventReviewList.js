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
    <StyledDiv className={'styledReviewDiv'}>
      <div>
        <StyledButtons>
          <div className="icon" onClick={editForm}>
            <Icon type="edit" />
          </div>
        </StyledButtons>
      </div>

      <div className="reviewWrapper">
        <label>Event Name</label>
        <p>{localState.nameOfEvent}</p>
        <label>Location</label>
        <p>{localState.streetAddress}</p>
        <p>{localState.city}</p>
        <p>{localState.state}</p>
        <label>Tyeps of Causes</label>
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
        <label>Volunteer Requirments</label>
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
        <label>Volunteers Needed</label>
        <p>{localState.numberOfVolunteers}</p>
        <label>Interests</label>
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
        <label>Phone Number</label>
        <p>{localState.phoneNumber}</p>
        <label>Point of Contact</label>
        <p>{localState.firstName}</p>
        <p>{localState.lastName}</p>
        <p>{localState.email}</p>
        <label>Date</label>
        <p>{localState.date.format('LL')}</p>
        {localState.recurringInfo.recurringEvent === 'Yes' && (
          <RecurringInfoReview localState={localState} />
        )}
        <label>Start Time</label>
        <p>{localState.startTime.format('LT')}</p>
        <label>End Time</label>
        <p>{localState.endTime.format('LT')}</p>
        <label>Event Details</label>
        <p>{localState.eventDetails}</p>
        <label>Website</label>
        <p>{localState.website}</p>
        <label>Other Notes</label>
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

const StyledDiv = styled.div``;

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
