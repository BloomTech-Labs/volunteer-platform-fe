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
        <h5>1. Days of the week</h5>
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
            className="weekend-group"
            name="weekends"
            noLabel
            options={weekends}
          />
        </div>
        <h5>2. Operating Hours</h5>
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
  h5 {
    color: ${({ theme }) => theme.primary8};
    text-align: left;
    margin-left: 25%;
  }
  .daysOfWeekPicker {
    display: flex;
    justify-content: space-evenly;
    width: 50%;
    margin: 0 auto;
    height: 200px;

    .weekdays-group,
    .weekend-group {
      display: flex;
      height: 150px;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
    }

    .weekend-group {
      justify-content: space-between;
      height: 54px;
    }
  }

  .timeOfDayPicker {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 350px;
    margin: 0 auto;
    .ant-row {
      padding-bottom: 8px;
      margin: 0;
    }
    span {
      color: ${({ theme }) => theme.primary8};
    }
  }
`;
export default ThirdPart;
