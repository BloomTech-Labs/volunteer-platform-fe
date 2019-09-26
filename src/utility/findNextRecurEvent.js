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
        .format('LL');
    case 'Weekly':
      let weekdayOfEvent = moment.unix(date).day();
      return moment()
        .day(weekdayOfEvent + 7)
        .format('LL');
    case 'Monthly':
      return findNthWeek(date, info, 1);
    case 'Annually':
      return moment
        .unix(date)
        .add(1, 'year')
        .format('LL');
    case 'Every':
      let today = moment().day();
      if (today === 5 || today === 6) {
        return moment()
          .day(8)
          .format('LL');
      } else {
        return moment()
          .add(1, 'days')
          .format('LL');
      }
  }
};
