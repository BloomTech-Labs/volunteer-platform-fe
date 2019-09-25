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

export const FilterTopbar = ({
  changeHandlers,
  inputState,
  tagFilterState,
  tagExpandState,
  toggleTagExpand,
  activeTab,
  setActiveTabKey,
}) => {
  const [state, dispatch] = useStateValue();
  const [filterExpand, setFilterExpand] = useState(false);
  const { onChange, onLocationChange, onTagsChange } = changeHandlers;

  const toggleFilterExpand = () => {
    setFilterExpand(!filterExpand);
  };

  const CheckableTags = ({
    tags,
    onChange,
    collectionName,
    tagFilterState,
    tagExpandState,
    toggleTagExpand,
  }) => {
    const [collapsed, setCollapsed] = useState(!tagExpandState[collectionName]);

    const collapsedCount = 14;
    const [visibleCount, setVisibleCount] = useState(collapsedCount);

    const toggle = () => {
      toggleTagExpand(collectionName);
    };

    useEffect(() => {
      if (!tagExpandState[collectionName]) setVisibleCount(collapsedCount);
      else setVisibleCount(tags.length);
    }, [tagExpandState]);

    let children = [];

    for (let i = 0; i < tags.length; i++) {
      children.push(
        <CheckableTag
          key={i}
          onChange={onChange}
          name={tags[i]}
          collection={collectionName}
          checked={tagFilterState[collectionName][tags[i]]}
          style={{ display: i < visibleCount ? 'inline-block' : 'none' }}
        >
          {tags[i]}
        </CheckableTag>
      );
    }

    children.push(
      <a
        style={{ marginLeft: 8, fontSize: 12 }}
        onClick={toggle}
        style={{
          display: collapsedCount >= tags.length ? 'none' : 'inline-block',
        }}
      >
        {collapsed ? 'More' : 'Hide'} <Icon type={collapsed ? 'down' : 'up'} />
      </a>
    );

    return <Row>{children}</Row>;
  };

  const contentList = {
    Events: (
      <Form layout="inline">
        <CheckableTags
          tags={state.tags.causeAreas}
          onChange={onTagsChange}
          collectionName="causeAreas"
          tagFilterState={tagFilterState}
          tagExpandState={tagExpandState}
          toggleTagExpand={toggleTagExpand}
        />
        <Divider dashed style={{ marginTop: 16 }} />
        <Row>
          <Row style={{ fontSize: 18 }}>Location</Row>
          <Form.Item label="State">
            <Input
              value={inputState.location.state}
              name={'state'}
              onChange={onLocationChange}
              placeholder="State Initials"
            />
          </Form.Item>
          <Form.Item label="City">
            <Input
              value={inputState.location.city}
              name={'city'}
              onChange={onLocationChange}
              placeholder="City"
            />
          </Form.Item>
        </Row>
        <Divider dashed style={{ marginBottom: 8 }} />
        <Row>
          <a
            style={{ marginLeft: 8, fontSize: 12 }}
            onClick={toggleFilterExpand}
          >
            {filterExpand ? 'Hide Filters' : 'More Filters'}{' '}
            <Icon type={filterExpand ? 'up' : 'down'} />
          </a>
        </Row>
        <div style={{ display: filterExpand ? 'block' : 'none' }}>
          <h5 style={{ fontFamily: 'Montserrat' }}>Interests</h5>
          <Row>
            <CheckableTags
              tags={state.tags.interests}
              onChange={onTagsChange}
              collectionName="interests"
              tagFilterState={tagFilterState}
              tagExpandState={tagExpandState}
              toggleTagExpand={toggleTagExpand}
            />
          </Row>
          <h5 style={{ fontFamily: 'Montserrat' }}>Volunteer Requirements</h5>
          <Row>
            <CheckableTags
              tags={state.tags.requirements}
              onChange={onTagsChange}
              collectionName="requirements"
              tagFilterState={tagFilterState}
              tagExpandState={tagExpandState}
              toggleTagExpand={toggleTagExpand}
            />
          </Row>
        </div>
      </Form>
    ),
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
