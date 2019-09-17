import React from 'react'
import {StyledCard} from '../styled'

const Event = ({event}) => {
    return (
        <StyledCard>
            <h1>{event.volunteerType}</h1>
            <h1>{event.numberOfPeople}</h1>
            <h1>{event.startTime}</h1>
            <h1>{event.stopTime}</h1>
            <h1>{event.pointOfContact}</h1>
            <h1>{event.tags}</h1>
            <h1>{event.description}</h1>
            <h1>{event.volunteerRequirements}</h1>
        </StyledCard>
    )
}

export default Event;