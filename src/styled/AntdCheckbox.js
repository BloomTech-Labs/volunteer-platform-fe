import React from 'react';
import styled from 'styled-components';
import { Tooltip, Checkbox } from 'antd';

const AntdDatePicker = ({ children, tooltipTitle, ...rest }) => {
  return (
    <div className={'inline'}>
      <StyledCheckbox {...rest}>{children}</StyledCheckbox>
    </div>
  );
};

const StyledToolTip = styled(Tooltip)`
  display: flex;
`;

const StyledCheckbox = styled(Checkbox)``;

export default AntdDatePicker;
