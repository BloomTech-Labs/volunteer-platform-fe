import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

import { StyledButton } from '../../styled';

const RecurRegister = () => {
  return (
    <a href={'#recurSignUp'}>
      <StyledButton width={'20rem'}>Register</StyledButton>
    </a>
  );
};

const NormalRegister = ({ localState, auth, register, unRegister }) => {
  return (
    <>
      {auth.googleAuthUser &&
      localState.registeredVolunteers.includes(auth.googleAuthUser.uid) ? (
        <StyledButton width={'20rem'} onClick={() => unRegister()}>
          Cancel Registration
        </StyledButton>
      ) : (
        <StyledButton width={'20rem'} onClick={() => register()}>
          Register
        </StyledButton>
      )}
    </>
  );
};

export const FirstRow = ({ localState, auth, register, unRegister }) => {
  let isRecurring = localState.recurringInfo;
  return (
    <StyledFirstRow>
      <div className="left-col">
        <h2>{localState.nameOfEvent}</h2>
        <h4>{localState.orgName}</h4>
        <span>
          {isRecurring && '*This is a recurring event. The next date is:'}
        </span>
        <h5>
          {localState.startTimeStamp &&
            moment.unix(localState.startTimeStamp).format('LL')}
        </h5>
        <h5>
          {localState.startTimeStamp &&
            `${moment.unix(localState.startTimeStamp).format('LT')} -
              ${moment.unix(localState.endTimeStamp).format('LT')}`}
        </h5>
      </div>

      <div className="right-col">
        {isRecurring ? (
          <RecurRegister />
        ) : (
          <NormalRegister
            localState={localState}
            auth={auth}
            register={register}
            unRegister={unRegister}
          />
        )}
        <div className="needed-vols">
          <span>Needed:</span>
          <h2>
            {localState.numberOfVolunteers - isRecurring
              ? localState.registeredVolunteers[0].length
              : localState.registeredVolunteers.length}
          </h2>
          <span>volunteers</span>
        </div>
      </div>
    </StyledFirstRow>
  );
};

const StyledFirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto 24px;
  min-height: 150px;

  h2,
  h4,
  h5 {
    margin: 0;
  }
  .left-col,
  .right-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .needed-vols {
    background: white;
    width: 20rem;
    display: flex;
    flex-direction: column;
    height: fit-content;
    align-items: center;
    border-radius: 4px;
  }
`;

export default FirstRow;
