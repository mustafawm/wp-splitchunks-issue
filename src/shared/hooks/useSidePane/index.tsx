/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, ReactElement, useCallback } from 'react';
import SidePanel from './SidePane';
import { SidePaneProps } from './types';

export default function useSidePane(): {
  SidePane: (p: Partial<SidePaneProps>) => ReactElement | null;
  toggle(): void;
  isShown: boolean;
} {
  const [isShown, setIsShown] = useState(false);
  const toggle = useCallback(() => setIsShown(prev => !prev), []);

  const SidePane = (props: Partial<SidePaneProps>) =>
    isShown ? (
      <SidePanel show={isShown} position="right" onToggle={toggle} {...props}>
        {props.children as ReactElement}
      </SidePanel>
    ) : null;

  return { SidePane, toggle, isShown };
}
