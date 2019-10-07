import React, { useState } from 'react';
import { Input, Form, DatePicker, TimePicker } from 'antd';
import RecurringEvent from './RecurringEvent';
import moment from 'moment';
import styled from 'styled-components';

import { StyledCancelButton, StyledButton } from '../../styled';

export const CreateEventPartTwo = props => {
  const {
    localState,
    setLocalState,
    handlePageBack,
    handlePageForward,
    handleChange,
  } = props;
  const {
    firstName,
    lastName,
    email,
    date,
    startTime,
    endTime,
    dynamicDates,
    recurringInfo,
  } = localState;

  const [error, setError] = useState('');

  //Mapping through tags for antd select

  const handleDynmaicDate = date => {
    const dynamicDay = date._d.toString().split(' ')[0];
    const dynamicYear = date._d
      .toString()
      .split(' ')
      .slice(1, 3)
      .join(' ');
    const dynamicNumber = date._d
      .toString()
      .split(' ')
      .slice(2, 3)
      .join(' ');
    let dayAsNum = date._d.toString().split(' ')[2];

    let count = 1;
    while (dayAsNum > 7) {
      dayAsNum -= 7;
      count++;
    }
    let nth = { 1: 'First', 2: 'Second', 3: 'Third', 4: 'Fourth', 5: 'Fifth' };

    setLocalState({
      ...localState,
      date: date,
      dynamicDates: {
        ...localState.dynamicDates,
        dynamicDay,
        dynamicYear,
        dynamicNumber,
        dynamicNth: nth[count],
      },
    });
  };

  const isFormValid = () => {
    if (firstName && lastName && email) return true;
  };

  const isRecurringValid = () => {
    if (
      recurringInfo.recurringEvent === 'Yes' &&
      !recurringInfo.repeatTimePeriod
    ) {
      return false;
    } else {
      return true;
    }
  };

  const checkedRequired = () => {
    if (isFormValid()) {
      if (isRecurringValid()) {
        setError('');
        handlePageForward();
      } else {
        setError('This field is required.');
      }
    } else {
      setError('This field is required.');
    }
  };
  console.log(error);

  return (
    <StyledDiv className={'flex center'}>
      <label>Who is your point of contact?</label>
      <Form layout={'vertical'} onSubmit={() => checkedRequired()}>
        <div>
          <Form.Item label={'First Name'} required>
            <Input
              name={'firstName'}
              value={firstName}
              placeholder="First Name"
              onChange={e => handleChange(e.target.name, e.target.value)}
            />
            {error && !firstName && (
              <span className="error-message error-span left-aligned">
                {error}
              </span>
            )}
          </Form.Item>
        </div>
        <div>
          <Form.Item label={'Last Name'} required>
            <Input
              name={'lastName'}
              value={lastName}
              placeholder="Last Name"
              onChange={e => handleChange(e.target.name, e.target.value)}
            />
            {error && !lastName && (
              <span className="error-message error-span left-aligned">
                {error}
              </span>
            )}
          </Form.Item>
        </div>
        <div>
          <Form.Item label={'Email'} required>
            <Input
              name={'email'}
              value={email}
              placeholder="Email"
              onChange={e => handleChange(e.target.name, e.target.value)}
            />
            {error && !email && (
              <span className="error-message error-span left-aligned">
                {error}
              </span>
            )}
          </Form.Item>
        </div>
        <label>When is the event?</label>
        <div>
          <Form.Item required>
            <DatePicker
              name={'date'}
              value={date}
              disabledDate={current =>
                current && current < moment().endOf('day')
              }
              format={'MM/DD/YYYY'}
              onChange={value => handleDynmaicDate(value)}
            />
          </Form.Item>
        </div>

        <label>Is This a Recurring Event?</label>
        <div className={'recurringWrapper'}>
          <RecurringEvent
            localState={localState}
            setLocalState={setLocalState}
            dynamicDates={dynamicDates}
            error={error}
            setError={setError}
          />
        </div>

        <label>What time ?</label>
        <div className={'timeWrapper'}>
          <div>
            <Form.Item required>
              <TimePicker
                name={'startTime'}
                use12Hours
                value={startTime}
                format={'h:mm a'}
                defaultOpenValue={moment('00:00:00', 'HH:mm')}
                onChange={value => handleChange('startTime', value)}
              />
            </Form.Item>
          </div>
          <div className="to">
            <p className="to">to</p>
          </div>
          <div>
            <Form.Item required>
              <TimePicker
                name={'endTime'}
                use12Hours
                value={endTime}
                format={'h:mm a'}
                defaultOpenValue={moment('00:00:00', 'HH:mm')}
                onChange={value => handleChange('startTime', value)}
              />
            </Form.Item>
          </div>
        </div>
        <div className="buttonStyles">
          <StyledCancelButton
            onClick={() => handlePageBack()}
            key="back"
            type="secondary"
          >
            Back
          </StyledCancelButton>
          <StyledButton
            type="primary"
            key="next"
            onClick={() => checkedRequired()}
          >
            Next
          </StyledButton>
        </div>
      </Form>
    </StyledDiv>
  );
};
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  .timeWrapper {
    display: flex;
  }

  .to {
    margin: 15px 10px 0px 10px;
  }
`;

export default CreateEventPartTwo;
