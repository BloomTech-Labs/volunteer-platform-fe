export const initialState = {
  auth: {
    loggedIn: true,
    signedUp: true,
    googleAuthUser: null,
    registeredUser: null,
  },
  org: {
    createdOrg: false,
    userOrganizations: [],
    getOrganizationFailedError: '',
    organization: {},
  },
  events: {
    events: [],
    createEventFailedError: '',
    deleteEventFailedError: '',
    editEventFailedError: '',
    getEventsFailedError: '',
  },
  tags: {
      interests: [],
      requirements: [],
      causeAreas: []
  }
};

/**
 * State
 * @module State
 *
 */

/**
 * @typedef tags
 * @type {Object}
 * @property {Tag[]} interests Array of Tags for the event interests.
 * @property {Tag[]} requirements Array of Tags for the volunteer requirements.
 * @property {Tag[]} causeAreas Array of Tags for organization cause areas.
 * @property {boolean} isGetting Is getting tags from the DB.
 * @property {String} errorMessage Error message for getting tags from DB.
 */

/**
 * @typedef auth
 * @type {Object}
 * @property {boolean} loggedIn Indicates if the user is logged in or not.
 * @property {boolean} signedUp Indicates if the user has completed registration
 * @property {Object} googleAuthUser User object given to use from google auth.
 * @property {User} registeredUser Registered user data
 */

/**
 * @typedef org
 * @type {Object}
 * @property {boolean} createdOrg Indicates if the user has created an org.
 * @property {Organization[]} userOrganizations Organizations user created.
 * @property {String} getOrganizationFailedError Error message
 * @property {Organization} organization Organization from get org by id action.
 */

/**
 * @typedef events
 * @type {Object}
 * @property {Event[]} events Array of events collected from db.
 * @property {String} createEventFailedError Create Event Error Message
 * @property {String} createEventFailedError Create Event Error Message
 * @property {String} editEventFailedError Edit Event Error Message
 * @property {String} getEventsFailedError Get Events Error Message
 */
