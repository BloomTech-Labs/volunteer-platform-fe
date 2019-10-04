import React, {useState} from 'react';
import {useStateValue} from '../../hooks/useStateValue';
import styled from 'styled-components';
import moment from 'moment';
import {Input} from 'antd';
import {sendMessage} from '../../actions';

const Messages = ({messageId, selectedUid}) => {
  const [{auth, messages}, dispatch] = useStateValue();
  const [text, setText] = useState();
  
  let messageThread = [];
  if (messages.messages[ selectedUid ] &&
    messages.messages[ selectedUid ].filter(
      messageThread => messageThread.id === messageId).length > 0){
    messageThread = messages.messages[ selectedUid ].filter(
      messageThread => messageThread.id === messageId);
  }
  
  const {Search} = Input;
  
  const send = () => {
    
    const message = {
      createdAt: moment().unix(),
      from: selectedUid,
      to: messageThread[ 0 ].id,
      text: text,
      read: false,
    };
    
    const to = {
      type: messageThread[ 0 ].contactType,
      uid: messageThread[ 0 ].id,
    };
    
    const from = {
      type: selectedUid === auth.googleAuthUser.uid ? 'users' : 'organizations',
      uid: selectedUid,
    };
    setText('');
    sendMessage(to, from, message);
  };
  
  return (
    <StyledMessages>
      <StyledMessageThread>
        {messageThread.length > 0 &&
        messageThread[ 0 ].messages.map((message, i) => {
          return (
            <div key={message + ' ' + i}
                 className={message.to === selectedUid ? 'other' :
                   'me'}
            >
              {message.to === selectedUid &&
              <p>{messageThread[ 0 ].name}: {moment.unix(message.createdAt)
                .format('LLL')}</p>}
              {message.to !== selectedUid &&
              <p>Me: {moment.unix(message.createdAt)
                .format('LLL')}</p>}
              <p className={'message'}>{message.text} </p>
            </div>
          );
        })}
        {messageThread.length === 0 && <h2>No messages to display</h2>}
      </StyledMessageThread>
      <Search
        placeholder={'Message'}
        onSearch={send}
        enterButton={'Send'}
        size={'large'}
        value={text}
        onChange={e => setText(e.target.value)}
      />
    </StyledMessages>
  );
};

const StyledMessages = styled.div`
                
                width: 100%;
                
                
                p {
                margin: 0;
                color: #cbcbcb;
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
                font-size: 1.5rem;
                color: black;
                `;

const StyledMessageThread = styled.div`
                height: 65Vh;
                overflow-y: scroll;
                `;

export default Messages;
