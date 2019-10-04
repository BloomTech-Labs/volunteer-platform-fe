import React, { useState, useEffect } from 'react';
import manHiking from '../assets/man-hiking.jpg';
import styled from 'styled-components';
import { StyledCard } from '../styled';
import { Tag, AutoComplete } from 'antd';
import moment from 'moment';
import { useStateValue } from '../hooks/useStateValue';
import { findNext } from '../utility/findNextRecurEvent';
import { getEventById } from '../actions';

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
    ...event,
  });

  useEffect(() => {
    if ('recurringInfo' in event) {
        let nextDate = findNext(event.startTimeStamp, event.recurringInfo);
        setLocalState({
          ...localState,
          nextDate: moment(
            moment.unix(nextDate).format('LL') + ' ' + event.startTime
          ).unix(),
        });
      } else {
        setLocalState({ ...localState, nextDate: event.startTimeStamp });
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

  console.log('LocalState', localState);

  return (
    <div>
      <div style={heading}>
        <h4> {localState.nameOfEvent} </h4>
        <h6> {moment.unix(localState.nextDate).format('LLLL')} </h6>
        <h6> {localState.orgName} </h6>
      </div>
      <StyledEventPage>
        <div className="card">
          <div className="photo">
            <img src={manHiking} alt="dude" width={175} height={175} />
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
      <StyledEventDetails>
        <div className="details">
          <h5>Details</h5>
        </div>
        <div className="description">{localState.eventDetails}</div>
      </StyledEventDetails>
      <StyledEventTime>
        <div className="time">
          <h5>
            {localState.startTime} - {localState.endTime}
          </h5>
        </div>
        <div className="info">
          <h6>{localState.recurringInfo.days}</h6>
        </div>
      </StyledEventTime>
    </div>
  );
};

const StyledEventPage = styled(StyledCard)`
&& {
    margin-left: 15%;
    border-radius: 2px;
    width: 65%;
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
    background-color: white;
    border-radius: 2px;
    margin-left: 15%;
    margin-top: 3%;
    width: 45%;
    .container {
      display: flex;
    }
    .details {
      border-bottom: 1px solid black;
    }

    .description {
      background-color: white;
      padding: 1% 0;
    }
  }
`;

const StyledEventTime = styled(StyledCard)`
  &&& {
    background-color: white;
    border-radius: 2px;
    margin-left: 15%;
    margin-top: 3%;
    width: 20%;
    .time {
      border-bottom: 1px solid black;
    }

    .info {
      background-color: white;
      padding: 1% 0;
    }
  }
`;

const heading = {
  marginLeft: '15%',
};

export default EventCard;
