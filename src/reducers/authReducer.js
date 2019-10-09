import {
  SIGNIN_INIT,
  SIGNED_IN,
  SIGNED_OUT,
  SIGNIN_FAILED,
  SIGNUP_FAILED,
  SIGNIN_NEW_USER,
  GET_USER_ACCOUNT_SUCCESSFUL,
  REGISTER_INIT,
  REGISTER_SUECESSFUL,
  REGISTER_FAILED,
  UPDATE_REGISTERED_USER,
  GET_TOP_VOLUNTEERS_FAILED,
  NO_VOLUNTEERS_REGISTERED,
  GET_TOP_VOLUNTEERS,
  SET_USER_SEARCH
} from '../actions/auth';
import {
  SIGN_UP_FOR_EVENT_INIT,
  SIGNED_UP_FOR_EVENT,
  SIGN_UP_FOR_EVENT_FAILURE,
  CANCEL_SIGNED_UP_EVENT_INIT,
  CANCELED_SIGNED_UP_EVENT,
  CANCEL_SIGNED_UP_EVENT_FAILURE,
  SIGN_UP_FOR_RECURRING_EVENT_INIT, 
  SIGNED_UP_FOR_RECURRING_EVENT, 
  SIGN_UP_FOR_RECURRING_EVENT_FAILURE,
  CANCEL_SIGNED_UP_RECURRING_EVENT_INIT,
  CANCELED_SIGNED_UP_RECURRING_EVENT,
  CANCEL_SIGNED_UP_RECURRING_EVENT_FAILURE
} from '../actions/events';

export const authReducer = (state, action) => {
  
  switch (action.type){
    case SIGNIN_INIT:
      return {
        ...state,
        signInError: null,
        signUpError: null,
        isLoading: true,
      };
    case SIGNIN_NEW_USER:
      return { ...state, signedUp: false };
    case SIGNED_IN:
      return {
        ...state,
        loggedIn: true,
        googleAuthUser: action.payload,
        isLoading: false,
      };
    case SIGNED_OUT:
      return { ...state, loggedIn: false };
    case SIGNIN_FAILED:
      return { ...state, signInError: action.payload, isLoading: false };
    case SIGNUP_FAILED:
      return { ...state, signUpError: action.payload, isLoading: false };
    case GET_USER_ACCOUNT_SUCCESSFUL:
      return {
        ...state,
        registeredUser: action.payload,
      };
    case REGISTER_INIT:
      return { ...state, isLoading: true };
    case REGISTER_SUECESSFUL:
      return {
        ...state,
        registeredUser: action.payload,
        signedUp: true,
        isLoading: false,
      };
    case REGISTER_FAILED:
      return { ...state, isLoading: false };
    case UPDATE_REGISTERED_USER:
      return { ...state, registeredUser: action.payload };
    case GET_TOP_VOLUNTEERS_FAILED:
      return {
        ...state,
        topVolunteersError: action.payload,
        topVolunteers: [],
      };
    case GET_TOP_VOLUNTEERS:
      return {
        ...state,
        topVolunteers: action.payload,
        topVolunteersError: null,
      };
    case NO_VOLUNTEERS_REGISTERED:
      return {
        ...state,
        topVolunteers: [],
        topVolunteersError: 'There are no volunteers registered',
      };
    case SIGN_UP_FOR_EVENT_INIT:
      return {
        ...state,
        signUpEventError: null
      };
    case SIGNED_UP_FOR_EVENT:
      return {
        ...state,
        registeredUser: action.payload,
      };
    case SIGN_UP_FOR_EVENT_FAILURE:
      return {
        ...state,
        signUpEventError: 'Error signing up event'
      };
    case CANCEL_SIGNED_UP_EVENT_INIT:
      return {
        ...state,
        cancelSignedUpEventError: null,
      };
    case CANCELED_SIGNED_UP_EVENT:
      return {
        ...state,
        registeredUser: action.payload,
      };
    case CANCEL_SIGNED_UP_EVENT_FAILURE:
      return {
        ...state,
        cancelSignedUpEventError: 'Error canceling signed up event'
      };
    case SIGN_UP_FOR_RECURRING_EVENT_INIT:
      return {
        ...state,
        signUpEventError: null
      };
    case SIGNED_UP_FOR_RECURRING_EVENT:
      return {
        ...state,
        registeredUser: action.payload
      }; 
    case SIGN_UP_FOR_RECURRING_EVENT_FAILURE:
      return {
        ...state,
        signUpEventError: 'Error signing up recurring event'
      }
    case CANCEL_SIGNED_UP_RECURRING_EVENT_INIT:
      return {
        ...state,
        cancelSignedUpEventError: null,
      };
    case CANCELED_SIGNED_UP_RECURRING_EVENT:
      return {
        ...state,
        registeredUser: action.payload
      };
    case CANCEL_SIGNED_UP_RECURRING_EVENT_FAILURE:
      return {
        ...state,
        cancelSignedUpEventError: 'Error canceling signed up event'
      };
      case SET_USER_SEARCH:
          return {
              ...state,
              userSearch: action.payload
          }
    default:
      return state;
  }
};
