/*eslint no-invalid-this: "off"*/

import { local, select } from 'd3-selection';
import AbstractModifier from './abstract';

export default class AbstractSingleModifier extends AbstractModifier {
  constructor(selection, method) {
    super(selection, method);

    this._values = {};
    this._cache = local();

    this._save();
  }

  _set(value) {
    this._values[this._query] = value;
  }

  _change(current) {
    const method = this._method;

    if (!this._matchers[current.media].matches) {
      const cache = this._cache;
      this._selection.each(function each() {
        select(this)[method](cache.get(this));
      });
    }

    Object.keys(this._matchers).forEach((query) => {
      if (this._matchers[query].matches) {
        this._selection[method](this._values[query]);
      }
    });

    return this;
  }

  _save() {
    const cache = this._cache;
    const method = this._method;

    this._selection.each(function each() {
      cache.set(this, select(this)[method]());
    });
  }
}
