import { action } from "./action";
import firebase, { store } from "../firebase/FirebaseConfig";

export const SIGNED_IN = "SIGNED_IN";

/**
 * Sign a user in.
 *
 * @param {Object} user
 * @param {Function} dispatch
 */
export const signedIn = ( user, dispatch ) => {
  dispatch( action( SIGNED_IN, user ) );
};

export const SIGNED_OUT = "SIGNED_OUT";

/**
 * Sign a user out.
 *
 * @param {Function} dispatch
 */
export const signedOut = ( dispatch ) => {
  dispatch( action( SIGNED_OUT ) );
};

export const GOOGLE_PROVIDER = "GOOGLE_PROVIDER";
export const FACEBOOK_PROVIDER = "FACEBOOK_PROVIDER";
export const TWITTER_PROVIDER = "TWITTER_PROVIDER";
export const EMAIL_PROVIDER = "EMAIL_PROVIDER";
const providers = {
  GOOGLE_PROVIDER: new firebase.auth.GoogleAuthProvider(),
  FACEBOOK_PROVIDER: new firebase.auth.FacebookAuthProvider(),
  TWITTER_PROVIDER: new firebase.auth.TwitterAuthProvider(),
  EMAIL_PROVIDER: new firebase.auth.EmailAuthProvider(),
};

export const SIGNIN_INIT = "SIGNIN_INIT";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_NEW_USER = "SIGNIN_NEW_USER";
export const SIGNIN_FAILED = "SIGNIN_FAILED";
export const GET_USER_ACCOUNT_SUCCESSFUL = "GET_USER_ACCOUNT_SUCCESSFUL";

/**
 * Log a user in.
 *
 * @param {string} authType
 * @param {function} dispatch
 * @param {string} [email]
 * @param {string} [password]
 */
export const signIn = ( authType, dispatch, email, password ) => {
  
  dispatch( { type: SIGNIN_INIT } );
  if( authType === EMAIL_PROVIDER ){
    firebase.auth()
      .signInWithEmailAndPassword( email, password )
      .then( result => {
        debugger;
        signedIn( result.user, dispatch );
        store.collection( "users" ).doc( result.user.uid ).then( user => {
          debugger;
          if( user ){
          
          }else{
            dispatch( action( SIGNIN_NEW_USER ) );
          }
        } );
      } )
      .catch( error => {
        debugger;
      } );
    return;
  }
  debugger;
  const provider = providers[ authType ];
  firebase
    .auth()
    .signInWithPopup( provider )
    .then( function( result ){
      debugger;
      if( result.user ){
        signedIn( result.user, dispatch );
        store.collection( "users" ).doc( result.user.uid ).get().then( res => {
          debugger;
          if( res.exists ){
            const data = res.data();
            dispatch(action(GET_USER_ACCOUNT_SUCCESSFUL, data));
          }else{
            dispatch( action( SIGNIN_NEW_USER ) );
          }
        } ).catch( err => {
          console.log( err );
        } );
      }else{
        dispatch( action( SIGNIN_SUCCESS, result.user ) );
      }
    } )
    .catch( function( error ){
      debugger;
      dispatch( action( SIGNIN_FAILED, error.message ) );
    } );
  
};
