import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
const packageJson = require('./package.json');
import { getFolders } from './scripts/buildUtils';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import copy from 'rollup-plugin-copy'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import { visualizer } from "rollup-plugin-visualizer";

const plugins = [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    useTsconfigDeclarationDir: true,
  }),
  terser(),
  postcss({plugins: [autoprefixer()]}),
  copy({
    targets: [
      { src: 'src/Notations', dest: 'dist' },
    ]
  }),
  visualizer(),
];
const subfolderPlugins = (folderName) => [
  ...plugins,
  copy({
    targets: [
      { src: `src/Staves/${folderName}/${folderName}.scss`, dest: `dist/Staves/${folderName}` }
    ]
  }),
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/${folderName}`,
      private: true,
      main: '../../cjs/index.js',
      module: './index.js',
      types: './index.d.ts',
    },
  }),
];
const folderBuilds = getFolders('./src/Staves').map((folder) => {
  return {
    input: `src/Staves/${folder}/index.ts`,
    output: {
      file: `dist/Staves/${folder}/index.js`,
      sourcemap: true,
      exports: 'named',
      format: 'esm',
    },
    plugins: subfolderPlugins(folder),
    external: ['react', 'react-dom'],
  };
});

export default [
  {
    input: ['src/Staves/index.ts'],
    output: [
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins,
    external: ['react', 'react-dom'],
  },
  ...folderBuilds,
  {
    input: ['src/Staves/index.ts'],
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins,
    external: ['react', 'react-dom'],
  },
];
