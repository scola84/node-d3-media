import { bind, unbind } from '@scola/bind';

export default class AbstractModifier {
  constructor(selection, method) {
    this._selection = selection;
    this._method = method;

    this._query = null;
    this._matchers = {};
  }

  media(query) {
    this._query = query;

    if (!this._matchers[query]) {
      this._matchers[query] = this._matchers[query] || {};
      this._matchers[query] = window.matchMedia(query);
      this._bindMatcher(this._matchers[query], query);
    }

    return this;
  }

  start() {
    Object.keys(this._matchers).forEach((query) => this._change(query));
  }

  destroy() {
    Object.keys(this._matchers)
      .forEach((query) => this._unbindMatcher(this._matchers[query]));
  }

  _bindMatcher(matcher, query) {
    bind(this, matcher, null, this._change, query);
  }

  _unbindMatcher(matcher) {
    unbind(this, matcher, null, this._change);
  }
}
