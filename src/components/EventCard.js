import React, { useState, useEffect } from 'react';
import manHiking from '../assets/man-hiking.jpg';
import styled from 'styled-components';
import { StyledCard, StyledLine } from '../styled';
import { Tag } from 'antd';
import moment from 'moment';

export const EventCard = (props) => {
    console.log(props);

    const [ localState, setLocalState ] = useState({
        interest: [], typesOfCauses: [] , volunteerRequirements: [],
        nameOfEvent: '', date: '', numberOfVolunteers: null,
    });

// for setting events from state to our localState
useEffect(() => {
    const id = props.match.params.id;
    //future reference: use filter to filter between recurring and non-recurring events
    props.state.events.events.forEach(event => {
        if( id === event.eventId ) {
            setLocalState(event)
            console.log('set to state');
        }
        else {
            console.log('not set to state')
        }
    })
}, [props.match.params.id])

console.log('LocalState', localState)
    return (
        <div>
            <h4>{localState.nameOfEvent}</h4>
            <h6>{moment.unix(localState.date).format('LLLL')}</h6>
            <StyledEventPage>
                <div className= 'card'>
                    <div className='photo'>
                        <img src={manHiking} alt='dude' width={175} height={175} />
                    </div>
                    <div className= 'tags'>
                    <h5>interest: </h5><Tag>{localState.interest}</Tag>
                    <h5>Causes: </h5><Tag>{localState.typesOfCauses}</Tag>
                    <h5>Requirements: </h5><Tag>{localState.volunteerRequirements}</Tag>
                    </div>
                </div>
            </StyledEventPage>
            <h4>Clicked</h4>
        </div>
    )
}

const StyledEventPage = styled(StyledCard)`
margin-bottom: 20px;
.ant-card-body {
    width: 100%;
}

.card {
    display: flex
    .photo {
        margin-right: 5%;
    }

    .tags {
        width: 100%;
        flex-direction: column;
        flex-wrap: wrap;
    }
}
`;

export default EventCard;