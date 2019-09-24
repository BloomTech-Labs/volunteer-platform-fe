import React, { useState, useEffect } from 'react';
import { message, Select } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import {
  StyledButton,
  StyledForm,
  StyledInput,
  StyledSelect,
  StyledDatePicker,
  StyledInputNumber,
  StyledTimePicker,
  StyledTextArea,
  StyledCard,
  StyledSwitch,
} from '../styled';
import { useStateValue } from '../hooks/useStateValue';
import { createEvent } from '../actions';
import ReccurringEvent from '../components/ReccurringEvent';

const { Option } = Select;

export const CreateEvent = props => {
  const [localState, setState] = useState({
    event: {
      tags: [],
    },
  });

  const [state, dispatch] = useStateValue();

  //Destructuring
  let { event } = localState;

  useEffect(() => {
    if (props.location.state.org) {
      setState({
        ...localState,
        event: {
          ...event,
          orgId: props.location.state.org.orgId,
        },
      });
    }
  }, [props.location.state.org]);

  //Date Format
  const dateFormat = 'MM/DD/YYYY';

  const changeValue = e => {
    setState({
      ...localState,
      event: {
        ...event,
        [e.target.name]: e.target.value,
      },
    });
  };

  //Handle DatePicker
  const handleDatePicker = datestring => {
    setState({
      ...localState,
      event: {
        ...event,
        date: datestring,
      },
    });
  };

  //Handle Time
  const handleStartTime = (_time, timeObject) => {
    setState({
      ...localState,
      event: {
        ...event,
        startTime: timeObject,
      },
    });
  };

  const handleEndTime = (_time, timeObject) => {
    setState({
      ...localState,
      event: {
        ...event,
        endTime: timeObject,
      },
    });
  };

  const handlePointOfContact = e => {
    setState({
      ...localState,
      event: {
        ...event,
        pointOfContact: {
          ...event.pointOfContact,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  //Handle Submit for Form
  const handleSubmit = e => {
    e.preventDefault();
    if (isFormValid()) {
      localState.event.date = localState.event.date.unix();
      localState.event.reccurringEndDate = localState.event.reccurringEndDate.unix();
      createEvent(localState.event, dispatch);
    }
  };

  //Handles Numbers
  const handleNumber = value => {
    setState({
      ...localState,
      event: {
        ...event,
        numberOfPeople: value,
      },
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
      return (
        <Option key={tag} value={tag}>
          {tag}
        </Option>
      );
    });
  }

  if (state.tags.requirements) {
    requirementTags = state.tags.requirements.map(tag => {
      return (
        <Option key={tag} value={tag}>
          {tag}
        </Option>
      );
    });
  }

  const interestTags = state.tags.interests.map(tag => {
    return (
      <Option key={tag} value={tag}>
        {tag}
      </Option>
    );
  });

  //Handle Tags
  const handleCauseAreasTag = tag => {
    setState({
      ...localState,
      event: {
        ...event,
        tags: {
          ...event.tags,
          causeAreas: tag,
        },
      },
    });
  };
  const handleRequirmentTag = tag => {
    setState({
      ...localState,
      event: {
        ...event,
        tags: {
          ...event.tags,
          requirements: tag,
        },
      },
    });
  };

  const handleInterestTag = tag => {
    setState({
      ...localState,
      event: {
        ...event,
        tags: {
          ...event.tags,
          interests: tag,
        },
      },
    });
  };

  ///Cancel Form

  const cancelForm = () => {
    props.history.push('/org-dashboard');
  };

  //Error Handling

  const isFormValid = () => {
    if (isFormEmpty()) {
      message.error('Please fill out all fields...');
      return false;
    } else {
      return true;
    }
  };
  const isFormEmpty = () => {
    if (
      !event.volunteerType ||
      !event.numberOfPeople ||
      !event.startTime ||
      !event.endTime ||
      !event.date ||
      !event.pointOfContact ||
      !event.description
    ) {
      return true;
    }
  };

  return (
    <StyledCreateEvent>
      <StyledCard>
        <h1>Let's Create An Event</h1>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput
            name={'Name of Event'}
            values={event}
            onChange={changeValue}
            type="text"
          />
          <StyledSelect
            name={'Types of Causes'}
            value={event.tags.causeAreas}
            onChange={handleCauseAreasTag}
            placeholder="Please select causes"
            mode="multiple"
          >
            {causeAreaTags}
          </StyledSelect>
          <label>When is the event?</label>
          <StyledRecurringEvent>
            <StyledDatePicker
              name={'Date'}
              values={event}
              onChange={handleDatePicker}
              defaultValue={moment(moment(), dateFormat)}
              format={dateFormat}
            />

            <ReccurringEvent
              localState={localState}
              setState={setState}
              dateFormat={dateFormat}
            />

            <StyledTimePicker
              name={'Start Time'}
              defaultOpenValue={moment('00:00', 'hh:mm')}
              onChange={handleStartTime}
              use12Hours
              format={'h:mm a'}
              type="time"
            />
            <p>to</p>

            <StyledTimePicker
              name={'End Time'}
              defaultOpenValue={moment('00:00', 'hh:mm')}
              onChange={handleEndTime}
              use12Hours
              format={'h:mm a'}
              type="time"
            />
          </StyledRecurringEvent>
          <StyledInputNumber
            name={'Number of People'}
            onChange={handleNumber}
            type="number"
            min={0}
          />
          <StyledSelect
            name={'Location'}
            placeholder="Select location"
          ></StyledSelect>

          <StyledInput
            onChange={changeValue}
            name={'Phone Number'}
            values={event}
            placeholder={'000-000-0000'}
            type="number"
          />
          <label>Who is the point of Contact?</label>
          <StyledInput
            name={'First Name'}
            values={event.pointOfContact}
            onChange={handlePointOfContact}
            type="text"
          />
          <StyledInput
            name={'Last Name'}
            values={event.pointOfContact}
            onChange={handlePointOfContact}
            type="text"
          />
          <StyledInput
            name={'Email'}
            values={event.pointOfContact}
            onChange={handlePointOfContact}
            type="email"
          />

          <StyledTextArea
            name={'Description'}
            values={event}
            onChange={changeValue}
            type="text"
          />
          <label>What are the requirements?</label>
          <StyledRecurringEvent>
            <StyledSelect
              name={'Volunteer Requirements'}
              value={event.tags.requirements}
              onChange={handleRequirmentTag}
              placeholder="Please select requirements"
              mode="multiple"
            >
              {requirementTags}
            </StyledSelect>

            <StyledSelect
              name={'Interest'}
              value={event.tags.interests}
              onChange={handleInterestTag}
              placeholder="Please select interest"
              mode="multiple"
            >
              {interestTags}
            </StyledSelect>
          </StyledRecurringEvent>
          <StyledInput onChange={changeValue} name={'Website'} values={event} />
          <StyledTextArea
            onChange={changeValue}
            name={'Other Notes'}
            values={event}
            placeholder={'Any additional helpful tips for the event go here.'}
          />
          <StyledButton type="secondary" htmlType="submit" onClick={cancelForm}>
            Cancel
          </StyledButton>
          <StyledButton type="primary" htmlType="submit">
            Create
          </StyledButton>
        </StyledForm>
      </StyledCard>
    </StyledCreateEvent>
  );
};

const StyledCreateEvent = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledRecurringEvent = styled.div`
  border: 1px solid black;
`;
export default CreateEvent;
