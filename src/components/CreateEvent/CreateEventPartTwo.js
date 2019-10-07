import React, { useState } from 'react';
import { AntInput, AntTimePicker, StyledCard } from '../../styled';
import { Select, Input, Form, DatePicker, TimePicker } from 'antd';
import RecurringEvent from './RecurringEvent';
import moment from 'moment';
import styled from 'styled-components';
import { formLayouts } from '../../utility/formLayouts';
import { StyledCancelButton, StyledButton } from '../../styled';

export const CreateEventPartTwo = props => {
  const {
    localState,
    setLocalState,
    handlePageBack,
    handlePageForward,
    handleChange,
  } = props;

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

  return (
    <StyledDiv className={'flex center'}>
      <label>Who is your point of contact?</label>
      <Form layout={'vertical'} onSubmit={''}>
        <div>
          <Form.Item label={'First Name'} required>
            <Input
              name={'firstName'}
              value={localState.firstName}
              placeholder="First Name"
              onChange={e => handleChange(e.target.name, e.target.value)}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item label={'Last Name'} required>
            <Input
              name={'lastName'}
              value={localState.lastName}
              placeholder="Last Name"
              onChange={e => handleChange(e.target.name, e.target.value)}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item label={'Email'} required>
            <Input
              name={'email'}
              value={localState.email}
              placeholder="Email"
              onChange={e => handleChange(e.target.name, e.target.value)}
            />
          </Form.Item>
        </div>
        <label>When is the event?</label>
        <div>
          <Form.Item required>
            <DatePicker
              name={'date'}
              value={localState.date}
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
            dynamicDates={localState.dynamicDates}
          />
        </div>

        <label>What time ?</label>
        <div className={'timeWrapper'}>
          <div>
            <Form.Item required>
              <TimePicker
                name={'startTime'}
                use12Hours
                value={localState.startTime}
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
                value={localState.endTime}
                format={'h:mm a'}
                defaultOpenValue={moment('00:00:00', 'HH:mm')}
                onChange={value => handleChange('startTime', value)}
              />
            </Form.Item>
          </div>
        </div>
        <div className="buttonStyles">
          <StyledCancelButton onClick={() => handlePageBack()} type="primary">
            Back
          </StyledCancelButton>
          <StyledButton type="primary" onClick={() => handlePageForward()}>
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
