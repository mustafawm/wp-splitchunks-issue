/**
 * Util to handle promises in an error-first fashion
 * example: const [err, res] = await till(func that returns promise);
 * @param promise
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function till(promise: Promise<any>): Promise<any[]> {
  return promise.then(data => [null, data]).catch(err => [err, null]);
}
