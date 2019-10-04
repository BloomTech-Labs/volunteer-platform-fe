import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { useStateValue } from '../hooks/useStateValue';
import { UserBio, UserInfo, UserEvents, UserGoal } from '../components/UserProfile/index';
import { OrgPhoto } from '../components/OrgDashboard/index';
import { Calendar } from 'antd';
import { updateRegisteredUser, getFileUrl, deleteUserImage, getUserById } from '../actions';
import moment from 'moment';

export const UserProfile = (props) => {
  const [state, dispatch] = useStateValue();
  //const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [calendarValue, setCalendarValue] = useState(moment());

  //I need to use another variable or else if the page is refreshed, state.auth.registeredUser is null so it will throw an error

  useEffect(() => {
    if (state.auth.registeredUser) {
      if (state.auth.registeredUser.uid !== props.match.params.id) {
        getUserById(props.match.params.id)
          .then(foundUser => {
            if (foundUser) {
              setUser(foundUser)
            } else {
              props.history.push('/notfound')
            }
          })
      } else {
        setUser(state.auth.registeredUser);
        if (state.auth.registeredUser.imagePath) {
          getFileUrl(state.auth.registeredUser.imagePath)
            .then(res => setImageUrl(res));
        } else {
          setImageUrl(null);
        }
      }
    }
  }, [state.auth.registeredUser, props.match.params.id]);

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

  const onSelect = (value, mode) => {
    const beginning = value.startOf('date');
    const newValue = moment.unix(beginning.unix());
    
    if (selectedDate) {
      const date2 = newValue.unix();
      if (selectedDate === date2) {
        setSelectedDate(null);
        setCalendarValue(moment());
      } else {
        setSelectedDate(newValue.unix());
        setCalendarValue(newValue);
      }
    } else {
      setSelectedDate(newValue.unix());
      setCalendarValue(newValue);
    }
  };

  const checkEvent = (events, value) => {    
    return events.filter(item => moment.unix(item.date).date() === value.date() && moment.unix(item.date).month() === calendarValue.month() && moment.unix(item.date).year() === calendarValue.year());
  }

  const onPanelChange = value => {
    setCalendarValue(moment.unix(value.unix()));
  }

  const displayAll = e => {
    e.preventDefault();
    setSelectedDate(null);
    setCalendarValue(moment());
  };

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
          <Calendar 
            fullscreen={false}
            onPanelChange={onPanelChange}
            onSelect={onSelect}
            value={calendarValue}/>
          <UserGoal/>
        </div>
        <div className='profile-bottom-right'>
          <UserEvents 
            events={user.registeredEvents}
            selectedDate={selectedDate}
            displayAll={displayAll} />
        </div>
      </div>
    </StyledDiv>
  )
}

export default withRouter(UserProfile);

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 250px;

  h3 {
    align-self: flex-start;
  }

  .profile-top, .profile-middle, .profile-bottom {
    width: 900px;
  }

  .profile-top {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    height: 260px;
  }

  .profile-bottom {
    display: flex;
    justify-content: flex-start;
  }

  .profile-bottom-left {
    width: 40%;
  }
`