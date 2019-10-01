import React from 'react';
import styled from 'styled-components';
import { WrappedAntForm, AntTimePicker } from '../../styled';
import { Checkbox } from 'antd';

export const ThirdPart = ({ clickNext, storedData, clickPrevious }) => {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekends = ['Saturday', 'Sunday'];
  return (
    <DivForStyling>
      <WrappedAntForm
        layout={'vertical'}
        onSubmit={clickNext}
        cancelButton
        handleCancel={clickPrevious}
        autofill={storedData}
        submitButton
        submitButtonText={'Next'}
        cancelButtonText={'Previous'}
      >
        <h4>What are your hours of operation?</h4>
        <div className="daysOfWeekPicker">
          <Checkbox.Group
            notRequired
            className="weekdays-group"
            noLabel
            name="weekdays"
            noLabel
            options={weekdays}
          />
          <Checkbox.Group
            notRequired
            noLabel
            name="weekends"
            noLabel
            options={weekends}
          />
        </div>
        <div className="timeOfDayPicker">
          <AntTimePicker
            notRequired
            noLabel
            name="Start Time"
            noLabel
            use12Hours
            format={'h:mm a'}
          />
          <span>to</span>
          <AntTimePicker
            notRequired
            noLabel
            name="End Time"
            noLabel
            use12Hours
            format={'h:mm a'}
          />
        </div>
      </WrappedAntForm>
    </DivForStyling>
  );
};

const DivForStyling = styled.div`
  .daysOfWeekPicker {
    display: flex;
    justify-content: space-between;

    .weekdays-group {
      display: flex;
      flex-direction: column;
    }
  }
`;
export default ThirdPart;
