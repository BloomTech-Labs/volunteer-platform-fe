import React, { useState } from 'react';
import { StyledButton, StyledForm, StyledInput, StyledTag } from '../styled';
import { Tag, Tooltip, Icon } from 'antd';
import { useStateValue } from '../hooks/useStateValue';
import { createEvent } from '../actions';

const CreateEvent = () => {
  const [localState, setState] = useState({
    event: {
      tags: [],
    },
    inputVisible: false,
    inputValue: '',
  });
  const [state, dispatch] = useStateValue();

  //Destructuring
  let { event, inputVisible, inputValue } = localState;

  const changeValue = e => {
    setState({
      ...localState,
      event: {
        ...event,
        [e.target.name]: e.target.value,
      },
    });
  };

  //Handle Submit for Form
  const handleSubmit = e => {
    e.preventDefault();
    createEvent(localState.event, dispatch);
  };

  //Handles Tags Opening/Closing
  const handleClose = removedTag => {
    const tags = event.tags.filter(tag => tag !== removedTag);
    setState({ tags });
  };

  //Shows Input on Tag
  const showInput = () => {
    setState({
      ...localState,
      inputVisible: true,
    });
  };

  //Handles Tag Input Change
  const handleInputChange = e => {
    setState({
      ...localState,
      inputValue: e.target.value,
    });
  };

  //Handles Tag Submitt
  const handleInputSubmit = () => {
    if (inputValue && event.tags.indexOf(inputValue) === -1) {
      event.tags = [...event.tags, inputValue];
    }
    setState({
      ...localState,
      event,
      inputVisible: false,
      inputValue: '',
    });
  };

  //Handles Tags
  const handleTags = event.tags.map((tag, index) => {
    const isTagLong = tag.length > 10;
    const tagElem = (
      <Tag key={tag} closable={index !== 0} onClose={() => handleClose(tag)}>
        {isTagLong ? `${tag.slice(0, 5)}` : tag}
      </Tag>
    );
    return isTagLong ? (
      <Tooltip title={tag} key={tag}>
        {tagElem}
      </Tooltip>
    ) : (
      tagElem
    );
  });

  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          name={'Volunteer Type'}
          values={event}
          onChange={changeValue}
          type="text"
        />

        <StyledInput
          name={'Number of People'}
          values={event}
          onChange={changeValue}
          type="number"
        />
        <StyledInput
          name={'Start Time'}
          values={event}
          onChange={changeValue}
          type="time"
        />
        <StyledInput
          name={'End Time'}
          values={event}
          onChange={changeValue}
          type="time"
        />
        <StyledInput
          name={'Date'}
          values={event}
          onChange={changeValue}
          type="date"
        />
        <StyledInput
          name={'Point of Contact'}
          values={event}
          onChange={changeValue}
          type="text"
        />
        <StyledInput
          name={'Description'}
          values={event}
          onChange={changeValue}
          type="text"
        />

        <StyledInput
          name={'Volunteer Requirements'}
          values={event}
          onChange={changeValue}
          type="text"
        />

        <label>Tags: </label>
        {handleTags}
        {inputVisible && (
          <StyledTag
            type="text"
            name={'Tags'}
            size="small"
            style={{ width: 78 }}
            values={localState.inputValue}
            onChange={handleInputChange}
            onBlur={handleInputSubmit}
            onPressEnter={handleInputSubmit}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> Add a Tag
          </Tag>
        )}
        <StyledButton type="primary" htmlType="submit">
          Create Event
        </StyledButton>
      </StyledForm>
    </div>
  );
};

export default CreateEvent;
