import React from 'react';
import styled from 'styled-components';
import { StyledCard } from '../../styled/StyledCard';
import { Icon } from 'antd';

export const UserInfo = (props) => {
  
  return (
    <CustomStyledCard>
      <div className='inner-container'>
        <div className='left'>
          <p>General Bio</p>
          <p>{props.user.bio}</p>
        </div>
        <div className='right'>
          <div>
            <p>Age: {props.user.age}</p>
            <p><Icon
              type="environment"
              theme={'twoTone'}
              twoToneColor={'#005a87'}
            />{props.user.city + ', ' + props.user.state}
            </p>
          </div>
          <div>
            <p>Follow Me</p>
            <div className='social-media-btns'>
              <Icon type='twitter' className='icons'/>
              <Icon type='instagram' className='icons'/>
              <Icon type='linkedin' className='icons'/>
            </div>
          </div>
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

    .left {
      width: 60%;
    }

    .right {
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .social-media-btns {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .icons {
      font-size: 24px;
      margin-right: 20px; 
    }
  }
` 