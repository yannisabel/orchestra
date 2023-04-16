import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
const packageJson = require('./package.json');
import { getFolders } from './scripts/buildUtils';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import scss from 'rollup-plugin-scss'
import copy from "rollup-plugin-copy";

const isDev = process.env.NODE_ENV === 'development'

const plugins = [
  peerDepsExternal(),
  resolve({
    browser: true
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    useTsconfigDeclarationDir: true,
  }),
  terser(),
  scss({
    insert: true,
    failOnError: true,
    use: ['sass'],
  }),
  copy({
    targets: [
      {
        src: "src/orchestra/01-instruments",
        dest: "dist",
      }
    ]
  })
];
const subfolderPlugins = (folderName) => [
  ...plugins,
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/${folderName}`,
      main: '../cjs/index.js',
      module: './index.js',
      types: './index.d.ts',
    },
  }),
];
const folderBuilds = getFolders('./src/orchestra').map((folder) => {
  return {
    input: `src/orchestra/${folder}/index.ts`,
    output: {
      dir: `dist/${folder}`,
      sourcemap: isDev,
      exports: 'named',
      format: 'esm',
      preserveModules: true,
    },

    plugins: subfolderPlugins(folder),
    external: ['react', 'react-dom'],
  };
});

export default [
  {
    input: ['src/orchestra/index.ts'],
    output: [
      {
        dir: "dist",
        format: 'esm',
        sourcemap: isDev,
        exports: 'named',
      },
    ],
    preserveModules: true,
    plugins,
    external: ['react', 'react-dom'],
  },
  ...folderBuilds,
  {
    input: ['src/orchestra/index.ts', 'src/orchestra/02-symbols/Anchors/index.ts', 'src/orchestra/02-symbols/Buttons/index.ts', 'src/orchestra/02-symbols/Titles/index.ts'],
    output: [
      {
        dir: "dist",
        format: 'cjs',
        sourcemap: isDev,
        exports: 'named',
      },
    ],
    preserveModules: true,
    plugins,
    external: ['react', 'react-dom'],
  },
];
