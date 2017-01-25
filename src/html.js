import AbstractSingleModifier from './abstract-single';

export default class HtmlModifier extends AbstractSingleModifier {
  constructor() {
    super();
    this._method = 'html';
  }

  html(value) {
    this._set(value);
  }
}
