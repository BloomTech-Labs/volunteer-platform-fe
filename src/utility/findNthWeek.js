import moment from 'moment';

export const findNthWeek = (date, info, period) => {
  let dayAbbrevs = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  let unitConversion = { First: 1, Second: 2, Third: 3, Fourth: 4 };
  let whichWeek = unitConversion[info.repeatTimePeriod.split(' ')[2]];
  let whichDay = dayAbbrevs[info.repeatTimePeriod.split(' ')[3]];
  let first_week = moment()
    .startOf('month')
    .day(whichDay);
  let correct_week = first_week.add(7 * (whichWeek - 1), 'days');
  let firstOfNext;
  while (moment().diff(correct_week) > 0) {
    firstOfNext = moment()
      .add(period, 'month')
      .startOf('month')
      .day();
    if (firstOfNext > whichDay) {
      first_week = moment()
        .add(period, 'month')
        .startOf('month')
        .day(whichDay + 7);
      correct_week = first_week.add(7 * (whichWeek - 1), 'days');
    } else {
      correct_week = moment()
        .add(period, 'month')
        .startOf('month')
        .day(whichDay)
        .add(7 * (whichWeek - 1), 'days');
    }
  }
  return correct_week.unix();
};
