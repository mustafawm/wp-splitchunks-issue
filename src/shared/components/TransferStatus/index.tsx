import React from 'react';
import { useTranslation } from 'react-i18next';
import { TransferStatus } from 'shared/types';
import SuccessIcon from 'shared/svgs/SuccessStatus.svg';
import PendingIcon from 'shared/svgs/PendingStatus.svg';
import RejectedIcon from 'shared/svgs/RejectedStatus.svg';
import UnknownIcon from 'shared/svgs/UnknownStatus.svg';

type Props = { status: TransferStatus };
let className = 'w-3 h-3 mr-1 ';

export default function TransferStatusBox(props: Props) {
  const { status } = props;
  const { t } = useTranslation();

  let Icon = UnknownIcon;
  let descriptionClass = ' ';
  if (status === TransferStatus.ReceiverAccepted) {
    Icon = SuccessIcon;
    descriptionClass += 'text-green-600';
  } else if (status === TransferStatus.PendingReceiver) {
    Icon = PendingIcon;
    descriptionClass += 'text-yellow-600';
  } else if (
    [TransferStatus.Discard, TransferStatus.ReceiverRejected].includes(status)
  ) {
    Icon = RejectedIcon;
    descriptionClass += 'text-red-600';
  } else if (status === TransferStatus.Publish) {
    Icon = UnknownIcon;
    className += 'text-blue-500 fill-current';
    descriptionClass += 'text-blue-600';
  }

  return (
    <span data-testid="transfer-status" className="flex items-center">
      <Icon className={className} />
      <span className={descriptionClass}>
        {t(`app.transferStatus.${status}`)}
      </span>
    </span>
  );
}
