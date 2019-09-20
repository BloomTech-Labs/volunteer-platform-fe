import React from 'react';

export const FilteredComponent = Component => {
  return ({ events, filter }, ...props) => {
    const { location, tags } = filter;
    const { state, city } = location;
    const { interests, requirements } = tags;

    let filteredEvents = events;

    if (state) {
      filteredEvents = filteredEvents.filter(event =>
        event.state.toLowerCase().includes(state.toLowerCase())
      );
    }
    if (city) {
      filteredEvents = filteredEvents.filter(event =>
        event.city.toLowerCase().includes(city.toLowerCase())
      );
    }
    if (interests) {
      filteredEvents = filteredEvents.filter(event =>
        event.tags.interests.filter(interest => interests.includes(interest))
      );
    }
    if (requirements) {
      filteredEvents = filteredEvents.filter(event =>
        event.tags.requirements.filter(requirement =>
          requirements.includes(requirement)
        )
      );
    }

    console.log(filteredEvents);

    return <Component events={filteredEvents} {...props} />;
  };
};
