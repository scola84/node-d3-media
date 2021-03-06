/* eslint prefer-reflect: "off" */

import AttrModifier from './attr';
import CallModifier from './call';
import ClassedModifier from './classed';
import HtmlModifier from './html';
import PropertyModifier from './property';
import StyleModifier from './style';
import TextModifier from './text';

export default class Media {
  constructor() {
    this._selection = null;
    this._query = null;
    this._matchers = {};
  }

  selection(value) {
    this._selection = value;
    return this;
  }

  media(value) {
    this._query = value;
    return this;
  }

  attr(name, value) {
    this._attr()
      .media(this._query)
      .attr(name, value);

    return this;
  }

  attrs(name, value) {
    this._attr()
      .media(this._query)
      .attrs(name, value);

    return this;
  }

  call(...args) {
    this._call()
      .media(this._query)
      .call(...args);

    return this;
  }

  classed(names, value) {
    this._classed()
      .media(this._query)
      .classed(names, value);

    return this;
  }

  html(value) {
    this._html()
      .media(this._query)
      .html(value);

    return this;
  }

  property(name, value) {
    this._property()
      .media(this._query)
      .property(name, value);

    return this;
  }

  properties(value) {
    this._property()
      .media(this._query)
      .properties(value);

    return this;
  }

  style(name, value) {
    this._style()
      .media(this._query)
      .style(name, value);

    return this;
  }

  styles(value) {
    this._style()
      .media(this._query)
      .styles(value);

    return this;
  }

  text(value) {
    this._text()
      .media(this._query)
      .text(value);

    return this;
  }

  start() {
    Object.keys(this._matchers).forEach((key) => {
      return this._matchers[key].start();
    });

    return this;
  }

  destroy() {
    Object.keys(this._matchers).forEach((key) => {
      this._matchers[key].destroy();
    });

    this._matchers = {};
    return this;
  }

  _attr() {
    this._matchers.attr = this._matchers.attr ||
      new AttrModifier().selection(this._selection);

    return this._matchers.attr;
  }

  _call() {
    this._matchers.call = this._matchers.call ||
      new CallModifier().selection(this._selection);

    return this._matchers.call;
  }

  _classed() {
    this._matchers.classed = this._matchers.classed ||
      new ClassedModifier().selection(this._selection);

    return this._matchers.classed;
  }

  _html() {
    this._matchers.html = this._matchers.html ||
      new HtmlModifier().selection(this._selection);

    return this._matchers.html;
  }

  _property() {
    this._matchers.property = this._matchers.property ||
      new PropertyModifier().selection(this._selection);

    return this._matchers.property;
  }

  _style() {
    this._matchers.style = this._matchers.style ||
      new StyleModifier().selection(this._selection);

    return this._matchers.style;
  }

  _text() {
    this._matchers.text = this._matchers.text ||
      new TextModifier().selection(this._selection);

    return this._matchers.text;
  }
}
