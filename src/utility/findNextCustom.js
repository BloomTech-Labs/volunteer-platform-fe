import moment from 'moment';
import { findNthWeek } from './findNthWeek';

export const findNextCustom = (date, info) => {
  debugger;
  let unit = info.repeatEveryValue;
  let timeFrame = info.repeatEvery;
  let dayAbbrevs = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  let days = info.days ? [...info.days].map(day => dayAbbrevs[day]).sort() : [];
  let nextOccurrence = moment(date);
  switch (unit) {
    case 'Day':
    case 'Days':
      return nextOccurrence.add(timeFrame, 'days');
    case 'Week':
    case 'Weeks':
      let greaterThanAllDays = true;
      let desiredDay;
      for (let i = 0; i < days.length; i++) {
        if (date.day() < days[i]) {
          desiredDay = i;
          greaterThanAllDays = false;
          break;
        }
      }
      if (greaterThanAllDays) {
        nextOccurrence
          .add(timeFrame, 'weeks')
          .startOf('week')
          .day(days[0]);
      } else {
        nextOccurrence.day(days[desiredDay]);
      }
      return moment(nextOccurrence.format('LL') + ' ' + date.format('LT'));
    case 'Month':
    case 'Months':
      let option = info.monthlyPeriod;
      let firstEvent, day;
      if (option.includes('Monthly on day')) {
        day = +option.split(' ')[3];
        firstEvent = moment().set({
          month: moment.unix(date).month(),
          date: day,
        });
        while (moment().diff(firstEvent) >= 0) {
          firstEvent = firstEvent.add(timeFrame, 'month');
        }
        return firstEvent.unix();
      } else {
        return findNthWeek(date, { repeatTimePeriod: option }, timeFrame);
      }
  }
  return 1;
};
