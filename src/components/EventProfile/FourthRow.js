import React from 'react';
import styled from 'styled-components';
import {Icon, Col} from 'antd'
import {StyledCard} from '../../styled'
export const FourthRow = () => {
  return (
    <StyledFourthRow>
      <Col span={20}>
          Cards of other volunteers attending
      </Col>
      <Col span={4} className='social-media'>
        <Icon
          type="twitter-circle"
          theme="filled"
          style={{ paddingRight: '1%' }}
        />
        <Icon type="facebook" theme="filled" style={{ paddingRight: '1%' }} />
        <Icon type="google-circle" theme="filled" />
      </Col>
    </StyledFourthRow>
  );
};

const StyledFourthRow = styled(StyledCard)`
  min-height: 150px;

  .social-media{
    display: flex;
    justify-content: space-around;
      i{
          font-size: 30px;
      }
  }
`;
export default FourthRow;
