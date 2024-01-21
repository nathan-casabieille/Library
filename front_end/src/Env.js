export const API_URL = 'http://localhost:5000';

export const API_ROUTES = {
  ANIME: '/anime',
  MANGA: '/manga',
  UPLOADS: '/uploads'
};

export const MEDIA = {
  ANIME: 'Anime',
  MANGA: 'Manga'
};

export const STATUS = {
  FINISHED: 'finished',
  ONGOING: 'ongoing',
  AWAITING_NEXT_SEASON: 'awaiting next season',
  UNKNOWN: 'unknown'
};

export const GENRE = {
  SHONEN: 'shonen',
  SHOJO: 'shojo',
  SEINEN: 'seinen',
  JOSEI: 'josei'
};

export const RATING = {
  POOR: 1,
  BELOW_AVERAGE: 2,
  AVERAGE: 3,
  GOOD: 4,
  EXCELLENT: 5,
  EXCEPTIONAL: 6
};

export const SORT_CRITERIA = {
  TITLE: 'title',
  RATING: 'rating',
  ANIME_STATUS: 'anime_status',
  MANGA_STATUS: 'manga_status',
  NEXT_RELEASE_DATE: 'next_episode_release_date',
  LAST_RELEASE_DATE: 'last_release_date'
};

export const SORT_ORDER = {
  ASCENDING: 'asc',
  DESCENDING: 'desc'
};

export const TITLE_MAX_LENGTH = 56;
