import React from "react";
import styled from "styled-components";
import {
  StyledButton, StyledForm, StyledInput, StyledCard
} from "../components/Styled";
import { Form, Icon } from "antd";

const StyledLogin = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;

`;

const Inline = styled.div`
display: flex;
`;

const Login = () => {
  
  return ( <StyledLogin>
    <h1>Login with</h1>
    <Inline>
      <StyledButton type={ "primary" }
                    style={ { margin: " 0 2rem 1rem 0" } }> Google </StyledButton>
      <StyledButton type={ "primary" }
                    style={ { margin: " 0 2rem 1rem 0" } }>Facebook</StyledButton>
      <StyledButton type={ "primary" }>Twitter</StyledButton>
    </Inline>
    <StyledForm>
      <Form.Item>
        <StyledInput
          prefix={ <Icon type="user"
                         style={ { color: "rgba(0,0,0,.25)" } }/> }
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item>
        <StyledInput
          prefix={ <Icon type="lock"
                         style={ { color: "rgba(0,0,0,.25)" } }/> }
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <StyledButton type="primary" htmlType="submit">
          Sign in
        </StyledButton>
      </Form.Item>
    </StyledForm>
  </StyledLogin> );
};

export default Login;