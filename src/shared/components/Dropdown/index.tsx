/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import useOnEscPress from 'shared/hooks/useOnEscPress';
import useIsMobileScreen from 'shared/hooks/useMobileScreen';
import Button from 'shared/components/Button';
import Caret from 'shared/svgs/Caret.svg';
import Menu from './Menu';
import { Props } from './types';

export default function Dropdown(
  props: Props & React.ComponentProps<typeof Button>,
) {
  const {
    btnContent,
    menuClassName,
    className = 'w-full',
    dataTestid,
    btnClassName,
    ...btnProps
  } = props;
  const el = useRef(null);
  const { isMobile } = useIsMobileScreen();
  const [isShown, setIsShown] = useState(false);
  useOnEscPress(() => setIsShown(false));

  const wrapperClass = classNames(
    'relative flex flex-col items-center m-auto',
    className,
  );
  const buttonClass = classNames(
    'p-0 text-xs font-normal text-sm flex items-center',
    btnClassName,
  );
  const iconClass = classNames(
    'w-2 h-2 fill-current ml-1',
    isShown && 'rotate-180',
  );

  return (
    <div className={wrapperClass} ref={el} id="dropdown-div">
      <Button
        color="white"
        data-testid={`${dataTestid}-btn`}
        className={buttonClass}
        onClick={(): void => setIsShown(v => !v)}
        aria-haspopup="true"
        aria-expanded={isShown}
        aria-labelledby="dropdown-div dropdown-btn"
        {...btnProps}
      >
        <>
          {btnContent}
          {!isMobile && <Caret className={iconClass} />}
        </>
      </Button>
      {isShown && (
        <Menu
          dropdownRef={el}
          onCollapse={(): void => setIsShown(false)}
          className={menuClassName}
          dataTestId={`${dataTestid}-ul`}
        >
          {props.children}
        </Menu>
      )}
    </div>
  );
}
