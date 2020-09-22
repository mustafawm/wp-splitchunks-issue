/* eslint-disable no-console */
import { till } from 'shared/utils/api';

export async function shareProduct(productName?: string) {
  const shareData = {
    title: '__appUP product trace data',
    text: `__appUP product: ${productName}`,
    url: window.location.toString(),
  };
  const [err] = await till(navigator.share(shareData));
  console.assert(!err, err);
}
