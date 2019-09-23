import React from 'react';
import styled from 'styled-components';
import TextArea from 'antd/lib/input/TextArea';

const AntdTextArea = ( { ...rest } ) => {
  return ( <StyledTextArea { ...rest }>
  
  </StyledTextArea> );
};

const StyledTextArea = styled( TextArea )``;

export default AntdTextArea;