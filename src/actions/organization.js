import { action } from './action';
import firebase, { store } from '../firebase/FirebaseConfig';

/**
 * Auth Actions
 * @module actions/organizations
 *
 */

export const CREATED_ORGANIZATION = 'CREATED_ORGANIZATION';

/**
 * Register a new non profit organization.
 * @function
 * @param {Organization} org - non profit to be registered
 * @param {Dispatch} dispatch
 */
export const registerOrganization = ( org, dispatch ) => {
  store.collection( 'organizations' ).add( org ).then( res => {
    org.orgId = res.id;
    dispatch( action( CREATED_ORGANIZATION ) );
  } ).catch( err => {
    console.log( err );
  } );
};

export const GET_USER_ORGANIZATIONS = 'GET_USER_ORGANIZATIONS';
export const GET_USER_ORGANIZATIONS_FAILED = 'GET_USER_ORGANIZATIONS_FAILED';
export const USER_HAS_NO_ORGANIZATIONS = 'USER_HAS_NO_ORGANIZATIONS';

/**
 * Gets all the users organizations
 * @function
 * @param {string} uid User unique id from google auth.
 * @param {Dispatch} dispatch From useStateValue hook
 */
export const getUsersOrganizations = ( uid, dispatch ) => {
  store.collection( 'organizations' )
    .where( 'organizationOwnerUID', '==', uid )
    .get()
    .then( res => {
      if( !res.empty ){
        const orgs = [];
        res.forEach( org => {
          let organization = org.data();
          organization.orgId = org.id;
          orgs.push( organization );
        } );
        dispatch( action( GET_USER_ORGANIZATIONS, orgs ) );
      }else{
        dispatch( action( USER_HAS_NO_ORGANIZATIONS ) );
      }
    } )
    .catch( err => {
      console.log( err );
      dispatch( action( GET_USER_ORGANIZATIONS_FAILED ) );
    } );
};

export const GET_ORG_BY_ID = 'GET_ORG_BY_ID';
export const GET_ORG_BY_ID_FAILED = 'GET_ORG_BY_ID_FAILED';

export const getOrganizationByOrgId = ( orgId, dispatch ) => {
  store.collection( 'organizations' ).doc( orgId ).get().then( res => {
    if( res.exists ){
      const org = res.data();
      org.id = res.id;
      dispatch(action(GET_ORG_BY_ID, org ));
    }
  } );
};