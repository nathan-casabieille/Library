import { SORT_CRITERIA, SORT_ORDER, STATUS } from 'Env';
import { sortMedia } from './sort_media';

const mockAnimes = [
  {
    title: 'Oshi no Ko',
    rating: '5',
    status: STATUS.AWAITING_NEXT_SEASON,
    season: '2',
    episode: 0,
    next_episode_release_date: ''
  },
  {
    title: 'Spy x Family',
    rating: '4',
    status: STATUS.AWAITING_NEXT_SEASON,
    season: '3',
    episode: 0,
    next_episode_release_date: ''
  },
  {
    title: 'Dungeon Meshi',
    rating: '4',
    status: STATUS.ONGOING,
    season: '1',
    episode: '4',
    next_episode_release_date: '2024-01-25'
  },
  {
    title: 'Sousou no Frieren',
    rating: '6',
    status: STATUS.ONGOING,
    season: '1',
    episode: '19',
    next_episode_release_date: '2024-01-19'
  },
  {
    title: 'Cowboy Bebop',
    rating: '6',
    status: STATUS.FINISHED,
    season: 0,
    episode: 0,
    next_episode_release_date: ''
  },
  {
    title: 'Great Teacher Onizuka',
    rating: '6',
    status: STATUS.FINISHED,
    season: 0,
    episode: 0,
    next_episode_release_date: ''
  }
];

describe('sortMedia', () => {
  describe('Error handling', () => {
    it('should handle null input gracefully', () => {
      expect(() => sortMedia(null, SORT_CRITERIA.TITLE, SORT_ORDER.ASCENDING)).not.toThrow();
      expect(sortMedia(null, SORT_CRITERIA.TITLE, SORT_ORDER.ASCENDING)).toEqual([]);
    });
    it('should handle empty array input', () => {
      expect(() => sortMedia([], SORT_CRITERIA.TITLE, SORT_ORDER.ASCENDING)).not.toThrow();
      expect(sortMedia([], SORT_CRITERIA.TITLE, SORT_ORDER.ASCENDING)).toEqual([]);
    });
  });

  describe('Sorting by Title', () => {
    it('should sort media by title in ascending order', () => {
      const expectedTitles = [
        'Cowboy Bebop',
        'Dungeon Meshi',
        'Great Teacher Onizuka',
        'Oshi no Ko',
        'Sousou no Frieren',
        'Spy x Family'
      ];

      const sorted = sortMedia(mockAnimes, SORT_CRITERIA.TITLE, SORT_ORDER.ASCENDING);

      expectedTitles.forEach((title, index) => {
        expect(sorted[index].title).toBe(title);
      });
    });

    it('should sort media by title in descending order', () => {
      const expectedTitlesDescending = [
        'Spy x Family',
        'Sousou no Frieren',
        'Oshi no Ko',
        'Great Teacher Onizuka',
        'Dungeon Meshi',
        'Cowboy Bebop'
      ];

      const sorted = sortMedia(mockAnimes, SORT_CRITERIA.TITLE, SORT_ORDER.DESCENDING);

      expectedTitlesDescending.forEach((title, index) => {
        expect(sorted[index].title).toBe(title);
      });
    });
  });

  describe('Sorting by Rating', () => {
    it('should sort media by rating in ascending order', () => {
      const expectedRatingsAscending = ['4', '4', '5', '6', '6', '6'];

      const sorted = sortMedia(mockAnimes, SORT_CRITERIA.RATING, SORT_ORDER.ASCENDING);

      expectedRatingsAscending.forEach((rating, index) => {
        expect(sorted[index].rating).toBe(rating);
      });
    });

    it('should sort media by rating in descending order', () => {
      const expectedRatingsDescending = ['6', '6', '6', '5', '4', '4'];

      const sorted = sortMedia(mockAnimes, SORT_CRITERIA.RATING, SORT_ORDER.DESCENDING);

      expectedRatingsDescending.forEach((rating, index) => {
        expect(sorted[index].rating).toBe(rating);
      });
    });
  });

  describe('Sorting by Anime Status', () => {
    it('should sort media by anime status in ascending order', () => {
      const expectedTitlesDescending = [
        'Sousou no Frieren',
        'Dungeon Meshi',
        'Oshi no Ko',
        'Spy x Family',
        'Cowboy Bebop',
        'Great Teacher Onizuka'
      ];

      const sorted = sortMedia(mockAnimes, SORT_CRITERIA.ANIME_STATUS, SORT_ORDER.ASCENDING);

      expectedTitlesDescending.forEach((title, index) => {
        expect(sorted[index].title).toBe(title);
      });
    });

    it('should sort media by anime status in descending order', () => {
      const expectedTitlesDescending = [
        'Great Teacher Onizuka',
        'Cowboy Bebop',
        'Spy x Family',
        'Oshi no Ko',
        'Dungeon Meshi',
        'Sousou no Frieren'
      ];

      const sorted = sortMedia(mockAnimes, SORT_CRITERIA.ANIME_STATUS, SORT_ORDER.DESCENDING);

      expectedTitlesDescending.forEach((title, index) => {
        expect(sorted[index].title).toBe(title);
      });
    });
  });
});
