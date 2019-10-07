import moment from 'moment';
import { findNextCustom } from './findNextCustom';
import { findNthWeek } from './findNthWeek';

export const eventPassed = date => {
  return moment().unix() - date > 0;
};

export const findNext = (date, keyWord, info = {}) => {
  switch (keyWord) {
    case 'Other':
      return findNextCustom(date, info);
    case 'Daily':
      return date.add(1, 'days');
    case 'Weekly':
      let weekdayOfEvent = date.day();
      return date.day(weekdayOfEvent + 7);
    case 'Monthly':
      return findNthWeek(date.add(1, 'month'), info);
    case 'Annually':
      return date.add(1, 'year');
    case 'Weekdays':
      let dayOfWeek = date.day();
      if (dayOfWeek === 5 || dayOfWeek === 6) {
        return date.day(8);
      } else {
        return date.add(1, 'days');
      }
    case 'Weekends': //Fri, Sat, Sun
      return date.day() < 5 ? date.day(5) : date.add(1, 'day');
    case 'Sat/Sun':
      return date.day() < 6 ? date.day(6) : date.add(1, 'day');
  }
};

export const findNextEvents = event => {
  debugger;
  let dayAbbrevs = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  let keyWord = event.recurringInfo.repeatTimePeriod.split(' ')[0];
  event.registeredVolunteers = event.registeredVolunteers || {};
  let passed = eventPassed(event.startTimeStamp);
  let eventDay = moment.unix(event.startTimeStamp);
  let isCustomWeekly =
    event.recurringInfo.repeatTimePeriod.split(' ')[0] === 'Other' &&
    event.recurringInfo.repeatEveryValue.includes('Week');
  let isWeekend =
    event.recurringInfo.repeatTimePeriod.split(' ')[0] === 'Weekends';
  let isSat_Sun =
    event.recurringInfo.repeatTimePeriod.split(' ')[0] === 'Sat/Sun';
  let isGood = true;
  let days = [0, 5, 6];
  if (isWeekend) {
    isGood = days.includes(eventDay.day());
  }
  days = [0, 6];
  if (isSat_Sun) {
    isGood = days.includes(eventDay.day());
  }
  days = event.recurringInfo.days || [];
  days = days.map(day => dayAbbrevs[day]);
  if (isCustomWeekly) {
    isGood = days.includes(eventDay.day());
  }
  while (passed || !isGood) {
    eventDay = findNext(
      moment.unix(event.startTimeStamp),
      keyWord,
      event.recurringInfo
    );
    passed = eventPassed(eventDay.unix());
    isGood = true;
  }
  let arrayOfDates = event.registeredVolunteers
    ? [...Object.keys(event.registeredVolunteers)].sort()
    : [];
  let end = findEndDate(event.recurringInfo, arrayOfDates);
  if (!end) return event;
  arrayOfDates = arrayOfDates.filter(timeStamp => moment().unix() < timeStamp);
  while (
    end.maxDate.diff(moment(eventDay).startOf('day')) > 0 &&
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
