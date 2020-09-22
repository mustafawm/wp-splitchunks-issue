import { renderHook } from '@testing-library/react-hooks';
import mockHttpClient from 'shared/services/api';
import useFetchOptions from 'shared/hooks/useFetchOptions';

const url = '/ref/some/where/';
const testOptions = [
  { label: 'item-1', value: 'item-1', priority: 0 },
  { label: 'item-2', value: 'item-2', priority: 1 },
];

describe('useFetchOptions()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('calls useApi fnc to fetch options', async () => {
    mockHttpClient.get.mockImplementation(() => Promise.resolve(testOptions));
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchOptions({
        url,
        labelKey: 'name',
        valueKey: 'guid',
      }),
    );
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.options).toHaveLength(2);
  });
});
