import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.js',
  format: 'umd',
  globals: {
    'd3-selection': 'd3',
    'd3-selection-multi': 'd3'
  },
  plugins: [
    resolve({
      jsnext: true
    }),
    buble()
  ]
};
