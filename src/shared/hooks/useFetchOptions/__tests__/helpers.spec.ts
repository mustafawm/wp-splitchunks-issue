import { prepareFormater } from '../helpers';

const testOptions = [
  { name: 'item-1', value: 'item-1', priority: 0 },
  { name: 'item-2', value: 'item-2', priority: 1 },
];

describe('useFetchOptions() helpers', () => {
  test('format list as per provided label/value keys', () => {
    const formater = prepareFormater('name', 'guid');
    expect(typeof formater).toBe('function');
    const formatedOptions = formater(testOptions);
    expect(testOptions.length === formatedOptions.length).toBeTruthy();
    expect(formatedOptions[0]).toHaveProperty('label');
    expect(formatedOptions[0]).toHaveProperty('value');
    expect(formatedOptions[0]).toHaveProperty('priority');
  });
});
