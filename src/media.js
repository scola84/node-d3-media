/* eslint prefer-reflect: "off" */

import Attr from './attr';
import Call from './call';
import Classed from './classed';
import Html from './html';
import Property from './property';
import Style from './style';
import Text from './text';

export default class Media {
  constructor(selection) {
    this.selection = selection;
    this.query = null;
    this.matchers = {};
  }

  media(query) {
    this.query = query;
    return this;
  }

  attr(name, value) {
    this._attr().media(this.query).attr(name, value);
    return this;
  }

  attrs(name, value) {
    this._attr().media(this.query).attrs(name, value);
    return this;
  }

  call(...args) {
    this._call().media(this.query).call(...args);
    return this;
  }

  classed(names, value) {
    this._classed().media(this.query).classed(names, value);
    return this;
  }

  html(value) {
    this._html().media(this.query).html(value);
    return this;
  }

  property(name, value) {
    this._property().media(this.query).property(name, value);
    return this;
  }

  properties(properties) {
    this._property().media(this.query).properties(properties);
    return this;
  }

  style(name, value) {
    this._style().media(this.query).style(name, value);
    return this;
  }

  styles(styles) {
    this._style().media(this.query).styles(styles);
    return this;
  }

  text(value) {
    this._text().media(this.query).text(value);
    return this;
  }

  start() {
    Object.keys(this.matchers).forEach((key) => {
      this.matchers[key].start();
    });

    return this;
  }

  _attr() {
    this.matchers.attr = this.matchers.attr || new Attr(this.selection);
    return this.matchers.attr;
  }

  _call() {
    this.matchers.call = this.matchers.call || new Call(this.selection);
    return this.matchers.call;
  }

  _classed() {
    this.matchers.classed = this.matchers.classed ||
      new Classed(this.selection);
    return this.matchers.classed;
  }

  _html() {
    this.matchers.html = this.matchers.html || new Html(this.selection);
    return this.matchers.html;
  }

  _property() {
    this.matchers.property = this.matchers.property ||
      new Property(this.selection);
    return this.matchers.property;
  }

  _style() {
    this.matchers.style = this.matchers.style || new Style(this.selection);
    return this.matchers.style;
  }

  _text() {
    this.matchers.text = this.matchers.text || new Text(this.selection);
    return this.matchers.text;
  }
}
