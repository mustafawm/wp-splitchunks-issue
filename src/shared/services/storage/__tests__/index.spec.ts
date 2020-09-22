import storage from 'shared/services/storage';

const person = {
  name: 'Jane Doe',
  occupation: 'Civil Engineer',
};
const token = 'sometoken';

beforeAll(() => {
  storage.local.clear();
  storage.session.clear();
});
afterAll(() => {
  storage.local.clear();
  storage.session.clear();
});

describe('Local Storage', () => {
  test('stores, fetches and removes values', () => {
    expect(storage.local.getItem('obj')).toBeNull();
    expect(storage.local.getItem('str')).toBeNull();

    storage.local.setItem('obj', person);
    storage.local.setItem('str', token);

    expect(storage.local.getItem('obj')).toMatchObject(person);
    expect(storage.local.getItem('str')).toBe(token);

    storage.local.removeItem('obj');
    storage.local.removeItem('str');

    expect(storage.local.getItem('obj')).toBeNull();
    expect(storage.local.getItem('str')).toBeNull();
  });

  test('executes provided callbacks', () => {
    expect(storage.local.getItem('obj', () => 'nothing')).toBe('nothing');

    expect(storage.local.setItem('obj', person, () => 'done')).toBe('done');
    expect(storage.local.setItem('str', token, () => 'done')).toBe('done');

    const storageObj = storage.local.getItem('obj', (_, res) => res);
    expect(storageObj).toHaveProperty('createdAt');
    expect(storageObj).toHaveProperty('obj');
    expect(storageObj.obj).toMatchObject(person);

    const storageStr = storage.local.getItem('str', (_, res) => res);
    expect(storageStr).toHaveProperty('createdAt');
    expect(storageStr).toHaveProperty('str');
    expect(storageStr.str).toBe(token);

    expect(storage.local.removeItem('obj', () => 'deleted')).toBe('deleted');
    expect(storage.local.removeItem('str', () => 'gone')).toBe('gone');
  });
});

describe('Session Storage', () => {
  test('stores, fetches and removes values', () => {
    expect(storage.session.getItem('obj')).toBeNull();
    expect(storage.session.getItem('str')).toBeNull();

    storage.session.setItem('obj', person);
    storage.session.setItem('str', token);

    expect(storage.session.getItem('obj')).toMatchObject(person);
    expect(storage.session.getItem('str')).toBe(token);

    storage.session.removeItem('obj');
    storage.session.removeItem('str');

    expect(storage.session.getItem('obj')).toBeNull();
    expect(storage.session.getItem('str')).toBeNull();
  });

  test('executes provided callbacks', () => {
    expect(storage.session.getItem('obj', () => 'nothing')).toBe('nothing');

    expect(storage.session.setItem('obj', person, () => 'done')).toBe('done');
    expect(storage.session.setItem('str', token, () => 'done')).toBe('done');

    const storageObj = storage.session.getItem('obj', (_, res) => res);
    expect(storageObj).toHaveProperty('createdAt');
    expect(storageObj).toHaveProperty('obj');
    expect(storageObj.obj).toMatchObject(person);

    const storageStr = storage.session.getItem('str', (_, res) => res);
    expect(storageStr).toHaveProperty('createdAt');
    expect(storageStr).toHaveProperty('str');
    expect(storageStr.str).toBe(token);

    expect(storage.session.removeItem('obj', () => 'deleted')).toBe('deleted');
    expect(storage.session.removeItem('str', () => 'gone')).toBe('gone');
  });
});
