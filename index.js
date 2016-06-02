import { selection } from 'd3-selection';
import Media from './src/media';

selection.prototype.media = function match(query) {
  return new Media(this).media(query);
};
