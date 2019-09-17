import { authReducer } from './authReducer';
import { orgReducer } from './orgReducer';
import { eventsReducer } from './eventsReducer';

export const mainReducer = ( { auth, org, events }, action ) => ( {
  auth: authReducer( auth, action ),
  org: orgReducer( org, action ),
  events: eventsReducer( events, action ),
} );


