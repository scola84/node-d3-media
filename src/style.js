/*eslint no-invalid-this: "off"*/

import { local } from 'd3-selection';
import AbstractPairModifier from './abstract-pair';

export default class StyleModifier extends AbstractPairModifier {
  constructor(selection) {
    super(selection, 'style');
  }

  style(name, value) {
    this._set(name, value);
  }

  styles(styles) {
    Object.keys(styles).forEach((name) => {
      this._set(name, styles[name]);
    });
  }

  _save(name) {
    if (this._cache[name]) {
      return;
    }

    this._cache[name] = local();
    const cache = this._cache[name];

    this._selection.each(function each() {
      cache.set(this, this.style[name]);
    });
  }
}
