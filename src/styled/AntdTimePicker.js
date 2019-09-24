import React from 'react';
import styled from 'styled-components';
import { TimePicker } from 'antd';

const AntdTimePicker = ({ ...rest }) => {
  return <StyledTimePicker {...rest}></StyledTimePicker>;
};

const StyledTimePicker = styled(TimePicker)``;

export default AntdTimePicker;
