import React, { useState, useEffect } from 'react';
import { useStateValue } from '../hooks/useStateValue';
import { Card, Form, Row, Input, Icon, Divider } from 'antd';
import { StyledCheckableTag as CheckableTag } from '../styled';

const tabList = [
  {
    key: 'Events',
    tab: 'Events',
  },
  {
    key: 'Organizations',
    tab: 'Organizations',
  },
];

export const FilterTopbar = ({}) => {
  const [activeTab, setActiveTabKey] = useState('Events');

  const contentList = {
    Events: <div>Events</div>,
    Organizations: <div>Coming Soon</div>,
  };

  const onTabChange = key => {
    setActiveTabKey(key);
  };

  return (
    <Card
      bordered={false}
      tabList={tabList}
      activeTabKey={activeTab}
      onTabChange={key => onTabChange(key)}
    >
      {contentList[activeTab]}
    </Card>
  );
};
