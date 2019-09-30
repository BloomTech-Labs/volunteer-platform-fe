import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { WrappedAntForm, AntInput, StyledLine, StyledLink } from '../styled';
import {
  signIn,
  GOOGLE_PROVIDER,
  FACEBOOK_PROVIDER,
  TWITTER_PROVIDER,
  EMAIL_PROVIDER,
} from '../actions';
import { formLayouts } from '../utility/formLayouts';
import { useStateValue } from '../hooks/useStateValue';
import { device } from '../styled/deviceBreakpoints';

export const Login = props => {
  const [state, dispatch] = useStateValue();
  const [pathName, setPathName] = useState(props.location.pathname);

  useEffect(() => {
    setPathName(props.location.pathname);
  }, [props.location.pathname]);

  return (
    <StyledLogin loggedIn = {state.auth.loggedIn}>
      <h3>
        {pathName === '/login'
          ? 'Welcome Back!'
          : 'Lets do some good in the' + ' world. Sign up below.'}
      </h3>
      <div className={'line-box'}>
        <StyledLine big width={'53%'} />
      </div>

      <h5>
        {pathName === `/login`
          ? 'Sign in with any of the following'
          : 'Quick sign up by linking your account'}
      </h5>
      <br></br>
      <Inline>
        <Icon
          type="twitter"
          onClick={() => signIn(TWITTER_PROVIDER, dispatch)}
        />
        <Icon type="google" onClick={() => signIn(GOOGLE_PROVIDER, dispatch)} />
        <Icon
          type="facebook"
          onClick={() => signIn(FACEBOOK_PROVIDER, dispatch)}
        />
      </Inline>
      <div className={'line-box'}>
        <StyledLine big width={'53%'} />
      </div>
      <StyledCenter>
        <h4>OR</h4>
        <WrappedAntForm
          onSubmit={values => {
            signIn(
              EMAIL_PROVIDER,
              dispatch,
              values.email,
              values.password,
              values.firstName,
              values.lastName
            );
          }}
          layout={'vertical'}
          buttonType="primary"
          buttonText={pathName === `/login` ? 'Login' : 'Signup'}
          buttonLoading={state.auth.isLoading}
        >
          {pathName === '/signup' && (
            <div>
              <AntInput
                name={'First Name'}
                placeholder={'First Name'}
                layout={formItemLayout}
                style={{ backgroundColor: '#e8f0fe' }}
              />
              <AntInput
                name={'Last Name'}
                placeholder={'Last Name'}
                layout={formItemLayout}
                style={{ backgroundColor: '#e8f0fe' }}
              />
            </div>
          )}
          <AntInput
            name={'Email'}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
            layout={formItemLayout}
          />
          <AntInput
            name={'Password'}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Password"
            type="password"
            layout={formItemLayout}
          />
        </WrappedAntForm>
        {state.auth.signInError && <div>{state.auth.signInError}</div>}
        {state.auth.signUpError && <div>{state.auth.signUpError}</div>}
        <div className={'line-box'}>
          <StyledLine big width={'53%'} />
        </div>
        <StyledCenter>
          <h4>
            {pathName === '/login'
              ? "Don't have an account?"
              : 'Already have an account?'}
          </h4>
          <CustomStyledLink to={pathName === '/login' ? '/signup' : '/login'}>
            {pathName === '/login' ? 'Sign up here.' : 'Login here.'}
          </CustomStyledLink>
        </StyledCenter>
      </StyledCenter>
    </StyledLogin>
  );
};

export default Login;

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-bottom: 4rem;
  width: ${({loggedIn}) => loggedIn && '100vw'};

  h3 {
    margin-top: 3.9rem;
    margin-bottom: 2.3rem;
    font-size: 1.7rem;
    align-self: center;

    @media ${device.tablet} {
      margin-left: 1rem;
    }
  }
  .line-box {
    max-width: 100%;
    margin-bottom: 2.7rem;
  }
  h5 {
    margin: 0 auto;
    font-size: 1.2rem;
  }
`;

const Inline = styled.div`
  display: flex;
  justify-content: center;
  font-size: 3rem;
  margin-bottom: 2.5rem;

  i:not(:first-child) {
    margin-left: 1rem;
  }
`;

const StyledCenter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  .ant-form-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem auto;
    width: 280px;
  }

  .buttonStyles {
    display: flex;
    justify-content: center;
  }

  button:hover {
    background: ${props => props.theme.primary8};
  }

  label {
    color: ${props => props.theme.primary};
    font-size: 18px;
    line-height: 22px;
  }
`;

const CustomStyledLink = styled(StyledLink)`
  margin: 0;

  :hover {
    color: ${props => props.theme.primary8};
  }
`;

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
