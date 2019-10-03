import React, { useState, useEffect } from 'react';
import manHiking from '../assets/man-hiking.jpg';
import styled from 'styled-components';
import { StyledCard } from '../styled';
import { Tag, AutoComplete } from 'antd';
import moment from 'moment';

export const EventCard = (props) => {
    //console.log(props);

    const [ localState, setLocalState ] = useState({
        interest: [], typesOfCauses: [] , volunteerRequirements: [], orgName: '',
        nameOfEvent: '', date: '', startTime: '', endTime: '' , numberOfVolunteers: null,
        eventDetails: '', otherNotes: '', nextDate: '', recurringInfo: {}, 
    });

// for setting events from state to our localState
useEffect(() => {
    const id = props.match.params.id;
    //Grab the array event objects to store for filtering
    let NonRecurring = props.state.events.events;
    let Recurring = props.state.events.recurringEvents;
    //console.log(NonRecurring, Recurring)
    if(id) {
        const EventN = NonRecurring.filter(event => {
            if(id === event.eventId) {
                return setLocalState(event);    
            } 
            //else {
            //     console.log('ID not equal to NonRecurring ID')
            // }
        })

        if(EventN.length < 1) {
            const EventR = Recurring.filter(event => {
                if(id === event.eventId) {
                    return setLocalState(event)
                }
                // else{
                //     console.log('ID not equal to Recurring ID')
                // }
            })
        }
    }
}, [props.match.params.id])

const causes = localState.typesOfCauses.map(item => {
    return <Tag>{(item = [item])}</Tag>;
});

const interest = localState.interest.map(item => {
    return <Tag>{(item = [item])}</Tag>;
});

const requirements = localState.volunteerRequirements.map(item => {
    return <Tag>{(item = [item])}</Tag>;
});

console.log('LocalState', localState)

    return (
        <div>
            <div style={heading} >
                <h4> {localState.nameOfEvent} </h4>
                <h6> {moment.unix(localState.date).format('LLLL')} </h6>
                <h6> {localState.orgName} </h6>
            </div>
            <StyledEventPage>
                <div className= 'card'>
                    <div className='photo'>
                        <img src={manHiking} alt='dude' width={175} height={175} />
                    </div>
                    {/* <div className= 'tags'>
                        <div className='subtag' >
                        <h5>Interest(s): {interest} </h5>
                        </div>
                        <div className='subtag' >
                        <h5>Cause(s): {causes} </h5>
                        </div>
                        <div className='subtag' >
                        <h5>Requiremetn(s): {requirements} </h5>
                        </div>
                    </div> */}
                    <div className= 'tags'>
                        <h5>Interests: </h5>
                            <div className='subtag' >
                                {interest}
                            </div>
                        <h5>Causes:  </h5>
                            <div className='subtag' >
                                {causes}
                            </div>
                        <h5>Requirements: </h5>
                            <div className='subtag' >
                                {requirements}
                            </div>
                    </div>
                </div>
                </StyledEventPage>
                <StyledEventDetails>
                    <div className='details'>
                        <h5>Details</h5>
                    </div>
                    <div className='description'>
                        {localState.eventDetails}
                    </div>
            </StyledEventDetails>
            {/* <div style={divDetails}>
                {localState.eventDetails}
            </div> */}
        </div>
    )
}

const StyledEventPage = styled(StyledCard)`
&& {
    margin-left: 15%;
    border-radius: 2px;
    width: 70%;
    max-width: 100%
}   
.card {
    display: flex
    width: 100%;
    margin-bottom: 20px;
    
    .photo {
        margin-right: 3%;
    }

    .tags {
        width: 75%;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        
        .subtag {
            flex-direction: row;
            justify-content: flex-start;
        }
    }
}
`;

const StyledEventDetails = styled(StyledCard)`
&&& {
    background-color:white;
    border-radius: 2px;
    margin-left: 15%;
    margin-top: 3%;
    width: 50%;
    .details {
        border-bottom: 1px solid black
    }

    .description {
        background-color: white;
        padding: 1% 0;
    }
}
`;


const heading = {
    marginLeft: '15%',
};

export default EventCard;