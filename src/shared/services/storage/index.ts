/* eslint no-console:0 */
import { prepareToStore, prepareToReturn } from './utils';
import { storageType, valueInType, valueOutType, errorType } from './types';

class Storage {
  private type: storageType;

  constructor(type: storageType) {
    this.type = type;
  }

  setItem(
    key: string,
    value: valueInType,
    cb?: (err?: errorType) => void,
  ): void | boolean {
    try {
      window[this.type].setItem(key, prepareToStore(key, value));
      return cb ? cb() : true;
    } catch (error) {
      return cb ? cb(error) : false;
    }
  }

  getItem(
    key: string,
    cb?: (err?: errorType, res?: valueOutType) => void,
  ): valueOutType | void {
    try {
      const storedString = window[this.type].getItem(key);
      if (!storedString) {
        return cb ? cb(null, storedString) : null;
      }

      let result;
      try {
        result = JSON.parse(storedString);
      } catch (parsingErr) {
        // stored value is a string so it can't be JSON.parsed!
        // should NOT happen if the value was stored via this wrapper
        // hence we're console.erroring to debug/report such scenarios
        console.error('Error parsing stored value for ', key);
        result = storedString;
      }
      return cb ? cb(null, result) : prepareToReturn(result[key] || result);
    } catch (error) {
      return cb ? cb(error) : null;
    }
  }

  removeItem(key: string, cb?: (err?: errorType) => void): void | boolean {
    try {
      window[this.type].removeItem(key);
      return cb ? cb() : true;
    } catch (error) {
      return cb ? cb(error) : false;
    }
  }

  clear(): void {
    window[this.type].clear();
  }
}

export default {
  local: new Storage('localStorage'),
  session: new Storage('sessionStorage'),
};
