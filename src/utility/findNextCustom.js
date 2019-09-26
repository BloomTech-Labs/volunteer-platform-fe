import moment from 'moment';

export const findNextCustom = (date, info) => {
  let unit = info.repeatEveryValue; //Week
  let timeFrame = 2; //2
  let days = ['Sunday']; //Monday
  let nextOccurrence = moment.unix(date);
  switch (unit) {
    case 'Day':
      while (moment().diff(nextOccurrence) >= 0) {
        nextOccurrence = nextOccurrence.add(timeFrame, 'days');
      }
      return nextOccurrence.format('LL');
    case 'Week':
      let createdDate = moment.unix(date);
      let eventFirstWeek = days.map(day => {
        let possibleFirst = moment
          .unix(date)
          .startOf('week')
          .day(day).add('23', 'hours');
        if (possibleFirst.diff(createdDate) >= 0) return possibleFirst;
        else return null;
      });
      let firstDate = eventFirstWeek.find(date => date!==null)
      let firstOccurrence = moment.unix(date).startOf('week').day(days[0])
      if(firstDate)
        return firstDate.format('LL')
      else
        while(moment().diff(firstOccurrence) >= 0 || moment.unix(date).diff(firstOccurrence) >= 0){
            firstOccurrence = firstOccurrence.add(timeFrame, 'weeks') 
        }
        return firstOccurrence.format('LL')

    case 'Month':
  }
  return 1;
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
