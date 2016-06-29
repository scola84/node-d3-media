import AbstractPairModifier from './abstract-pair';

export default class ClassedModifier extends AbstractPairModifier {
  constructor(selection) {
    super(selection, 'classed');
  }

  classed(names, value) {
    this._set(names, value);
  }
}
