/* eslint prefer-reflect: "off" */

export default class Call {
  constructor(selection) {
    this.selection = selection;

    this.query = null;

    this.matchers = {};
    this.fns = {};
  }

  media(query) {
    this.query = query;

    if (!this.matchers[query]) {
      this.matchers[query] = this.matchers[query] || {};
      this.matchers[query] = window.matchMedia(query);
      this.matchers[query].addListener(this._change.bind(this, query));
    }

    return this;
  }

  call(...args) {
    this.fns[this.query] = args;
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

  _change(query) {
    if (this.matchers[query].matches) {
      this.selection.call(...this.fns[query]);
    }
  }
}
