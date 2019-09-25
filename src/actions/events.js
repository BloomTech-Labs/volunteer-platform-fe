import {action} from './action';
import firebase, {store} from '../firebase/FirebaseConfig';
import moment from 'moment';

/**
 * Auth Actions
 * @module actions/events
 *
 */

export const CREATE_EVENT = 'CREATE_EVENT';
export const CREATE_EVENT_FAILED = 'CREATE_EVENT_FAILED';

/**
 * Creates a new event in firebase.
 * @function
 * @param {Event} event New event to be created in db.
 * @param {Dispatch} dispatch
 */
export const createEvent = (event, dispatch) => {
  store
    .collection('events')
    .add(event)
    .then(result => {
      event.eventId = result.id;
      dispatch(action(CREATE_EVENT, event));
    })
    .catch(error => {
      console.log(error);
      dispatch(action(CREATE_EVENT_FAILED));
    });
};

export const DELETE_EVENT = 'DELETE_EVENT';
export const DELETE_EVENT_FAILED = 'DELETE_EVENT_FAILED';

/**
 * Delete a event in the db.
 * @function
 * @param {String} eventId
 * @param {Dispatch} dispatch
 */
export const deleteEvent = (eventId, dispatch) => {
  store
    .collection('events')
    .doc(eventId)
    .delete()
    .then(res => {
      dispatch(action(DELETE_EVENT, eventId));
    })
    .catch(error => {
      console.log(error);
      dispatch(action(DELETE_EVENT_FAILED));
    });
};

export const EDIT_EVENT = 'EDIT_EVENT';
export const EDIT_EVENT_FAILED = 'EDIT_EVENT_FAILED';

/**
 * Update/Edit a event in the db.
 * @function
 * @param {Event} event Event to be updated.
 * @param {Dispatch} dispatch
 */
export const editEvent = (event, dispatch) => {
  store
    .collection('events')
    .doc(event.eventId)
    .set(event)
    .then(res => {
      dispatch(action(DELETE_EVENT, event.eventId));
    })
    .catch(error => {
      console.log(error);
      dispatch(action(DELETE_EVENT_FAILED));
    });
};

export const GET_EVENTS_BY_ORG = 'GET_EVENTS_BY_ORG';
export const GET_EVENTS_BY_ORG_FAILED = 'GET_EVENTS_BY_ORG_FAILED';
export const ORG_HAS_NO_EVENTS = 'ORG_HAS_NO_EVENTS';

/**
 * Gets all events a organization has created.
 * @function
 * @param {String} orgId Organization Id.
 * @param {Dispatch} dispatch
 */
export const getAllEventsByOrg = (orgId, dispatch) => {
  store
    .collection('events')
    .where('orgId', '==', orgId)
    .where('date', '>', moment().unix())
    .get()
    .then(res => {
      if (res.empty){
        dispatch(action(ORG_HAS_NO_EVENTS));
        return;
      }
      
      const events = [];
      res.forEach(event => {
        let eventToAdd = event.data();
        eventToAdd.eventId = event.id;
        events.push(eventToAdd);
      });
      
      dispatch(action(GET_EVENTS_BY_ORG, events));
    })
    .catch(error => {
      console.log(error);
      dispatch(action(GET_EVENTS_BY_ORG_FAILED));
    });
};

export const GET_EVENTS_BY_STATE = 'GET_EVENTS_BY_STATE';
export const GET_EVENTS_BY_STATE_FAILED = 'GET_EVENTS_BY_STATE_FAILED';
export const NO_EVENTS_FOR_THAT_STATE = 'NO_EVENTS_FOR_THAT_STATE';

/**
 * Get all the events for a given state.
 * @function
 * @param {String} state Two digit state code
 * @param {Dispatch} dispatch
 */
export const getAllEventsByState = (state, dispatch) => {
  debugger;
  store
    .collection('events')
    .where('state', '==', state)
    .where('date', '>', moment().unix())
    .get()
    .then(res => {
      if (res.empty){
        dispatch(action(NO_EVENTS_FOR_THAT_STATE));
        return;
      }
      
      const events = [];
      res.forEach(event => {
        const data = event.data();
        data.eventId = event.id;
        events.push(data);
      });
      
      dispatch(action(GET_EVENTS_BY_STATE, events));
    })
    .catch(err => {
      console.log(err);
      dispatch(GET_EVENTS_BY_STATE_FAILED, err);
    });
};

export const CREATE_RECURRING_EVENT = 'CREATE_RECURRING_EVENT';
export const CREATE_RECURRING_EVENT_FAILED = 'CREATE_RECURRING_EVENT_FAILED';

export const createRecurringEvent = (event, dispatch) => {
  store.collection('recurring events').add(event).then(res => {
    dispatch(action(CREATE_RECURRING_EVENT));
  }).catch(err => {
    dispatch(action(CREATE_RECURRING_EVENT_FAILED, err));
    console.log(err);
  });
};

export const GET_RECURRING_EVENTS_BY_STATE = 'GET_RECURRING_EVENTS_BY_STATE';
export const RECURRING_EVENTS_BY_STATE_EMPTY = 'RECURRING_EVENTS_BY_STATE_EMPTY';

export const getAllRecurringEventsByState = (state, dispatch) => {
  store.collection('recurring events')
    .where('state', '==', state)
    .get()
    .then(res => {
      if (res.empty){
        dispatch(action(RECURRING_EVENTS_BY_STATE_EMPTY));
      }else{
        const events = [];
        res.forEach(event => {
          const data = event.data();
          data.eventId = event.id;
          events.push(event);
        });
        
        dispatch(action(GET_RECURRING_EVENTS_BY_STATE, events));
      }
    });
};

export const GET_RECURRING_EVENTS_BY_ORG = 'GET_RECURRING_EVENTS_BY_ORG';
export const RECURRING_EVENTS_BY_ORG_EMPTY = 'RECURRING_EVENTS_BY_ORG_EMPTY';

export const getAllRecurringEventsByOrg = (orgId, dispatch) => {
  store.collection('recurring events')
    .where('orgId', '==', orgId)
    .get()
    .then(res => {
      if (res.empty){
        dispatch(action(RECURRING_EVENTS_BY_ORG_EMPTY));
      }else{
        const events = [];
        res.forEach(event => {
          const data = event.data();
          data.eventId = event.id;
          events.push(event);
        });
        
        dispatch(action(GET_RECURRING_EVENTS_BY_ORG, events));
      }
    });
};

