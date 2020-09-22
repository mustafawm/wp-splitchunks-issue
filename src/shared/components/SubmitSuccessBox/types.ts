import { ReactElement } from 'react';
import { NavLinkTo } from 'shared/components/Button/types';

export type Props = {
  message: string | ReactElement | ReactElement[];
  primaryBtnText: string;
  primaryHref: NavLinkTo;
  secondaryBtnText: string;
  secondaryHref: NavLinkTo;
};
