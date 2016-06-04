import Abstract from './abstract-pair';

export default class Style extends Abstract {
  constructor(selection) {
    super(selection, 'style');
  }

  style(name, value) {
    this._set(name, value);
  }

  styles(styles) {
    Object.keys(styles).forEach((name) => {
      this._set(name, styles[name]);
    });
  }
}
