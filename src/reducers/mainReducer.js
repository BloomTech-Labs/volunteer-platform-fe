import { authReducer } from './authReducer';
import { orgReducer } from './orgReducer';
import { eventsReducer } from './eventsReducer';
import { tagsReducer } from './tagsReducer';

export const mainReducer = ({ auth, org, events, tags }, action) => ({
  auth: authReducer(auth, action),
  org: orgReducer(org, action),
  events: eventsReducer(events, action),
  tags: tagsReducer(tags, action),
});
