import {
  CREATE_EVENT, CREATE_EVENT_FAILED, DELETE_EVENT_FAILED, DELETE_EVENT,
  EDIT_EVENT, EDIT_EVENT_FAILED, GET_EVENTS_BY_ORG_FAILED, GET_EVENTS_BY_ORG,
  ORG_HAS_NO_EVENTS, GET_EVENTS_BY_STATE, GET_EVENTS_BY_STATE_FAILED,
  NO_EVENTS_FOR_THAT_STATE, CREATE_RECURRING_EVENT,
  CREATE_RECURRING_EVENT_FAILED, GET_RECURRING_EVENTS_BY_STATE,
  RECURRING_EVENTS_BY_STATE_EMPTY, GET_RECURRING_EVENTS_BY_ORG,
  RECURRING_EVENTS_BY_ORG_EMPTY, SIGN_UP_FOR_EVENT_INIT,
  SIGNED_UP_VOLUNTEER_FOR_EVENT, SIGN_UP_FOR_EVENT_FAILURE,
  CANCEL_SIGNED_UP_EVENT_INIT, CANCELED_VOLUNTEER_FOR_EVENT,
  CANCEL_SIGNED_UP_EVENT_FAILURE, GET_EVENT_BY_ID, GET_RECURRING_EVENT_BY_ID,
} from '../actions/events';

export const eventsReducer = (state, action) => {
  switch (action.type){
    case GET_EVENT_BY_ID:
      return {
        ...state,
        event: action.payload,
      };
    case GET_RECURRING_EVENT_BY_ID:
      return {
        ...state,
        event: action.payload,
      };
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
        createEventFailedError: '',
      };
    case CREATE_EVENT_FAILED:
      return {...state, createEventFailedError: 'Failed to create event.'};
    case DELETE_EVENT:
      return {
        ...state,
        deleteEventFailedError: '',
        events: state.events.filter(
          event => event.eventId !== action.payload),
      };
    case CREATE_RECURRING_EVENT:
      return {
        ...state,
      };
    case CREATE_RECURRING_EVENT_FAILED:
      return {
        ...state,
      };
    case GET_RECURRING_EVENTS_BY_STATE:
      return {
        ...state, recurringEvents: action.payload,
      };
    case RECURRING_EVENTS_BY_STATE_EMPTY:
      return {
        ...state, recurringEvents: [],
      };
    case GET_RECURRING_EVENTS_BY_ORG:
      return {
        ...state, recurringEvents: [...action.payload],
      };
    case RECURRING_EVENTS_BY_ORG_EMPTY:
      return {
        ...state, recurringEvents: [],
      };
    case DELETE_EVENT_FAILED:
      return {...state, deleteEventFailedError: 'Failed to remove event.'};
    case EDIT_EVENT:
      return {
        ...state, editEventFailedError: '', events: state.events.map(event => {
          if (event.eventId === action.payload.eventId){
            return action.payload;
          }
          return event;
        }),
      };
    case EDIT_EVENT_FAILED:
      return {...state, editEventFailedError: 'Failed to edit the event.'};
    case GET_EVENTS_BY_ORG:
      return {...state, getEventsFailedError: '', events: action.payload};
    case GET_EVENTS_BY_ORG_FAILED:
      return {...state, getEventsFailedError: 'Failed to get events'};
    case ORG_HAS_NO_EVENTS:
      return {...state, events: [], getEventsFailedError: ''};
    case GET_EVENTS_BY_STATE:
      return {...state, events: action.payload, getEventsFailedError: ''};
    case GET_EVENTS_BY_STATE_FAILED:
      return {
        ...state,
        events: [],
        getEventsFailedError: 'Failed to get' + ' events for that state.',
      };
    case NO_EVENTS_FOR_THAT_STATE:
      return {...state, events: [], getEventsFailedError: ''};
    case SIGN_UP_FOR_EVENT_INIT:
      return {
        ...state,
        signUpVolunteerError: '',
      };
    case SIGNED_UP_VOLUNTEER_FOR_EVENT:
      return {
        ...state,
        events: state.events.map(event => {
          return event.eventId === action.payload.eventId ? action.payload :
            event;
        }),
      };
    case SIGN_UP_FOR_EVENT_FAILURE:
      return {
        ...state,
        signUpVolunteerError: 'Error signing up volunteer for the event',
      };
    case CANCEL_SIGNED_UP_EVENT_INIT:
      return {
        ...state,
        cancelSignedUpVolunteerError: '',
      };
    case CANCELED_VOLUNTEER_FOR_EVENT:
      return {
        events: state.events.map(event => {
          return event.eventId === action.payload.eventId ? action.payload :
            event;
        }),
      };
    case CANCEL_SIGNED_UP_EVENT_FAILURE:
      return {
        ...state,
        cancelSignedUpVolunteerError: 'Error canceling signed up volunteer for the event',
      };
    default:
      return state;
  }
};
