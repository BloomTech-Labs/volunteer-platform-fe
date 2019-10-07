export const volunteerProgress = (goal, total) => {
  if (goal.frequency === 'per week') {
    return Math.round(total / (52 * goal.hours));
  } else if ((goal.frequency === 'per month')) {
    return Math.round(total / (12 * goal.hours));
  }
}