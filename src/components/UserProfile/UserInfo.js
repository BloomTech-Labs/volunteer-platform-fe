import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { AntTextArea } from '../../styled/index';
import { StyledCard } from '../../styled/StyledCard';
import { Icon, Input } from 'antd';

export const UserInfo = ({ user, isEditable, updateInfo}) => {
  const [bio, setBio] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [location, setLocation] = useState({
    city: '',
    state: ''
  })

  useEffect(() => {
    if (user.bio) {
      setBio(user.bio);
    }
    setLocation({
      city: user.city,
      state: user.state
    })
  }, [user.bio])

  const inputBio = event => {
    setBio(event.target.value);
  }

  const inputLocation = event => {
    setLocation({
      ...location,
      [event.target.name]: event.target.value
    })
  }

  const openEditor = () => {
    setIsEditing(true);
  }

  const saveInfo = event => {
    event.preventDefault();
    updateInfo(bio, location);
    setIsEditing(false);
  }

  return (
    <CustomStyledCard style={{margin: '0 1rem'}}>
      <div className='outer-container'>
        <div className='user-info-btns'>
          {(isEditable && !isEditing) && (
            <div className='user-info-btn' onClick={openEditor}>
              <Icon  type='edit' style={{ fontSize: '28px', cursor: 'pointer'}}/>
              <p>Edit profile</p>
            </div>
            )}
          {isEditing && (
            <div className='user-info-btn' onClick={saveInfo} >
              <Icon type="save" style={{ fontSize: '28px', cursor: 'pointer'}} />
              <p>Save profile</p>
            </div>
          )}
        </div>
        <div className='inner-container'>
          <div className='left'>
            <p>General Bio</p>
            {isEditing ? (
              <AntTextArea 
                name='bio'
                value={bio}
                autosize={{ minRows: 4}}
                onChange={inputBio}
                placeholder='Add a blurb about yourself here'
              />
            ) : (
              <div className='bio'>
                <p>{user.bio ? user.bio : 'You have not set your bio yet'}</p>
              </div>
            )}
          </div>
          <div className='right'>
            <div>
              <p>Age: {user.age}</p>
              {isEditing ? (
                <>
                  <Input 
                    name={'city'}
                    addonBefore={'City'}
                    value={location.city}
                    placeholder={'Enter city'}
                    onChange={inputLocation} />
                  <Input 
                    name={'state'}
                    addonBefore={'State'}
                    value={location.state}
                    placeholder={'Enter state abbreviation'}
                    onChange={inputLocation}/>
                </>
              ) : (
                <p><Icon
                  type="environment"
                  theme={'twoTone'}
                  twoToneColor={'#005a87'}
                />{user && user.city + ', ' + user.state}
                </p>
              )}
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
      </div>
    </CustomStyledCard>
  )
}

export default UserInfo;

const CustomStyledCard = styled(StyledCard)`
  .ant-card-body {
    padding: 0.6rem 1rem;
    min-height: 240px;
  }

  .outer-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .user-info-btns {
      align-self: flex-end;
      margin-bottom: 0.8rem;

      .user-info-btn {
        display: flex;
        flex-direction: column; 
        align-items: center;
        color: rgba(0, 0, 0, 0.6);
        cursor: pointer;

        p {
          margin: 0;
          font-size: 12px
        }
      }

      .user-info-btn:hover {
        color: ${({theme}) => theme.primary7};

        p {
          color: ${({theme}) => theme.primary7};
        }
      }
    }
  }

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