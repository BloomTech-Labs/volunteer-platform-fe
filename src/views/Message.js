import React from 'react';
import MessageThreads from '../components/Messages/MessageThreads';

const Message = (props) => {
  
  return (
    <div>
      <MessageThreads {...props}/>
    </div>
  );
};

export default Message;