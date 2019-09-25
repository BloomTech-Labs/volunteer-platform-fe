import React, { useState } from 'react';
import { Drawer, Select, Checkbox, Radio, DatePicker, InputNumber } from 'antd';
import {
  StyledButton,
  StyledInputNumber,
  StyledSwitch,
  StyledSelect,
  WrappedAntdForm,
  AntdInputNumber,
  AntdDatePicker,
  AntdSelect,
} from '../styled';
import moment from 'moment';

const { Option } = Select;

export const RecurringEvent = props => {
  const { dateFormat, setState, localState } = props;
  const [formState, setFormState] = useState({});

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
    setState({
      ...localState,
      reccurringCheckbox: checked.target.value,
    });
  };

  const handleRepeatPeriod = period => {
    if (period === 'Custom') {
      setFormState({
        ...formState,
        reccurringBoolean: true,
      });
    }
    setState({
      ...localState,
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
      {localState.reccurringCheckbox === 'Yes' && (
        <StyledSelect
          style={{ width: 200 }}
          defaultValue="Does not Repeat"
          name={'Repeat Time Period'}
          value={localState.repeatTimePeriod}
          onChange={handleRepeatPeriod}
        >
          {repeatTimePeriod}
        </StyledSelect>
      )}

      <Drawer
        title="Add a reccurring event"
        width={720}
        closable={false}
        placement="left"
        onClose={closeDrawer}
        visible={formState.reccurringBoolean}
      >
        <WrappedAntdForm onSubmit={handleSubmit}>
          <AntdInputNumber
            name={'Repeat every'}
            style={{ width: 100 }}
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
          <AntdSelect
            style={{ width: 100 }}
            defaultValue="Week"
            name={'Repeat Time Period'}
          >
            {periodOfTime}
          </AntdSelect>
          <Checkbox.Group
            name={'Days'}
            options={dayOptions}
            // onChange={handleDays}
            // value={formState.reccurringEventDays}
          />
          <label>Ends</label>
          <Radio.Group name={'Occurrences'}>
            <Radio value={'Never'}>Never</Radio>
            <Radio value={'On'}>On</Radio>
            <AntdDatePicker
              name={'Reccurring End Date'}
              defaultValue={moment(moment(), dateFormat)}
              format={dateFormat}
              //disabled={formState.ocurrences === 'On' ? false : true}
            />
            <Radio value={'After'}>After</Radio>
            <InputNumber
              style={{ width: 50 }}
              name={'Occurrence Number'}
              min={0}
              // disabled={formSat.ocurrences === 'After' ? false : true}
            />
          </Radio.Group>

          <StyledButton type="secondary" onClick={closeDrawer}>
            Back
          </StyledButton>
        </WrappedAntdForm>
      </Drawer>
    </div>
  );
};

export default RecurringEvent;
