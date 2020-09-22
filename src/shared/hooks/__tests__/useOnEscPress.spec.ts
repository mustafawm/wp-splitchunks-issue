import { renderHook } from '@testing-library/react-hooks';
import useOnEscPress from 'shared/hooks/useOnEscPress';
import { objLen } from 'shared/utils/object';
import { Dictionary } from 'shared/types';

const documentEvents: Dictionary = {};

document.addEventListener = jest.fn((evt, cb) => {
  documentEvents[evt] = cb;
});
document.removeEventListener = jest.fn(evt => {
  delete documentEvents[evt];
});

test('useOnEscPress()', () => {
  jest.useFakeTimers();
  expect(objLen(documentEvents)).toBe(0);

  const cb = jest.fn();
  const { unmount } = renderHook(() => useOnEscPress(cb));
  expect(objLen(documentEvents)).toBe(1);
  expect(documentEvents).toHaveProperty('keydown');
  unmount();
  expect(objLen(documentEvents)).toBe(0);
  expect(documentEvents).not.toHaveProperty('keydown');
});
