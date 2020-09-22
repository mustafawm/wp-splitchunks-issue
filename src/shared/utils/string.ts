/* eslint-disable @typescript-eslint/no-explicit-any */
export function stringWithMaxChar(s: string, len = 40): string {
  if (typeof s !== 'string') {
    return s;
  }
  return s.length > len ? `${s.trim().slice(0, len)}...` : s;
}

/**
 * checks if string provided ends with "."
 * @param str
 */
export function endsWithDot(str = ''): boolean {
  if (typeof str !== 'string') {
    return str;
  }
  return /\.$/.test(str);
}

export function getDatePart(
  dateTime: string | any,
  seperator = '-',
): string | any {
  return typeof dateTime === 'string'
    ? dateTime.split('T')[0].split('-').reverse().join(seperator)
    : dateTime;
}

export function removeTrailingSlash(str: string): string {
  if (typeof str !== 'string') {
    return str;
  }
  if (!str.endsWith('/')) {
    return str;
  }
  return str.replace(/\/$/, '');
}
