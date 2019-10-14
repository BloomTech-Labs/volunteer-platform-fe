import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import MessageThreads from '../components/Messages/MessageThreads';
import {StyledCard} from '../styled';
import GoogleApiWrapper from '../components/Map/MapContainer';

const Message = (props) => {
  console.log(props)
  return (
    <StyledMessage width={props.width}>
      <MessageThreads {...props}/>
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