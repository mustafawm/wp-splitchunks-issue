/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from 'shared/components/ErrorBoundary';

describe('<ErrorBoundary>', () => {
  beforeEach(() => {
    // when the error's thrown a bunch of console.errors are called even though
    // the error boundary handles the error. This makes the test output noisy,
    // so we'll mock out console.error
    jest.spyOn(console, 'error');
    console.error.mockImplementation(() => {});
  });
  afterEach(() => {
    console.error.mockRestore();
  });

  it(`Shows error message and refresh/logout options`, () => {
    const Throws = () => {
      throw new Error('Oh no!');
    };
    render(
      <ErrorBoundary>
        <Throws />
      </ErrorBoundary>,
    );
    expect(screen.getByTestId('refresh')).toBeVisible();
    expect(screen.getByTestId('logout')).toBeVisible();
  });
});
