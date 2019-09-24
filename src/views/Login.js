import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Icon } from 'antd';
import {
  StyledButton,
  WrappedAntdForm,
  AntdInput,
  StyledLine,
  StyledLink,
} from '../styled';
import {
  signIn,
  GOOGLE_PROVIDER,
  FACEBOOK_PROVIDER,
  TWITTER_PROVIDER,
  EMAIL_PROVIDER,
} from '../actions';
import { useStateValue } from '../hooks/useStateValue';
import { device } from '../styled/deviceBreakpoints';

export const Login = props => {
  const [, dispatch] = useStateValue();
  const [localState, setState] = useState({});
  const [pathName, setPathName] = useState(props.location.pathname);

  useEffect(() => {
    setPathName(props.location.pathname);
  }, [props.location.pathname]);

  return (
    <StyledLogin>
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
        <h4>Or</h4>
        <WrappedAntdForm
          onSubmit={values => {
            signIn(
              EMAIL_PROVIDER,
              dispatch,
              values.email,
              values.password
            );
          }}
          useButton={false}
        >
          <AntdInput
            name={'Email'}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
          />
          <AntdInput
            name={'Password'}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Password"
            type="password"
          />
        </WrappedAntdForm>
        <StyledCenter>
          <Form.Item>
            <StyledButton type="primary" htmlType="submit">
              {pathName === `/login` ? 'Login' : 'Register'}
            </StyledButton>
          </Form.Item>

          <h4>
            {pathName === '/login'
              ? 'Dont have an account?'
              : 'Already have an account?'}
          </h4>
          <StyledLink to={pathName === '/login' ? '/signup' : '/login'}>
            {pathName === '/login' ? 'Sign up here.' : 'Login here.'}
          </StyledLink>
        </StyledCenter>
      </StyledCenter>
    </StyledLogin>
  );
};

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  margin-bottom: 4rem;

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
`;
export default Login;
