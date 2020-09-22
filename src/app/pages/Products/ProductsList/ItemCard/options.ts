import { url } from 'shared/consts';
import { InventoryPrdocut, Svg } from 'shared/types';
import { NavLinkTo } from 'shared/components/Button/types';
import Signin from 'shared/svgs/Signin.svg';
import Cart from 'shared/svgs/Cart.svg';
// import Paper from 'shared/svgs/Paper.svg';
import History from 'shared/svgs/History.svg';
import Pencil from 'shared/svgs/Pencil.svg';
import Trash from 'shared/svgs/Trash.svg';

export type OptKey =
  | 'send'
  | 'publish'
  | 'certify'
  | 'trace'
  | 'edit'
  | 'delete'
  | 'hr';
type ActionOpt = {
  _key: OptKey;
  display: string;
  href(product: InventoryPrdocut): NavLinkTo;
  Icon: Svg;
};

const options: ActionOpt[] = [
  {
    _key: 'send',
    display: 'products.sendToFacility',
    href: product => ({
      to: `${url.web.products}/${product.companyInventoryGuid}/facilities`,
      state: { product },
    }),
    Icon: Signin,
  },
  {
    _key: 'publish',
    display: 'products.publishToMarket',
    Icon: Cart,
    href: product => ({
      to: `${url.web.products}/${product.companyInventoryGuid}/publish`,
      state: { product },
    }),
  },
  // {
  //   _key: 'certify',
  //   display: 'products.certify',
  //   Icon: Paper,
  //   href: product => ({
  //     to: routes.certificates.replace(
  //       urlCompanyGuidParam,
  //       product.companyInventoryGuid,
  //     ),
  //   }),
  // },
  {
    _key: 'trace',
    display: 'products.trace',
    Icon: History,
    href: product => ({
      to: `${url.web.trace}/${product.companyInventoryGuid}`,
      state: { product },
    }),
  },
  {
    _key: 'hr',
    display: 'hr-divider',
    Icon: History,
    href: () => ({ to: 'bla' }),
  },
  {
    _key: 'edit',
    display: 'common.edit',
    Icon: Pencil,
    href: (product: InventoryPrdocut): NavLinkTo => ({
      to: `${url.web.products}/${product.companyInventoryGuid}/edit`,
      state: { product },
    }),
  },
  {
    _key: 'delete',
    display: 'common.delete',
    Icon: Trash,
    href: () => ({ to: '' }),
  },
];

export default options;
