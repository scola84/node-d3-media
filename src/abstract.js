export default class AbstractModifier {
  constructor(selection, method) {
    this._selection = selection;
    this._method = method;

    this._query = null;
    this._matchers = {};

    this._handleChange = (q) => this._change(q);
  }

  media(query) {
    this._query = query;

    if (!this._matchers[query]) {
      this._matchers[query] = this._matchers[query] || {};
      this._matchers[query] = window.matchMedia(query);
      this._bindMatcher(this._matchers[query]);
    }

    return this;
  }

  start() {
    Object.keys(this._matchers)
      .forEach((query) => this._change(this._matchers[query]));
  }

  destroy() {
    Object.keys(this._matchers)
      .forEach((query) => this._unbindMatcher(this._matchers[query]));
  }

  _bindMatcher(matcher) {
    matcher.addListener(this._handleChange);
  }

  _unbindMatcher(matcher) {
    matcher.removeListener(this._handleChange);
  }

  _change() {
    throw new Error('Not implemented');
  }
}
