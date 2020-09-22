import { Ref, Input } from 'shared/types';

export type Props = {
  onSearch?(): void;
  onCancel?(): void;
  triggerOnEnter?: boolean;
  inputRef?: Ref;
} & Input;
