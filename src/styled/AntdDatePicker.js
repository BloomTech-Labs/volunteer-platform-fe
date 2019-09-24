import React from 'react';
import styled from 'styled-components';
import { Tooltip, DatePicker } from 'antd';

const AntdDatePicker = ({ children, tooltipTitle, ...rest }) => {
  return (
    <div className={'inline'}>
      <StyledDatePicker {...rest}>{children}</StyledDatePicker>
    </div>
  );
};

const StyledToolTip = styled(Tooltip)`
  display: flex;
`;

const StyledDatePicker = styled(DatePicker)``;

export default AntdDatePicker;
