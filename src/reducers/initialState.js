const causeAreas = [
  'Animal Care',
  'Health & Medicine',
  'Computers & Technology',
  'Immigrants & Refugees',
  'Seniors',
  'Faith-Based',
  'Crisis Support',
  'Hunger',
  'Sports & Recreation',
  'Disaster Relief',
  'Education & Literacy',
  'Justice & Legal',
  'Women',
  'Media & Broadcasting',
  'Emergency & Safety',
  'Children & Youth',
  'Politics',
  'Homeless & Housing',
  'People with Disabilities',
  'Environment',
  'Veterans & Military Families',
  'Advocacy & Human Rights',
];

const requirements = [
  'Background Check',
  'Light Lifting Required',
  'Orientation or Training',
  'Access to Computer',
  'Heavy Lifting Required',
  'Children Require Parent/Guardian',
  'Waiver for Youth',
  'Application Required',
  'Basic Computer Skills',
];

const interests = [
  'Work with Animals',
  'Virtual',
  'Group Friendly',
  'New' + ' Volunteer Friendly',
  'Religion',
  'Customer Service',
  'Senior Friendly',
  'Helping Homeless',
  'Indoor Work',
  'Family Friendly',
  'Tutoring',
  'Youth Friendly',
  'Wheelchair Accessible',
  'Outdoor Work',
];

const checkLoggedIn = localStorage.getItem('loggedIn') === 'true';
const checkRegistered = localStorage.getItem('userRegistered') === 'true';

export const initialState = {
  auth: {
    loggedIn: checkLoggedIn || false,
    signedUp: checkRegistered || false,
    googleAuthUser: null,
    registeredUser: null,
    topVolunteers: [],
    signInError: null,
    signUpError: null,
    topVolunteersError: null,
    isLoading: false
  },
  org: {
    createdOrg: false,
    userOrganizations: [],
    topOrganizations: [],
    getOrganizationFailedError: '',
    organization: {},
    deleteOrgFailedError: '',
    error: '',
    isLoading: false
  },
  events: {
    events: [],
    recurringEvents: [],
    createEventFailedError: '',
    deleteEventFailedError: '',
    editEventFailedError: '',
    getEventsFailedError: '',
    isLoading: false
  },
  tags: {
    interests: interests,
    requirements: requirements,
    causeAreas: causeAreas,
    isGetting: false,
    errorMessage: '',
  },
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
 * @property {User[]} topVolunteers Array of top volunteers
 */

/**
 * @typedef org
 * @type {Object}
 * @property {boolean} createdOrg Indicates if the user has created an org.
 * @property {Organization[]} userOrganizations Organizations user created.
 * @property {String} getOrganizationFailedError Error message
 * @property {Organization} organization Organization from get org by id action.
 * @property {String} deleteOrgFailedError Error message
 */

/**
 * @typedef events
 * @type {Object}
 * @property {Event[]} events Array of events collected from db.
 * @property {RecurringEvent[]}
 * @property {String} createEventFailedError Create Event Error Message
 * @property {String} createEventFailedError Create Event Error Message
 * @property {String} editEventFailedError Edit Event Error Message
 * @property {String} getEventsFailedError Get Events Error Message
 */
