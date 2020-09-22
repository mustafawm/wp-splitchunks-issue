import { Dictionary } from 'shared/types';

export function readQueryParam(name: string): string | undefined {
  const params = new URLSearchParams(window.location.search);
  const value = params.get(name);

  if (!value) {
    return undefined;
  }
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}

export function parseQueryStringParams(): Dictionary {
  const params = new URLSearchParams(window.location.search);
  const entries = params.entries();
  const object: Dictionary = {};

  for (const [key, value] of entries) {
    try {
      object[key] = JSON.parse(value);
    } catch (e) {
      object[key] = value;
    }
  }
  return object;
}
