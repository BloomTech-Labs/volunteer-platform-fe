import styled from 'styled-components';
import { Card } from 'antd';

export const StyledCard = styled(Card)`
  && {
    width: 100%;
    max-width: 500px;
    border-radius: ${({theme}) => theme.borderRadiusDefault};
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    cursor: pointer;
    &:hover{
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
  }
`;
