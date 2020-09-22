import { renderHook } from '@testing-library/react-hooks';
import usePageTitle from 'shared/hooks/usePageTitle';

const TITLE = 'TEST_TITLE';

describe('usePageTitle()', () => {
  test('sets page title properly', () => {
    expect(document.title).toBe('');
    const { unmount } = renderHook(() => usePageTitle(TITLE));
    expect(document.title).toContain(TITLE);
    unmount();
    expect(document.title).not.toContain(TITLE);
  });
});
