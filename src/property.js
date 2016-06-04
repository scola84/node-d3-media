import Abstract from './abstract-pair';

export default class Property extends Abstract {
  constructor(selection) {
    super(selection, 'property');
  }

  property(name, value) {
    this._set(name, value);
  }

  properties(properties) {
    Object.keys(properties).forEach((name) => {
      this._set(name, properties[name]);
    });
  }
}
