import { url } from 'shared/consts';
import Home from 'shared/svgs/Home.svg';
import ShoppingCart from 'shared/svgs/ShoppingCart.svg';
import Incoming from 'shared/svgs/Incoming.svg';
import Person from 'shared/svgs/Person.svg';

export default [
  {
    name: 'products',
    display: 'navigation.products.display',
    Icon: Home,
    link: url.web.products,
  },
  {
    name: 'published',
    display: 'navigation.published.display',
    Icon: ShoppingCart,
    link: url.web.published,
  },
  {
    name: 'requests',
    display: 'navigation.requests.display',
    Icon: Incoming,
    link: url.web.requests,
  },
];

export const profileRoute = {
  name: 'profile',
  display: 'common.profile',
  Icon: Person,
  link: url.web.profile,
};
