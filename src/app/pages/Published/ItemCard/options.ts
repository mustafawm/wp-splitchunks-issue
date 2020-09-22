import { url } from 'shared/consts';
import { Svg, TransferProduct } from 'shared/types';
import { NavLinkTo } from 'shared/components/Button/types';
import Details from 'shared/svgs/Details.svg';
import History from 'shared/svgs/History.svg';
import Pencil from 'shared/svgs/Pencil.svg';
import Trash from 'shared/svgs/Trash.svg';

export type ActionOpt = {
  _key: 'hr' | 'update' | 'details' | 'trace' | 'cancel';
  display: string;
  Icon: Svg;
  url?(transfer: TransferProduct): NavLinkTo;
};

const options: ActionOpt[] = [
  {
    _key: 'details',
    display: 'common.details',
    Icon: Details,
  },
  {
    _key: 'trace',
    display: 'products.trace',
    Icon: History,
    url: transfer => ({
      to: `${url.web.trace}/${transfer.companyInventoryGuid}`,
    }),
  },
  {
    _key: 'hr',
    display: 'hr-divider',
    Icon: History,
  },
  {
    _key: 'update',
    display: 'common.update',
    Icon: Pencil,
    url: (transfer): NavLinkTo => {
      const pathname = `${url.web.products}/${transfer.companyInventoryGuid}/facilities/${transfer.receiverCompanyGuid}?transferGuid=${transfer.guid}`;

      return { to: pathname, state: { transfer } };
    },
  },
  {
    _key: 'cancel',
    display: 'common.cancel',
    Icon: Trash,
  },
];

export default options;
