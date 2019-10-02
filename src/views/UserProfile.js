import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../hooks/useStateValue';
import { UserBio, UserInfo, UserEvents } from '../components/UserProfile/index';
import { Calendar } from 'antd';

export const UserProfile = () => {
  const [state, setState] = useStateValue();
  //const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('');

  //I need to use another variable or else if the page is refreshed, state.auth.registeredUser is null so it will throw an error
  
  useEffect(() => {
    if (state.auth.registeredUser) {
      setUser(state.auth.registeredUser);
    }
  }, [state.auth.registeredUser]);

  return (
    <StyledDiv>
      <h3>Welcome {user.firstName},</h3>
      <div className='profile-top'>
        <UserBio bio={user.bio}/>
      </div>
      <div className='profile-middle'>
        <UserInfo user={user} />
      </div>
      <div className='profile-bottom'>
        <div className='profile-bottom-left'>
          <Calendar fullscreen={false} />
        </div>
        <div className='profile-bottom-right'>
          <UserEvents />
        </div>
      </div>
    </StyledDiv>
  )
}

export default UserProfile;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1100px;

  h3 {
    align-self: flex-start;
  }

  .profile-top, .profile-middle, .profile-bottom {
    width: 100%
  }

  .profile-bottom {
    display: flex;
    justify-content: flex-start;
  }

  .profile-bottom-left {
    width: 40%;
  }
`