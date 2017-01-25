import AbstractPairModifier from './abstract-pair';

export default class Attr extends AbstractPairModifier {
  constructor() {
    super();
    this._method = 'attr';
  }

  attr(name, value) {
    this._set(name, value);
  }

  attrs(value) {
    Object.keys(value).forEach((name) => {
      this._set(name, value[name]);
    });
  }
}
