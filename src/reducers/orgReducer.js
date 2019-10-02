import {
  GET_USER_ORGANIZATIONS, GET_USER_ORGANIZATIONS_FAILED,
  CREATE_ORGANIZATION_INIT, CREATED_ORGANIZATION, CREATE_ORGANIZATION_FAIL,
  GET_ORG_BY_ID, GET_ORG_BY_ID_FAILED, USER_HAS_NO_ORGANIZATIONS,
  UPDATE_ORGANIZATION_INIT, UPDATE_ORGANIZATION_SUCCESS,
  UPDATE_ORGANIZATION_FAIL, DELETE_ORG,
  DELETE_ORG_FAILED, GET_TOP_ORGANIZATIONS, GET_TOP_ORGANIZATIONS_FAILED,
  THERE_ARE_NO_ORGANIZATIONS, GET_ORGANIZATIONS_BY_STATE_FAILED,
  GET_ORGANIZATIONS_BY_STATE_SUCCESS, GET_ORGANIZATIONS_BY_STATE_EMPTY,
  GET_ORGANIZATIONS_BY_STATE_INIT,
} from '../actions/organization';
import {SIGNED_OUT} from '../actions';

export const orgReducer = (state, action) => {
  switch (action.type){
    case GET_ORGANIZATIONS_BY_STATE_INIT:
      return {
        ...state, isLoading: true,
      };
    case GET_ORGANIZATIONS_BY_STATE_SUCCESS:
      return {
        ...state, isLoading: false, organizations: action.payload,
      };
    case GET_ORGANIZATIONS_BY_STATE_EMPTY:
      return {
        ...state,
        isLoading: false,
        organizations: [],
        error: 'There are no organizations for that state.',
      };
    case GET_ORGANIZATIONS_BY_STATE_FAILED:
      return {
        ...state, isLoading: false, organizations: [], error: action.payload,
      };
    case CREATE_ORGANIZATION_INIT:
      return {...state, isLoading: true};
    case CREATED_ORGANIZATION:
      return {
        ...state,
        //userOrganizations: [...state.userOrganizations, action.payload],
        isLoading: false,
      };
    case CREATE_ORGANIZATION_FAIL:
      return {...state, isLoading: false};
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
    
    case UPDATE_ORGANIZATION_INIT:
      return {
        ...state,
        isLoading: true,
      };
    
    case UPDATE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    
    case UPDATE_ORGANIZATION_FAIL:
      return {
        ...state,
        isLoading: false,
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
