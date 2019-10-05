/** @module Types */

/**
 * @typedef Action
 * @type {Object}
 * @property {ActionType} type - type of action for reducer
 * @property {*} [payload] - action payload for reducer
 */

/**
 * @typedef ActionType
 * @type {String}
 * @description String value indicating action type for reducers.
 */

/**
 * @typedef Dispatch
 * @type {Function}
 * @description Dispatch function from useStateValue() hook.
 */

/**
 * @typedef User
 * @type {Object}
 * @property {string} firstName - users first name
 * @property {string} lastName - users last name
 * @property {string} phoneNumber - users phone number
 * @property {string} email - users email address
 * @property {string} city - users city
 * @property {string} state - users state
 * @property {string} zipCode - users zip code
 * @property {string} uid - users google auth unique id
 * @property {number} age - users age
 * @property {string} [imagePath] - path where profile image is stored.
 * @property {string} [imageUrl] - avatar image url
 */

/**
 * @typedef Organization
 * @type {Object}
 * @property {String} [orgId] Id of the organization.
 * @property {String} aboutUs Story about the organization.
 * @property {String} website Url of the organization website.
 * @property {String} organizationName Organization name.
 * @property {String} organizationOwnerUID UID of the user who created the org.
 * @property {String} city City where the org is located.
 * @property {String} phone Organization phone number.
 * @property {String} state State the organization is located.
 * @property {String} email Organizations email
 * @property {String} [imagePath] Org image path to be changed into url.
 * @property {String} [imageUrl] Org image url.
 * @property {PointOfContact[]} POC Points of contact for the org.
 * @property {String[]} causeAreas Array of cause areas the org is associated with.
 * @property {String} startTime Time the organization opens.
 * @property {String} endTime Time the organization closes.
 * @property {String[]} daysOfTheWeek Days of the week the organization is open.
 *
 */

/**
 * @typedef PointOfContact
 * @property {String} email Email address of the point of contact.
 * @property {String} firstName First name of the point of contact.
 * @property {lastName} lastName Last name of the point of contact.
 */

/**
 * @typedef SocialMedia
 * @type {Object}
 * @property {String} handle SocialMedia username/handle
 * @property {String} type SocialMedia type, "twitter", "facebook" ect...
 */

/**
 * @typedef Event
 * @type {Object}
 * @property {String} [eventId] Id of the event in the db.
 * @property {String} orgId Id of the organization that created the event.
 * @property {String} volunteerType The volunteer event type
 * @property {String} numberOfPeople The number of people needed at event.
 * @property {number} startTime Start time timestamp
 * @property {number} stopTime Timestamp when the event is supposed to end.
 * @property {String} pointOfContact Contact information for people to contact.
 * @property {String[]} tags Array of string values
 * @property {String} description Description of the event.
 * @property {String} volunteerRequirements Requirements volunteers must meet.
 *
 */

/**
 * @typedef RecurringEvent
 * @type {Object}
 * @property {String} [eventId] Id of the event in the db.
 * @property {String} orgId Id of the organization that created the event.
 * @property {String} volunteerType The volunteer event type
 * @property {String} numberOfPeople The number of people needed at event.
 * @property {String} startTime String representation of start time.
 * @property {Number} startTimeStamp Unix timestamp of start time.
 * @property {String} stopTime String Unix timestamp of stop time.
 * @property {Number} stopTimeStamp Timestamp when the event is supposed to end.
 * @property {String} pointOfContact Contact information for people to contact.
 * @property {String[]} tags Array of string values
 * @property {String} description Description of the event.
 * @property {String} volunteerRequirements Requirements volunteers must meet.
 * @property {EventAttendees} Object where the keys are dates and userId array
 * @property {RecurringEventInfo} recurringInfo Info about the recurring event.
 * @property {RegisteredVolunteers} registeredVolunteers Volunteers registered.
 *
 */

/**
 * @typedef {{unixTimeStamp: Number, String[]}} RegisteredVolunteers
 */

/**
 * @typedef RecurringEventInfo
 * @type{Object}
 * @property {Number} occurrenceEndDate Unix timestamp of end date.
 * @property {Number} occurrenceEnds Number of occurrences before it ends.
 * @property {Number} occurrenceEndsAfter Number of occurrences before it ends.
 * @property {String} [recurringEvent] Yes or No for if it is a recurring event.
 * @property {String} repeatTimePeriod String indicating how it repeats.
 */

/**
 * @typedef EventAttendees
 * @type {Object}
 * @property {Attendees}
 */

/**
 * @typedef Attendees
 * @type {Date[]}
 */

/**
 * @typedef Message
 * @type {Object}
 * @property {String} to Uid of the user the message is to.
 * @property {String} from Uid of the user the message is from.
 * @property {String} text The message to be sent.
 * @property {Number} createdAt Unix time stamp the moment it was created.
 * @property {Boolean} [read]  Rather or not the message has been read.
 */

/**
 * @typedef MessageThread
 * @type {Object}
 * @property {String} id Uid of the other user.
 * @property {String} firstName First Name the message thread is to or from.
 * @property {String} lastName Last name the message thread is to or from.
 * @property {Message[]} messages Array of messages back and forth.
 */

/**
 * @typedef MessagesObject
 * @type {{id: string, messages: MessageThread[]}}
 */

/**
 *@typedef MessageContact
 * @type {Object}
 * @property {String} type Either users or organizations
 * @property {String} uid Unique identifier for the contact.
 */