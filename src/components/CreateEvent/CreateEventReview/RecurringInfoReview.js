import React from 'react';

export const RecurringInfoReview = props => {
  const { localState } = props;

  return (
    <div>
      <label>Recurring Information</label>
      <p>Repeat Time Period</p>
      <p>{localState.recurringInfo.repeatTimePeriod}</p>
      {localState.recurringInfo.repeatTimePeriod === 'Custom' && (
        <p>{localState.recurringInfo.repeatEvery}</p>
      )}
      <label>Occurence Ends After</label>
      <p>{localState.occurrenceEnds}</p>
      {localState.recurringInfo.occurrenceEnds === 'On' && (
        <p>{localState.recurringInfo.occurrenceEndDate}</p>
      )}
      {localState.recurringInfo.occurrenceEnds === 'After' && (
        <p>{localState.recurringInfo.occurrenceEndsAfter} occurrences</p>
      )}
      <p>Repeat Every</p>
      {localState.recurringInfo.repeatEveryValue === 'Week' && (
        <p>{localState.recurringInfo.days}</p>
      )}
      {localState.recurringInfo.repeatEveryValue === 'Weeks' && (
        <p>{localState.recurringInfo.days}</p>
      )}
      {localState.recurringInfo.repeatEveryValue === 'Month' && (
        <p>{localState.recurringInfo.monthlyPeriod}</p>
      )}
      {localState.recurringInfo.repeatEveryValue === 'Months' && (
        <p>{localState.recurringInfo.monthlyPeriod}</p>
      )}
    </div>
  );
};

export default RecurringInfoReview;
