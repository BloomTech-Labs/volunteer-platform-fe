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
  const { reccurringInfo, reccurringEvent } = localState;

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

  //Handle Submit for Form
  const handleSubmit = values => {
    console.log(values);
    const event = {
      nameOfEvent: values.nameOfEvent,
      typeOfCauses: values.typesOfCauses,
      date: values.date.format('HH:AA A'),
      startTime: values.startTime.format('LT'),
      endTime: values.endTime.format('LT'),
      numberOfVolunteers: values.numberOfVolunteers,
      reccurringInfo: {
        repeatTimePeriod: localState.repeatTimePeriod,
      },
      location: values.location,
      phoneNumber: values.phoneNumber,
      pointOfcontact: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      },
      reccurringInfo: {
        reccurringEvent: localState.reccurringEvent,
      },
      description: values.description,
      volunteerRequirements: values.volunteerRequirments,
      interest: values.interest,
      website: values.website,
      otherNotes: values.otherNotes,
    };

    if (reccurringEvent === 'Yes') {
      event.reccurringInfo = reccurringInfo;
      if (
        event.reccurringInfo.repeatTimePeriod === 'Custom' &&
        event.reccurringInfo.occurrenceEnds === 'On'
      ) {
        event.reccurringInfo.occurrenceEndDate = event.reccurringInfo.occurrenceEndDate.format(
          'HH:MM A'
        );
        event.reccurringInfo.occurrenceEndsAfter = '';
      }
      if (
        event.reccurringInfo.repeatTimePeriod === 'Custom' &&
        event.reccurringInfo.occurrenceEnds === 'After'
      ) {
        event.reccurringInfo.occurrenceEndDate = '';
      }
      createRecurringEvent(event, dispatch);
    }

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
          />

          <RecurringEvent
            name={'ReccuringEvent'}
            localState={localState}
            setState={setState}
            dateFormat={dateFormat}
            notRequired
          />

          <AntTimePicker name={'Start Time'} use12Hours format={'h:mm a'} />
          <p>to</p>

          <AntTimePicker name={'End Time'} use12Hours format={'h:mm a'} />

          <AntInputNumber name={'Number of Volunteers'} type="number" min={0} />

          <AntInput name={'Location'} placeholder="Select location"></AntInput>

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
