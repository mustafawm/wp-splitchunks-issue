/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPropertyVal } from 'shared/utils/object';
import { Option, Dictionary } from 'shared/types';

export function prepareFormater(
  labelKey: string,
  valueKey: string,
): (l: any[]) => Option[] {
  return function listFormater(options: any[]): Option[] {
    return options
      .map((opt: Dictionary) => ({
        label: getPropertyVal(labelKey, opt) as string,
        value: getPropertyVal(valueKey, opt) as string,
        priority: opt.priority,
      }))
      .sort((a: Option, b: Option): any =>
        a.priority && b.priority ? a.priority - b.priority : a,
      );
  };
}
