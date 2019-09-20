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
} from '../styled';
import { useStateValue } from '../hooks/useStateValue';
import { createEvent } from '../actions';

const { Option } = Select;

const CreateEvent = props => {
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

  //Handle Submit for Form
  const handleSubmit = e => {
    e.preventDefault();
    if (isFormValid()) {
      localState.event.date = localState.event.date.unix();
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
  const requirementTags = state.tags.requirements.map(tag => {
    return (
      <Option key={tag.id} value={tag.name}>
        {tag.name}
      </Option>
    );
  });

  const interestTags = state.tags.interests.map(tag => {
    return (
      <Option key={tag.id} value={tag.name}>
        {tag.name}
      </Option>
    );
  });

  //Handle Tags
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
        <h1>Create An Event</h1>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput
            name={'Title of Event'}
            values={event}
            onChange={changeValue}
            type="text"
          />
          <StyledInput
            name={'Volunteer Type'}
            values={event}
            onChange={changeValue}
            type="text"
          />

          <StyledInputNumber
            name={'Number of People'}
            onChange={handleNumber}
            type="number"
          />

          <StyledTimePicker
            name={'Start Time'}
            defaultOpenValue={moment('00:00', 'hh:mm')}
            onChange={handleStartTime}
            use12Hours
            format={'h:mm a'}
            type="time"
          />

          <StyledTimePicker
            name={'End Time'}
            defaultOpenValue={moment('00:00', 'hh:mm')}
            onChange={handleEndTime}
            use12Hours
            format={'h:mm a'}
            type="time"
          />

          <StyledDatePicker
            name={'Date'}
            values={event}
            onChange={handleDatePicker}
            defaultValue={moment(moment(), dateFormat)}
            format={dateFormat}
          />

          <StyledInput
            name={'Point of Contact'}
            values={event}
            onChange={changeValue}
            type="text"
          />
          <StyledTextArea
            name={'Description'}
            values={event}
            onChange={changeValue}
            type="text"
          />

          <StyledSelect
            name={'Volunteer Requirements'}
            onChange={handleRequirmentTag}
            placeholder="Please select requirements"
            mode="multiple"
          >
            {requirementTags}
          </StyledSelect>

          <StyledSelect
            name={'Interest'}
            value={event.tags}
            onChange={handleInterestTag}
            placeholder="Please select interest"
            mode="multiple"
          >
            {interestTags}
          </StyledSelect>
          <StyledInput onChange={changeValue} name={'State'} values={event} />
          <StyledInput onChange={changeValue} name={'City'} values={event} />

          <StyledButton type="primary" htmlType="submit">
            Create Event
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
export default CreateEvent;
