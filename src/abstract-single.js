/*eslint no-invalid-this: "off"*/

import { local, select } from 'd3-selection';

export default class AbstractSingle {
  constructor(selection, method) {
    this.selection = selection;
    this.method = method;

    this.cache = local();

    this.query = null;
    this.current = [];

    this.matchers = {};
    this.values = {};

    this._save();
  }

  media(query) {
    this.query = query;

    if (!this.matchers[query]) {
      this.matchers[query] = this.matchers[query] || {};
      this.matchers[query] = window.matchMedia(query);
      this.matchers[query].onchange = this._change.bind(this, query);

      this.values[query] = null;
      this.count += 1;
    }

    return this;
  }

  set(value) {
    this.values[this.query] = value;
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

      const cache = this.cache;
      this.selection.each(function each() {
        select(this)[method](cache.get(this));
      });
    }

    this.current.forEach((current) => {
      this.selection[method](this.values[current]);
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
