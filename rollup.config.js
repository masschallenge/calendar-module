import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'
import json from 'rollup-plugin-json'

const input = './src/index.js'
const name = 'ReactBigCalendar'
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
}

const babelOptions = {
  exclude: /node_modules/,
  runtimeHelpers: true,
}

const commonjsOptions = {
  include: /node_modules/,
}

export default [
  {
    input,
    output: {
      file: './dist/react-big-calendar.js',
      format: 'umd',
      name,
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
      sizeSnapshot(),
      json({
        // All JSON files will be parsed by default,
        // but you can also specifically include/exclude files
        include: 'node_modules/**',

        preferConst: true, // Default: false

        // specify indentation for the generated default export —
        // defaults to '\t'
        indent: '  ',

        // ignores indent and generates the smallest code
        compact: true, // Default: false

        // generate a named export for every property of the JSON object
        namedExports: true, // Default: true
      }),
    ],
  },

  {
    input,
    output: {
      file: './dist/react-big-calendar.min.js',
      format: 'umd',
      name,
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot(),
      terser(),
      json({
        // All JSON files will be parsed by default,
        // but you can also specifically include/exclude files
        include: 'node_modules/**',

        preferConst: true, // Default: false

        // specify indentation for the generated default export —
        // defaults to '\t'
        indent: '  ',

        // ignores indent and generates the smallest code
        compact: true, // Default: false

        // generate a named export for every property of the JSON object
        namedExports: true, // Default: true
      }),
    ],
  },

  {
    input,
    output: { file: pkg.module, format: 'esm' },
    // prevent bundling all dependencies
    external: id => !id.startsWith('.') && !id.startsWith('/'),
    plugins: [
      babel(babelOptions),
      sizeSnapshot(),
      json({
        // All JSON files will be parsed by default,
        // but you can also specifically include/exclude files
        include: 'node_modules/**',

        preferConst: true, // Default: false

        // specify indentation for the generated default export —
        // defaults to '\t'
        indent: '  ',

        // ignores indent and generates the smallest code
        compact: true, // Default: false

        // generate a named export for every property of the JSON object
        namedExports: true, // Default: true
      }),
    ],
  },
]
