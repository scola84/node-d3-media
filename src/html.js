/*eslint no-invalid-this: "off"*/

import Abstract from './abstract-single';

export default class Html extends Abstract {
  constructor(selection) {
    super(selection, 'html');
  }

  html(value) {
    this._set(value);
  }
}
