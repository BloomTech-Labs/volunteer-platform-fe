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
      localState.registeredVolunteers.some(item => item.userId === auth.googleAuthUser.uid) ? (
        <StyledButton width={'100%'} onClick={(e) => unRegister(e)}>
          Cancel Registration
        </StyledButton>
      ) : (
        <StyledButton width={'100%'} onClick={(e) => register(e)}>
          Register
        </StyledButton>
      )}
    </>
  );
};

const RecurDate = ({ localState, first, selectedDate }) => {
  return (
    <>
      <h5>{moment.unix(selectedDate).format('LL')}</h5>
      <h5>
        {`${moment.unix(first).format('LT')} -
            ${moment.unix(localState.endTimeStamp).format('LT')}`}
      </h5>
    </>
  );
};

const NormalDate = ({ localState }) => {
  return (
    <>
      <h5>
        {localState.startTimeStamp &&
          moment.unix(localState.startTimeStamp).format('LL')}
      </h5>
      <h5>
        {localState.startTimeStamp &&
          `${moment.unix(localState.startTimeStamp).format('LT')} -
              ${moment.unix(localState.endTimeStamp).format('LT')}`}
      </h5>
    </>
  );
};

export const FirstRow = ({ localState, auth, register, unRegister, selectedDate, numOfVol, recurDate }) => {
  let isRecurring = localState.recurringInfo;
  let first = Object.keys(localState.registeredVolunteers).find(
    date => moment().unix() - date < 0
  );

  let signedUp = isRecurring
  ? (localState.registeredVolunteers[first] || []).length
  : localState.registeredVolunteers.length;

  return (
    <StyledFirstRow>
      <div className="left-col">
        <h2>{localState.nameOfEvent}</h2>
        <h4>{localState.orgName}</h4>
        <span>
          {isRecurring && '*This is a recurring event. The next date is:'}
        </span>
        {isRecurring ? (
          <RecurDate localState={localState} first={first} selectedDate={selectedDate}/>
        ) : (
          <NormalDate localState={localState} />
        )}
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
          <h2>{numOfVol - signedUp}</h2>
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
