import React, {useState, useEffect} from 'react';
import manHiking from '../assets/man-hiking.jpg';
import styled from 'styled-components';
import {StyledCard, StyledButton} from '../styled';
import {Tag, AutoComplete, Icon, Collapse} from 'antd';
import moment from 'moment';
import {findNext} from '../utility/findNextRecurEvent';
import PropTypes from 'prop-types';
import Editor from './EventComments/Editor';
import CommentList from './EventComments/CommentsList';
import {useStateValue} from '../hooks/useStateValue';
import {
  addComment, addCommentToComment, signUpForRecurringEvent,
  cancelSignedUpRecurringEvent,
} from '../actions';
import uuid4 from 'uuid4';

export const EventCard = ({event, history}) => {
  const [{auth, comments}, dispatch] = useStateValue();
  
  useEffect(() => {
  }, [comments]);
  
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
    clicked: false,
  });
  
  useEffect(() => {
    if ('recurringInfo' in event){
      let nextDate = findNext(event.startTimeStamp, event.recurringInfo);
      setLocalState({
        ...localState,
        nextDate: moment(
          moment.unix(nextDate).format('LL') + ' ' + event.startTime,
        ).unix(),
        ...event,
      });
    }else{
      setLocalState({
        ...localState,
        nextDate: event.startTimeStamp,
        ...event,
      });
    }
  }, [event]);
  
  const causes = localState.typesOfCauses.map(item => {
    return <Tag>{(item = [item])}</Tag>;
  });
  
  const interest = localState.interest.map(item => {
    return <Tag>{(item = [item])}</Tag>;
  });
  
  const requirements = localState.volunteerRequirements.map(item => {
    return <Tag>{(item = [item])}</Tag>;
  });
  
  const submitComment = text => {
    const comment = {
      commentId: uuid4(),
      comment: text.comment,
      createdAt: moment().unix(),
      usersUid: auth.googleAuthUser.uid,
      name: auth.registeredUser.firstName + ' ' + auth.registeredUser.lastName,
      avatarPath: `/images/${auth.googleAuthUser.uid}`,
    };
    
    addComment(comment, event, dispatch);
  };
  
  const handleAddCommentToComment = (text, comment) => {
    const newComment = {
      commentId: uuid4(),
      comment: text.comment,
      createdAt: moment().unix(),
      usersUid: auth.googleAuthUser.uid,
      name: auth.registeredUser.firstName + ' ' + auth.registeredUser.lastName,
      avatarPath: `/images/${auth.googleAuthUser.uid}`,
    };
    
    addCommentToComment(newComment, event, comment, dispatch);
  };
  
  const backButton = () => {
    history.goBack();
  };
  const register = (date) => {
    signUpForRecurringEvent(event, auth.registeredUser, date, dispatch);
  };
  
  const unRegister = (date) => {
    cancelSignedUpRecurringEvent(event, auth.registeredUser, date, dispatch);
  };
  
  const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    marginLeft: '16rem',
    maxWidth: '50%',
    border: 0,
    overflow: 'hidden',
  };
  
  const {Panel} = Collapse;
  
  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '1% 15%',
      }}>
        <div>
          <Icon
            type="left-circle"
            theme="filled"
            onClick={backButton}
            style={{
              marginLeft: '15%',
              marginRight: '10px',
              marginTop: '10px',
              fontSize: '30px',
            }}
          />
          <h6>Previous Page </h6>
        </div>
      </div>
      <div style={{margin: '0 auto', width: '70%'}}>
        <div>
          <h4> {localState.nameOfEvent} </h4>
          <h6> {moment.unix(event.startTimeStamp).format('LLL')}</h6>
          <h6> {localState.orgName} </h6>
        </div>
        <StyledEventPage>
          <div className="card">
            <div className="photo">
              <img src={manHiking} alt="dude" width={250} height={250}/>
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
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <StyledEventDetails>
            <div className="details">
              <h5>Details</h5>
            </div>
            <div className="description">{localState.eventDetails}</div>
          </StyledEventDetails>
          <StyledEventTime>
            <div className="time">
              <h6>
                {localState.recurringInfo.days ? localState.recurringInfo.days :
                  moment.unix(localState.startTimeStamp).format('LL')}
              </h6>
            </div>
            <div className="info">
              <h5>
                {moment.unix(localState.startTimeStamp)
                  .format('LT')} - {moment.unix(localState.endTimeStamp)
                .format('LT')}
              </h5>
            </div>
          </StyledEventTime>
        </div>
        <div style={{marginLeft: '50%', fontSize: '30px'}}>
          <Icon type="twitter-circle" theme="filled"
                style={{paddingRight: '1%'}}/>
          <Icon type="facebook" theme="filled" style={{paddingRight: '1%'}}/>
          <Icon type="google-circle" theme="filled"/>
        </div>
      </div>
      {event.recurringInfo &&
      <Collapse
        style={{marginTop: '2rem'}}
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({isActive}) => <Icon type="caret-right"
                                          rotate={isActive ? 90 : 0}/>}
      >
        {Object.keys(event.registeredVolunteers).map(date => {
          return <Panel key={date} header={moment.unix(date).format('LLL')}
                        style={customPanelStyle}>
            
            <h5>Spots Remaining: {event.numberOfVolunteers -
            event.registeredVolunteers[ date ].length}</h5>
            {event.registeredVolunteers[ date ].includes(auth.googleAuthUser.uid) ?
              <StyledButton
                onClick={() => unRegister(date)}>Un-Register</StyledButton> :
              <StyledButton
                onClick={() => register(date)}>Register</StyledButton>}
          
          
          </Panel>;
        })}
      </Collapse>}
      <CommentList
        comments={event.comments}
        addCommentToComment={handleAddCommentToComment}
        isLoading={comments.isLoadingReplyToComment}
        event={event}
      />
      <Editor onSubmit={submitComment} submitting={comments.isLoading}/>
    </div>
  );
};

const StyledEventPage = styled(StyledCard)`
  .ant-card-body {
    padding: 0;
  }
  && {
    border-radius: 2px;
    width: 100%;
    max-width: 100%;
    padding: 0;
  }
  .card {
    display: flex;
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
      text-align: center;
    }

    .description {
      background-color: white;
      padding: 1% 0;
      text-align: left;
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
    text-align: center;

    .time {
      border-bottom: 1px solid black;
    }

    .info {
      background-color: white;
    }
  }
`;

EventCard.propTypes = {
  event: PropTypes.object,
};

export default EventCard;
