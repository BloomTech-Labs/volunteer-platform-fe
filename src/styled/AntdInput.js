import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AntdInput = ({ children, ...rest }) => {
  return <StyledInput {...rest}>{children}</StyledInput>;
};

const StyledInput = styled(Input)``;

export default AntdInput;
