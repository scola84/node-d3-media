/*eslint no-invalid-this: "off"*/

import { local, select } from 'd3-selection';

export default class AbstractPair {
  constructor(selection, method) {
    this.selection = selection;
    this.method = method;

    this.cache = {};

    this.query = null;
    this.current = [];

    this.matchers = {};
    this.values = {};
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

  set(name, value) {
    this._save(name);
    this.values[this.query][name] = value;

    return this;
  }

  start() {
    Object.keys(this.matchers).forEach((key) => {
      this._change(key);
    });
  }

  _change(query) {
    const method = this.method;

    if (this.matchers[query].matches) {
      if (this.current.indexOf(query) > -1) {
        return this;
      }

      this.current.push(query);
    } else {
      if (this.current.indexOf(query) === -1) {
        return this;
      }

      this.current.splice(this.current.indexOf(query), 1);

      Object.keys(this.values[query]).forEach((name) => {
        const cache = this.cache[name];
        this.selection.each(function each() {
          select(this)[method](name, cache.get(this));
        });
      });
    }

    this.current.forEach((current) => {
      Object.keys(this.values[current]).forEach((name) => {
        this.selection[method](name, this.values[current][name]);
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
