import firebase, {store} from '../firebase/FirebaseConfig';
import {action} from './action';

export const ADD_COMMENT_INIT = 'ADD_COMMENT_INIT';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILED = 'ADD_COMMENT_FAILED';

export const addComment = (comment, event, dispatch) => {
  debugger;
  dispatch(action(ADD_COMMENT_INIT));
  store.collection('events').doc(event.eventId).get().then(res => {
    if (!res.exists){
      addCommentToRecurringEvent(comment, event, dispatch);
      return;
    }
    res.ref.update({comments: firebase.firestore.FieldValue.arrayUnion(comment)})
      .then(res => {
        dispatch(action(ADD_COMMENT_SUCCESS));
      })
      .catch(err => {
        dispatch(action(ADD_COMMENT_FAILED, err.message));
      });
    
  });
};

const addCommentToRecurringEvent = (comment, event, dispatch) => {
  store.collection('recurring events').doc(event.eventId).get().then(res => {
    if (!res.exists){
      dispatch(action(ADD_COMMENT_FAILED, 'Event does not exist'));
      return;
    }
    res.ref.update({comments: firebase.firestore.FieldValue.arrayUnion(comment)})
      .then(res => {
        dispatch(action(ADD_COMMENT_SUCCESS));
      })
      .catch(err => {
        dispatch(action(ADD_COMMENT_FAILED, err.message));
      });
  });
};

export const ADD_COMMENT_TO_COMMENT_INIT = 'ADD_COMMENT_INIT';
export const ADD_COMMENT_TO_COMMENT_SUCCESS = 'ADD_COMMENT_TO_COMMENT_SUCCESS';
export const ADD_COMMENT_TO_COMMENT_FAIL = 'ADD_COMMENT_TO_COMMENT_FAIL';

/**
 * Add a comment to a event comment.
 * @function
 * @param {Comment} comment
 * @param {Event} event
 * @param {Comment} commentToAddTo
 * @param {Dispatch} dispatch
 */
export const addCommentToComment = (comment, event, commentToAddTo,
  dispatch) => {
  dispatch(action(ADD_COMMENT_TO_COMMENT_INIT));
  store.collection('events').doc(event.eventId).get().then(res => {
    
    if (!res.exists){
      addCommentToCommentRecurringEvent(
        comment,
        event,
        commentToAddTo,
        dispatch);
      return;
    }
    
    const data = res.data();
    const comments = data.comments.map(commentInDb => {
      if (commentInDb.commentId === commentToAddTo.commentId){
        commentInDb.replies = commentInDb.replies ?
          [...commentInDb.replies, comment] :
          [comment];
      }
      return commentInDb;
    });
    res.ref.update({comments}).then(res => {
      dispatch(action(ADD_COMMENT_TO_COMMENT_SUCCESS));
    });
  }).catch(err => {
    dispatch(action(ADD_COMMENT_TO_COMMENT_FAIL, err.message));
  });
};

const addCommentToCommentRecurringEvent = (comment, event, commentToAddTo,
  dispatch) => {
  store.collection('recurring events').doc(event.eventId).get().then(res => {
    if (!res.exists){
      dispatch(action(
        ADD_COMMENT_TO_COMMENT_FAIL,
        'That comment doesn\'t exists'));
      return;
    }
    const data = res.data();
    const comments = data.comments.map(comment => {
      if (comment.commentId === commentToAddTo.commentId){
        comment.replies = comment.replies ? [...comment.replies, comment] :
          [comment];
      }
      return comment;
    });
    
    res.ref.update({comments: [...comments]}).then(res => {
      dispatch(action(ADD_COMMENT_TO_COMMENT_SUCCESS));
    });
    
  }).catch(err => {
    dispatch(action(ADD_COMMENT_TO_COMMENT_FAIL, err.message));
  });
};