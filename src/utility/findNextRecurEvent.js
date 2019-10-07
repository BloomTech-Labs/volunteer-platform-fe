import moment from 'moment';
import { findNextCustom } from './findNextCustom';
import { findNthWeek } from './findNthWeek';

export const eventPassed = date => {
  return moment().unix() - date > 0;
};

export const findNext = (date, keyWord, info = {}) => {
  switch (keyWord) {
    case 'Custom': //need to do
      return findNextCustom(date, info);
    case 'Daily':
      return date.add(1, 'days');
    case 'Weekly':
      let weekdayOfEvent = date.day();
      return date.day(weekdayOfEvent + 7);
    case 'Monthly': //need to do
      return findNthWeek(moment().unix(), info, 1);
    case 'Annually':
      return date.add(1, 'year');
    case 'Weekdays':
      let dayOfWeek = date.day();
      if (dayOfWeek === 5 || dayOfWeek === 6) {
        //Fri or Sat
        return date.day(8);
      } else {
        return date.add(1, 'days');
      }
  }
};

export const findNextEvents = event => {
  debugger;
  let keyWord = event.recurringInfo.repeatTimePeriod.split(' ')[0];
  event.registeredVolunteers = event.registeredVolunteers || {};
  let passed = eventPassed(event.startTimeStamp);
  let eventDay = moment.unix(event.startTimeStamp);
  if (passed) {
    eventDay = findNext(
      moment.unix(event.startTimeStamp),
      keyWord,
      event.recurringInfo
    );
  }
  let arrayOfDates = event.registeredVolunteers
    ? [...Object.keys(event.registeredVolunteers)].sort()
    : [];
  let end = findEndDate(event.recurringInfo, arrayOfDates);
  if (!end) return event;
  arrayOfDates = arrayOfDates.filter(timeStamp => moment().unix() < timeStamp);

  while (
    end.maxDate.diff(eventDay.startOf('day')) > 0 &&
    arrayOfDates.length < end.maxEvents
  ) {
    arrayOfDates.push(eventDay.unix());
    eventDay = findNext(eventDay, keyWord, event.recurringInfo);
  }
  for (let key of arrayOfDates) {
    if (!event.registeredVolunteers[key]) {
      event.registeredVolunteers[key] = [];
    }
  }
  return event.registeredVolunteers;
};

const findEndDate = (info, arr) => {
  let endDate = info.occurrenceEndDate;
  let ends = info.occurrenceEnds; //'On', 'Never', 'After'
  let endsAfter = info.occurrenceEndsAfter; //Number of events

  switch (ends) {
    case 'On':
      return { maxDate: moment.unix(endDate), maxEvents: 8 };
    case 'Never':
    case '':
      return { maxDate: moment().add(3, 'months'), maxEvents: 8 };
    case 'After':
      if (arr.length > endsAfter) {
        return false;
      } else {
        return {
          maxDate: moment().add(3, 'months'),
          maxEvents: endsAfter - arr.length,
        };
      }
  }
};
