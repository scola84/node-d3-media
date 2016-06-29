import AbstractPairModifier from './abstract-pair';

export default class Attr extends AbstractPairModifier {
  constructor(selection) {
    super(selection, 'attr');
  }

  attr(name, value) {
    this._set(name, value);
  }

  attrs(attrs) {
    Object.keys(attrs).forEach((name) => {
      this._set(name, attrs[name]);
    });
  }
}
