import React, {useEffect, useState} from 'react';
import {WrappedAntForm, AntInput, AntInputNumber} from '../styled';
import {Avatar, Card} from 'antd';
import styled from 'styled-components';
import {useStateValue} from '../hooks/useStateValue';
import {register} from '../actions';
import {formLayouts} from '../utility/formLayouts';
import sampleProfile from '../assets/undraw_profile.svg';
import {device} from '../styled/deviceBreakpoints';

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
    if (state.auth.googleAuthUser){
      user.uid = state.auth.googleAuthUser.uid;
      if (state.auth.googleAuthUser.displayName){
        const name = state.auth.googleAuthUser.displayName.split(' ');
        user.firstName = name[ 0 ];
        user.lastName = name[ 1 ];
      }
      
      if (state.auth.googleAuthUser.email){
        user.email = state.auth.googleAuthUser.email;
      }
      
      if (state.auth.googleAuthUser.phoneNumber){
        user.phoneNumber = state.auth.googleAuthUser.phoneNumber;
      }
      
      if (state.auth.googleAuthUser.photoURL){
        user.photoURL = state.auth.googleAuthUser.photoURL;
      }
      setState({...user});
    }
  }, [state]);
  
  const handleSubmit = values => {
    values.uid = localState.uid;
    register(values, dispatch);
  };
  
  return (
    <StyledDiv>
      <div className='inner-div'>
        <CustomStyledCard style={{maxWidth: '800px', margin: `2rem 0 5rem 0`}}>
          <h1>Get Registered</h1>
          {localState.photoURL ? (
            <Avatar
              src={localState.photoURL}
              shape="square"
              size={64}
              icon="user"
            />
          ) : (
            <img src={sampleProfile} alt='undraw profile'/>
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
              <div className='row'>
                <AntInput name={'First Name'}
                          layout={formLayouts.formItemLayout}/>
                <AntInput name={'Last Name'}
                          layout={formLayouts.formItemLayout}/>
              </div>
              <div className='row'>
                <AntInput name={'City'}
                          layout={formLayouts.formItemLayout}/>
                <AntInput name={'State'}
                          layout={formLayouts.formItemLayout}/>
              
              </div>
              <div className='row'>
                <AntInput name={'Email'}
                          layout={formLayouts.formItemLayout}/>
                <AntInput name={'Zip Code'}
                          layout={formItemLayoutShort}/>
              </div>
              <div className='row'>
                <AntInput name={'Phone Number'}
                          layout={formLayouts.formItemLayout}/>
                <AntInputNumber name={'Age'}
                                layout={formItemLayoutShort}/>
              </div>
            </div>
          </WrappedAntForm>
        </CustomStyledCard>
      </div>
    </StyledDiv>
  );
};

export default Signup;

const CustomStyledCard = styled(Card)`
  && {
  text-align: center;
  border-radius: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-center: space-between;
  padding-bottom: 3rem;
  
    img {
      width: 200px;
      margin: 1.5rem auto;
    }

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
    }

    .inputGroup {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center; 
      margin: 2rem 0 1rem 0;
    }

    .row {
      width: 70%;
      display: flex;
      justify-content: center;
      padding-left: 3.5rem;

      @media ${device.tablet} {
        width: 90%;
      }

      @media (max-width: 650px) {
        padding-left: 0
      }
    }

    .ant-form-item {
      width: 50%;

      @media ${device.tablet} {
        margin-right: 0.8rem; 
        margin-left: 0.8rem; 
      }
    }

  }
`;

const StyledDiv = styled.div`
  background: #E5E5E5;
  width: 100vw;
  display: flex;

  .inner-div {
    width: 1150px
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const formItemLayoutShort = {
  labelCol: {
    xs: {span: 20},
    sm: {span: 20},
  },
  wrapperCol: {
    xs: {span: 20},
    sm: {span: 10},
  },
};


