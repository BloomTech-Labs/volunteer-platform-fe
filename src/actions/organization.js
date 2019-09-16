import { action } from './action';
import firebase, { store } from '../firebase/FirebaseConfig';

export const CREATED_ORGANIZATION = 'CREATED_ORGANIZATION';

/**
 * Register a new non profit organization.
 * @param {Organization} org - non profit to be registered
 * @param {Dispatch} dispatch
 */
export const registerOrganization = ( org, dispatch ) => {
  store.collection( 'organizations' ).add( org ).then( res => {
    dispatch( action( CREATED_ORGANIZATION ) );
  } ).catch( err => {
    console.log( err );
  } );
};

export const GET_USER_ORGANIZATIONS = 'GET_USER_ORGANIZATIONS';
export const GET_USER_ORGANIZATIONS_FAILED = 'GET_USER_ORGANIZATIONS_FAILED';

export const getUsersOrganizations = ( uid, dispatch ) => {
  debugger;
  store.collection( 'organizations' )
    .where( 'organizationOwnerUID', '==', uid )
    .get()
    .then( res => {
      if( !res.empty ){
        const orgs = [];
        res.forEach( org => {
          let organization = org.data;
          organization.orgId = org.id;
          orgs.push( org.data() );
        } );
        dispatch( action( GET_USER_ORGANIZATIONS, orgs ) );
      }else{
        dispatch( action( GET_USER_ORGANIZATIONS_FAILED ) );
      }
    } )
    .catch( err => {
      console.log( err );
      dispatch( action( GET_USER_ORGANIZATIONS_FAILED ) );
    } );
};