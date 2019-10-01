import React from 'react';
import styled from 'styled-components';
import { WrappedAntForm, AntTimePicker } from '../../styled';
import { Checkbox } from 'antd';

export const ThirdPart = ({ clickNext, storedData, clickPrevious }) => {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekends = ['Saturday', 'Sunday'];
  return (
    <WrappedAntForm
      layout={'vertical'}
      onSubmit={clickNext}
      cancelButton
      handleCancel={clickPrevious}
      autofill={storedData}
      buttonText={'Next'}
      cancelButtonText={'Previous'}
    >
      <h4>What are your hours of operation?</h4>
      <div className="daysOfWeekPicker">
        <Checkbox.Group name="weekdays" noLabel options={weekdays} />
        <Checkbox.Group name='weekends' noLabel options={weekends} />
      </div>
      <div className="timeOfDayPicker">
        <AntTimePicker  name='Start Time' noLabel use12Hours format={'h:mm a'} />
        <span>to</span>
        <AntTimePicker name='End Time' noLabel use12Hours format={'h:mm a'} />
      </div>
    </WrappedAntForm>
  );
};

export default ThirdPart;
