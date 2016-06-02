import Abstract from './abstract-pair';

export default class Property extends Abstract {
  constructor(selection) {
    super(selection, 'property');
  }

  property(name, value) {
    this.set(name, value);
  }

  properties(properties) {
    Object.keys(properties).forEach((name) => {
      this.set(name, properties[name]);
    });
  }
}
