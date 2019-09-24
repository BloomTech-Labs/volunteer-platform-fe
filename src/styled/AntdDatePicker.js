import React from 'react';
import styled from 'styled-components';
import { Tooltip, DatePicker } from 'antd';

const AntdDatePicker = ({ ...rest }) => {
  return (
    <div className={'inline'}>
      <StyledDatePicker {...rest}></StyledDatePicker>
    </div>
  );
};

const StyledDatePicker = styled(DatePicker)``;

export default AntdDatePicker;
