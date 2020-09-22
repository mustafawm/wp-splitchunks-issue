import { ReactElement } from 'react';
import { Props as ModalProps } from 'shared/components/Modal/types';

export type SidePaneProps = {
  show: boolean;
  onToggle(): void;
  childClass?: string;
  children: ReactElement;
  position: 'right' | 'left';
} & Pick<ModalProps, 'showCloseBtn'>;
