/**
 * Type overrides for auto-generated Stencil components
 * These overrides resolve TypeScript constraint errors that arise from
 * the Stencil React Output Target's type generation.
 */

import type { Components } from '@orchestra-design-system/core/dist/components';

// Make ariaLabel required to satisfy HTMLElement constraints
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'orchestra-checkbox': any;
    }
  }
}

// Override the Components interface for checkbox
declare module '@orchestra-design-system/core/dist/components' {
  namespace Components {
    interface OrchestraCheckbox {
      /**
       * Accessible label for screen readers when no visible label is associated.
       */
      ariaLabel: string;
    }
  }
}
