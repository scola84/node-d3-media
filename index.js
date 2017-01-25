import { selection } from 'd3-selection';
import Media from './src/media';

selection.prototype.media = function media(query) {
  return new Media()
    .selection(this)
    .media(query);
};
