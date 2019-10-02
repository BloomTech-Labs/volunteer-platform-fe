import React, { useState } from 'react';
import { Modal, Select, Checkbox, Radio, DatePicker, InputNumber } from 'antd';
import {
  StyledSelect,
  WrappedAntForm,
  AntInputNumber,
  AntSelect,
} from '../../styled';
import { formLayouts } from '../../utility/formLayouts';
import moment from 'moment';
import styled from 'styled-components';

const { Option } = Select;

export const RecurringEvent = props => {
  const { localState, setLocalState, dynamicState } = props;
  const { dynamicNumber, dynamicNth, dynamicDay, dynamicYear } = dynamicState;
  const [formState, setFormState] = useState({
    days: [],
  });

  const dayOptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const timePeriodOptions = ['Day', 'Week', 'Month'];

  const monthlyOptions = [
    `Monthly on day ${dynamicNumber}`,
    `Monthly on ${dynamicNth} ${dynamicDay}`,
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

  const closeModal = () => {
    setFormState({
      ...formState,
      recurringBoolean: false,
    });
  };

  const handleCheckBox = checked => {
    setLocalState({
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
    setLocalState({
      ...localState,
      recurringInfo: {
        ...localState.recurringInfo,
        repeatTimePeriod: period,
      },
    });
  };

  const handleOccurrenceEndDate = date => {
    setLocalState({
      ...localState,
      recurringInfo: {
        ...localState.recurringInfo,
        occurrenceEndDate: date.unix(),
      },
    });
  };
  const handleOccurrences = occurrence => {
    setLocalState({
      ...localState,
      recurringInfo: {
        ...localState.recurringInfo,
        occurrenceEnds: occurrence.target.value,
      },
    });
  };
  const handleOccurrencesEndsAfter = number => {
    setLocalState({
      ...localState,
      recurringInfo: {
        ...localState.recurringInfo,
        occurrenceEndsAfter: number,
      },
    });
  };
  const handleEveryValue = value => {
    setLocalState({
      ...localState,
      recurringInfo: {
        ...localState.recurringInfo,
        repeatEveryValue: value,
      },
    });
  };
  const handleRepeatEvery = value => {
    setLocalState({
      ...localState,
      recurringInfo: {
        ...localState.recurringInfo,
        repeatEvery: value,
      },
    });
  };

  const handleSubmit = values => {
    console.log(values);
    setLocalState({
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
    <StyledRecurringEvent>
      <div>
        <Radio.Group
          onChange={handleCheckBox}
          disabled={!dynamicState.dynamicDay}
          defaultValue={localState.recurringEvent === 'Yes' ? 'Yes' : 'No'}
          className={'radioWrapper'}
          style={{ marginLeft: 100 }}
          layout={formLayouts.empty}
        >
          <Radio value={'Yes'}>Yes</Radio>
          <Radio value={'No'}>No</Radio>
        </Radio.Group>
        {localState.recurringEvent === 'Yes' && (
          <div>
            <div className={'repeatWrapper'}>
              <StyledSelect
                style={{ width: 200 }}
                name={'Repeat Time Period'}
                onChange={handleRepeatPeriod}
                layout={formLayouts.empty}
              >
                {repeatTimePeriod}
              </StyledSelect>
            </div>
            <label>Ends</label>
            <Radio.Group
              name={'Occurrence Ends'}
              defaultValue={
                localState.recurringInfo.occurrenceEnds === 'On'
                  ? 'On'
                  : localState.recurringInfo.occurrenceEnds === 'After'
                  ? 'After'
                  : 'Never'
              }
              onChange={handleOccurrences}
              className={'radioWrapper'}
            >
              <Radio value={'On'}>On</Radio>
              <Radio value={'After'}>After</Radio>
              <Radio value={'Never'}>Never</Radio>
            </Radio.Group>
            <DatePicker
              name={'Occurrence End Date'}
              onChange={handleOccurrenceEndDate}
              disabledDate={current =>
                current && current < moment().endOf('day')
              }
              disabled={
                localState.recurringInfo.occurrenceEnds === 'On' ? false : true
              }
            />
            <InputNumber
              style={{ width: 50 }}
              name={'Occurrence Ends After'}
              min={0}
              onChange={handleOccurrencesEndsAfter}
              disabled={
                localState.recurringInfo.occurrenceEnds === 'After'
                  ? false
                  : true
              }
            />
          </div>
        )}

        <Modal
          title="Add a recurring event"
          width={720}
          onClose={closeModal}
          visible={formState.recurringBoolean}
          footer={null}
        >
          <WrappedAntForm
            cancelButton={true}
            cancelButtonText={'Cancel'}
            handleCancel={closeModal}
            onSubmit={handleSubmit}
            layout={'vertical'}
            buttonType={'primary'}
            buttonText={'Submit'}
          >
            <AntInputNumber
              name={'Repeat every'}
              style={{ width: 100 }}
              onChange={handleRepeatEvery}
              min={0}
            />
            <AntSelect
              style={{ width: 100 }}
              name={'Repeat every value'}
              onChange={handleEveryValue}
            >
              {periodOfTime}
            </AntSelect>
            {localState.recurringInfo.repeatEveryValue === 'Week' && (
              <Checkbox.Group name={'Days'} options={dayOptions} notRequired />
            )}
            {localState.recurringInfo.repeatEveryValue === 'Weeks' && (
              <Checkbox.Group name={'Days'} options={dayOptions} notRequired />
            )}
            {localState.recurringInfo.repeatEveryValue === 'Month' && (
              <AntSelect name={'Monthly Period'} notRequired>
                {monthlyPeriod}
              </AntSelect>
            )}
            {localState.recurringInfo.repeatEveryValue === 'Months' && (
              <AntSelect name={'Monthly Period'} notRequired>
                {monthlyPeriod}
              </AntSelect>
            )}
          </WrappedAntForm>
        </Modal>
      </div>
    </StyledRecurringEvent>
  );
};

const StyledRecurringEvent = styled.div`
  .radioWrapper {
    display: flex;
    justify-content: center;
  }
`;

export default RecurringEvent;
