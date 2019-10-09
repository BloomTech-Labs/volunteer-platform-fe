import React from 'react';
import styled from 'styled-components';
import {Icon} from 'antd'

export const FourthRow = () => {
  return (
    <StyledFourthRow>
      <div style={{ marginLeft: '50%', fontSize: '30px' }}>
        <Icon
          type="twitter-circle"
          theme="filled"
          style={{ paddingRight: '1%' }}
        />
        <Icon type="facebook" theme="filled" style={{ paddingRight: '1%' }} />
        <Icon type="google-circle" theme="filled" />
      </div>
    </StyledFourthRow>
  );
};

const StyledFourthRow = styled.div`
  width: 80%;
  margin: 0 auto 24px;
  min-height: 150px;
`;
export default FourthRow;
