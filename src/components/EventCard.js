import React, { useState, useEffect } from 'react';
import manHiking from '../assets/man-hiking.jpg';
import styled from 'styled-components';
import { StyledCard } from '../styled';
import { Tag, AutoComplete, Icon } from 'antd';
import moment from 'moment';
import { useStateValue } from '../hooks/useStateValue';
import { findNext } from '../utility/findNextRecurEvent';
import { getEventById } from '../actions';
import { findByLabelText } from '@testing-library/dom';

export const EventCard = props => {
    const [{ events }, dispatch] = useStateValue();

    const { event } = events;

    const [localState, setLocalState] = useState({
    interest: [],
    typesOfCauses: [],
    volunteerRequirements: [],
    orgName: '',
    nameOfEvent: '',
    startTime: '',
    endTime: '',
    numberOfVolunteers: null,
    eventDetails: '',
    otherNotes: '',
    nextDate: '',
    recurringInfo: {},
    });

useEffect(() => {
    if ('recurringInfo' in event) {
        let nextDate = findNext(event.startTimeStamp, event.recurringInfo);
        setLocalState({
            ...localState,
            nextDate: moment(
                moment.unix(nextDate).format('LL') + ' ' + event.startTime
            ).unix(), ...event
        });
    } else {
    setLocalState({ ...localState, nextDate: event.startTimeStamp, ...event });
    }
}, [event]);


// for setting events from state to our localState
useEffect(() => {
getEventById(props.match.params.id, dispatch);
}, [props.match.params.id]);

const causes = localState.typesOfCauses.map(item => {
return <Tag>{(item = [item])}</Tag>;
});

const interest = localState.interest.map(item => {
return <Tag>{(item = [item])}</Tag>;
});

const requirements = localState.volunteerRequirements.map(item => {
return <Tag>{(item = [item])}</Tag>;
});

const backButton = () => {
    props.history.goBack();
}
console.log('LocalState', localState);

    return (
        <div>
            <div >
                <Icon type="left-circle" theme="filled" onClick={backButton} style={{marginLeft: '15%', marginRight: '10px', marginTop: '10px', fontSize: '24px'}} />
                Previous Page
            </div>
            <div style={{  margin: '0 auto', width: '70%'}}>
                <div>
                    <h4> {localState.nameOfEvent} </h4>
                    <h6> {moment.unix(localState.nextDate).format('LLLL')} </h6>
                    <h6> {localState.orgName} </h6>
                </div>
                <StyledEventPage>
                    <div className="card">
                        <div className="photo">
                            <img src={manHiking} alt="dude" width={250} height={250} />
                        </div>
                        <div className="tags">
                            <h5>Interests: </h5>
                            <div className="subtag">{interest}</div>
                            <h5>Causes: </h5>
                            <div className="subtag">{causes}</div>
                            <h5>Requirements: </h5>
                            <div className="subtag">{requirements}</div>
                        </div>
                    </div>
                </StyledEventPage>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <StyledEventDetails>
                        <div className="details">
                            <h5>Details</h5>
                        </div>
                        <div className="description">
                            {localState.eventDetails}
                        </div>
                    </StyledEventDetails>
                    <StyledEventTime>
                        <div className="time">
                            <h6> Every Tuesday, Thursday, Friday{localState.recurringInfo.days}</h6>
                        </div>
                        <div className="info">                
                        <h5>
                            {localState.startTime} - {localState.endTime}
                        </h5>
                        </div>
                    </StyledEventTime>
                    <div style={{display: 'column'}}>
                    <Icon type="twitter-circle" theme="filled" />
                    <Icon type="facebook" theme="filled" />
                    <Icon type="google-circle" theme="filled" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StyledEventPage = styled(StyledCard)`
.ant-card-body {
    padding: 0;
}
&& {
    // margin-left: 15%;
    border-radius: 2px;
    width: 100%;
    max-width: 100%;
    padding: none;
    //border: 1px solid purple
}   
.card {
    display: flex
    width: 100%;
    
    .photo {
        margin-right: 3%;
    }

    .tags {
        width: 75%;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        margin: 2% 0;
        .subtag {
            flex-direction: row;
            justify-content: flex-start;
        }
    }
}
`;

const StyledEventDetails = styled(StyledCard)`
.ant-card-body {
    padding: 0;
}
&&& {
    background-color: white;
    border-radius: 2px;
    margin-top: 1.5%;
    width: 100%;

    .container {
        display: flex;
    }
    .details {
        border-bottom: 1px solid black;
        text-align:center;
    }

    .description {
        background-color: white;
        padding: 1% 0;
        text-align:left;
    }
}
`;

const StyledEventTime = styled(StyledCard)`
.ant-card-body {
    padding: 0;
}
&&& {
    background-color: white;
    border-radius: 2px;
    margin-top: 1.5%;
    width: 35%;
    height: 100px;
    text-align:center;

    .time {
        border-bottom: 1px solid black;
    }

    .info {
        background-color: white;
    }
}
`;

export default EventCard;
