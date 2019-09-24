import React from 'react';
import styled from 'styled-components';
import { Radio } from 'antd';

const AntdRadio = ({ ...rest }) => {
  return (
    <div className={'inline'}>
      <StyledRadio {...rest}></StyledRadio>
    </div>
  );
};

const StyledRadio = styled(Radio)``;

export default AntdRadio;
