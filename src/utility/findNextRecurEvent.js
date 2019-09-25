import moment from 'moment';
export const findNext = (date, info) => {
  console.log(info);
  let keyWord = info.repeatTimePeriod.split(' ')[0];
  let dayAbbrevs = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  let unitConversion = { First: 1, Second: 2, Third: 3, Fourth: 4, Fifth: 5 };
  switch (keyWord) {
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
      let whichWeek = unitConversion[info.repeatTimePeriod.split(' ')[3]];
      let whichDay = dayAbbrevs[info.repeatTimePeriod.split(' ')[4]];
      let first_week = moment()
        .startOf('month')
        .day(whichDay);
      let correct_week = first_week.add(7 * (whichWeek - 1), 'days');
      if (correct_week.month() !== moment().month()) {
        correct_week = 0;
      }
      let firstOfNext;
      if (moment().diff(correct_week) > 0) {
        firstOfNext = moment()
          .add(1, 'month')
          .startOf('month')
          .day();
        if (firstOfNext > whichDay) {
          first_week = moment()
            .add(1, 'month')
            .startOf('month')
            .day(whichDay + 7);
          return first_week.add(7 * (whichWeek - 1), 'days').format('LL');
        } else {
          return moment()
            .add(1, 'month')
            .startOf('month')
            .day(whichDay)
            .add(7 * (whichWeek - 1), 'days')
            .format('LL');
        }
      } else {
        return correct_week.format('LL');
      }
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

// recurringInfo: {
//     days: [],
//     occurrenceEndDate:
//     occurrenceEnds:
//     occurenceEndsAFter:
//     repeatEvery:
//     repeatEveryValue:
//     repeatTimePeriod: (Custom, Daily, Weekly on Day, Monthly on Nth, Annually on, Every Weekday)
// }
