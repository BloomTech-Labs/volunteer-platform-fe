import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { StyledButton } from '../../styled';

const RecurRegister = () => {
  return (
    <a
      onClick={() =>
        document
          .getElementById('recurSignUp')
          .scrollIntoView({ behavior: 'smooth' })
      }
    >
      <StyledButton width={'12rem'}>Register</StyledButton>
    </a>
  );
};

const NormalRegister = ({ localState, auth, register, unRegister }) => {
  return (
    <>
      {auth.googleAuthUser &&
      localState.registeredVolunteers.some(
        item => item.userId === auth.googleAuthUser.uid
      ) ? (
        <StyledButton width={'100%'} onClick={e => unRegister(e)}>
          Cancel Registration
        </StyledButton>
      ) : (
        <StyledButton width={'100%'} onClick={e => register(e)}>
          Register
        </StyledButton>
      )}
    </>
  );
};

const RecurDate = ({ localState, selectedDate }) => {
  return (
    <>
      <h5>{moment.unix(selectedDate).format('LL')}</h5>
      <h5>
        {`${moment.unix(selectedDate).format('LT')} -
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

export const FirstRow = ({
  localState,
  auth,
  register,
  unRegister,
  selectedDate,
  numberOfVolunteers,
}) => {
  let isRecurring = localState.recurringInfo;

  let signedUp = isRecurring
    ? (localState.registeredVolunteers[selectedDate] || []).length
    : localState.registeredVolunteers.length;

  return (
    <StyledFirstRow type='flex' justify='space-between' align='stretch'>
      <div className="left-col" >
        <h2>{localState.nameOfEvent}</h2>
        <h4>{localState.orgName}</h4>
        <span>
          {isRecurring && '*This is a recurring event. The next date is:'}
        </span>
        {isRecurring ? (
          <RecurDate localState={localState} selectedDate={selectedDate} />
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
          <h2>{numberOfVolunteers - signedUp}</h2>
          <span>volunteers</span>
        </div>
      </div>
    </StyledFirstRow>
  );
};

const StyledFirstRow = styled(Row)`
  && {
    background: transparent;
    border: none;
    box-shadow: none;
    width: 100%;
    min-height: 150px;
    margin: 2rem 0;
    flex-wrap: nowrap;
  }

  h2,
  h4,
  h5 {
    margin: 0;
  }

  .left-col,
  .right-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }

  .right-col {
    align-items: center;
  }

  .needed-vols {
    background: white;
    width: 16rem;
    display: flex;
    flex-direction: column;
    height: fit-content;
    align-items: center;
    border-radius: 4px;
    padding: 0.2rem 0;
  }
`;

export default FirstRow;
