import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AntTextArea } from '../../styled/index';

export const UserBio = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!props.bio) {
      setIsEditing(true);
    }
  }, [props.bio])

  return (
    <StyledDiv>
      <p>Bio</p>
      {isEditing ? (
        <AntTextArea 
          name='bio'
          autosize={{ minRows: 7}}
          placeholder='Add a blurb about yourself here'
        />
      )
      : <p>props.bio</p>}
    </StyledDiv>
  )
}

export default UserBio;

const StyledDiv = styled.div`
  background: red;
  width: 40%;
  padding: 2rem;
`