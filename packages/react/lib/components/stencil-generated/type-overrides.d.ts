/**
 * Type overrides for auto-generated Stencil components
 * These overrides resolve TypeScript constraint errors that arise from
 * the Stencil React Output Target's type generation.
 */

import type { Components } from '@orchestra-design-system/core/dist/components';

// Stencil's JSX typings for orchestra-checkbox are loosened here.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'orchestra-checkbox': any;
    }
  }
}
