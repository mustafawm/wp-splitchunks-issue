/* eslint-disable @typescript-eslint/no-explicit-any */
export function objLen(obj: object): number {
  return !obj || Array.isArray(obj) || typeof obj !== 'object'
    ? 0
    : Object.keys(obj).length;
}

export function getPropertyVal(
  propPath: string,
  obj: Record<string, any>,
): any {
  return propPath.split('.').reduce((acc, curKey) => acc && acc[curKey], obj);
}
