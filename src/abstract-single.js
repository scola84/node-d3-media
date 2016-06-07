/*eslint no-invalid-this: "off"*/

import { local, select } from 'd3-selection';

export default class AbstractSingle {
  constructor(selection, method) {
    this.selection = selection;
    this.method = method;

    this.query = null;
    this.matchers = {};
    this.values = {};
    this.cache = local();

    this._save();
  }

  media(query) {
    this.query = query;

    if (!this.matchers[query]) {
      this.matchers[query] = this.matchers[query] || {};
      this.matchers[query] = window.matchMedia(query);
      this.matchers[query].addListener(this._change.bind(this, query));

      this.values[query] = null;
    }

    return this;
  }

  start() {
    Object.keys(this.matchers).forEach((key) => {
      this._change(key);
    });
  }

  destroy() {
    Object.keys(this.matchers).forEach((query) => {
      this.matchers[query].onchange = null;
    });
  }

  _set(value) {
    this.values[this.query] = value;
  }

  _change(currentQuery) {
    const method = this.method;

    if (!this.matchers[currentQuery].matches) {
      const cache = this.cache;
      this.selection.each(function each() {
        select(this)[method](cache.get(this));
      });
    }

    Object.keys(this.matchers).forEach((query) => {
      if (this.matchers[query].matches) {
        this.selection[method](this.values[query]);
      }
    });

    return this;
  }

  _save() {
    const cache = this.cache;
    const method = this.method;

    this.selection.each(function each() {
      cache.set(this, select(this)[method]());
    });
  }
}
