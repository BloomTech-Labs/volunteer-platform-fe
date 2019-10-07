import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Avatar, Card, message } from 'antd';

import {WrappedAntForm, AntInput, AntInputNumber, successModal } from '../styled';
import {useStateValue} from '../hooks/useStateValue';
import {register} from '../actions';
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
  //const [modalOpen, setModalOpen] = useState(false);

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
    regUserSuccessModal();
  };

  const regUserSuccessModal = successModal({
    title: 'Registration Success!',
    maskStyle: { background: `rgba(97, 37, 0, 0.2)` }
  })

  const cancelRegister = () => {
    message.warning('Registration is required to continue using Voluntier');
  }
  
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
            submitButton
            submitButtonText="Register"
            buttonLoading={state.auth.isLoading}
            cancelButton={true}
            cancelButtonText={'Cancel'}
            handleCancel={cancelRegister}
          >
            <div className='inputGroup'>
              <div className='row'>
                <AntInput name={'First Name'}
                          layout={formItemLayout}/>
                <AntInput name={'Last Name'}
                          layout={formItemLayout}/>
              </div>
              <div className='row'>
                <AntInput name={'City'}
                          layout={formItemLayout}/>
                <AntInput name={'State'}
                          layout={formItemLayout}/>
              
              </div>
              <div className='row'>
                <AntInput name={'Email'}
                          layout={formItemLayout}/>
                <AntInput name={'Zip Code'}
                          layout={formItemLayoutShort}/>
              </div>
              <div className='row'>
                <AntInput name={'Phone Number'}
                          layout={formItemLayout}/>
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
      font-size: 16px;
      height: auto;
      margin: 1.5rem 3rem;

      @media (max-width: 650px) {
        margin: 1.5rem 2rem;
      }
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

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 24},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 20},
  },
};

