import React, { useEffect, useState } from 'react';
import { WrappedAntForm, StyledButton, AntInput, StyledCard } from '../styled';
import { Avatar } from 'antd';
import styled from 'styled-components';
import { useStateValue } from '../hooks/useStateValue';
import { register } from '../actions';
import { formLayouts } from '../utility/formLayouts';

export const Signup = (props) => {
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
    register( values, dispatch );
  };

  return (
    <StyledDiv className={'flex center'}>
      <CustomStyledCard style={{ maxWidth: '900px', margin: '2rem 0 5rem 0' }}>
        <h1>Let's set up your profile</h1>
        {localState.photoURL && (
          <Avatar
            src={localState.photoURL}
            shape="square"
            size={64}
            icon="user"
          />
        )}
        <WrappedAntForm
          layout={'vertical'}
          onSubmit={handleSubmit}
          autofill={localState}
          buttonType="primary"
          buttonText="Register"
          buttonLoading={state.auth.isLoading}
        >
          <div className='inputGroup'>
            <div className='top'>
              <AntInput name={'First Name'} 
                        layout={formLayouts.formItemLayout} />
              <AntInput name={'Last Name'} 
                        layout={formLayouts.formItemLayout}/>  
              <AntInput name={'Age'} 
                        layout={formItemLayoutShort} />
            </div>
            <div className='middle'>
            <AntInput name={'Email'} 
                        layout={formLayouts.formItemLayout} />
              <AntInput name={'Phone Number'}
                        layout={formLayouts.formItemLayout} />
            </div>
            <div className='bottom'>
              <AntInput name={'City'} 
                        layout={formLayouts.formItemLayout} />
              <AntInput name={'State'} 
                        layout={formLayouts.formItemLayout} />
              <AntInput name={'Zip Code'} 
                        layout={formItemLayoutShort}/>
            </div>        
          </div>
        </WrappedAntForm>
      </CustomStyledCard>
    </StyledDiv>
  );
};

export default Signup;

const CustomStyledCard = styled(StyledCard)`
  background: #d9d9d9;
  text-align: center;

  button {
    align-self: center;
    width: 120px;
    padding: 0.5rem 2rem;
    font-family: Arvo;
    font-size: 16px;
    height: auto;
    margin-top: 1.5rem;
  }

  button:hover {
    background: ${props => props.theme.primary8};
  }

  label {
    color: ${props => props.theme.primary8};
    font-weight: bold;
  }

  .inputGroup {
    background: ${props => props.theme.gray4};
    width: 90%;
    margin: 3rem;
    border-radius: 3px;
    padding: 2rem 3.5rem;
  }
  
  .top, .middle, .bottom {
    display: flex;
    justify-content: flex-start;
    margin: 2rem 0;
  }
`;

const StyledDiv = styled.div`
  background: white;
`

const formItemLayoutShort = {
  labelCol: {
    xs: {span: 20},
    sm: {span: 20},
  },
  wrapperCol: {
    xs: {span: 10},
    sm: {span: 10},
  },
};

