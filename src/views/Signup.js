import React, { useEffect, useState } from 'react';
import { WrappedAntForm, StyledButton, AntInput } from '../styled';
import { Avatar } from 'antd';
import styled from 'styled-components';
import { useStateValue } from '../hooks/useStateValue';
import { register } from '../actions';

const SignUpForm = styled.div`
  margin: 4rem 2rem;
  max-width: 50%;
`;

export const Signup = () => {
  const [state, dispatch] = useStateValue();
  /**
   * @type {User}
   */
  let user = {
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    email: '',
    uid: '',
    age: 18,
  };
  const [localState, setState] = useState(user);

  useEffect(() => {
    if (state.auth.googleAuthUser) {
      user.uid = state.auth.googleAuthUser.uid;
      if (state.auth.googleAuthUser.displayName) {
        const name = state.auth.googleAuthUser.displayName.split(' ');
        user.firstName = name[0];
        user.lastName = name[1];
      }

      if (state.auth.googleAuthUser.email) {
        user.email = state.auth.googleAuthUser.email;
      }

      if (state.auth.googleAuthUser.phoneNumber) {
        user.phoneNumber = state.auth.googleAuthUser.phoneNumber;
      }

      if (state.auth.googleAuthUser.photoURL) {
        user.photoURL = state.auth.googleAuthUser.photoURL;
      }
      setState({ ...user });
    }
  }, [state]);

  const handleSubmit = values => {
    values.uid = localState.uid;
    register(values, dispatch);
  };

  return (
    <SignUpForm>
      {localState.photoURL && (
        <Avatar
          src={localState.photoURL}
          shape="square"
          size={64}
          icon="user"
        />
      )}
      <WrappedAntForm
        onSubmit={handleSubmit}
        autofill={localState}
        buttonType="primary"
        buttonText="Register"
      >
        <AntInput name={'First Name'} />
        <AntInput name={'Last Name'} />
        <AntInput name={'Phone Number'} />
        <AntInput name={'Age'} />
        <AntInput name={'Email'} />
        <AntInput name={'City'} />
        <AntInput name={'State'} />
        <AntInput name={'Zip Code'} />
      </WrappedAntForm>
    </SignUpForm>
  );
};

export default Signup;
