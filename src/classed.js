import AbstractPairModifier from './abstract-pair';

export default class ClassedModifier extends AbstractPairModifier {
  constructor() {
    super();
    this._method = 'classed';
  }

  classed(names, value) {
    this._set(names, value);
  }
}
