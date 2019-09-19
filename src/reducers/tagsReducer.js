import {
  GET_INTERESTS,
  GOT_INTERESTS,
  GETTING_TAGS_ERROR,
  GET_REQUIREMENTS,
  GOT_REQUIREMENTS,
  GET_CAUSE_AREAS,
  GOT_CAUSE_AREAS,
} from '../actions';

export const tagsReducer = (state, action) => {
  switch (action.type) {
    case GET_INTERESTS:
      return {
          ...state,
          isGetting: true,
      };
    case GOT_INTERESTS:
      return {
          ...state,
          interests:[...action.payload],
          isGetting: false
      };
    case GETTING_TAGS_ERROR:
      return {
          ...state,
          errorMessage: 'Error getting tags.',
          isGetting: false
      };
    case GET_REQUIREMENTS:
      return {
          ...state,
          isGetting: true
      };
    case GOT_REQUIREMENTS:
      return {
          ...state,
          requirements: [...action.payload],
          isGetting: false
      };
    case GET_CAUSE_AREAS:
      return {
          ...state,
          isGetting: true
      };
    case GOT_CAUSE_AREAS:
      return {
          ...state,
          causeAreas:[...action.payload],
          isGetting: false
      };
    default:
      return state;
  }
};
