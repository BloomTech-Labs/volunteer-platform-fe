import React from 'react';
import Event from './Event';

const EventList = ({events}) => {  
    return (
        <>
        {events.map((event => <Event key={event.eventId} event={event} /> ))}
        </>
    )
};

export default EventList;