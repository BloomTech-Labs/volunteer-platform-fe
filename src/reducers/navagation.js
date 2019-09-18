import {
} from "../actions/";

export const authReducer = ( state, action ) => {
  switch( action.type ){
    case SIGNIN_NEW_USER:
      return { ...state, signedUp: false };
    case SIGNED_IN:
      return { ...state, loggedIn: true, googleAuthUser: action.payload };
    case SIGNED_OUT:
      return { ...state, loggedIn: false };
    case GET_USER_ACCOUNT_SUCCESSFUL:
      return { ...state, googleAuthUser: action.payload };
    case REGISTER_SUECESSFUL:
      return { ...state, registeredUser: action.payload, signedUp: true };
    default:
      return state;
  }
};


