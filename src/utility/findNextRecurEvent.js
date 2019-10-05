import moment from 'moment';
import {findNextCustom} from './findNextCustom';
import {findNthWeek} from './findNthWeek';

/**
 * Find the next event date.
 * @function
 * @param {Number} date unix time stamp
 * @param {RecurringEventInfo} info
 * @returns {Number} unix timestamp
 */
export const findNext = (date, info) => {
  let keyWord = info.repeatTimePeriod.split(' ')[ 0 ];
  switch (keyWord){
    case 'Custom':
      return findNextCustom(date, info);
    case 'Daily':
      return moment()
        .add(1, 'days')
        .unix();
    case 'Weekly':
      let weekdayOfEvent = moment.unix(date).day();
      return moment()
        .day(weekdayOfEvent + 7)
        .unix();
    case 'Monthly':
      return findNthWeek(moment().unix(), info, 1);
    case 'Annually':
      if (moment.unix(date).unix() - moment().unix() < 0){
        return date;
      }
      return moment
        .unix(date)
        .add(1, 'year')
        .unix();
    case 'Weekdays':
      let today = moment.unix(date).day();
      if (today === 6 || today === 7){
        return moment.unix(date)
          .day(8)
          .unix();
      }else{
        return moment.unix(date).unix();
      }
  }
};

/**
 *
 * @param {RecurringEvent} event The recurring event
 * @returns {*}
 */

export const findNextEvents = event => {
  debugger;
  let keyWord = event.recurringInfo.repeatTimePeriod.split(' ')[ 0 ];
  event.registeredVolunteers = event.registeredVolunteers || {};
  let arrayOfDates = event.registeredVolunteers
    ? [...Object.keys(event.registeredVolunteers)].sort()
    : [];
  
  // find the latest day we will add the recurring event to events.
  let end = findEndDate(event.recurringInfo, arrayOfDates);
  if (!end){
    // if there are no dates to add then return. We are done here.
    return event;
  }
  arrayOfDates = arrayOfDates.filter(timeStamp => moment().unix() < timeStamp);
  
  let eventDay = moment(moment.unix(findNext(event.date, event.recurringInfo))
    .format('LL') + ' ' + moment.unix(event.startTimeStamp).format('LT'));
  
  const endUnix = end.maxDate.unix();
  let eventDayUnix = eventDay.unix();
  
  // calculate the difference in dates.
  let diff = endUnix - eventDayUnix;
  while (
    diff > 0 &&
    arrayOfDates.length < end.maxEvents
    ){
    arrayOfDates.push(eventDay.unix());
    switch (keyWord){
      case 'Daily':
        eventDay
          .add(1, 'day');
        break;
      case 'Weekly':
        eventDay
          .add(1, 'week');
        break;
      case 'Weekdays':
        eventDay = moment(moment.unix(findNext(
          eventDay.add(1, 'day').unix(),
          event.recurringInfo)).format('LL') + ' ' +
          moment.unix(event.startTimeStamp).format('LT'));
        break;
      case 'Annually':
        eventDay
          .add(1, 'year');
        break;
      case 'Monthly':
        eventDay = moment(moment.unix(findNthWeek(
          eventDay.add(1, 'month').unix(),
          event.recurringInfo,
          1,
          )).format('LL') + ' '
          + moment.unix(event.startTimeStamp).format('LT'));
    }
    // recalculate the diff
    diff = end.maxDate.unix() - eventDay.unix();
  }
  
  // ensure the dates are added to the event
  for (let key of arrayOfDates){
    if (!event.registeredVolunteers[ key ]){
      event.registeredVolunteers[ key ] = [];
    }
  }
  return event.registeredVolunteers;
};

const findEndDate = (info, arr) => {
  let endDate = info.occurrenceEndDate;
  let ends = info.occurrenceEnds; //'On', 'Never', 'After'
  let endsAfter = info.occurrenceEndsAfter; //Number of events
  
  switch (ends){
    case 'On':
      return {maxDate: moment.unix(endDate), maxEvents: 8};
    case 'Never':
    case '':
      return {maxDate: moment().add(3, 'months'), maxEvents: 8};
    case 'After':
      if (arr.length > endsAfter){
        return false;
      }else{
        return {
          maxDate: moment().add(3, 'months'),
          maxEvents: endsAfter - arr.length,
        };
      }
  }
};
