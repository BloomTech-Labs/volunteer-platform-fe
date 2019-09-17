export const initialState = {
  auth: {
    loggedIn: false, signedUp: true, googleAuthUser: null, registeredUser: null,
  }, org: {
    createdOrg: false, organizations: [],
  },
  events: {
    events: [], createEventFailedError: '', deleteEventFailedError: '', editEventFailedError: '', getEventsFailedError: ''
  }
};