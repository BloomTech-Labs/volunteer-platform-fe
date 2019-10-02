import React from 'react'

export const EventCard = (props) => {
    console.log(props)
    const { id } = props.match.params;
    return (
        <div>
            <h4>Clicked</h4>
        </div>
    )
}

export default EventCard;