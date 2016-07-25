export default class AbstractModifier {
  constructor(selection, method) {
    this._selection = selection;
    this._method = method;

    this._query = null;
    this._matchers = {};
    this._listeners = {};
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
    this._matchers[query].addListener(this._listeners[query]);
    delete this._listeners[query];
  }

  _change() {
    throw new Error('Not implemented');
  }
}
