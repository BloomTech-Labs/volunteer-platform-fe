import React, { useEffect, useState } from "react";
import { StyledForm, StyledButton, StyledInput } from "../styled";
import {
  Form, Avatar
} from "antd";
import styled from "styled-components";
import { useStateValue } from "../hooks/useStateValue";
import { register } from "../actions";

const SignUpForm = styled.div`
margin: 4rem 2rem;
  max-width: 50%;
`;

const Signup = () => {
  
  const [ state, dispatch ] = useStateValue();
  /**
   *
   * @type {User}
   */
  let user = {};
  const [ localState, setState ] = useState( user );
  
  useEffect( () => {
    debugger;
    if( state.auth.googleAuthUser ){
      user.uid = state.auth.googleAuthUser.uid;
      if( state.auth.googleAuthUser.displayName ){
        const name = state.auth.googleAuthUser.displayName.split( " " );
        user.firstName = name[ 0 ];
        user.lastName = name[ 1 ];
      }
      
      if( state.auth.googleAuthUser.email ){
        user.email = state.auth.googleAuthUser.email;
      }
      
      if( state.auth.googleAuthUser.phoneNumber ){
        user.phoneNumber = state.auth.googleAuthUser.phoneNumber;
      }
      
      if( state.auth.googleAuthUser.photoURL ){
        user.photoURL = state.auth.googleAuthUser.photoURL;
      }
      setState( user );
    }
  }, [ state ] );
  
  const changeValue = e => {
    setState( { ...localState, [ e.target.name ]: e.target.value } );
  };
  
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 }, sm: { span: 8 },
    }, wrapperCol: {
      xs: { span: 24 }, sm: { span: 16 },
    },
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    register( localState, dispatch );
  };
  
  return ( <SignUpForm>
    { localState.photoURL &&
    <Avatar src={ localState.photoURL } shape="square" size={ 64 }
            icon="user"/> }
    <StyledForm { ...formItemLayout } onSubmit={ handleSubmit }>
      <Form.Item label="First Name">
        <StyledInput name={ "firstName" } value={ localState[ "firstName" ] }
                     onChange={ changeValue }/>
      </Form.Item>
      <Form.Item label="Last Name">
        <StyledInput name={ "lastName" } value={ localState[ "lastName" ] }
                     onChange={ changeValue }/>
      </Form.Item>
      <Form.Item label="Phone Number">
        <StyledInput name={ "phoneNumber" }
                     value={ localState[ "phoneNumber" ] }
                     onChange={ changeValue }/>
      </Form.Item>
      <Form.Item label="E-mail">
        <StyledInput name={ "email" } value={ localState[ "email" ] }
                     onChange={ changeValue }/>
      </Form.Item>
      <Form.Item label="City">
        <StyledInput name={ "city" } value={ localState[ "city" ] }
                     onChange={ changeValue }/>
      </Form.Item>
      <Form.Item label="State">
        <StyledInput name={ "state" } value={ localState[ "state" ] }
                     onChange={ changeValue }/>
      </Form.Item>
      <Form.Item label="Zip Code">
        <StyledInput name={ "zipCode" } value={ localState[ "zipCode" ] }
                     onChange={ changeValue }/>
      </Form.Item>
      
      <StyledButton type="primary" htmlType="submit">
        Register
      </StyledButton>
    </StyledForm>
  </SignUpForm> );
};

export default Signup;