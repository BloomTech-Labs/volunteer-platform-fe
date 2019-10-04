import moment from 'moment';
import { findNextCustom } from './findNextCustom';
import { findNthWeek } from './findNthWeek';

export const findNext = (date, info) => {
  let keyWord = info.repeatTimePeriod.split(' ')[0];
  switch (keyWord) {
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
        //need to fix this to see if the date stored has occurred yet, if not then add a year
      return moment
        .unix(date)
        .add(1, 'year')
        .unix();
    case 'Weekdays':
      let today = moment().day();
      if (today === 5 || today === 6) {
        return moment()
          .day(8)
          .unix();
      } else {
        return moment()
          .add(1, 'days')
          .unix();
      }
  }
};

export const findNextEvents = event => {
  let keyWord = event.recurringInfo.repeatTimePeriod.split(' ')[0];
  event.registeredVolunteers = event.registeredVolunteers || {};
  let arrayOfDates = event.registeredVolunteers
    ? [...Object.keys(event.registeredVolunteers)].sort()
    : [];
  let end = findEndDate(event.recurringInfo, arrayOfDates);
  if (!end) return event;
  arrayOfDates = arrayOfDates.filter(timeStamp => moment().unix() < timeStamp);
  let eventDay = findNext(event.date, event.recurringInfo);

  while (
    end.maxDate.diff(moment.unix(eventDay).startOf('day')) > 0 &&
    arrayOfDates.length < end.maxEvents
  ) {
    arrayOfDates.push(eventDay);
    switch (keyWord) {
      case 'Daily':
        eventDay = moment
          .unix(eventDay)
          .add(1, 'day')
          .unix();
        break;
      case 'Weekly':
        eventDay = moment
          .unix(eventDay)
          .add(1, 'week')
          .unix();
        break;
      case 'Annually':
        eventDay = moment
          .unix(eventDay)
          .add(1, 'year')
          .unix();
        break;
      case 'Monthly':
        eventDay = findNthWeek(
          moment
            .unix(eventDay)
            .add(1, 'month')
            .unix(),
          event.recurringInfo,
          1
        );
    }
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
