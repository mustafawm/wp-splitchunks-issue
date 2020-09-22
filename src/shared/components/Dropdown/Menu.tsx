/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, ReactElement } from 'react';
import classNames from 'classnames';
import { Ref, Div } from 'shared/types';
import Modal from 'shared/components/Modal';
import useMobileScreen from 'shared/hooks/useMobileScreen';
import useOnClickOutside from 'shared/hooks/useOnClickOutside';

type Props = {
  dropdownRef: Ref;
  onCollapse(): void;
  children: any;
  dataTestId?: string;
} & Div;

function wrapElement(element: ReactElement, hideMenu: () => void) {
  if (!element) {
    return null;
  }
  if (element.type === 'hr') {
    return <div className="w-full border-t border-gray-300" />;
  }

  const handleItemClick = (): void => {
    if (typeof element.props?.onClick === 'function') {
      element.props.onClick();
    }
    hideMenu();
  };
  const itemClass = classNames('utl-dropdown-item', element.props.className);

  return (
    <li className="w-full inline-block text-center cursor-pointer hover:bg-gray-100 py-2 md:py-0">
      <element.type
        {...element.props}
        className={itemClass}
        onClick={handleItemClick}
      />
    </li>
  );
}

export default function DropdownMenu(props: Props): ReactElement {
  const {
    className = '',
    onCollapse,
    dropdownRef,
    children,
    dataTestId,
  } = props;
  const hideDropdown = useCallback(onCollapse, []);
  const { isMobile } = useMobileScreen();
  useOnClickOutside(dropdownRef, () => {
    if (!isMobile) {
      hideDropdown();
    }
  });

  const itemsList = (
    <ul
      data-testid={`${dataTestId}`}
      className={`${
        !isMobile
          ? 'absolute py-1 mt-8 flex flex-col items-center self-center z-20 bg-white shadow w-11/12 minwidth'
          : ''
      } ${className}`}
    >
      {React.Children.map(children, El => wrapElement(El, hideDropdown))}
    </ul>
  );

  if (isMobile) {
    return (
      <Modal
        childClass="w-full max-w-sm"
        wrapperClass="w-full flex justify-center items-center"
        onClose={hideDropdown}
      >
        {itemsList}
      </Modal>
    );
  }
  return itemsList;
}
