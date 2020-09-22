import { objLen } from 'shared/utils/object';

describe('Object utils', () => {
  test('objLen() returns length', () => {
    expect(objLen({ a: 1, b: 0, c: 3 })).toBe(3);
    expect(objLen({})).toBe(0);
  });

  test('objLen() returns 0 for non-objects', () => {
    expect(objLen([])).toBe(0);
    expect(objLen(null)).toBe(0);
    expect(objLen(undefined)).toBe(0);
  });
});
