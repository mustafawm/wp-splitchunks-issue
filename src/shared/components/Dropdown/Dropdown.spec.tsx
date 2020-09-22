import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import Dropdown from 'shared/components/Dropdown';

const Component = () => (
  <>
    <div id="modal-root" />
    <Dropdown btnContent="dropdow button" dataTestid="ddtest">
      <span>Item#1</span>
      <span>Item#2</span>
    </Dropdown>
  </>
);

describe('<Dropdown />', () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });
  });

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });

  test('<Dropdown />', () => {
    const { getByTestId, queryByText, rerender, container } = render(
      <Component />,
    );

    expect(queryByText('dropdow button')).not.toBeNull();
    expect(container.querySelector('ul')).toBeNull();
    fireEvent.click(getByTestId('ddtest-btn'));
    rerender(<Component />);
    expect(container.querySelector('ul')).not.toBeNull();
    expect(container.querySelector('ul')).toHaveTextContent(/item#1/i);
    expect(container.querySelector('ul')).toHaveTextContent(/item#2/i);
    fireEvent.click(getByTestId('ddtest-btn'));
    rerender(<Component />);
    expect(container.querySelector('ul')).toBeNull();
  });
});
