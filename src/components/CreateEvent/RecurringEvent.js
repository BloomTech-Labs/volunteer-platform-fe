import React, { useState } from 'react';
import {
  Modal,
  Select,
  Checkbox,
  Radio,
  DatePicker,
  InputNumber,
  Form,
} from 'antd';

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
    'Weekdays',
    'Weekends (Fri, Sat, Sun)',
    'Sat/Sun Only',
    `Weekly on ${dynamicDay}`,
  ];

  if (dynamicNth !== 'Fifth') {
    repeatTimePeriodOptions.push(`Monthly on ${dynamicNth} ${dynamicDay} `);
  }

  repeatTimePeriodOptions.push(`Annually on ${dynamicYear}`);
  repeatTimePeriodOptions.push('Other');

  const closeModal = () => {
    setFormState({
      ...formState,
      recurringBoolean: false,
    });
  };

  const handleChange = (name, value) => {
    if (value === 'Other') {
      setFormState({
        ...formState,
        recurringBoolean: true,
      });
    }
    setLocalState({
      ...localState,
      recurringInfo: {
        ...localState.recurringInfo,
        [name]: value,
      },
    });
  };

  const cancelModal = () => {
    setLocalState({
      ...localState,
      recurringInfo: {
        ...localState.recurringInfo,
        repeatEvery: '',
        repeatEveryValue: '',
        days: '',
        monthlyPeriod: '',
      },
    });
    closeModal();
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
    <StyledDiv>
      <Form>
        <Form.Item label={'Is this a recurring event ?'} required>
          <Radio.Group
            name={'recurringEvent'}
            onChange={e => handleChange(e.target.name, e.target.value)}
            disabled={!dynamicDay}
            defaultValue={
              localState.recurringInfo.recurringEvent === 'Yes' ? 'Yes' : 'No'
            }
          >
            <Radio value={'Yes'}>Yes</Radio>
            <Radio value={'No'}>No</Radio>
          </Radio.Group>
        </Form.Item>

        {localState.recurringInfo.recurringEvent === 'Yes' && (
          <div>
            <div className={localState.recurringEvent === 'Yes' ? 'hide' : ''}>
              <Form.Item label="Repeat Every" required>
                <Select
                  name={'repeatTimePeriod'}
                  defaultValue={localState.recurringInfo.repeatTimePeriod}
                  onChange={value => handleChange('repeatTimePeriod', value)}
                >
                  {repeatTimePeriod}
                </Select>
              </Form.Item>
            </div>
            <div>
              <Form.Item label={'Event Ends'}>
                <Radio.Group
                  name={'Occurrence Ends'}
                  defaultValue={
                    localState.recurringInfo.occurrenceEnds === 'On'
                      ? 'On'
                      : localState.recurringInfo.occurrenceEnds === 'After'
                      ? 'After'
                      : 'Never'
                  }
                  onChange={e => handleChange('occurrenceEnds', e.target.value)}
                  className={'radioWrapper'}
                >
                  <Radio value={'On'}>On</Radio>
                  <Radio value={'After'}>After</Radio>
                  <Radio value={'Never'}>Never</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            {localState.recurringInfo.occurrenceEnds === 'On' && (
              <div>
                <Form.Item>
                  <DatePicker
                    name={'occurrenceEndDate'}
                    format={'MM/DD/YYYY'}
                    onChange={value => handleChange('occurrenceEndDate', value)}
                    value={localState.recurringInfo.occurrenceEndDate}
                    disabledDate={current =>
                      current && current < moment().endOf('day')
                    }
                  />
                </Form.Item>
              </div>
            )}

            {localState.recurringInfo.occurrenceEnds === 'After' && (
              <div>
                <Form.Item>
                  <InputNumber
                    name={'occurrenceEndsAfter'}
                    min={0}
                    defaultValue={
                      localState.recurringInfo.occurrenceEndsAfter || 1
                    }
                    onChange={value =>
                      handleChange('occurrenceEndsAfter', value)
                    }
                  />
                  {'   '}
                  Occurrence
                </Form.Item>
              </div>
            )}
          </div>
        )}
      </Form>

      <Modal
        title="Add a Custom Repeat Time Period"
        width={720}
        closable
        onOk={() => closeModal()}
        onCancel={() => cancelModal()}
        onClose={closeModal}
        visible={formState.recurringBoolean}
      >
        <Form>
          <div>
            <div className={''}>
              <Form.Item label={'Repeat Every'}>
                <InputNumber
                  name={'repeatEvery'}
                  style={{ margin: 'o auto' }}
                  defaultValue={localState.recurringInfo.repeatEvery}
                  onChange={value => handleChange('repeatEvery', value)}
                  min={0}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item>
                <Select
                  name={'repeatEveryValue'}
                  value={localState.recurringInfo.repeatEveryValue}
                  onChange={value => handleChange('repeatEveryValue', value)}
                >
                  {periodOfTime}
                </Select>
              </Form.Item>
            </div>

            {localState.recurringInfo.repeatEveryValue === 'Week' ||
            localState.recurringInfo.repeatEveryValue === 'Weeks' ? (
              <div>
                <Form.Item label={'On'}>
                  <Checkbox.Group
                    name={'Days'}
                    defaultValue={localState.recurringInfo.days}
                    options={dayOptions}
                    onChange={value => handleChange('days', value)}
                    notRequired
                  />
                </Form.Item>
              </div>
            ) : null}

            {localState.recurringInfo.repeatEveryValue === 'Month' ||
            localState.recurringInfo.repeatEveryValue === 'Months' ? (
              <div>
                <Form.Item>
                  <Select
                    name={'Monthly Period'}
                    defaultValue={localState.recurringInfo.monthlyPeriod}
                    onChange={value => handleChange('monthlyPeriod', value)}
                    notRequired
                  >
                    {monthlyPeriod}
                  </Select>
                </Form.Item>
              </div>
            ) : null}
          </div>
        </Form>
      </Modal>
    </StyledDiv>
  );
};

const StyledDiv = styled.div``;

export default RecurringEvent;
