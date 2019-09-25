import moment from 'moment'
export const findNext = (date, info) => {
  let keyWord = info.repeatTimePeriod.split(' ')[0];
  switch (keyWord) {
    case 'Custom':
      console.log(moment().add(1, 'days').format('LL'));
    case 'Daily':
        return moment().add(1, 'days').format('LL')
    case 'Weekly':
        return moment.
    case 'Monthly':
    case 'Annually':
    case 'Every':
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
