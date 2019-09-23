import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

const AntdInput = ( { name, camelCase, children, ...rest } ) => {
  return ( <StyledInput { ...rest }>
    { children }
  </StyledInput> );
};

const StyledInput = styled( Input )`

`;

export default AntdInput;