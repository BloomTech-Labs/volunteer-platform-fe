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

      <div className={'review-wrapper'}>
        <div>
          <p className={'title'}>Event Name</p>
          <p>{localState.nameOfEvent}</p>
        </div>
        <div>
          <p className={'title'}>Location</p>
          <p>{localState.streetAddress}</p>
        </div>

        <div className={'city-states-input'}>
          <p>{localState.city}</p>
          <p>{localState.state}</p>
        </div>

        <div>
          <p className={'title'}>Tyeps of Causes</p>
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
        </div>
        <div>
          <p className={'title'}>Volunteer Requirments</p>
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
        </div>
        <div>
          <p className={'title'}>Volunteers Needed</p>
          <p>{localState.numberOfVolunteers}</p>
        </div>
        <div>
          <p className={'title'}>Interests</p>
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
        </div>
        <div>
          <p className={'title'}>Phone Number</p>
          <p>{localState.phoneNumber}</p>
        </div>
        <div>
          <p className={'title'}>Point of Contact</p>
          <p>{localState.firstName}</p>
          <p>{localState.lastName}</p>
          <p>{localState.email}</p>
        </div>
        <div>
          <p className={'title'}>When is the event?</p>
          <p>{localState.date.format('LL')}</p>
        </div>

        {localState.recurringInfo.recurringEvent === 'Yes' && (
          <RecurringInfoReview localState={localState} />
        )}
        <p className={'title'}>What time?</p>

        <div className={'to'}>
          <p>
            {localState.startTime.format('LT')} to{' '}
            {localState.startTime.format('LT')}
          </p>
        </div>

        <div>
          <p className={'title'}>Event Details</p>
          <p>{localState.eventDetails}</p>
        </div>
        <div>
          <p className={'title'}>Website</p>
          <p>{localState.website}</p>
        </div>
        <div>
          <p className={'title'}>Other Notes</p>
          <p>{localState.otherNotes}</p>
        </div>
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

  .review-wrapper {
    display: flex;
    justify-content: flex-start;

    .to {
      margin: 0px 5px;
    }
  }
`;

export default CreateEventReviewList;
