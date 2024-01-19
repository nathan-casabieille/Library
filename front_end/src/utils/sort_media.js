import { SORT_CRITERIA, SORT_ORDER, STATUS } from 'Env';
import { calculateDaysRemaining, calculateDaysElapsed } from './date_utils';

const compareByTitle = (a, b) => {
  const titleA = a.title.trim().toLowerCase();
  const titleB = b.title.trim().toLowerCase();

  return titleA.localeCompare(titleB);
};

const compareByRating = (a, b) => {
  return a.rating - b.rating;
};

const compareByAnimeStatus = (a, b) => {
  const statusOrder = {
    [STATUS.ONGOING]: 1,
    [STATUS.AWAITING_NEXT_SEASON]: 2,
    [STATUS.FINISHED]: 3
  };

  if (a.status === STATUS.ONGOING && b.status === STATUS.ONGOING) {
    return compareByReleaseDate(a, b);
  }

  return statusOrder[a.status] - statusOrder[b.status];
};

const compareByMangaStatus = (a, b) => {
  const statusOrder = {
    [STATUS.ONGOING]: 1,
    [STATUS.FINISHED]: 2
  };

  if (a.status === STATUS.ONGOING && b.status === STATUS.ONGOING) {
    return compareByLastReleaseDate(a, b);
  }

  return statusOrder[a.status] - statusOrder[b.status];
};

const compareByReleaseDate = (a, b) => {
  const daysRemainingA = calculateDaysRemaining(a.next_episode_release_date);
  const daysRemainingB = calculateDaysRemaining(b.next_episode_release_date);
  return daysRemainingA - daysRemainingB;
};

const compareByLastReleaseDate = (a, b) => {
  const daysRemainingA = calculateDaysElapsed(a.last_release_date);
  const daysRemainingB = calculateDaysElapsed(b.last_release_date);
  return daysRemainingA - daysRemainingB;
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
  if (!Array.isArray(medias)) {
    return [];
  }

  const compareFunction = sortStrategies[sortCriteria];
  const sorted = [...medias].sort((a, b) => compareFunction(a, b, sortOrder));

  if (sortOrder === SORT_ORDER.DESCENDING) {
    return sorted.reverse();
  }

  return sorted;
};
