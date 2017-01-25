import AbstractPairModifier from './abstract-pair';

export default class PropertyModifier extends AbstractPairModifier {
  constructor() {
    super();
    this._method = 'property';
  }

  property(name, value) {
    this._set(name, value);
  }

  properties(value) {
    Object.keys(value).forEach((name) => {
      this._set(name, value[name]);
    });
  }
}
