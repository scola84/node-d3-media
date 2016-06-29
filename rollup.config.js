import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.js',
  format: 'umd',
  globals: {
    'd3-selection': 'd3',
    '@scola/bind': 'bind'
  },
  plugins: [
    resolve({
      jsnext: true,
      skip: ['d3-selection']
    }),
    babel({
      presets: ['es2015-rollup']
    })
  ]
};
