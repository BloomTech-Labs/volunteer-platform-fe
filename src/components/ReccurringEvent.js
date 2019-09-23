import React, { useState } from 'react';
import { Drawer, Select, Checkbox, Radio, DatePicker, InputNumber } from 'antd';
import {
  StyledButton,
  StyledInputNumber,
  StyledSwitch,
  StyledSelect,
} from '../styled';
import moment from 'moment';
import { mockComponent } from 'react-dom/test-utils';

const { Option } = Select;

const ReccurringEvent = props => {
  const { localState, dateFormat, setState } = props;

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

  const openDrawer = () => {
    setState({
      ...localState,
      event: {
        ...localState.event,
        reccurringEvent: true,
      },
    });
  };

  const closeDrawer = () => {
    setState({
      ...localState,
      event: {
        ...localState.event,
        reccurringEvent: false,
      },
    });
  };

  //   const addToEvent = () => {
  //     setState({
  //       ...localState,
  //       localState,
  //     });
  //   };

  const handleRepeat = number => {
    setState({
      ...localState,
      event: {
        ...localState.event,
        repeatNumber: number,
      },
    });
  };

  const handleDays = days => {
    setState({
      ...localState,
      event: {
        ...localState.event,
        reccurringEventDays: days,
      },
    });
  };

  const handleTimePeriod = timePeriod => {
    setState({
      ...localState,
      event: {
        ...localState.event,
        repeatTimePeriod: timePeriod,
      },
    });
  };

  const handleOccurrences = e => {
    setState({
      ...localState,
      event: {
        ...localState.event,
        ocurrences: e.target.value,
      },
    });
  };

  const handleDatePicker = datestring => {
    setState({
      ...localState,
      event: {
        ...localState.event,
        reccurringEndDate: datestring,
      },
    });
  };

  const handleOccurrenceNumber = number => {
    setState({
      ...localState,
      event: {
        ...localState.event,
        occurrenceNumber: number,
      },
    });
  };
  const periodOfTime = timePeriodOptions.map(period => {
    return (
      <Option key={period} value={period}>
        {period}
      </Option>
    );
  });

  return (
    <div>
      <StyledSwitch
        name={'Is this a reccurring event?'}
        onChange={openDrawer}
        value={localState.event.reccurringEvent}
        checked={localState.event.reccurringEvent ? true : false}
      />

      <Drawer
        title="Add a reccurring event"
        width={720}
        closable={false}
        placement="left"
        onClose={closeDrawer}
        visible={localState.event.reccurringEvent}
      >
        <StyledInputNumber
          style={{ width: 100 }}
          name={'Repeat every'}
          onChange={handleRepeat}
          type="number"
          value={localState.event.repeatNumber}
          min={0}
          max={
            localState.event.repeatTimePeriod === 'Week'
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
          value={localState.event.repeatTimePeriod}
          onChange={handleTimePeriod}
        >
          {periodOfTime}
        </StyledSelect>
        <Checkbox.Group
          options={dayOptions}
          onChange={handleDays}
          value={localState.event.reccurringEventDays}
        />
        <label>Ends</label>
        <Radio.Group
          name={'Occurrences'}
          value={localState.event.ocurrences}
          onChange={handleOccurrences}
        >
          <Radio value={'Never'}>Never</Radio>
          <Radio value={'On'}>On</Radio>
          <DatePicker
            name={'Reccurring End Date'}
            onChange={handleDatePicker}
            defaultValue={moment(moment(), dateFormat)}
            format={dateFormat}
            disabled={localState.event.ocurrences === 'On' ? false : true}
          />
          <Radio value={'After'}>After</Radio>
          <InputNumber
            style={{ width: 50 }}
            name={'Occurrence Number'}
            onChange={handleOccurrenceNumber}
            min={0}
            value={localState.event.occurrenceNumber}
            disabled={localState.event.ocurrences === 'After' ? false : true}
          />
        </Radio.Group>

        <StyledButton type="secondary" htmlType="submit" onClick={closeDrawer}>
          Back
        </StyledButton>
      </Drawer>
    </div>
  );
};

export default ReccurringEvent;
