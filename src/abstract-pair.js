/*eslint no-invalid-this: "off"*/

import { local, select } from 'd3-selection';

export default class AbstractPair {
  constructor(selection, method) {
    this.selection = selection;
    this.method = method;

    this.query = null;
    this.matchers = {};
    this.values = {};
    this.cache = {};
  }

  media(query) {
    this.query = query;

    if (!this.matchers[query]) {
      this.matchers[query] = this.matchers[query] || {};
      this.matchers[query] = window.matchMedia(query);
      this.matchers[query].onchange = this._change.bind(this, query);

      this.values[query] = {};
    }

    return this;
  }

  start() {
    Object.keys(this.matchers).forEach((query) => {
      this._change(query);
    });
  }

  destroy() {
    Object.keys(this.matchers).forEach((query) => {
      this.matchers[query].onchange = null;
    });
  }

  _set(name, value) {
    this._save(name);
    this.values[this.query][name] = value;

    return this;
  }

  _change(currentQuery) {
    const method = this.method;

    if (!this.matchers[currentQuery].matches) {
      Object.keys(this.values[currentQuery]).forEach((name) => {
        const cache = this.cache[name];
        this.selection.each(function each() {
          select(this)[method](name, cache.get(this));
        });
      });
    }

    Object.keys(this.matchers).forEach((query) => {
      if (!this.matchers[query].matches) {
        return;
      }

      Object.keys(this.values[query]).forEach((name) => {
        this.selection[method](name, this.values[query][name]);
      });
    });

    return this;
  }

  _save(name) {
    if (this.cache[name]) {
      return;
    }

    this.cache[name] = local();

    const cache = this.cache[name];
    const method = this.method;

    this.selection.each(function each() {
      cache.set(this, select(this)[method](name));
    });
  }
}
