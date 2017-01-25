/*eslint no-invalid-this: "off"*/

import { local, select } from 'd3-selection';
import AbstractModifier from './abstract';

export default class AbstractPairModifier extends AbstractModifier {
  constructor() {
    super();

    this._values = {};
    this._cache = {};
  }

  _set(name, value) {
    this._save(name);
    this._values[this._query] = this._values[this._query] || {};
    this._values[this._query][name] = value;

    return this;
  }

  _change(current) {
    const method = this._method;

    if (!this._matchers[current].matches) {
      Object.keys(this._values[current]).forEach((name) => {
        const cache = this._cache[name];
        this._selection.each(function each() {
          select(this)[method](name, cache.get(this));
        });
      });
    }

    Object.keys(this._matchers).forEach((query) => {
      if (!this._matchers[query].matches) {
        return;
      }

      Object.keys(this._values[query]).forEach((name) => {
        this._selection[method](name, this._values[query][name]);
      });
    });

    return this;
  }

  _save(name) {
    if (this._cache[name]) {
      return;
    }

    this._cache[name] = local();

    const cache = this._cache[name];
    const method = this._method;

    this._selection.each(function each() {
      cache.set(this, select(this)[method](name));
    });
  }
}
