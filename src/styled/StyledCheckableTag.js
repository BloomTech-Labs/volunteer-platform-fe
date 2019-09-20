import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

const CheckableTagStyled = styled(CheckableTag)`
  && {
  }
`;

export const StyledCheckableTag = ({ checked, ...rest }) => {
  const [localState, setLocalState] = useState({ checked: false });

  useEffect(() => {
    setLocalState({ ...localState, checked: checked });
  }, [checked]);

  const handleChange = checked => {
    setLocalState({ checked: checked });
  };

  return (
    <CheckableTagStyled
      checked={localState.checked}
      onChange={handleChange}
      {...rest}
    />
  );
};
