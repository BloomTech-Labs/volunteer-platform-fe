import React from 'react';

export const UserBio = (props) => {
  return (
    <div>
      <p>Bio</p>
      <p>{props.bio ? 'Add a bio' : props.bio}</p>
    </div>
  )
}

export default UserBio;