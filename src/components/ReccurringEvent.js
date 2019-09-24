import React, { useState } from 'react';
import { Drawer, Select, Checkbox, Radio, DatePicker, InputNumber } from 'antd';
import {
  StyledButton,
  StyledInputNumber,
  StyledSwitch,
  StyledSelect,
  WrappedAntdForm,
} from '../styled';
import AntdCheckbox from '../styled/AntdCheckbox';
import AntdInputNumber from '../styled/AntdInputNumber';

import moment from 'moment';

const { Option } = Select;

const ReccurringEvent = props => {
  const { dateFormat, setState, localState } = props;
  const [formState, setFormState] = useState({
    reccurringCheckbox: 'No',
  });

  const dayOptions = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const timePeriodOptions = ['Week', 'Month', 'Annual'];
  const repeatTimePeriodOptions = [
    'Does not repeat',
    'Daily',
    'Weekly on insert day',
    'Monthly on date',
    'Annually on date',
    'Everyone Weekday',
    'Custom',
  ];

  const handleCheckBox = checked => {
    setFormState({
      ...formState,
      reccurringCheckbox: checked.target.value,
    });
  };

  const handleRepeatPeriod = period => {
    setFormState({
      ...formState,
      repeatTimePeriod: period,
    });
  };

  const handleSubmit = () => {
    setState({
      ...localState,
      formState,
    });
    setFormState({
      reccurringBoolean: false,
    });
  };
  const closeDrawer = () => {
    setFormState({
      ...formState,
      reccurringBoolean: false,
    });
  };

  const handleRepeat = number => {
    setFormState({
      ...formState,
      repeatNumber: number,
    });
  };

  const handleDays = days => {
    setFormState({
      ...formState,
      reccurringEventDays: days,
    });
  };

  const handleTimePeriod = timePeriod => {
    setFormState({
      ...formState,
      repeatTimePeriod: timePeriod,
    });
  };

  const handleOccurrences = e => {
    setFormState({
      ...formState,
      ocurrences: e.target.value,
    });
  };

  const handleDatePicker = datestring => {
    setFormState({
      ...formState,
      reccurringEndDate: datestring,
    });
  };

  const handleOccurrenceNumber = number => {
    setFormState({
      ...formState,
      occurrenceNumber: number,
    });
  };

  const periodOfTime = timePeriodOptions.map(period => {
    return (
      <Option key={period} value={period}>
        {period}
      </Option>
    );
  });

  const repeatTimePeriod = repeatTimePeriodOptions.map(period => {
    return (
      <Option key={period} value={period}>
        {period}
      </Option>
    );
  });

  return (
    <div>
      <Radio.Group onChange={handleCheckBox}>
        <Radio value={'Yes'}>Yes</Radio>
        <Radio value={'No'}>No</Radio>
      </Radio.Group>
      {formState.reccurringCheckbox === 'Yes' && (
        <StyledSelect
          style={{ width: 200 }}
          defaultValue="Does not Repeat"
          name={'Repeat Time Period'}
          value={formState}
          onChange={handleRepeatPeriod}
        >
          {repeatTimePeriod}
        </StyledSelect>
      )}

      {formState.repeatTimePeriod === 'Custom' &&
        setFormState({ reccurringBoolean: true })}

      <Drawer
        title="Add a reccurring event"
        width={720}
        closable={false}
        placement="left"
        onClose={closeDrawer}
        visible={formState.reccurringBoolean}
      >
        <WrappedAntdForm onSubmit={handleSubmit}>
          <StyledInputNumber
            name={'Repeat every'}
            style={{ width: 100 }}
            onChange={handleRepeat}
            type="number"
            value={formState.repeatNumber}
            min={0}
            max={
              formState.repeatTimePeriod === 'Week'
                ? 7
                : 'Month'
                ? 31
                : 'Annual'
                ? 365
                : 365
            }
          />
          <StyledSelect
            style={{ width: 100 }}
            defaultValue="Week"
            name={'Repeat Time Period'}
            value={formState.repeatTimePeriod}
            onChange={handleTimePeriod}
          >
            {periodOfTime}
          </StyledSelect>
          <Checkbox.Group
            options={dayOptions}
            onChange={handleDays}
            value={formState.reccurringEventDays}
          />
          <label>Ends</label>
          <Radio.Group
            name={'Occurrences'}
            value={formState.ocurrences}
            onChange={handleOccurrences}
          >
            <Radio value={'Never'}>Never</Radio>
            <Radio value={'On'}>On</Radio>
            <DatePicker
              name={'Reccurring End Date'}
              onChange={handleDatePicker}
              defaultValue={moment(moment(), dateFormat)}
              format={dateFormat}
              disabled={formState.ocurrences === 'On' ? false : true}
            />
            <Radio value={'After'}>After</Radio>
            <InputNumber
              style={{ width: 50 }}
              name={'Occurrence Number'}
              onChange={handleOccurrenceNumber}
              min={0}
              value={formState.occurrenceNumber}
              disabled={formState.ocurrences === 'After' ? false : true}
            />
          </Radio.Group>

          <StyledButton
            type="secondary"
            htmlType="submit"
            onClick={closeDrawer}
          >
            Back
          </StyledButton>
        </WrappedAntdForm>
      </Drawer>
    </div>
  );
};

export default ReccurringEvent;
