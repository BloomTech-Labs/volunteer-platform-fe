import React from 'react';
import styled from 'styled-components';
import { StyledCard } from '../../styled/StyledCard';
import { Icon } from 'antd';

export const UserInfo = (props) => {
  
  return (
    <CustomStyledCard>
      <div className='inner-container'>
        <div>
          <p>Age: {props.user.age}</p>
          <p><Icon
            type="environment"
            theme={'twoTone'}
            twoToneColor={'#005a87'}
          />{props.user.city + ', ' + props.user.state}</p>
        </div>
        <div>
          Social Network
          <div className='social-media-btns'>
            <Icon type='twitter' className='icons'/>
            <Icon type='instagram' className='icons'/>
            <Icon type='linkedin' className='icons'/>
          </div>
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

  .social-media-btns {
    display: flex;
    justify-content: space-between;

    .icons {
      font-size: 24px;
    }
  }
` 