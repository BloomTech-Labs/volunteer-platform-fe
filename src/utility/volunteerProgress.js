import moment from 'moment';

const getAccHoursForDuration = (duration, hours) => {
  let start = moment(duration.start).unix();
  let end = moment(duration.end).endOf('month').unix();
  console.log(start, end);
  let numHours = 0;
  hours.forEach(item => {
    if (item.date >= start && item.date <= end) {
      numHours += item.hours;
    }
  })
  return numHours;
}

export const volunteerProgress = (goals, accHours) => {
  let hours = getAccHoursForDuration(goals.duration, accHours);
  let total;

  if (goals.frequency === 'per week') {
    total = moment(goals.duration.end).endOf('month').diff(moment(goals.duration.start), 'weeks');
    console.log(hours, 'hours');
    console.log(total, 'weeks');
    return Math.round(hours * 100/ (total * goals.hours));
  } else if ((goals.frequency === 'per month')) {
    total = moment(goals.duration.end).diff(moment(goals.duration.start), 'months') + 1;
    console.log(hours, 'hours');
    console.log(total, 'months');
    return Math.round(hours * 100/ (total * goals.hours));
  }
}



/*
expected data format:

validatedHours = [
  {
    date: //unix timestamp,
    hours: int
  }, 
  ...
]

duration = {
  start: //unix timestamp,
  end: //unix timestamp
}

goal = {
  hours: int,
  frequency: // 'per week', 'per month'
}

*/