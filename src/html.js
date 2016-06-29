import AbstractSingleModifier from './abstract-single';

export default class HtmlModifier extends AbstractSingleModifier {
  constructor(selection) {
    super(selection, 'html');
  }

  html(value) {
    this._set(value);
  }
}
