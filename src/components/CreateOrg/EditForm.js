import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Tooltip, Checkbox, TimePicker, Icon } from 'antd';
import styled from 'styled-components';
import { causeAreas } from '../../reducers/initialState';
import { StyledButton, StyledCancelButton } from '../../styled';
import moment from 'moment';
const { Option } = Select;
const { TextArea } = Input;

export const EditForm = ({ storedData, cancelForm, setBackToReview }) => {
  const [localState, setLocalState] = useState({ ...storedData });
  const [showCustomOptions, setShowCustomOptions] = useState(false);

  const weekdaysArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekendsArr = ['Saturday', 'Sunday'];
  const options = [
    'Weekdays',
    'Weekends (Fri, Sat, Sun)',
    'Sat/Sun Only',
    'Custom',
  ];

  const handleChange = (name, value) => {
    setLocalState({ ...localState, [name]: value });
  };

  useEffect(() => {
    if (localState['weekday-options'] === 'Custom') setShowCustomOptions(true);
    else setShowCustomOptions(false);
  }, [localState['weekday-options']]);

  return (
    <>
      <StyledForm
        layout="vertical"
        onSubmit={() => setBackToReview(localState)}
      >
        <Form.Item label={'Name of Organization'}>
          <Input
            value={
              localState['nameOfOrganization'] || localState['organizationName']
            }
            onChange={e => handleChange(e.target.name, e.target.value)}
            name={'nameOfOrganization'}
          />
        </Form.Item>
        <Form.Item label={'Address'}>
          <Input
            value={localState['streetAddress']}
            onChange={e => handleChange(e.target.name, e.target.value)}
            name={'streetAddress'}
          />
          <Input
            value={localState['city']}
            onChange={e => handleChange(e.target.name, e.target.value)}
            name={'city'}
          />
          <Input
            value={localState['state']}
            onChange={e => handleChange(e.target.name, e.target.value)}
            name={'state'}
          />
        </Form.Item>
        <Form.Item
          label={
            <Tooltip
              title={'Select all cause areas that your organization helps.'}
            >
              Types of causes <Icon type="question-circle-o" />
            </Tooltip>
          }
        >
          <Select
            name={'typeOfCauses'}
            value={localState['typeOfCauses'] || localState['causeAreas']}
            onChange={value => handleChange('typeOfCauses', value)}
            showArrow
            mode={'multiple'}
          >
            {causeAreas.map(cause => (
              <Option key={cause}>{cause}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={'Point of Contacts'}></Form.Item>
        <Form.Item label={'Hours of Operation'}>
          <Select
            name="weekday-options"
            className="weekday-select"
            onChange={value => handleChange('weekday-options', value)}
            value={localState['weekday-options']}
          >
            {options.map(option => (
              <Option value={option}>{option}</Option>
            ))}
          </Select>
          {showCustomOptions && (
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
          )}
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
        </Form.Item>
        <Form.Item label={'About Your Organization'}>
          <TextArea
            name={'aboutUs'}
            value={localState['aboutUs']}
            onChange={value => handleChange('aboutUs', value)}
            autosize={{ minRows: 4, maxRows: 120 }}
          />
          <Input
            name={'website'}
            value={[localState['website']]}
            onChange={value => handleChange('website', value)}
          />
        </Form.Item>
      </StyledForm>
      <div className="buttonStyles">
        <StyledCancelButton onClick={cancelForm} type="primary">
          Cancel
        </StyledCancelButton>
        <StyledButton
          onClick={() => setBackToReview(localState)}
          type="primary"
        >
          Save and Review
        </StyledButton>
      </div>
    </>
  );
};

const StyledForm = styled(Form)``;
export default EditForm;
