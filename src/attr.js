import Abstract from './abstract-pair';

export default class Attr extends Abstract {
  constructor(selection) {
    super(selection, 'attr');
  }

  attr(name, value) {
    this.set(name, value);
  }

  attrs(attrs) {
    Object.keys(attrs).forEach((name) => {
      this.set(name, attrs[name]);
    });
  }
}
