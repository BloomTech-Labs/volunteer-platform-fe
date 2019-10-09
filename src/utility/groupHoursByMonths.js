import moment from 'moment';

export const groupHoursByMonths = (accHours, duration) => {
  let start = new Date(duration.start);
  let end = new Date(duration.end);
  
  let filteredHours = accHours.filter(item => moment.unix(item.date).isBetween(moment(start).startOf('month'), moment(end).endOf('month'), null, '[]'))

  filteredHours.sort((a, b) => a.date - b.date);

  let grouped = {}
  let arr = [];
  filteredHours.forEach(item => {
    if (!grouped[moment.unix(item.date).format('MMMYY')]) {
      grouped[moment.unix(item.date).format('MMMYY')] = item.hours;
    } else {
      grouped[moment.unix(item.date).format('MMMYY')] += item.hours;
    }
  })

  for (let key in grouped) {
    arr.push({ 
      month: key,
      hours: grouped[key]
    })
  }

  return arr;
}