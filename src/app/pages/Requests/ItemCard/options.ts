import { Svg, TransferProduct } from 'shared/types';
import { NavLinkTo } from 'shared/components/Button/types';
import Details from 'shared/svgs/Details.svg';
import Accept from 'shared/svgs/SuccessStatus.svg';
import Reject from 'shared/svgs/RejectedStatus.svg';
import { url } from 'shared/consts';

export type ActionOpt = {
  _key: 'accept' | 'reject' | 'details';
  display: string;
  Icon: Svg;
  url?(transfer: TransferProduct): NavLinkTo;
};

const options: ActionOpt[] = [
  {
    _key: 'accept',
    display: 'common.accept',
    Icon: Accept,
    url: (transfer): NavLinkTo => ({
      to: `${url.web.requests}/${transfer.guid}`,
      state: { transfer },
    }),
  },
  {
    _key: 'reject',
    display: 'common.reject',
    Icon: Reject,
  },
  {
    _key: 'details',
    display: 'common.details',
    Icon: Details,
  },
];

export default options;
