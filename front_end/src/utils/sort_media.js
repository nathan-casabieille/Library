import { SORT_CRITERIA, SORT_ORDER, STATUS } from 'Env';
import { calculateDaysRemaining, calculateDaysElapsed } from './date_utils';

const compareByTitle = (a, b, order) => {
  const titleA = a.title.trim().toLowerCase();
  const titleB = b.title.trim().toLowerCase();

  return order === SORT_ORDER.ASCENDING
    ? titleA.localeCompare(titleB)
    : titleB.localeCompare(titleA);
};

const compareByRating = (a, b, order) => {
  return order === SORT_ORDER.ASCENDING ? a.rating - b.rating : b.rating - a.rating;
};

const compareByAnimeStatus = (a, b, order) => {
  const statusOrder = {
    [STATUS.ONGOING]: 1,
    [STATUS.AWAITING_NEXT_SEASON]: 2,
    [STATUS.FINISHED]: 3
  };

  if (a.status === STATUS.ONGOING && b.status === STATUS.ONGOING) {
    return compareByReleaseDate(a, b, order);
  }

  return order === SORT_ORDER.ASCENDING
    ? statusOrder[a.status] - statusOrder[b.status]
    : statusOrder[b.status] - statusOrder[a.status];
};

const compareByMangaStatus = (a, b, order) => {
  const statusOrder = {
    [STATUS.ONGOING]: 1,
    [STATUS.AWAITING_NEXT_SEASON]: 2,
    [STATUS.FINISHED]: 3
  };

  if (a.status === STATUS.ONGOING && b.status === STATUS.ONGOING) {
    return compareByLastReleaseDate(a, b, order);
  }

  return order === SORT_ORDER.ASCENDING
    ? statusOrder[a.status] - statusOrder[b.status]
    : statusOrder[b.status] - statusOrder[a.status];
};

const compareByReleaseDate = (a, b, order) => {
  const daysRemainingA = calculateDaysRemaining(a.next_episode_release_date);
  const daysRemainingB = calculateDaysRemaining(b.next_episode_release_date);
  return order === SORT_ORDER.ASCENDING
    ? daysRemainingA - daysRemainingB
    : daysRemainingB - daysRemainingA;
};

const compareByLastReleaseDate = (a, b, order) => {
  const daysRemainingA = calculateDaysElapsed(a.last_release_date);
  const daysRemainingB = calculateDaysElapsed(b.last_release_date);
  return order === SORT_ORDER.ASCENDING
    ? daysRemainingA - daysRemainingB
    : daysRemainingB - daysRemainingA;
};

const sortStrategies = {
  [SORT_CRITERIA.TITLE]: compareByTitle,
  [SORT_CRITERIA.RATING]: compareByRating,
  [SORT_CRITERIA.ANIME_STATUS]: compareByAnimeStatus,
  [SORT_CRITERIA.MANGA_STATUS]: compareByMangaStatus,
  [SORT_CRITERIA.LAST_RELEASE_DATE]: compareByLastReleaseDate,
  [SORT_CRITERIA.NEXT_RELEASE_DATE]: compareByReleaseDate
};

export const sortMedia = (medias, sortCriteria, sortOrder) => {
  const compareFunction = sortStrategies[sortCriteria];
  return [...medias].sort((a, b) => compareFunction(a, b, sortOrder));
};
