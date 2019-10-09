import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Tag, Icon, Collapse, message } from 'antd';
import uuid4 from 'uuid4';

import { useStateValue } from '../hooks/useStateValue';
import {
  Editor,
  CommentList,
  RecurSignUp,
  FirstRow,
  SecondRow,
  ThirdRow,
  FourthRow,
} from '../components/EventProfile';
import {
  addComment,
  addCommentToComment,
  signUpForRecurringEvent,
  cancelSignedUpRecurringEvent,
  signUpForEvent,
  cancelSignedUpEvent,
  deleteCommentClearSuccess,
  getEventById,
  getFileUrl,
} from '../actions';
import { StyledCard, StyledButton } from '../styled';

export const EventProfile = props => {
  const [{ events, auth, comments }, dispatch] = useStateValue();

  const { event } = events;
console.log(auth)
  const [localState, setLocalState] = useState({
    imageUrl: '',
    registeredVolunteers: [],
    interest: [],
    typesOfCauses: [],
    volunteerRequirements: [],
    orgName: '',
    nameOfEvent: '',
    startTimeStamp: '',
    endTimeStamp: '',
    numberOfVolunteers: null,
    eventDetails: '',
    otherNotes: '',
    nextDate: '',
    recurringInfo: '',
    clicked: false,
  });

  useEffect(() => {
    if (props.match.params.id) {
      getEventById(props.match.params.id, dispatch);
    }
  }, []);

  useEffect(() => {
    if (comments.deletedComment) {
      message.success('Comment deleted successfully.');
      deleteCommentClearSuccess(dispatch);
    }
  }, [comments.deletedComment]);

  useEffect(() => {
    if (event.orgImagePath) {
      getFileUrl(event.orgImagePath).then(path =>
        setLocalState({ ...localState, ...event, imageUrl: path })
      );
    } else {
      setLocalState({
        ...localState,
        ...event,
      });
    }
  }, [event]);

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
    props.history.goBack();
  };

  const register = date => {
    if (date) {
      signUpForRecurringEvent(event, auth.registeredUser, date, dispatch);
      return;
    }
    signUpForEvent(event, auth.registeredUser, dispatch);
  };

  const unRegister = date => {
    if (date) {
      cancelSignedUpRecurringEvent(event, auth.registeredUser, date, dispatch);
      return;
    }
    cancelSignedUpEvent(event, auth.registeredUser, dispatch);
  };

  const causes = localState.typesOfCauses.map(item => {
    return <Tag>{(item = [item])}</Tag>;
  });

  const interest = localState.interest.map(item => {
    return <Tag>{(item = [item])}</Tag>;
  });

  const requirements = localState.volunteerRequirements.map(item => {
    return <Tag>{(item = [item])}</Tag>;
  });

  return (
    <StyledEventProfile>
      <div className="previous-page" onClick={backButton}>
        <Icon
          type="left-circle"
          theme="filled"
          style={{ fontSize: '25px', marginRight: '15px' }}
        />
        <h6>Previous Page </h6>
      </div>
      <FirstRow
        localState={localState}
        auth={auth}
        register={register}
        unRegister={unRegister}
      />
      {/* <SecondRow />
      <ThirdRow />
      <FourthRow /> */}
      <div style={{ margin: '0 auto', width: '70%' }}>
        <StyledEventPage>
          <div className="card">
            <div className="photo">
              <img
                src={localState.imageUrl}
                alt={localState.orgName}
                width={250}
                height={250}
              />
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
            <div className="description">{localState.eventDetails}</div>
          </StyledEventDetails>
          <StyledEventTime>
            <div className="time">
              <h6>Time:</h6>
            </div>
            <div className="info">
              <h5>
                {moment.unix(localState.startTimeStamp).format('LT')} -{' '}
                {moment.unix(localState.endTimeStamp).format('LT')}
              </h5>
            </div>
          </StyledEventTime>
        </div>
        {/*<div style={{marginLeft: '50%', fontSize: '30px'}}>*/}
        {/*<Icon type="twitter-circle" theme="filled"*/}
        {/*style={{paddingRight: '1%'}}/>*/}
        {/*<Icon type="facebook" theme="filled" style={{paddingRight: '1%'}}/>*/}
        {/*<Icon type="google-circle" theme="filled"/>*/}
        {/*</div>*/}
      </div>
      {event.recurringInfo && (
        <RecurSignUp
          localState={localState}
          auth={auth}
          register={register}
          unRegister={unRegister}
        />
      )}
      <CommentList
        comments={event.comments}
        addCommentToComment={handleAddCommentToComment}
        isLoading={comments.isLoadingReplyToComment}
        event={event}
      />
      <Editor onSubmit={submitComment} submitting={comments.isLoading} />
    </StyledEventProfile>
  );
};

const StyledEventProfile = styled.div`
  max-width: 1020px;
  margin: 15px auto;
  background-color: ${({ theme }) => theme.gray3};

  .previous-page {
    margin-left: 10%;
    padding-top: 20px;
    display: flex;
    justify-content: flex-start;
    width: 15%;
    min-width: 150px;
    align-items: center;
    cursor: pointer;
  }
`;

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
      padding: 2rem;
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

EventProfile.propTypes = {
  event: PropTypes.object,
};

export default EventProfile;
