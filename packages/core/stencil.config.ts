import { Config } from '@stencil/core'
import { reactOutputTarget } from '@stencil/react-output-target'
import { angularOutputTarget } from '@stencil/angular-output-target'
import { vueOutputTarget } from '@stencil/vue-output-target'
import postcss from 'rollup-plugin-postcss'

export const config: Config = {
  namespace: 'orchestra-design-system',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
      footer: '', // hide "Built with StencilJS"c
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [{ src: '**/*.html' }],
    },
    {
      type: 'www',
      dir: '../storybook/www',
      serviceWorker: null, // disable service workers
    },
    angularOutputTarget({
      componentCorePackage: '@orchestra-design-system/core',
      outputType: 'component',
      directivesProxyFile:
        '../angular/projects/component-library/src/lib/stencil-generated/components.ts',
      directivesArrayFile:
        '../angular/projects/component-library/src/lib/stencil-generated/index.ts',
    }),
    vueOutputTarget({
      componentCorePackage: '@orchestra-design-system/core',
      proxiesFile: '../vue/lib/stencil-generated/components.ts',
    }),
    reactOutputTarget({
      outDir: '../react/lib/components/stencil-generated/',
      esModules: true,
    }),
    {
      type: 'dist-hydrate-script',
      dir: './hydrate',
    },
  ],
  plugins: [
    postcss({
      extract: true,
      minimize: true,
    }),
  ],
}
