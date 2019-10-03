import moment from 'moment';
import { findNextCustom } from './src/utility/findNextCustom';
import { findNthWeek } from './src/utility/findNthWeek';

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
      return findNthWeek(date, info, 1);
    case 'Annually':
      return moment
        .unix(date)
        .add(1, 'year')
        .unix();
    case 'Every':
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
