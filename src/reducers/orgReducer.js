import {
  GET_USER_ORGANIZATIONS, GET_USER_ORGANIZATIONS_FAILED, CREATED_ORGANIZATION,
  GET_ORG_BY_ID, GET_ORG_BY_ID_FAILED, USER_HAS_NO_ORGANIZATIONS, DELETE_ORG,  DELETE_ORG_FAILED
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
        let orgs = action.payload
      return {
        ...state, createdOrg: orgs.length>0, userOrganizations: action.payload,

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
    
    case DELETE_ORG:
      return {
        ...state,
        deleteEventFailedError: '',
        userOrganizations: state. userOrganizations.filter(org => org.orgId !== action.payload),
      };

    case DELETE_ORG_FAILED:
      return {
        ...state, 
        deleteOrgFailedError: 'Failed to remove org.'
      };
  
    default:
      return state;
  }
};
