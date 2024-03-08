import alias from '@rollup/plugin-alias'
import dts from 'rollup-plugin-dts'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
import esbuild, { minify } from 'rollup-plugin-esbuild'
import nodePolyfills from 'rollup-plugin-polyfill-node'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist/esm',
        format: 'esm',
        entryFileNames: '[name].js',
        preserveModules: true, // 为 ESM 格式保留模块结构
      },
      {
        dir: 'dist/cjs',
        format: 'cjs',
        entryFileNames: '[name].cjs',
        preserveModules: true, // 为 CJS 格式保留模块结构
      },
      {
        dir: 'dist/umd',
        format: 'umd',
        entryFileNames: '[name].js',
        name: 'CRSEC_UTILS', // umd 格式需要设置 name
        globals: {
          axios: 'axios',
        },
      },
    ],
    plugins: [
      // replace: {
      //   preventAssignment: true
      // },
      // alias: {},
      resolve(),
      json({
        preferConst: true,
      }),
      commonjs({
        ignoreTryCatch: true,
      }),
      typescript(),
      esbuild({
        target: 'es2015',
      }),
      // minify(),
      // dts({
      //   // https://github.com/Swatinem/rollup-plugin-dts/issues/143
      //   compilerOptions: { preserveSymlinks: false },
      //   respectExternal: true,
      // }),
      nodePolyfills(/* options */),
    ],
    external: ['axios'],
  },
]
