import React from 'react';

export const RecurringInfoReview = props => {
  const { localState } = props;
  const { recurringInfo } = localState;

  const recurringRender = () => {
    if (recurringInfo.occurrenceEnds === 'On') {
      return (
        <p>
          {' '}
          This event occurs {recurringInfo.repeatTimePeriod} until{' '}
          {recurringInfo.occurrenceEndDate.format('LL')}.
        </p>
      );
    } else if (recurringInfo.occurrenceEnds === 'After') {
      return (
        <p>
          This event occurs {recurringInfo.repeatTimePeriod} and ends after{' '}
          {recurringInfo.occurrenceEndsAfter} occurrences.
        </p>
      );
    } else {
      return (
        <p>
          {' '}
          This event occurs {recurringInfo.repeatTimePeriod} and does not end.
        </p>
      );
    }
  };

  const recurringRenderOther = () => {
    if (
      recurringInfo.repeatEveryValue === 'Day' ||
      recurringInfo.repeatEveryValue === 'Days'
    ) {
      return (
        <p>
          This event will occur every {recurringInfo.repeatEvery}{' '}
          {recurringInfo.repeatEveryValue}
        </p>
      );
    } else if (
      recurringInfo.repeatEveryValue === 'Week' ||
      recurringInfo.repeatEveryValue === 'Weeks'
    ) {
      return (
        <p>
          {' '}
          This event will occur every {recurringInfo.repeatEvery}{' '}
          {recurringInfo.repeatEveryValue} on {recurringInfo.days}
        </p>
      );
    } else {
      return (
        <p>
          This event will occur every {recurringInfo.repeatEvery}{' '}
          {recurringInfo.repeatEveryValue} on {recurringInfo.montlyPeriod}
        </p>
      );
    }
  };

  return (
    <div>
      {recurringInfo.repeatTimePeriod !== 'Other'
        ? recurringRender()
        : recurringRenderOther()}
    </div>
  );
};

export default RecurringInfoReview;
