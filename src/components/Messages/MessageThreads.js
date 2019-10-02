import React, {useEffect, useState} from 'react';
import {Menu, Layout, Badge} from 'antd';
import Messages from './Messages';
import {useStateValue} from '../../hooks/useStateValue';
import styled from 'styled-components';
import {markMessagesRead} from '../../actions';

const MessageThreads = () => {
  
  const [selectedThread, setSelectedThread] = useState();
  const [{messages, auth}, dispatch] = useStateValue();
  
  useEffect(() => {
    if (!selectedThread && messages.messageThreads[ 0 ]){
      setSelectedThread(messages.messageThreads[ 0 ]);
      const contact = {
        type: 'users',
        uid: auth.googleAuthUser.uid,
      };
      markMessagesRead(contact, messages.messageThreads[ 0 ]);
    }
  }, [messages.messageThreads]);
  
  const handleClick = ({key}) => {
    const messageThread = messages.messageThreads.filter(
      thread => thread.id === key)[ 0 ];
    setSelectedThread(messageThread);
    const contact = {
      type: 'users',
      uid: auth.googleAuthUser.uid,
    };
    markMessagesRead(contact, messageThread);
  };
  
  return (
    <Layout>
      
      <div className={'row'}>
        <Menu
          onClick={handleClick}
          style={{width: 256}}
          defaultSelectedKeys={['1']}
          mode="inline"
        >
          {messages.messageThreads.map(thread => {
            return <StyledMenuItem key={thread.id}>
              <Badge style={{
                color: '#fff',
                backgroundColor: '#1890ff',
                marginBottom: '30px',
              }}
                     count={thread.unreadMessages}><span
                style={{
                  marginRight: '1rem',
                }}>{thread.name}</span>
              </Badge>
            </StyledMenuItem>;
          })}
        </Menu>
        {selectedThread && <Messages messageId={selectedThread.id}/>}
      </div>
    
    </Layout>
  
  );
};

const StyledMenuItem = styled(Menu.Item)`
&&{
  margin-top: 10px;
  
}

span > p {
  color: white;
}
`;

export default MessageThreads;