import {
  GET_USER_ORGANIZATIONS,
  GET_USER_ORGANIZATIONS_FAILED,
} from '../actions/organization';
import { SIGNED_OUT } from '../actions';

export const orgReducer = (state, action) => {
  switch (action.type) {
    case GET_USER_ORGANIZATIONS:
      return {
        ...state,
        createdOrg: true,
        organizations: action.payload,
      };
    case GET_USER_ORGANIZATIONS_FAILED:
      return {
        ...state,
        createdOrg: false,
        organizations: [],
      };
    case SIGNED_OUT:
      return {
        ...state,
        createdOrg: false,
        organizations: [],
      };
    default:
      return state;
  }
};
