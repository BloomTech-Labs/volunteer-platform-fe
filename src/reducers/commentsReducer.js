import {
  ADD_COMMENT_INIT, ADD_COMMENT_FAILED, ADD_COMMENT_SUCCESS,
  ADD_COMMENT_TO_COMMENT_INIT, ADD_COMMENT_TO_COMMENT_FAIL,
  ADD_COMMENT_TO_COMMENT_SUCCESS,
} from '../actions/comments';

export const commentsReducer = (state, action) => {
  debugger;
  switch (action.type){
    case ADD_COMMENT_INIT:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
      };
    case ADD_COMMENT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ADD_COMMENT_TO_COMMENT_INIT:
      return {
        ...state,
        isLoadingReplyToComment: true,
        error: '',
      };
    case ADD_COMMENT_TO_COMMENT_SUCCESS:
      return {
        ...state,
        isLoadingReplyToComment: false,
        error: '',
      };
    case ADD_COMMENT_TO_COMMENT_FAIL:
      return {
        ...state,
        isLoadingReplyToComment: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
