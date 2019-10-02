import {authReducer} from './authReducer';
import {orgReducer} from './orgReducer';
import {eventsReducer} from './eventsReducer';
import {tagsReducer} from './tagsReducer';
import {messageReducer} from './messagesReducer';

export const mainReducer = ({auth, org, events, tags, messages}, action) => ({
  auth: authReducer(auth, action),
  org: orgReducer(org, action),
  events: eventsReducer(events, action),
  tags: tagsReducer(tags, action),
  messages: messageReducer(messages, action),
});
