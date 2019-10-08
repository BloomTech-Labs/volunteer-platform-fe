import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import MessageThreads from '../components/Messages/MessageThreads';
import {StyledCard} from '../styled';

const Message = (props) => {
  
  return (
    <StyledMessage width={props.width}>
      <StyledCard>
        <MessageThreads {...props}/>
      </StyledCard>
    </StyledMessage>
  );
};

const StyledMessage = styled.div`
margin-left: ${props => props.width < 900 ? 0 : '15rem'}
`;

Message.propTypes = {
  width: PropTypes.number.isRequired,
};

export default Message;