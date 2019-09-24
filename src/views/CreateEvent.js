import React, { useState, useEffect } from 'react';
import { Select, DatePicker } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { StyledButton, WrappedAntdForm, StyledCard } from '../styled';
import AntdInput from '../styled/AntdInput';
import AntdSelect from '../styled/AntdSelect';
import AntdTextArea from '../styled/AntdTextArea';
import AntdTimePicker from '../styled/AntdTimePicker';
import AntdInputNumber from '../styled/AntdInputNumber';
import AntdDatePicker from '../styled/AntdDatePicker';
import AntdCheckbox from '../styled/AntdCheckbox';
import { useStateValue } from '../hooks/useStateValue';
import { createEvent } from '../actions';
import ReccurringEvent from '../components/ReccurringEvent';

const { Option } = Select;

export const CreateEvent = props => {
  const initialEvent = {
    nameOfEvent: '',
    typeOfCause: [],
    date: '',
    startTime: '',
    endTime: '',
    numberOfVolunteers: '',
    phoneNumber: '',
    pointOfcontact: [{ firstName: '', lastName: '', email: '' }],
    description: '',
    volunteerRequirements: [],
    interest: [],
    website: '',
    otherNotes: '',
  };
  const [localState, setState] = useState(initialEvent);

  console.log(localState);

  const [state, dispatch] = useStateValue();

  //Destructuring
  let { event } = localState;

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
  console.log(localState);
  //Handle Submit for Form
  const handleSubmit = values => {
    console.log(values);
    const event = {
      nameOfEvent: values.nameOfEvent,
      typeOfCauses: values.typesOfCauses,
      date: values.date.unix(),
      startTime: values.startTime.format('LT'),
      endTime: values.endTime.format('LT'),
      reccurringInfo: {
        // repeatNumber: localState.formState.repeatNumber,
        repeatTimePeriod: localState.repeatTimePeriod,
        // reccurringEventDays: localState.formState.reccurringEventDays,
        // ocurrences: localState.formStart.ocurrences,
        // reccurringEndDate: localState.formStart.reccurringEndDate.unix(),
      },
      location: values.location,
      phoneNumber: values.phoneNumber,
      pointOfcontact: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      },
      volunteerRequirements: values.volunteerRequirments,
      interest: values.interest,
      website: values.website,
      otherNotes: values.otherNotes,
    };
    console.log(event);
    // createEvent(event, dispatch);
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
        <WrappedAntdForm onSubmit={handleSubmit}>
          <AntdInput name={'Name of Event'} type="text" />
          <AntdSelect
            name={'Types of Causes'}
            placeholder="Please select causes"
            mode="multiple"
          >
            {causeAreaTags}
          </AntdSelect>
          <label>When is the event?</label>

          <AntdDatePicker name={'Date'} format={dateFormat} />

          <ReccurringEvent
            name={'ReccuringEvent'}
            localState={localState}
            setState={setState}
            dateFormat={dateFormat}
            notRequired
          />

          <AntdTimePicker name={'Start Time'} use12Hours format={'h:mm a'} />
          <p>to</p>

          <AntdTimePicker name={'End Time'} use12Hours format={'h:mm a'} />

          <AntdInputNumber name={'Number of People'} type="number" min={0} />

          <AntdInput
            name={'Location'}
            placeholder="Select location"
          ></AntdInput>

          <AntdInput
            name={'Phone Number'}
            type="tel"
            pattern={'[0-9]{3}-[0-9]{3}-[0-9]{4}'}
            placeholder={'000-000-0000'}
          />
          <label>Who is the point of Contact?</label>

          <AntdInput name={'First Name'} type="text" />
          <AntdInput name={'Last Name'} type="text" />
          <AntdInput name={'Email'} type="email" />
          <AntdTextArea name={'Description'} type="text" />
          <label>What are the requirements?</label>
          <AntdSelect
            name={'Volunteer Requirments'}
            placeholder="Please select requirments"
            mode="multiple"
          >
            {requirementTags}
          </AntdSelect>
          <AntdSelect
            name={'Interest'}
            placeholder="Please select interest"
            mode="multiple"
          >
            {interestTags}
          </AntdSelect>

          <AntdInput name={'Website'} />
          <AntdTextArea
            name={'Other Notes'}
            placeholder={'Any additional helpful tips for the event go here.'}
          />
          <StyledButton type="secondary" htmlType="submit" onClick={cancelForm}>
            Cancel
          </StyledButton>
          <StyledButton type="primary" htmlType="submit">
            Create
          </StyledButton>
        </WrappedAntdForm>
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
