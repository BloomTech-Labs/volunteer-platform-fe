import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Col } from 'antd';
import { StyledButton, StyledCard } from '../../styled';

const RecurRegister = () => {
  return (
    <a href={'#recurSignUp'}>
      <StyledButton width={'100%'}>Register</StyledButton>
    </a>
  );
};

const NormalRegister = ({ localState, auth, register, unRegister }) => {
  return (
    <>
      {auth.googleAuthUser &&
      localState.registeredVolunteers.includes(auth.googleAuthUser.uid) ? (
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

const RecurDate = ({ localState, first }) => {
  return (
    <>
      <h5>{moment.unix(first).format('LL')}</h5>
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

export const FirstRow = ({ localState, auth, register, unRegister }) => {
  let isRecurring = localState.recurringInfo;
  let first = Object.keys(localState.registeredVolunteers).find(
    date => moment().unix() - date < 0
  );
  let signedUp = isRecurring
    ? (localState.registeredVolunteers[first] || []).length
    : localState.registeredVolunteers.length;

  return (
    <StyledFirstRow>
      <Col className="left-col" span={18}>
        <h2>{localState.nameOfEvent}</h2>
        <h4>{localState.orgName}</h4>
        <span>
          {isRecurring && '*This is a recurring event. The next date is:'}
        </span>
        {isRecurring ? (
          <RecurDate localState={localState} first={first} />
        ) : (
          <NormalDate localState={localState} />
        )}
      </Col>

      <Col className="right-col" span={6}>
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
          <h2>{localState.numberOfVolunteers - signedUp}</h2>
          <span>volunteers</span>
        </div>
      </Col>
    </StyledFirstRow>
  );
};

const StyledFirstRow = styled(StyledCard)`
  min-height: 150px;
  width: 100%;
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
    border: 2px solid ${({theme}) => theme.gray3}
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    margin-top: 15px;
  }
`;

export default FirstRow;
