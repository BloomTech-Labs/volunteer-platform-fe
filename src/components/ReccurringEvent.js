import React, { useState } from 'react';
import { Drawer, Select, Checkbox, Radio } from 'antd';
import {
  StyledButton,
  StyledSelect,
  WrappedAntForm,
  AntInputNumber,
  AntDatePicker,
  AntSelect,
} from '../styled';

const { Option } = Select;

const ReccurringEvent = props => {
  const { setState, localState, dateFormat, dynamicDay, dynamicYear } = props;
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
    `Weekly on ${dynamicDay}`,
    `Monthly on 1st/2nd/3rd/4th ${dynamicDay} `,
    `Annually on ${dynamicYear}`,
    'Every Weekday',
    'Custom',
  ];

  const handleCheckBox = checked => {
    setState({
      ...localState,
      reccurringEvent: checked.target.value,
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
      reccurringInfo: {
        ...localState.reccurringInfo,
        repeatTimePeriod: period,
      },
    });
  };

  const handleSubmit = values => {
    console.log(values);
    setState({
      ...localState,
      reccurringInfo: {
        ...localState.reccurringInfo,
        ...values,
      },
    });
    setFormState({
      reccurringBoolean: false,
    });
  };

  const handleOccurrences = occurrence => {
    setFormState({
      ...formState,
      occurrence: occurrence.target.value,
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
      {localState.reccurringEvent === 'Yes' && (
        <StyledSelect
          style={{ width: 200 }}
          defaultValue="Does not Repeat"
          name={'Repeat Time Period'}
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
        <WrappedAntForm onSubmit={handleSubmit}>
          <AntInputNumber
            name={'Repeat every'}
            style={{ width: 100 }}
            min={0}
            notRequired
          />
          <AntSelect
            style={{ width: 100 }}
            name={'Repeat every value'}
            notRequired
          >
            {periodOfTime}
          </AntSelect>
          <Checkbox.Group name={'Days'} options={dayOptions} notRequired />
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
          <AntDatePicker
            name={'Occurrence End Date'}
            format={dateFormat}
            disabled={formState.occurrence === 'On' ? false : true}
            notRequired
          />
          <AntInputNumber
            style={{ width: 50 }}
            name={'Occurrence Ends After'}
            min={0}
            disabled={formState.occurrence === 'After' ? false : true}
            notRequired
          />

          <StyledButton type="secondary" onClick={closeDrawer}>
            Back
          </StyledButton>
          <StyledButton type="primary" htmlType="submit" onClick={closeDrawer}>
            Submit
          </StyledButton>
        </WrappedAntForm>
      </Drawer>
    </div>
  );
};

export default ReccurringEvent;
