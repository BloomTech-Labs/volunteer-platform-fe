import {
  GET_USER_ORGANIZATIONS, GET_USER_ORGANIZATIONS_FAILED, CREATED_ORGANIZATION,
  GET_ORG_BY_ID, GET_ORG_BY_ID_FAILED, USER_HAS_NO_ORGANIZATIONS
} from '../actions/organization';
import { SIGNED_OUT } from '../actions';

export const orgReducer = ( state, action ) => {
  switch( action.type ){
    case CREATED_ORGANIZATION:
      return {
        ...state,
        userOrganizations: [ ...state.userOrganizations, action.payload ],
      };
    case GET_USER_ORGANIZATIONS:
      return {
        ...state, createdOrg: true, userOrganizations: action.payload,

      };
    case GET_USER_ORGANIZATIONS_FAILED:
      return {
        ...state,
        createdOrg: false,
        userOrganizations: [],
        getOrganizationFailedError: 'Failed to get organizations',
      };
    case USER_HAS_NO_ORGANIZATIONS:
      return {
        ...state, createdOrg: false, userOrganizations: [],
      };
    case GET_ORG_BY_ID:
      return {
        ...state, organization: action.payload,
      };
    case GET_ORG_BY_ID_FAILED:
      return {
        ...state,
        organization: {},
        getOrganizationFailedError: 'Failed to get specified organization',
      };
    
    case SIGNED_OUT:
      return {
        ...state, createdOrg: false, userOrganizations: [],
      };
    
    default:
      return state;
  }
};
