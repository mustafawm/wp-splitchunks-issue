import { isDecimal } from 'shared/utils/number';

describe('Number utils', () => {
  describe('isDecimal()', () => {
    test('returns TRUE for integers', () => {
      expect(isDecimal(104)).toBeTruthy();
      expect(isDecimal('74')).toBeTruthy();
    });

    test('returns TRUE for integers with up to 2 decimal figures', () => {
      expect(isDecimal(4.5)).toBeTruthy();
      expect(isDecimal(34.01)).toBeTruthy();
      expect(isDecimal('4.97')).toBeTruthy();
    });

    test('returns FALSE for non numbers or numbers with more than 2 decimal figures', () => {
      expect(isDecimal('mustafa')).toBeFalsy();
      expect(isDecimal(4.504)).toBeFalsy();
      expect(isDecimal('4.0001')).toBeFalsy();
    });
  });
});
