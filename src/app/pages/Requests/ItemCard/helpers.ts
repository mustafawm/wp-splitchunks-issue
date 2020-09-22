import { TransferProduct, TransferStatus } from 'shared/types';
import { ActionOpt } from './options';

export function shouldDisableBtn(
  opt: ActionOpt,
  transfer: TransferProduct,
): boolean {
  switch (opt._key) {
    case 'accept':
    case 'reject':
      return !(transfer.status === TransferStatus.PendingReceiver);
    case 'details':
    default:
      return true;
  }
}
