import React, { useEffect } from 'react';
import { StyledButton, StyledCancelButton } from '../../../styled';
import { Icon, Tag } from 'antd';
import styled from 'styled-components';
import { confirmModal } from '../../../styled';
import RecurringInfoReview from './RecurringInfoReview';

export const CreateEventReviewList = props => {
  const { localState, handleReviewSubmit, cancelForm, setEdit } = props;

  const editForm = () => {
    setEdit(true);
  };

  const confirmForm = () => {
    const confirmFormModal = confirmModal({
      title: 'Creating an Event',
      content: 'Please ensure all the information is correct.',
      onOk: () => handleReviewSubmit(),
    });
    confirmFormModal();
  };
  console.log('local', localState);
  return (
    <StyledReviewDiv className={'styledReviewDiv'}>
      <div>
        <StyledButtons>
          <div className="icon" onClick={editForm}>
            <Icon type="edit" />
          </div>
        </StyledButtons>
      </div>

      <div className={''}>
        <div className={'text'}>
          <p className={'title'}>Event Name</p>
          <p>{localState.nameOfEvent}</p>
        </div>
        <div>
          <p className={'title'}>Address</p>
          <p>{localState.address}</p>
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
          <p className={'title'}>Point of Contact</p>
          <p>{localState.fullName}</p>
          <p>{localState.email}</p>
          <p>{localState.phoneNumber}</p>
        </div>
        <div>
          <p className={'title'}>When is the event?</p>
          <p>{localState.date.format('LL')}</p>
        </div>

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
          <p className={''}>Other Notes</p>
          <p>{localState.otherNotes}</p>
        </div>
        {localState.recurringInfo.recurringEvent === 'Yes' && (
          <RecurringInfoReview localState={localState} />
        )}
      </div>
      <div
        className="buttonStyles"
        style={{ marginRight: '0px', marginLeft: '0px' }}
      >
        <div>
          <StyledCancelButton key="cancel" type="second" onClick={cancelForm}>
            Cancel
          </StyledCancelButton>
        </div>
        <div>
          <StyledButton key="submit" type="primary" onClick={confirmForm}>
            Confirm
          </StyledButton>
        </div>
      </div>
    </StyledReviewDiv>
  );
};

const StyledReviewDiv = styled.div`
  .review-wrapper {
    display: flex;

    .to {
      margin: 0px 5px;
    }
  }
  .buttonStyles {
    margin-right: 0px;
    margin-left: 0px;
  }
`;

const StyledButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .icon {
    display: flex;
    font-size: 2rem;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
`;

export default CreateEventReviewList;
