import AbstractSingleModifier from './abstract-single';

export default class TextModifier extends AbstractSingleModifier {
  constructor(selection) {
    super(selection, 'text');
  }

  text(value) {
    this._set(value);
  }
}
