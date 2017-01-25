import AbstractSingleModifier from './abstract-single';

export default class TextModifier extends AbstractSingleModifier {
  constructor() {
    super();
    this._method = 'text';
  }

  text(value) {
    this._set(value);
  }
}
