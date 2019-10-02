import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Checkbox, Form, TimePicker } from 'antd';
import { StyledButton, StyledCancelButton } from '../../styled';

export const ThirdPart = ({ clickNext, storedData, clickPrevious }) => {
  const weekdaysArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekendsArr = ['Saturday', 'Sunday'];
  const [localState, setLocalState] = useState({ weekdays: [], weekends: [] });
  const [toggle, setToggle] = useState({ weekdays: false, weekends: false });
  useEffect(() => {
    if (toggle.weekdays)
      setLocalState({
        ...localState,
        weekdays: weekdaysArr,
      });
    else setLocalState({ ...localState, weekdays: [] });
  }, [toggle.weekdays]);

  useEffect(() => {
    if (toggle.weekends)
      setLocalState({
        ...localState,
        weekends: weekendsArr,
      });
    else setLocalState({ ...localState, weekends: [] });
  }, [toggle.weekends]);

  const handleChange = (name, value) => {
    setLocalState({ ...localState, [name]: value });
  };

  return (
    <DivForStyling>
      <Form layout={'vertical'} onSubmit={() => clickNext(localState)}>
        <h4>What are your hours of operation?</h4>
        <h5>1. Days of the week</h5>
        <div className="daysOfWeekPicker">
          <Checkbox.Group
            className="weekdays-group"
            value={localState.weekdays}
            onChange={value => handleChange('weekdays', value)}
            name="weekdays"
            options={weekdaysArr}
          />
          <Checkbox.Group
            className="weekend-group"
            value={localState.weekends}
            onChange={value => handleChange('weekends', value)}
            name="weekends"
            options={weekendsArr}
          />
        </div>
        <div className="special-options-div">
          <button
            type="button"
            onClick={() => setToggle({ ...toggle, weekdays: !toggle.weekdays })}
          >
            Weekdays
          </button>
          <button
            type="button"
            onClick={() => setToggle({ ...toggle, weekends: !toggle.weekends })}
          >
            Weekends
          </button>
        </div>
        <h5>2. Operating Hours</h5>
        <div className="timeOfDayPicker">
          <TimePicker
            name="startTime"
            value={localState['startTime']}
            onChange={value => handleChange('startTime', value)}
            use12Hours
            format={'h:mm a'}
            minuteStep={15}
          />
          <span>to</span>
          <TimePicker
            name="endTime"
            value={localState['endTime']}
            onChange={value => handleChange('endTime', value)}
            use12Hours
            format={'h:mm a'}
            minuteStep={15}
          />
        </div>
        <div className="buttonStyles">
          <StyledCancelButton onClick={clickPrevious} type="primary">
            Previous
          </StyledCancelButton>
          <StyledButton onClick={() => clickNext(localState)} type="primary">
            Next
          </StyledButton>
        </div>
      </Form>
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
  .ant-checkbox-checked > .ant-checkbox-inner {
    background: ${({ theme }) => theme.primary8};
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
  .special-options-div {
    width: 70%;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;

    button {
      background: ${({ theme, standard }) => !standard && theme.primary8};
      color: white;
      border-radius: 4px;
      font-family: Arvo;
      border: 0;
      font-size: 12px;
      padding: 5px 8px;
      cursor: pointer;

      :hover {
        background: ${props => props.theme.primary7};
      }
    }
  }
`;
export default ThirdPart;
