import {
  GET_USER_ORGANIZATIONS, GET_USER_ORGANIZATIONS_FAILED, CREATED_ORGANIZATION,
  GET_ORG_BY_ID, GET_ORG_BY_ID_FAILED, USER_HAS_NO_ORGANIZATIONS, DELETE_ORG,
  DELETE_ORG_FAILED, GET_TOP_ORGANIZATIONS, GET_TOP_ORGANIZATIONS_FAILED,
  THERE_ARE_NO_ORGANIZATIONS,
} from '../actions/organization';
import {SIGNED_OUT} from '../actions';

export const orgReducer = (state, action) => {
  switch (action.type){
    case CREATED_ORGANIZATION:
      return {
        ...state,
        userOrganizations: [...state.userOrganizations, action.payload],
      };
    case GET_USER_ORGANIZATIONS:
      let orgs = action.payload;
      return {
        ...state,
        createdOrg: orgs.length > 0,
        userOrganizations: action.payload,
        
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
        userOrganizations: state.userOrganizations.filter(
          org => org.orgId !== action.payload),
      };
    
    case DELETE_ORG_FAILED:
      return {
        ...state,
        deleteOrgFailedError: 'Failed to remove org.',
      };
    case GET_TOP_ORGANIZATIONS:
      return {
        ...state,
        topOrganizations: action.payload,
      };
    case GET_TOP_ORGANIZATIONS_FAILED:
      return {
        ...state,
        topOrganizations: [],
        error: action.payload,
      };
    case THERE_ARE_NO_ORGANIZATIONS:
      return {
        topOrganizations: [],
        error: 'There are no organizations.',
      };
    default:
      return state;
  }
};
