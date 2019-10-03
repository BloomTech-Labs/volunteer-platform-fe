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
  const { localState, setLocalState } = props;
  const { dynamicDates } = localState;
  const { dynamicNumber, dynamicNth, dynamicDay, dynamicYear } = dynamicDates;
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
        occurrenceEndDate: date,
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
          // disabled={!dynam.dynamicDates.dynamicDay}
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
                defaultValue={localState.recurringInfo.repeatTimePeriod}
                onChange={handleRepeatPeriod}
                layout={formLayouts.empty}
                label={''}
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
              format={'MM/DD/YYYY'}
              onChange={handleOccurrenceEndDate}
              defaultValue={localState.recurringInfo.occurrenceEndDate}
              disabledDate={current =>
                current && current < moment().endOf('day')
              }
              disabled={
                localState.recurringInfo.occurrenceEnds === 'On' ? false : true
              }
              notRequired
            />
            <InputNumber
              style={{ width: 50 }}
              name={'Occurrence Ends After'}
              min={0}
              defaultValue={localState.recurringInfo.occurrenceEndsAfter}
              onChange={handleOccurrencesEndsAfter}
              disabled={
                localState.recurringInfo.occurrenceEnds === 'After'
                  ? false
                  : true
              }
              notRequired
            />
          </div>
        )}

        <Modal
          title="Add a recurring event"
          width={720}
          closable
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
            submitButtonText={'Submit'}
            submitButton
          >
            <h4>hello</h4>
            <AntInputNumber
              name={'Repeat every'}
              style={{ width: 100 }}
              defaultValue={localState.recurringInfo.repeatEvery}
              onChange={handleRepeatEvery}
              min={0}
            />
            <AntSelect
              style={{ width: 100 }}
              name={'Repeat every value'}
              defaultValue={localState.recurringInfo.repeatEveryValue}
              onChange={handleEveryValue}
            >
              {periodOfTime}
            </AntSelect>
            {localState.recurringInfo.repeatEveryValue === 'Week' && (
              <Checkbox.Group
                name={'Days'}
                defaultValue={localState.recurringInfo.days}
                options={dayOptions}
                notRequired
              />
            )}
            {localState.recurringInfo.repeatEveryValue === 'Weeks' && (
              <Checkbox.Group
                name={'Days'}
                defaultValue={localState.recurringInfo.days}
                options={dayOptions}
                notRequired
              />
            )}
            {localState.recurringInfo.repeatEveryValue === 'Month' && (
              <AntSelect
                name={'Monthly Period'}
                defaultValue={localState.recurringInfo.monthlyPeriod}
                notRequired
              >
                {monthlyPeriod}
              </AntSelect>
            )}
            {localState.recurringInfo.repeatEveryValue === 'Months' && (
              <AntSelect
                name={'Monthly Period'}
                defaultValue={localState.recurringInfo.monthlyPeriod}
                notRequired
              >
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

  .hide {
    label {
      display: none;
    }
  }
`;

export default RecurringEvent;