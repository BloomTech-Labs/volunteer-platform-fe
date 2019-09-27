import {
  SIGNIN_INIT, SIGNED_IN, SIGNED_OUT, SIGNIN_FAILED, SIGNUP_FAILED,
  SIGNIN_NEW_USER, GET_USER_ACCOUNT_SUCCESSFUL, REGISTER_INIT,
  REGISTER_SUECESSFUL, REGISTER_FAILED, UPDATE_REGISTERED_USER,
  GET_TOP_VOLUNTEERS_FAILED, NO_VOLUNTEERS_REGISTERED, GET_TOP_VOLUNTEERS,
} from '../actions/auth';

export const authReducer = (state, action) => {
  switch (action.type){
    case SIGNIN_INIT:
      return {...state, signInError: null, signUpError: null, isLoading: true};
    case SIGNIN_NEW_USER:
      return {...state, signedUp: false};
    case SIGNED_IN:
      return {
        ...state,
        loggedIn: true,
        googleAuthUser: action.payload,
        isLoading: false,
      };
    case SIGNED_OUT:
      return {...state, loggedIn: false};
    case SIGNIN_FAILED:
      return {...state, signInError: action.payload, isLoading: false};
    case SIGNUP_FAILED:
      return {...state, signUpError: action.payload, isLoading: false};
    case GET_USER_ACCOUNT_SUCCESSFUL:
      return {
        ...state,
        googleAuthUser: action.payload,
      };
    case REGISTER_INIT:
      return {...state, isLoading: true};
    case REGISTER_SUECESSFUL:
      return {
        ...state,
        registeredUser: action.payload,
        signedUp: true,
        isLoading: false,
      };
    case REGISTER_FAILED:
      return {...state, isLoading: false};
    case UPDATE_REGISTERED_USER:
      return {...state, registeredUser: action.payload};
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
    
    default:
      return state;
  }
};


