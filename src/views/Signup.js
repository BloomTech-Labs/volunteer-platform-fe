import React, { useEffect, useState } from "react";
import { StyledForm, StyledButton, AntInput } from "../styled";
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

export const Signup = () => {
  
  const [ state, dispatch ] = useStateValue();
  /**
   * @type {User}
   */
  let user = {
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
    uid: "",
    age: 18
  };
  const [ localState, setState ] = useState( user );
  
  useEffect( () => {
    
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
      setState( { ...user } );
    }
  }, [ state ] );
  
  const changeValue = e => {
    setState( { ...localState, [ e.target.name ]: e.target.value } );
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    register( localState, dispatch );
  };
  
  return ( <SignUpForm>
    { localState.photoURL &&
    <Avatar src={ localState.photoURL } shape="square" size={ 64 }
            icon="user"/> }
    <StyledForm onSubmit={ handleSubmit }>
      <AntInput name={ "First Name" } values={ localState }
                onChange={ changeValue }/>
      <AntInput name={ "Last Name" } values={ localState }
                onChange={ changeValue }/>
      <AntInput name={ "Phone Number" }
                values={ localState }
                onChange={ changeValue }/>
      <AntInput name={ "Age" }
                values={ localState }
                onChange={ changeValue }/>
      <AntInput name={ "Email" } values={ localState }
                onChange={ changeValue }/>
      <AntInput name={ "City" } values={ localState }
                onChange={ changeValue }/>
      <AntInput name={ "State" } values={ localState }
                onChange={ changeValue }/>
      <AntInput name={ "Zip Code" } values={ localState }
                onChange={ changeValue }/>
      
      <StyledButton type="primary" htmlType="submit">
        Register
      </StyledButton>
    </StyledForm>
  </SignUpForm> );
};

export default Signup;