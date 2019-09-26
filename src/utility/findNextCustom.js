import moment from 'moment';
import { findNthWeek } from './findNthWeek';
export const findNextCustom = (date, info) => {
  let unit = info.repeatEveryValue;
  let timeFrame = info.repeatEvery;
  let days = info.days ? [...info.days] : [];
  let nextOccurrence = moment.unix(date);
  switch (unit) {
    case 'Day' || 'Days':
      while (moment().diff(nextOccurrence) >= 0) {
        nextOccurrence = nextOccurrence.add(timeFrame, 'days');
      }
      return nextOccurrence.format('LL');
    case 'Week' || 'Weeks':
      let createdDate = moment.unix(date);
      let eventFirstWeek = days.map(day => {
        let possibleFirst = moment
          .unix(date)
          .startOf('week')
          .day(day)
          .add('23', 'hours');
        if (possibleFirst.diff(createdDate) >= 0) return possibleFirst;
        else return null;
      });
      let firstDate = eventFirstWeek.find(date => date !== null);
      let firstOccurrence = moment
        .unix(date)
        .startOf('week')
        .day(days[0]);
      if (firstDate) return firstDate.format('LL');
      else
        while (
          moment().diff(firstOccurrence) >= 0 ||
          moment.unix(date).diff(firstOccurrence) >= 0
        ) {
          firstOccurrence = firstOccurrence.add(timeFrame, 'weeks');
        }
      return firstOccurrence.format('LL');

    case 'Month' || 'Months':
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
        return firstEvent.format('LL');
      } else {
        return findNthWeek(date, {repeatTimePeriod: option}, timeFrame)
      }
  }
  return 1;
};
