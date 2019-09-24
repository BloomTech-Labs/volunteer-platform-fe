import React from 'react';
import { InputNumber } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AntdInputNumber = ({ name, children, ...rest }) => {
  return <StyledInputNumber {...rest}>{children}</StyledInputNumber>;
};

const StyledInputNumber = styled(InputNumber)``;

export default AntdInputNumber;
