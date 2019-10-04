import React, {useEffect, useState} from 'react';
import {Menu, Layout, Badge} from 'antd';
import Messages from './Messages';
import {useStateValue} from '../../hooks/useStateValue';
import styled from 'styled-components';
import {markMessagesRead} from '../../actions';

const MessageThreads = (props) => {
  
  const [selectedThread, setSelectedThread] = useState();
  const [{messages, auth, org}, dispatch] = useStateValue();
  const [selectedUid, setSelectedUid] = useState();
  
  useEffect(() => {
    
    if (!selectedUid && auth.googleAuthUser){
      setSelectedUid(auth.googleAuthUser.uid);
    }
  }, [auth.googleAuthUser]);
  
  useEffect(() => {
    
    if (selectedUid && messages.messages[ selectedUid ]){
      
      const messageThread = messages.messages[ selectedUid ][ 0 ];
      setSelectedThread(messageThread);
    }
    
  }, [selectedUid, messages.messages]);
  
  useEffect(() => {
    if (selectedThread){
      let contact = {
        type: 'users',
        uid: selectedUid,
      };
      if (selectedUid !== auth.googleAuthUser.uid){
        contact.type = 'organizations';
      }
      markMessagesRead(contact, selectedThread);
    }
  }, [selectedThread]);
  
  useEffect(() => {
    
    if (props.location.state){
      setSelectedUid(props.location.state.uid);
    }
  }, [props.location.state]);
  
  const handleClick = ({key}) => {
    
    const messageThread = messages.messages[ selectedUid ].filter(
      thread => thread.id === key)[ 0 ];
    setSelectedThread(messageThread);
    
  };
  
  return (
    <Layout>
      {selectedUid && auth.googleAuthUser && selectedUid ===
      auth.googleAuthUser.uid &&
      <h1>Users Messages</h1>}
      {selectedUid &&
      org.userOrganizations.filter(org => org.orgId === selectedUid).length >
      0 &&
      <h1>{org.userOrganizations.filter(
        org => org.orgId === selectedUid)[ 0 ].organizationName}'s
        Messages</h1>}
      <div className={'row'}>
        <Menu
          onClick={handleClick}
          style={{width: 256}}
          defaultSelectedKeys={['1']}
          mode="inline"
        >
          {selectedUid &&
          messages.messages[ selectedUid ] &&
          messages.messages[ selectedUid ].map(thread => {
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
        {selectedThread &&
        <Messages messageId={selectedThread.id} selectedUid={selectedUid}/>}
        {!selectedThread && <h2>No messages to display</h2>}
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