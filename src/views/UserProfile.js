import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { useStateValue } from '../hooks/useStateValue';
import { UserBio, UserInfo, UserEvents } from '../components/UserProfile/index';
import { OrgPhoto } from '../components/OrgDashboard/index';
import { Calendar } from 'antd';
import { updateRegisteredUser, getFileUrl, deleteUserImage, getAllEventsByUser } from '../actions';

export const UserProfile = (props) => {
  const [state, dispatch] = useStateValue();
  //const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  //I need to use another variable or else if the page is refreshed, state.auth.registeredUser is null so it will throw an error
  useEffect(() => {
    if (state.auth.registeredUser) {
      setUser(state.auth.registeredUser);
      if (state.auth.registeredUser.imagePath) {
        getFileUrl(state.auth.registeredUser.imagePath)
          .then(res => setImageUrl(res));
      } else {
        setImageUrl(null);
      }
    }
  }, [state.auth.registeredUser]);

  useEffect(() => {
    if (user) {
      getAllEventsByUser(user, dispatch);
    }
  }, [user, dispatch])

  const onFileUpload = path => {
    getFileUrl(path)
      .then(url => {
        setImageUrl(url);
        const updatedUser = {
          ...user,
          imagePath: path,
          imageUrl: url,
        };
        updateRegisteredUser(updatedUser, dispatch);
      })
      .catch(err => console.log(err));
  }

  const deleteImage = (user) => {
    deleteUserImage(user, dispatch);
    setImageUrl(null);
  }

  const updateUser = (user) => {
    updateRegisteredUser(user, dispatch);
  }

  return (
    <StyledDiv>
      <h3>Welcome {user.firstName},</h3>
      
      <div className='profile-top'>
        <OrgPhoto 
          imageUrl={imageUrl}
          imageOwner={user}
          deleteImage={deleteImage}
          onFileUpload={onFileUpload}
        />
        <UserBio 
          user={user}
          updateUser={updateUser}/>
      </div>
      <div className='profile-middle'>
        <UserInfo user={user} />
      </div>
      <div className='profile-bottom'>
        <div className='profile-bottom-left'>
          <Calendar fullscreen={false} />
        </div>
        <div className='profile-bottom-right'>
          <UserEvents events={state.events.events}/>
        </div>
      </div>
    </StyledDiv>
  )
}

export default withRouter(UserProfile);

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

  .profile-top {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .profile-bottom {
    display: flex;
    justify-content: flex-start;
  }

  .profile-bottom-left {
    width: 40%;
  }
`