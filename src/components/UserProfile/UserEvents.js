import React from 'react';

export const UserEvents = (props) => {
  
  return (
    <div>
      <p>Listing events</p>
      {props.events && props.events.map(item => <div>{item.nameOfEvent}</div>)}
    </div>
  )
}

export default UserEvents;