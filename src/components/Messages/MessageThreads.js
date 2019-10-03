import React, {useEffect, useState} from 'react';
import {Menu, Layout, Badge} from 'antd';
import Messages from './Messages';
import {StyledCard} from '../../styled';
import {useStateValue} from '../../hooks/useStateValue';
import styled from 'styled-components';
import {markMessagesRead} from '../../actions';

const MessageThreads = () => {
  
  const [selectedThread, setSelectedThread] = useState();
  const [{messages, auth}, dispatch] = useStateValue();
  
  useEffect(() => {
    
    if (!selectedThread && auth.googleAuthUser &&
      messages.messages[ auth.googleAuthUser.uid ] &&
      messages.messages[ auth.googleAuthUser.uid ][ 0 ]){
      setSelectedThread(messages.messages[ auth.googleAuthUser.uid ][ 0 ]);
      const contact = {
        type: 'users',
        uid: auth.googleAuthUser.uid,
      };
      markMessagesRead(
        contact,
        messages.messages[ auth.googleAuthUser.uid ][ 0 ]);
    }
  }, [messages.messages]);
  
  const handleClick = ({key}) => {
    const messageThread = messages.messages[ auth.googleAuthUser.uid ].filter(
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
          {auth.googleAuthUser &&
          messages.messages[ auth.googleAuthUser.uid ] &&
          messages.messages[ auth.googleAuthUser.uid ].map(thread => {
            return <StyledMenuItem key={thread.id}>
              <Badge style={{
                color: '#fff',
                backgroundColor: '#1890ff',
                marginBottom: '30px',
              }}
                     count={thread.unreadMessages}>
                <span style={{
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