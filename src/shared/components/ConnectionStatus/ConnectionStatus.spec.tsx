import React from 'react';
import { render } from '@testing-library/react';
import StatusConnectoin from 'shared/components/ConnectionStatus';

const msg = 'connection lost';

describe('<BrowserStatusConnection />', () => {
  beforeEach(jest.restoreAllMocks);
  afterEach(jest.restoreAllMocks);

  test('Renders message when offline', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false);
    const { queryByRole } = render(<StatusConnectoin message={msg} />);
    expect(queryByRole('alert')).not.toBeNull();
    expect(queryByRole('alert')).toHaveTextContent(msg);
  });

  test('Does not render message when online', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(true);
    const { queryByRole } = render(<StatusConnectoin message={msg} />);
    expect(queryByRole('alert')).toBeNull();
  });
});
