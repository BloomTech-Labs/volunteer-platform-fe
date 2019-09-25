import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';
import {
  AntInput,
  AntSelect,
  AntTextArea,
  AntTimePicker,
  AntInputNumber,
  AntDatePicker,
  WrappedAntForm,
  StyledButton,
  StyledCard,
} from '../styled';
import { useStateValue } from '../hooks/useStateValue';
import { createEvent, createRecurringEvent } from '../actions';
import RecurringEvent from '../components/RecurringEvent';
import moment from 'moment';

const { Option } = Select;

export const CreateEvent = props => {
  const initialEvent = {
    nameOfEvent: '',
    typeOfCause: [],
    date: '',
    dynmaicDay: '',
    dynamicYear: '',
    numberOfVolunteers: '',
    phoneNumber: '',
    pointOfcontact: '',
    description: '',
    volunteerRequirements: [],
    website: '',
  };
  const [localState, setState] = useState(initialEvent);

  const [state, dispatch] = useStateValue();

  //Destructuring
  const { recurringInfo, recurringEvent } = localState;

  useEffect(() => {
    if (props.location.state.org) {
      setState({
        ...localState,
        orgId: props.location.state.org.orgId,
      });
    }
  }, [props.location.state.org]);

  //Date Format
  const dateFormat = 'MM/DD/YYYY';

  const removeUndefinied = event => {
    Object.keys(event).forEach(key => {
      if (event[key] === undefined) {
        delete event[key];
      }
      return event;
    });
  };

  //Handle Submit for Form
  const handleSubmit = values => {
    console.log(values);
    const event = {
      ...values,
      orgName: props.location.state.org.organizationName,
      orgImagePath: props.location.state.org.imagePath,
      orgPage: '',
      date: values.date.unix(),
      startTime: values.startTime.format('LT'),
      endTime: values.endTime.format('LT'),
      pointOfcontact: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      },
      recurringInfo: {
        recurringEvent: localState.recurringEvent,
      },
    };

    if (recurringEvent === 'Yes') {
      event.recurringInfo = recurringInfo;
      if (
        event.recurringInfo.repeatTimePeriod === 'Custom' &&
        event.recurringInfo.occurrenceEnds === 'On'
      ) {
        event.recurringInfo.occurrenceEndDate = event.recurringInfo.occurrenceEndDate.unix();
        event.recurringInfo.occurrenceEndsAfter = '';
      }
      if (
        event.recurringInfo.repeatTimePeriod === 'Custom' &&
        event.recurringInfo.occurrenceEnds === 'After'
      ) {
        event.recurringInfo.occurrenceEndDate = '';
      }
      removeUndefinied(event);
      createRecurringEvent(event, dispatch);
    }
    removeUndefinied(event);
    console.log('event before on submit', event);
    createEvent(event, dispatch);
    props.history.push('/org-dashboard');
  };

  const handleDynmaicDate = date => {
    const dynamicDay = date._d.toString().split(' ')[0];
    const dynamicYear = date._d
      .toString()
      .split(' ')
      .slice(1, 3)
      .join(' ');
    let dayAsNum = date._d.toString().split(' ')[2];
    let count = 1;
    while (dayAsNum > 7) {
      dayAsNum -= 7;
      count++;
    }
    let nth = { 1: 'First', 2: 'Second', 3: 'Third', 4: 'Fourth', 5: 'Fifth' };

    setState({
      ...localState,
      dynamicDay: dynamicDay,
      dynamicYear: dynamicYear,
      dynamicNth: nth[count],
    });
  };

  //Options for tags
  const causeAreaTags = state.tags.causeAreas.map(tag => {
    return (
      <Option key={tag} value={tag}>
        {tag}
      </Option>
    );
  });

  let requirementTags = [];
  console.log(localState);
  if (state.tags.requirements) {
    requirementTags = state.tags.requirements.map(tag => {
      return <Option key={tag}>{tag}</Option>;
    });
  }

  const interestTags = state.tags.interests.map(tag => {
    return <Option key={tag}>{tag}</Option>;
  });

  ///Cancel Form

  const cancelForm = () => {
    props.history.push('/org-dashboard');
  };

  return (
    <StyledCreateEvent>
      <StyledCard>
        <h1>Let's Create An Event</h1>
        <WrappedAntForm
          onSubmit={handleSubmit}
          buttonType={'primary'}
          buttonText={'Submit'}
        >
          <AntInput name={'Name of Event'} type="text" />
          <AntSelect
            name={'Types of Causes'}
            placeholder="Please select causes"
            mode="multiple"
          >
            {causeAreaTags}
          </AntSelect>
          <label>When is the event?</label>

          <AntDatePicker
            name={'Date'}
            format={dateFormat}
            onChange={handleDynmaicDate}
            disabledDate={current => current && current < moment().endOf('day')}
          />

          <RecurringEvent
            name={'RecurringEvent'}
            localState={localState}
            setState={setState}
            dateFormat={dateFormat}
            notRequired
          />

          <AntTimePicker name={'Start Time'} use12Hours format={'h:mm a'} />
          <p>to</p>

          <AntTimePicker name={'End Time'} use12Hours format={'h:mm a'} />

          <AntInputNumber name={'Number of Volunteers'} type="number" min={0} />

          <AntInput name={'City'} placeholder="City"></AntInput>
          <AntInput name={'State'} placeholder="State"></AntInput>

          <AntInput
            name={'Phone Number'}
            type="tel"
            pattern={'[0-9]{3}-[0-9]{3}-[0-9]{4}'}
            placeholder={'000-000-0000'}
          />
          <label>Who is the point of Contact?</label>

          <AntInput name={'First Name'} type="text" />
          <AntInput name={'Last Name'} type="text" />
          <AntInput name={'Email'} type="email" />
          <AntTextArea name={'Description'} type="text" />
          <label>What are the requirements?</label>
          <AntSelect
            name={'Volunteer Requirments'}
            placeholder="Please select requirments"
            mode="multiple"
          >
            {requirementTags}
          </AntSelect>
          <AntSelect
            name={'Interest'}
            placeholder="Please select interest"
            mode="multiple"
          >
            {interestTags}
          </AntSelect>

          <AntInput name={'Website'} />
          <AntTextArea
            name={'Other Notes'}
            placeholder={'Any additional helpful tips for the event go here.'}
            notRequired
          />
          <StyledButton type="secondary" htmlType="submit" onClick={cancelForm}>
            Cancel
          </StyledButton>
        </WrappedAntForm>
      </StyledCard>
    </StyledCreateEvent>
  );
};

const StyledCreateEvent = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledEvent = styled.div`
  border: 1px solid black;
`;
export default CreateEvent;
