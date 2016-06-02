/*eslint no-invalid-this: "off"*/

import { local, select } from 'd3-selection';

export default class AbstractPair {
  constructor(selection, method) {
    this.selection = selection;
    this.method = method;
    this.cache = {};

    this.query = null;
    this.count = 0;

    this.matchers = {};
    this.values = {};

    this.update = {};
    this.remove = [];
    this.changed = 0;
  }

  media(query) {
    this.query = query;

    if (!this.matchers[query]) {
      this.matchers[query] = this.matchers[query] || {};
      this.matchers[query] = window.matchMedia(query);
      this.matchers[query].onchange = this._change.bind(this, query);

      this.values[query] = {};
      this.count += 1;
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
    const matcher = this.matchers[query];
    const method = this.method;

    this.changed += 1;

    if (matcher.matches) {
      Object.keys(this.values[query]).forEach((name) => {
        this.update[name] = this.values[query][name];
      });
    } else {
      Object.keys(this.values[query]).forEach((name) => {
        this.remove.push(name);
      });
    }

    if (this.changed === this.count) {
      Object.keys(this.update).forEach((name) => {
        this.remove.splice(this.remove.indexOf(name), 1);
        this.selection[method](name, this.update[name]);
      });

      this.remove.forEach((name) => {
        const cache = this.cache[name];
        this.selection.each(function each() {
          select(this)[method](name, cache.get(this));
        });
      });

      this.changed = null;
      this.update = {};
      this.remove = [];
    }

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
