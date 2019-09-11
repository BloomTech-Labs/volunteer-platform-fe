import {
  SIGNED_IN, SIGNED_OUT, SIGNIN_NEW_USER, GET_USER_ACCOUNT_SUCCESSFUL
} from "../actions/auth";

export const authReducer = ( state, action ) => {
  switch( action.type ){
    case SIGNIN_NEW_USER:
      return { ...state, signedUp: false };
    case SIGNED_IN:
      return { ...state, loggedIn: true };
    case SIGNED_OUT:
      return { ...state, loggedIn: false };
    case GET_USER_ACCOUNT_SUCCESSFUL:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};


