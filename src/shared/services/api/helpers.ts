/* eslint-disable no-param-reassign */
import { ErrResp } from 'shared/types';
import { ErrData } from './types';
/**
 * Server returns errors object with:
 * - keys: field names but with their first letter capitalized
 * - values: string[] of all the errors/violations for that field
 * This helper returns one big error string
 * TODO error-code => translation
 */
function extractFieldErrors(errors: Record<string, string[]>): string {
  if (!errors) {
    return '';
  }
  return Object.keys(errors).reduce(
    (errStr: string, fieldName?: string): string => {
      if (!fieldName) {
        fieldName = '';
      }
      errStr += errors[fieldName].join('. ');
      return errStr;
    },
    '',
  );
}

export function extractResponseError(
  data: ErrData,
  response: Response,
): ErrResp {
  const result = {
    status: data.status || response.status,
    code: data.code || undefined,
    message: response.statusText,
  };

  if (data.message) {
    result.message = data.message;
  } else if (data.errors) {
    result.message = extractFieldErrors(data.errors);
  } else if (data.title) {
    result.message = data.title;
  }

  return result;
}
