import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Avatar, Comment, Icon} from 'antd';

import {WrappedAntForm, AntInput, StyledLine, StyledLink} from '../styled';
import {
  signIn,
  GOOGLE_PROVIDER,
  FACEBOOK_PROVIDER,
  TWITTER_PROVIDER,
  EMAIL_PROVIDER,
} from '../actions';
import {useStateValue} from '../hooks/useStateValue';
import {device} from '../styled/deviceBreakpoints';

export const Login = props => {
  const [state, dispatch] = useStateValue();
  const [pathName, setPathName] = useState(props.location.pathname);
  
  useEffect(() => {
    setPathName(props.location.pathname);
  }, [props.location.pathname]);
  
  return (
    <StyledLogin loggedIn={state.auth.loggedIn}>
      <StyledBorder>
        <h1>
          {pathName === '/login'
            ? 'Welcome Back!'
            : 'Sign Up Now!'}
        </h1>
        <div className={'line-box'}>
          <StyledLine big width={'53%'}/>
        </div>
        
        <h5>
          {pathName === `/login`
            ? 'Sign in with any of the following'
            : 'Sign up using your social account'}
        </h5>
        <br></br>
        <Inline>
          <Icon type="google"
                onClick={() => signIn(GOOGLE_PROVIDER, dispatch)}/>
          <Icon
            type="twitter"
            onClick={() => signIn(TWITTER_PROVIDER, dispatch)}
          />
          <Icon
            type="facebook"
            onClick={() => signIn(FACEBOOK_PROVIDER, dispatch)}
          />
        </Inline>
        <div className={'line-box'}>
          <StyledLine big width={'53%'}/>
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
                values.lastName,
              );
            }}
            cancelButton={pathName === '/signup'}
            cancelButtonText={'Cancel'}
            layout={'vertical'}
            buttonType="primary"
            submitButton
            submitButtonText={pathName === `/login` ? 'Login' : 'Sign Up'}
            buttonLoading={state.auth.isLoading}
          >
            {pathName === '/signup' && (
              <div>
                <AntInput
                  name={'First Name'}
                  placeholder={'First Name'}
                  layout={formItemLayout}
                  style={{backgroundColor: '#e8f0fe'}}
                />
                <AntInput
                  name={'Last Name'}
                  placeholder={'Last Name'}
                  layout={formItemLayout}
                  style={{backgroundColor: '#e8f0fe'}}
                />
              </div>
            )}
            <AntInput
              name={'Email'}
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder="Email"
              layout={formItemLayout}
            />
            <AntInput
              name={'Password'}
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder="Password"
              type="password"
              layout={formItemLayout}
            />
          </WrappedAntForm>
          {state.auth.signInError && <div>{state.auth.signInError}</div>}
          {state.auth.signUpError && <div>{state.auth.signUpError}</div>}
          <div className={'line-box'}>
            <StyledLine big width={'53%'}/>
          </div>
          <StyledCenter>
            <h6>
              {pathName === '/login'
                ? 'Don\'t have an account?'
                : 'Already have an account?'}
            </h6>
            <CustomStyledLink to={pathName === '/login' ? '/signup' : '/login'}>
              {pathName === '/login' ? 'Sign up here.' : 'Sign in here.'}
            </CustomStyledLink>
            {pathName === '/signup' &&
            <Comment avatar={<Avatar size={128} icon={'user'}/>}
                     className={'comment'}
                     content={<h2>'"Both as a volunteer and a non-profit staff
                       member this has been the best tool to
                       connect volunteers, community and nonProfits." --James
                       Anderson'</h2>}/>}
          </StyledCenter>
        </StyledCenter>
      </StyledBorder>
    </StyledLogin>
  );
};

export default Login;

const StyledLogin = styled.div`
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
          margin-bottom: 4rem;
          width: ${({loggedIn}) => loggedIn && '100vw'};
          label {
          color: ${({theme}) => theme.primary8};
          
          &::before {
          color: ${({theme}) => theme.primary8};
          }
          }
          h1 {
          margin-top: 3.9rem;
          margin-bottom: 2.3rem;
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
          
          .buttonStyles {
          display: flex;
          align-items: center;
          flex-direction: column-reverse;
        }
          
          .ant-btn {
          margin-bottom: 2rem;
        }
        .comment {
        max-width: 90%;
        }
        
        .ant-comment-avatar {
          margin-right: 2rem;
        }
          `;

const StyledBorder = styled.div`
margin: 3rem;
 display: flex;
 flex-direction: column;
  max-width: 1000px;
  width: 100%;
  border: 2px solid lightGray;
`;

const Inline = styled.div`
          display: flex;
          justify-content: center;
          font-size: 3rem;
          margin-bottom: 2.5rem;
          
          i:not(:first-child) {
          margin-left: 3rem;
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
          font-size: 1rem;
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
