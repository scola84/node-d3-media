/*eslint no-invalid-this: "off"*/

import { local, select } from 'd3-selection';

export default class AbstractSingle {
  constructor(selection, method) {
    this.selection = selection;
    this.method = method;
    this.cache = local();

    this.query = null;
    this.count = 0;

    this.matchers = {};
    this.values = {};

    this.update = null;
    this.changed = 0;

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
    const matcher = this.matchers[query];

    this.changed += 1;

    if (matcher.matches) {
      this.update = this.values[query];
    }

    if (this.changed === this.count) {
      if (this.update) {
        this.selection[method](this.update);
        this.update = null;
      } else {
        const cache = this.cache;
        this.selection.each(function each() {
          select(this)[method](cache.get(this));
        });
      }

      this.changed = 0;
    }

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
