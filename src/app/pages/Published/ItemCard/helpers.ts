import { TransferProduct, TransferStatus } from 'shared/types';
import { ActionOpt } from './options';

export function shouldDisableBtn(
  opt: ActionOpt,
  transfer: TransferProduct,
): boolean {
  switch (opt._key) {
    case 'cancel':
      return !(
        transfer.status === TransferStatus.PendingReceiver ||
        transfer.status === TransferStatus.Publish
      );
    case 'update':
      return ![
        TransferStatus.PendingReceiver,
        TransferStatus.SenderCancelled,
      ].includes(transfer.status);
    case 'trace':
    case 'details':
      return false;
    default:
      return true;
  }
}
