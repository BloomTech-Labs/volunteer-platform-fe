import React from 'react';
import { useStateValue } from '../../hooks/useStateValue';
import styled from 'styled-components';
import moment from 'moment';
import { Input } from 'antd';
import { sendMessage } from '../../actions';

const Messages = ({ messageId }) => {
  const [{ auth, messages }, dispatch] = useStateValue();
  const messageThread = messages.messageThreads.filter(
    messageThread => messageThread.id === messageId);
  const {Search} = Input;
  
  const send = (value) => {
<<<<<<< HEAD
    //debugger;
=======
    
>>>>>>> staging
    const message = {
      createdAt: moment().unix(),
      from: auth.googleAuthUser.uid,
      to: messageThread[0].id,
      text: value,
      read: false,
    };
    
    const to = {
      type: messageThread[ 0 ].contactType,
      uid: messageThread[ 0 ].id,
    };
    
    const from = {
      type: 'users',
      uid: auth.googleAuthUser.uid,
    };
    
    sendMessage(to, from, message);
  };

  return (
    <StyledMessages>
      <StyledMessageThread>
        {messageThread.length > 0 &&
        messageThread[ 0 ].messages.map((message, i) => {
          return (
            <div key={message + ' ' + i}
                 className={message.to === auth.googleAuthUser.uid ? 'other' :
                   'me'}
            >
              {message.to === auth.googleAuthUser.uid &&
              <p>{messageThread[ 0 ].firstName}: {moment.unix(message.createdAt)
                .format('LT')}</p>}
              {message.to !== auth.googleAuthUser.uid &&
              <p>Me: {moment.unix(message.createdAt)
                .format('LT')}</p>}
              <p className={'message'}>{message.text} </p>
            </div>
          );
        })}
      </StyledMessageThread>
      <Search
        placeholder={'Message'}
        onSearch={send}
        enterButton={'Send'}
        size={'large'}
      />
    </StyledMessages>
  );
};

const StyledMessages = styled.div`

width: 100%;
max-width: 600px;

p {
  margin: 0;
}

.me {
  border-radius: 20px;
  margin-top: 1rem;
  max-width: 60%;
  background-color: #3e999f;
  padding: .5rem 2rem;
  margin-left: 1rem;
}

.me:last-child {
  margin-bottom: 3rem;
}

.other {
  margin-left: 40%;
  border-radius: 20px;
  margin-top: 1rem;
  max-width: 60%;
  background-color: #0074D9;
  padding: .5rem 2rem;
}

.other:last-child {
  margin-bottom: 3rem;
}

.message {
  margin: 0 0 0 2rem;
`;

const StyledMessageThread = styled.div`
  height: 60vh;
  overflow-y: scroll;
`;

export default Messages;
