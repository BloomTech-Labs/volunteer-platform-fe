import React from 'react';

export const RecurringInfoReview = props => {
  const { localState } = props;

  return (
    <div>
      <h4>Repeat Time Period</h4>
      <p>{localState.recurringInfo.repeatTimePeriod}</p>
      {localState.recurringInfo.repeatTimePeriod === 'Custom' && (
        <p>{localState.recurringInfo.repeatEvery}</p>
      )}
      <h4>Occurence Ends After</h4>
      <p>{localState.occurrenceEnds}</p>
      {localState.recurringInfo.occurrenceEnds === 'On' && (
        <p>{localState.recurringInfo.occurrenceEndDate.unix()}</p>
      )}
      {localState.recurringInfo.occurrenceEnds === 'After' && (
        <p>{localState.recurringInfo.occurrenceEndsAfter} occurrences</p>
      )}

      {localState.recurringInfo.repeatEveryValue === 'Week' && (
        <h4>Repeat Every</h4>
      )}
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
