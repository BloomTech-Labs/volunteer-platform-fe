import styled from 'styled-components';
import { Card } from 'antd';

export const StyledCard = styled(Card)`
  && {
    width: 100%;
    max-width: 500px;
    border-radius: ${({theme}) => theme.borderRadiusDefault};
    background: ${({theme}) => theme.secondary300}
  }
`;
