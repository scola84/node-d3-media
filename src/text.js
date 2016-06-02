/*eslint no-invalid-this: "off"*/

import Abstract from './abstract-single';

export default class Text extends Abstract {
  constructor(selection) {
    super(selection, 'text');
  }

  text(value) {
    this.set(value);
  }
}
