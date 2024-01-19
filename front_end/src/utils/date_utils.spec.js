import { calculateDaysRemaining, calculateDaysElapsed } from './date_utils';

describe('Date Utils', () => {
  describe('calculateDaysRemaining', () => {
    it('should return the correct number of days remaining for a future date', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5); // Set to 5 days in the future
      expect(calculateDaysRemaining(futureDate)).toBe(5);
    });

    it('should return 0 if the date is today', () => {
      const today = new Date();
      expect(calculateDaysRemaining(today)).toBe(0);
    });

    it('should return a negative number for a past date', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 5); // Set to 5 days in the past
      expect(calculateDaysRemaining(pastDate)).toBeLessThan(0);
    });
  });

  describe('calculateDaysElapsed', () => {
    it('should return the correct number of days elapsed since a past date', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 5); // Set to 5 days in the past
      expect(calculateDaysElapsed(pastDate)).toBe(5);
    });

    it('should return 0 if the date is today', () => {
      const today = new Date();
      expect(calculateDaysElapsed(today)).toBe(0);
    });

    it('should return a negative number for a future date', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5); // Set to 5 days in the future
      expect(calculateDaysElapsed(futureDate)).toBeLessThan(0);
    });
  });
});
