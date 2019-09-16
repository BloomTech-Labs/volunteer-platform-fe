/** @module Types */

/**
 * @typedef Action
 * @type {object}
 * @property {ActionType} type - type of action for reducer
 * @property {*} [payload] - action payload for reducer
 */

/**
 * @typedef ActionType
 * @type {string}
 * @description String value indicating action type for reducers.
 */

/**
 * @typedef Dispatch
 * @type {function}
 * @description Dispatch function from useStateValue() hook.
 */

/**
 * @typedef User
 * @type {object}
 * @property {string} firstName - users first name
 * @property {string} lastName - users last name
 * @property {string} phoneNumber - users phone number
 * @property {string} email - users email address
 * @property {string} city - users city
 * @property {string} state - users state
 * @property {string} zipCode - users zip code
 * @property {string} uid - users google auth unique id
 * @property {number} age - users age
 */

/**
 * @typedef Organization
 * @type {{organizationType: string, aboutUs: string, website: string, organizationName: string, organizationOwnerUID: string, city: string, phone: string, missionStatement: string, state: string, socialMedia: Array, email: string}}
 */


