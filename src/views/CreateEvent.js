import React, { useState } from 'react';
import {
  StyledButton,
  StyledForm,
  StyledInput,
  StyledDropDown,
} from '../styled';
import { Menu, Icon } from 'antd';
import { useStateValue } from '../hooks/useStateValue';
import { createEvent } from '../actions';

const CreateEvent = () => {
  const event = {
    volunteerType: '',
    number_of_peope: '',
    start_time: '',
    stop_time: '',
    date: '',
    pointOfContact: '',
    tags: [],
    description: '',
    volunteerRequirements: [],
  };

  const [localState, setState] = useState();
  const [state, dispatch] = useStateValue();

  //   const dropDownTypes = (
  //     <Menu>
  //       <Menu.Item>Type 1</Menu.Item>
  //       <Menu.Item>Type 2</Menu.Item>
  //       <Menu.Item>Type 3</Menu.Item>
  //       <Menu.Item>Type 4</Menu.Item>
  //       <Menu.Item>Type 5</Menu.Item>
  //     </Menu>
  //   );

  const changeValue = e => {
    setState({ ...localState, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    createEvent(localState, dispatch);
  };

  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        {/* <StyledDropDown /> */}
        {/* //change to dropdown */}
        <StyledInput
          name={'Volunteer Type'}
          values={'localState'}
          onChange={changeValue}
          type="number"
        />
        <StyledInput
          name={'Number of People'}
          values={'localState'}
          onChange={changeValue}
          type="number"
        />
        <StyledInput
          name={'Start Time'}
          values={'localState'}
          onChange={changeValue}
          type="time"
        />
        <StyledInput
          name={'End Time'}
          values={'localState'}
          onChange={changeValue}
          type="time"
        />
        <StyledInput
          name={'Date'}
          values={'localState'}
          onChange={changeValue}
          type="date"
        />
        <StyledInput
          name={'Point of Contact'}
          values={'localState'}
          onChange={changeValue}
          type="text"
        />
        {/* //change to dropdown */}
        <StyledInput
          name={'Tags'}
          values={'localState'}
          onChange={changeValue}
          type="text"
        />
        <StyledInput
          name={'Description'}
          value={'localState'}
          onChange={changeValue}
          type="text"
        />
        {/* //change to dropdown */}
        <StyledInput
          name={'Volunteer Requirements'}
          values={'localState'}
          onChange={changeValue}
          type="text"
        />

        <StyledButton type="primary" htmlType="submit">
          Create Event
        </StyledButton>
      </StyledForm>
    </div>
  );
};

export default CreateEvent;
