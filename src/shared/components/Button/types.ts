import { ReactElement } from 'react';
import { NavLinkProps } from 'react-router-dom';
import { Button } from 'shared/types';

// https://reacttraining.com/react-router/web/api/Link/to-object
export type NavLinkTo = {
  to:
    | string
    | {
        pathname: string;
        search?: string;
        hash?: string;
      };
  state?: object;
};

export type Props = Pick<NavLinkProps, 'activeClassName' | 'end'> &
  Button & {
    text?: string;
    color?: 'green' | 'orange' | 'blue' | 'white' | 'red';
    loading?: boolean;
    href?: NavLinkTo;
    children?: null | ReactElement | ReactElement[];
    dataTestid?: string;
  };
