import React, { useState } from 'react';
import { Drawer, Select, Checkbox, Radio, DatePicker, InputNumber } from 'antd';
import {
  StyledButton,
  StyledSelect,
  WrappedAntForm,
  AntInputNumber,
  AntSelect,
} from '../styled';

import moment from 'moment';

const { Option } = Select;

export const RecurringEvent = props => {
  const { setState, localState } = props;
  const { dynamicDay, dynamicYear, dynamicNth, dynamicNumber } = localState;
  const [formState, setFormState] = useState({});

  const dayOptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const timePeriodOptions = ['Day', 'Week', 'Month'];

  const monthlyOptions = [
    `Monthly on day ${dynamicNumber}`,
    `Monthly on the ${dynamicNth} ${dynamicDay}`,
  ];

  const repeatTimePeriodOptions = [
    'Daily',
    'Every Weekday',
    `Weekly on ${dynamicDay}`,
  ];

  if (dynamicNth !== 'Fifth') {
    repeatTimePeriodOptions.push(`Monthly on the ${dynamicNth} ${dynamicDay} `);
  }

  repeatTimePeriodOptions.push(`Annually on ${dynamicYear}`);
  repeatTimePeriodOptions.push('Custom');

  const closeDrawer = () => {
    setFormState({
      ...formState,
      recurringBoolean: false,
    });
  };

  const handleCheckBox = checked => {
    setState({
      ...localState,
      recurringEvent: checked.target.value,
    });
  };

  const handleRepeatPeriod = period => {
    if (period === 'Custom') {
      setFormState({
        ...formState,
        recurringBoolean: true,
      });
    }
    setState({
      ...localState,
      recurringInfo: {
        ...localState.recurringInfo,
        repeatTimePeriod: period,
      },
    });
  };

  const handleDatePicker = date => {
    setState({
      ...localState,
      recurringInfo: {
        ...localState.recurringInfo,
        occurrenceEndDate: date,
      },
    });
  };
  const handleOccurrences = occurrence => {
    setState({
      ...localState,
      recurringInfo: {
        ...localState.recurringInfo,
        occurrenceEnds: occurrence.target.value,
      },
    });
  };
  const handleOccurrencesEndsAfter = number => {
    setState({
      ...localState,
      recurringInfo: {
        ...localState.recurringInfo,
        occurrenceEndsAfter: number,
      },
    });
  };
  const handleEveryValue = value => {
    setState({
      ...localState,
      recurringInfo: {
        ...localState.recurringInfo,
        repeatEveryValue: value,
      },
    });
  };
  const handleRepeatEvery = value => {
    setState({
      ...localState,
      recurringInfo: {
        ...localState.recurringInfo,
        repeatEvery: value,
      },
    });
  };
  const handleSubmit = values => {
    setState({
      ...localState,
      recurringInfo: {
        ...localState.recurringInfo,
        ...values,
      },
    });
    setFormState({
      recurringBoolean: false,
    });
  };

  const periodOfTime = timePeriodOptions.map(period => {
    if (localState.recurringInfo.repeatEvery > 1) {
      return (
        <Option key={period} value={period + 's'}>
          {period + 's'}
        </Option>
      );
    } else {
      return (
        <Option key={period} value={period}>
          {period}
        </Option>
      );
    }
  });

  const repeatTimePeriod = repeatTimePeriodOptions.map(period => {
    return (
      <Option key={period} value={period}>
        {period}
      </Option>
    );
  });

  const monthlyPeriod = monthlyOptions.map(period => {
    return (
      <Option key={period} value={period}>
        {period}
      </Option>
    );
  });

  return (
    <div>
      <Radio.Group onChange={handleCheckBox} disabled={!localState.dynamicDay}>
        <Radio value={'Yes'}>Yes</Radio>
        <Radio value={'No'}>No</Radio>
      </Radio.Group>
      {localState.recurringEvent === 'Yes' && (
        <div>
          <StyledSelect
            style={{ width: 200 }}
            name={'Repeat Time Period'}
            onChange={handleRepeatPeriod}
          >
            {repeatTimePeriod}
          </StyledSelect>

          <label>Ends</label>
          <Radio.Group
            name={'Occurrence Ends'}
            onChange={handleOccurrences}
            notRequired
          >
            <Radio value={'Never'}>Never</Radio>
            <Radio value={'On'}>On</Radio>
            <Radio value={'After'}>After</Radio>
          </Radio.Group>
          <DatePicker
            name={'Occurrence End Date'}
            onChange={handleDatePicker}
            disabledDate={current => current && current < moment().endOf('day')}
            disabled={
              localState.recurringInfo.occurrenceEnds === 'On' ? false : true
            }
            notRequired
          />
          <InputNumber
            style={{ width: 50 }}
            name={'Occurrence Ends After'}
            min={0}
            onChange={handleOccurrencesEndsAfter}
            disabled={
              localState.recurringInfo.occurrenceEnds === 'After' ? false : true
            }
            notRequired
          />
        </div>
      )}

      <Drawer
        title="Add a recurring event"
        width={720}
        closable={false}
        placement="left"
        onClose={closeDrawer}
        visible={formState.recurringBoolean}
      >
        <WrappedAntForm
          buttonText="Submit"
          buttonType="primary"
          onSubmit={handleSubmit}
        >
          <AntInputNumber
            name={'Repeat every'}
            style={{ width: 100 }}
            onChange={handleRepeatEvery}
            min={0}
            notRequired
          />
          <AntSelect
            style={{ width: 100 }}
            name={'Repeat every value'}
            onChange={handleEveryValue}
            notRequired
          >
            {periodOfTime}
          </AntSelect>

          {localState.recurringInfo.repeatEveryValue === 'Week' ||
            (localState.recurringInfo.repeatEveryValue === 'Weeks' && (
              <Checkbox.Group name={'Days'} options={dayOptions} notRequired />
            ))}

          {localState.recurringInfo.repeatEveryValue === 'Month' ||
            (localState.recurringInfo.repeatEveryValue === 'Months' && (
              <AntSelect name={'Monthly Period'} notRequired>
                {monthlyPeriod}
              </AntSelect>
            ))}

          <StyledButton type="secondary" onClick={closeDrawer}>
            Back
          </StyledButton>
        </WrappedAntForm>
      </Drawer>
    </div>
  );
};

export default RecurringEvent;
