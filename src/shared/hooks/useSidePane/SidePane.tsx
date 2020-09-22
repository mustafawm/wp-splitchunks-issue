import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import Modal from 'shared/components/Modal';
import { SidePaneProps as Props } from './types';
import './styles.css';

export default function SidePane(props: Props) {
  const {
    show,
    onToggle,
    children,
    position,
    childClass,
    showCloseBtn,
  } = props;
  const [slieClass, setSlideClass] = useState<'slide-in' | 'slide-out'>(
    show ? 'slide-in' : 'slide-out',
  );

  const modalClass = classNames(
    'flex-row transition',
    position === 'left' ? 'justify-start' : 'justify-end',
  );
  const contentClass = classNames(childClass, slieClass);
  const onClose = useCallback(() => {
    // 1. animate sidepane
    setSlideClass('slide-out');
    // 2. trigger onToggle after animation-duration (./styles.css)
    setTimeout(onToggle, 300);
  }, []);

  return (
    <Modal
      showCloseBtn={showCloseBtn}
      onClose={onClose}
      childClass={contentClass}
      wrapperClass={modalClass}
    >
      {children}
    </Modal>
  );
}
