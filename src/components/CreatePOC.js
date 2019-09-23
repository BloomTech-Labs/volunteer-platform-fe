import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Form, Button, message } from 'antd';

const CreatePOC = (props) => {
  const [ localState, setState ] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [disabled, setDisabled] = useState(false);

  const changeHandler = e => {
    setState({
      ...localState,
      [e.target.name]: e.target.value
    })
  }

  const validateEntry = () => {
    if (!localState.firstName || !localState.firstName || !localState.email) {
      return false;
    } else {
      return true;
    }
  }

  const saveEntry = e => {
    e.preventDefault();
    if (validateEntry()) {
      let updates = [...props.pointOfContact, localState];
      props.changePOC(updates);
      setDisabled(true);
    } else {
      message.error('All fields are required')
    }
  }

  return (
    <StyledCreatePOC>
      <Form.Item label='First name'>
        <Input name='firstName'
              value={ localState.firstName }
              onChange={ changeHandler }
              disabled={ disabled }/>
      </Form.Item>
      <Form.Item label='Last name'>
        <Input name='lastName'
              value={ localState.lastName }
              onChange={ changeHandler }
              disabled={ disabled }/>
      </Form.Item>
      <Form.Item label='Email'>
        <Input name='email'
              value={ localState.email }
              onChange={ changeHandler }
              disabled={ disabled } />
      </Form.Item>
      <Button onClick={saveEntry} >Save</Button>
    </StyledCreatePOC>
  )
}

const StyledCreatePOC = styled.div`
display: flex;
justify-content: center;
`;


export default CreatePOC;