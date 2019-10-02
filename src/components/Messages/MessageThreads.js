import React, {useEffect, useState} from 'react';
import {Menu, Layout} from 'antd';
import Messages from './Messages';
import {useStateValue} from '../../hooks/useStateValue';
import styled from 'styled-components';

const MessageThreads = () => {
  
  const [selectedThread, setSelectedThread] = useState();
  const [{messages}, dispatch] = useStateValue();
  
  useEffect(() => {
    if (!selectedThread && messages.messageThreads[ 0 ]){
      setSelectedThread(messages.messageThreads[ 0 ]);
    }
  }, [messages.messageThreads]);
  
  const handleClick = ({key}) => {
    const messageThread = messages.messageThreads.filter(
      thread => thread.id === key)[ 0 ];
    setSelectedThread(messageThread);
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
            return <Menu.Item
              key={thread.id}>{`${thread.firstName} ${thread.lastName}`}</Menu.Item>;
          })}
        </Menu>
        {selectedThread && <Messages messageId={selectedThread.id}/>}
      </div>
    
    </Layout>
  
  );
};

export default MessageThreads;