export default class AbstractModifier {
  constructor() {
    this._selection = null;
    this._method = null;
    this._query = null;
    this._matchers = {};
    this._listeners = {};
  }

  selection(value) {
    this._selection = value;
    return this;
  }

  media(query) {
    this._query = query;

    if (!this._matchers[query]) {
      this._matchers[query] = window.matchMedia(query);
      this._bindMatcher(query);
    }

    return this;
  }

  start() {
    Object.keys(this._matchers)
      .forEach((query) => this._change(query));
  }

  destroy() {
    Object.keys(this._matchers)
      .forEach((query) => this._unbindMatcher(query));
  }

  _bindMatcher(query) {
    this._listeners[query] = this._change.bind(this, query);
    this._matchers[query].addListener(this._listeners[query]);
  }

  _unbindMatcher(query) {
    this._matchers[query].removeListener(this._listeners[query]);
    delete this._listeners[query];
  }

  _change() {
    throw new Error('Not implemented');
  }
}
