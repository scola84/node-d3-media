/*eslint no-invalid-this: "off"*/

import { local } from 'd3';
import AbstractPairModifier from './abstract-pair';

export default class StyleModifier extends AbstractPairModifier {
  constructor() {
    super();
    this._method = 'style';
  }

  style(name, value) {
    this._set(name, value);
  }

  styles(value) {
    Object.keys(value).forEach((name) => {
      this._set(name, value[name]);
    });
  }

  _save(name) {
    if (typeof this._cache[name] !== 'undefined') {
      return;
    }

    this._cache[name] = local();
    const cache = this._cache[name];

    this._selection.each(function each() {
      cache.set(this, this.style[name]);
    });
  }
}
