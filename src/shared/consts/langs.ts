// TODO
import { Language } from 'shared/types';

type Languages = {
  label: string;
  value: Language;
}[];

const languages: Languages = [
  {
    label: 'EN',
    value: Language.en,
  },
  {
    label: 'TH',
    value: Language.th,
  },
];

export default languages;
