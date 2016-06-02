import Abstract from './abstract-pair';

export default class Classed extends Abstract {
  constructor(selection) {
    super(selection, 'classed');
  }

  classed(names, value) {
    this.set(names, value);
  }
}
