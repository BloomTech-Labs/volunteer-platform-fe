import React from 'react';

export const UserEvents = (props) => {
  console.log(props.events);
  return (
    <div>
      <p>Listing events</p>
      {props.events.map(item => <div>{item.nameOfEvent}</div>)}
    </div>
  )
}

export default UserEvents;