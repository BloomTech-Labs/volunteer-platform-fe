import React from 'react';
import styled from 'styled-components';
import { StyledCard } from '../../styled/StyledCard';

export const UserInfo = (props) => {
  
  return (
    <CustomStyledCard>
      <div className='inner-container'>
        <div>
          <p>Age: {props.user.age}</p>
          <p>Location: {props.user.city + ', ' + props.user.state}</p>
        </div>
        <div>
          Social Network
        </div>
        <div>
          <p>This Month's Total Hours</p>
        </div>
      </div>
    </CustomStyledCard>
  )
}

export default UserInfo;

const CustomStyledCard = styled(StyledCard)`
  .inner-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
` 