import {
  RefObject,
  InputHTMLAttributes,
  HTMLAttributes,
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  ReactElement,
  FunctionComponent,
  SVGAttributes,
} from 'react';

export type Ref = RefObject<HTMLInputElement>;

export type Input = InputHTMLAttributes<HTMLInputElement>;

export type Div = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type Button = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type Children = {
  children?: ReactElement | ReactElement[] | string | null;
};

export type Svg = FunctionComponent<SVGAttributes<SVGElement>>;
