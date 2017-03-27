/* eslint prefer-reflect: "off" */

import AbstractModifier from './abstract';

export default class CallModifier extends AbstractModifier {
  constructor() {
    super();
    this._fns = {};
  }

  call(...args) {
    this._fns[this._query] = args;
  }

  _change(current) {
    if (this._matchers[current].matches === true) {
      this._selection.call(...this._fns[current]);
    }
  }
}
