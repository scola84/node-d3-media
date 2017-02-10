import { selection } from 'd3';
import Media from './src/media';

selection.prototype.media = function media(query) {
  return new Media()
    .selection(this)
    .media(query);
};
