import React from 'react';
import styled from 'styled-components';
import { Select } from 'antd';

const AntdSelect = ({ children, ...rest }) => {
  return <StyledSelect {...rest}>{children}</StyledSelect>;
};

const StyledSelect = styled(Select)``;

export default AntdSelect;
