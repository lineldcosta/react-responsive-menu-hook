import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonJS from 'rollup-plugin-commonJS'
import externalDeps from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import size from 'rollup-plugin-size'
import visualizer from 'rollup-plugin-visualizer'
import replace from '@rollup/plugin-replace'

const globals = {
  react: 'React',
}

const external = ['react']

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/react-responsive-menu.js',
      format: 'es',
      sourcemap: true,
    },
    external: ['react'],
    plugins: [resolve(), babel(), commonJS(), externalDeps()],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/react-responsive-menu.min.mjs',
      format: 'es',
      sourcemap: true,
    },
    external,
    plugins: [resolve(), babel(), commonJS(), externalDeps(), terser()],
  },
  {
    input: 'src/index.js',
    output: {
      name: 'ReactResponsiveMenu',
      file: 'dist/react-responsive-menu.development.js',
      format: 'umd',
      sourcemap: true,
      globals,
    },
    external,
    plugins: [resolve(), babel(), commonJS(), externalDeps()],
  },
  {
    input: 'src/index.js',
    output: {
      name: 'ReactResponsiveMenu',
      file: 'dist/react-responsive-menu.production.min.js',
      format: 'umd',
      sourcemap: true,
      globals,
    },
    external,
    plugins: [
      replace({ 'process.env.NODE_ENV': `"production"`, delimiters: ['', ''] }),
      resolve(),
      babel(),
      commonJS(),
      externalDeps(),
      terser(),
      size(),
      visualizer(),
    ],
  },
]
