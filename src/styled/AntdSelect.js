import React from 'react';
import styled from 'styled-components';
import { Icon, Select, Tooltip } from 'antd';

const AntdSelect = ( { children, tooltipTitle, ...rest } ) => {
  return ( <div className={ 'inline' }>
    
    <StyledSelect { ...rest }>
      
      { children }
    </StyledSelect>
  </div> );
};

const StyledToolTip = styled( Tooltip )`
display: flex;
`;

const StyledSelect = styled( Select )``;

export default AntdSelect;