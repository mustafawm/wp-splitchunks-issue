import React, { useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { stopPropagation } from 'shared/utils/ui';
import Button from 'shared/components/Button';
import useOnEscPress from 'shared/hooks/useOnEscPress';
import useLockBodyScroll from 'shared/hooks/useLockBodyScroll';
import { Props } from './types';

const modalRoot = document.getElementById('modal-root');

export default function Modal(props: Props) {
  const {
    onClose,
    children,
    childClass,
    wrapperClass,
    showCloseBtn = false,
  } = props;
  const ref = useRef(null);
  useLockBodyScroll();
  useOnEscPress(onClose);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const onOverlayClick = useCallback(evt => {
    stopPropagation(evt);
    onClose && onClose();
  }, []);

  const containerClass = classNames('utl-modal', wrapperClass);
  const contentClass = classNames(
    'relative max-h-screen border-t border-gray-100 shadow-lg bg-ice',
    'focus:outline-none focus:shadow-outline',
    'overflow-y-auto cursor-default overscroll-contain',
    childClass,
  );

  return ReactDOM.createPortal(
    <div
      role="button"
      tabIndex={0}
      className={containerClass}
      onClick={onOverlayClick}
      onKeyPress={onOverlayClick}
    >
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        className={contentClass}
        onClick={stopPropagation}
        onKeyPress={stopPropagation}
      >
        {showCloseBtn && (
          <Button
            text="X"
            color="white"
            onClick={onClose}
            className="absolute top-0 right-0 mt-1 mr-2 text-lg sm:text-2xl shadow-none text-gray-700"
          />
        )}
        {children}
      </div>
    </div>,
    modalRoot as Element,
  );
}
