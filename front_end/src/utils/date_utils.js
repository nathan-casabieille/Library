export const calculateDaysRemaining = (nextReleaseDate) => {
  const today = new Date();
  const releaseDate = new Date(nextReleaseDate);
  const timeDifference = releaseDate - today;
  const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
  return daysRemaining;
};

export const calculateDaysElapsed = (lastCheckDate) => {
  const today = new Date();
  const checkDate = new Date(lastCheckDate);
  const timeDifference = today - checkDate;
  const daysElapsed = Math.floor(timeDifference / (1000 * 3600 * 24));
  return daysElapsed;
};
