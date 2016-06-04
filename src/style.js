/*eslint no-invalid-this: "off"*/

import { local } from 'd3-selection';
import Abstract from './abstract-pair';

export default class Style extends Abstract {
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
    if (this.cache[name]) {
      return;
    }

    this.cache[name] = local();
    const cache = this.cache[name];

    this.selection.each(function each() {
      cache.set(this, this.style[name]);
    });
  }
}
