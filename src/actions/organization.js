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
  store
    .collection( 'organizations' )
    .add( org )
    .then( res => {
      //dispatch(action(CREATED_ORGANIZATION));
      //I have to comment out this or it will throw error when redirecting to
      // dashboard after a new org is added
    } )
    .catch( err => {
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
export const subscribeToUserOrganizations = ( uid, dispatch ) => {
  store
    .collection( 'organizations' )
    .where( 'organizationOwnerUID', '==', uid )
    .onSnapshot( snapShot => {
      const orgs = [];
      if( !snapShot.empty ){
        localStorage.setItem( 'createdOrg', 'true' );
      }else{
        localStorage.setItem( 'createdOrg', 'false' );
      }
      snapShot.forEach( doc => {
        const org = doc.data();
        org.orgId = doc.id;
        orgs.push( org );
      } );
      dispatch( action( GET_USER_ORGANIZATIONS, orgs ) );
    } );
  
};

export const GET_ORG_BY_ID = 'GET_ORG_BY_ID';
export const GET_ORG_BY_ID_FAILED = 'GET_ORG_BY_ID_FAILED';

/**
 * Get Organization by org_id
 * @param {String} orgId
 * @param {Dispatch} dispatch
 */
export const getOrganizationByOrgId = ( orgId, dispatch ) => {
  store
    .collection( 'organizations' )
    .doc( orgId )
    .get()
    .then( res => {
      if( res.exists ){
        const org = res.data();
        org.id = res.id;
        dispatch( action( GET_ORG_BY_ID, org ) );
      }
    } );
};
/**
 * Update an organization in the db
 * @function
 * @param {String} orgId
 * @param {Organization} updates
 * @param {Dispatch} dispatch
 */
export const updateOrganization = ( orgId, updates, dispatch ) => {
  store.collection( 'organizations' )
    .doc( orgId )
    .set( updates )
    .then( res => {
      console.log( 'success updating organization' );
    } )
    .catch( err => {
      console.log( 'error updating organization' );
    } );
};

export const DELETE_ORG = 'DELETE_ORG';
export const DELETE_ORG_FAILED = 'DELETE_ORG_FAILED';

/**
 * Delete an organization in the db
 * @function
 * @param {String} orgId
 * @param {Dispatch} dispatch
 */
export const deleteOrganization = ( orgId, dispatch ) => {
  store.collection( 'organizations' )
    .doc( orgId )
    .delete()
    .then( res => {
      dispatch( action( DELETE_ORG, orgId ) );
    } )
    .catch( err => {
      console.log( err );
      dispatch( action( DELETE_ORG_FAILED ) );
    } );
};