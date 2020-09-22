import {
  stringWithMaxChar,
  endsWithDot,
  removeTrailingSlash,
} from 'shared/utils/string';

describe('String utils', () => {
  describe('stringWithMaxChar()', () => {
    test('truncates & appends "..."', () => {
      const str = 'hello world';
      expect(stringWithMaxChar(str, 5)).toEqual('hello...');
      expect(stringWithMaxChar(str, 20)).toEqual(str);
    });

    test('returns non-string arguments', () => {
      expect(stringWithMaxChar(null)).toBeNull();
      expect(stringWithMaxChar(1)).toEqual(1);
    });
  });

  describe('endsWithDot()', () => {
    test('checks only the last char of string', () => {
      expect(endsWithDot('')).toBeFalsy();
      expect(endsWithDot('name')).toBeFalsy();
      expect(endsWithDot('.name')).toBeFalsy();
      expect(endsWithDot('.name.')).toBeTruthy();
      expect(endsWithDot('.')).toBeTruthy();
    });
    test('returns back non-string arguments', () => {
      expect(endsWithDot(null)).toBeNull();
      expect(endsWithDot(1)).toEqual(1);
    });
  });

  describe('removeTrailingSlash()', () => {
    test('returns back non-string arguments', () => {
      expect(removeTrailingSlash(null)).toBeNull();
      expect(removeTrailingSlash(1)).toEqual(1);
    });
    test('returns same string if it does not end with "/"', () => {
      expect(removeTrailingSlash('mustafa')).toBe('mustafa');
      expect(removeTrailingSlash('/some/path')).toBe('/some/path');
    });
    test('removes trailing "/"', () => {
      expect(removeTrailingSlash('/')).toBe('');
      expect(removeTrailingSlash('mustafa/')).toBe('mustafa');
      expect(removeTrailingSlash('/some/path/')).toBe('/some/path');
    });
  });
});
