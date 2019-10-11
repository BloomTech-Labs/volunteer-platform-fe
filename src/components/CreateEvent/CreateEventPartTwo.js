import React, { useState, useEffect } from 'react';
import { Input, Form, DatePicker, TimePicker, Tooltip, Icon } from 'antd';

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
    date,
    startTime,
    endTime,
    dynamicDates,
    recurringInfo,
    phoneNumber,
  } = localState;

  const [error, setError] = useState('');
  useEffect(() => {
    window.scrollTo(0, 100);
  }, []);

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
    if (firstName && lastName && phoneNumber && date) return true;
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

  return (
    <StyledDiv className={'styledDiv'}>
      <h4>Who is your point of contact?</h4>
      <Form layout={'vertical'} onSubmit={() => checkedRequired()}>
        <div className={'error-flex'}>
          <Form.Item label={'First Name'} required>
            <div className={'input'}>
              <Input
                name={'firstName'}
                value={firstName}
                placeholder="First Name"
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div>
              {error && !firstName && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
            </div>
          </Form.Item>
        </div>
        <div className={'error-flex'}>
          <Form.Item label={'Last Name'} required>
            <div className={'input'}>
              <Input
                name={'lastName'}
                value={lastName}
                placeholder="Last Name"
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div>
              {error && !lastName && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
            </div>
          </Form.Item>
        </div>
        <div className={'error-flex'}>
          <Form.Item label={'Phone Number'} required>
            <div className={'input'}>
              <Input
                name={'phoneNumber'}
                value={phoneNumber}
                placeholder="Phone Number"
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div>
              {error && !phoneNumber && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
            </div>
          </Form.Item>
        </div>
        <h4>When is the event?</h4>
        <div className={'date-input'}>
          <Form.Item label={'Date of Event'} required>
            <div>
              <DatePicker
                name={'date'}
                value={date}
                disabledDate={current =>
                  current && current < moment().endOf('day')
                }
                format={'MM/DD/YYYY'}
                onChange={value => handleDynmaicDate(value)}
              />
            </div>
            {error && !date && (
              <span className="error-message error-span left-aligned">
                {error}
              </span>
            )}
          </Form.Item>
        </div>

        <div className={'tooltip-recurring'}>
          <div>
            <h4>Is This a Recurring Event?</h4>
          </div>
          <div style={{ marginLeft: '5px' }}>
            <Tooltip
              title={
                localState.date
                  ? 'Please select yes if this is a recurring event.'
                  : 'Please select date of event first.'
              }
            >
              <Icon type="question-circle-o" />
            </Tooltip>
          </div>
        </div>
        <div className={'recurringWrapper'}>
          <RecurringEvent
            localState={localState}
            setLocalState={setLocalState}
            dynamicDates={dynamicDates}
            error={error}
            setError={setError}
          />
        </div>

        <h4>What time?</h4>
        <div className={'time-wrapper'}>
          <Form.Item label={'Start Time'} required>
            <div className={'time-input inline'}>
              <TimePicker
                name={'startTime'}
                use12Hours
                value={startTime}
                format={'h:mm a'}
                defaultValue={moment('00:00:00', 'HH:mm')}
                onChange={value => handleChange('startTime', value)}
              />
            </div>
          </Form.Item>
          <div className="to-p">
            <p>to</p>
          </div>
          <div>
            <Form.Item label={'End Time'} required>
              <div className={'time-input inline'}>
                <TimePicker
                  name={'endTime'}
                  use12Hours
                  value={endTime}
                  format={'h:mm a'}
                  defaultValue={moment('00:00:00', 'HH:mm')}
                  onChange={value => handleChange('endTime', value)}
                />
              </div>
            </Form.Item>
          </div>
        </div>
        <div className="buttonStyles">
          <StyledCancelButton
            onClick={handlePageBack}
            key="back"
            type="secondary"
          >
            Back
          </StyledCancelButton>
          <StyledButton type="primary" key="next" onClick={checkedRequired}>
            Next
          </StyledButton>
        </div>
      </Form>
    </StyledDiv>
  );
};
const StyledDiv = styled.div`
  .tooltip-recurring {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .date-input {
    label {
      margin-left: 220px;
    }
  }
  .to-p {
    margin: 35px 20px 0px;
  }
`;

export default CreateEventPartTwo;
