import React from 'react';
import { findNext } from '../utility/findNextRecurEvent';
import moment from 'moment';
export const FilteredComponent = Component => {
  return ({ events, filter, tagFilter, recurringEvents }, ...props) => {
    const { location } = filter;
    const { interests, requirements, causeAreas } = tagFilter;
    const { state, city } = location;

    let filterCount = 0;
    for (let key in interests) interests[key] && filterCount++;
    for (let key in requirements) requirements[key] && filterCount++;
    for (let key in causeAreas) causeAreas[key] && filterCount++;

    events.forEach(event => {
      event.nextDate = event.startTimeStamp || event.date;
    });
    recurringEvents.forEach(event => {
      let nextDate = findNext(
        event.startTimeStamp || event.date,
        event.recurringInfo
      );
      event.nextDate = moment(
        moment.unix(nextDate).format('LL') + ' ' + event.startTime
      ).unix();
    });
    let allEvents = [...events, ...recurringEvents].sort(
      (a, b) => a.nextDate - b.nextDate
    );

    console.log(allEvents);
    if (!events || !filterCount) {
      return <Component events={allEvents} {...props} />;
    }

    let filteredEvents = allEvents;
    filteredEvents.forEach(event => (event.sortRank = 0));

    /* This is a crude way to sort events. For each filter match, sortRank
     * is incremented. At the end, we sort the results by sortRank. Any
     * events with a sortRank of zero are removed.
     *
     * I'm sure a more elegant, modularized solution is possible.
     */

    if (state) {
      filteredEvents.forEach(event => {
        if (event.state.toLowerCase().includes(state.toLowerCase())) {
          event.sortRank = event.sortRank + 1;
        }
      });
    }
    if (city) {
      filteredEvents.forEach(event => {
        if (event.city.toLowerCase().includes(city.toLowerCase())) {
          event.sortRank = event.sortRank + 1;
        }
      });
    }
    if (causeAreas) {
      filteredEvents.forEach(event => {
        console.log(event);
        event.typesOfCauses.forEach(causeArea => {
          if (tagFilter.causeAreas[causeArea])
            event.sortRank = event.sortRank + 1;
        });
      });
    }
    if (interests) {
      filteredEvents.forEach(event => {
        event.interest.forEach(interest => {
          if (tagFilter.interests[interest])
            event.sortRank = event.sortRank + 1;
        });
      });
    }
    if (requirements) {
      filteredEvents.forEach(event => {
        event.volunteerRequirements.forEach(requirement => {
          if (tagFilter.requirements[requirement])
            event.sortRank = event.sortRank + 1;
        });
      });
    }

    filteredEvents.sort((a, b) => {
      if (a.sortRank === b.sortRank) {
        return a.nextDate - b.nextDate;
      } else return a.sortRank < b.sortRank ? 1 : -1;
    });
    filteredEvents = filteredEvents.filter(event => event.sortRank > 0);

    return <Component events={filteredEvents} {...props} />;
  };
};
