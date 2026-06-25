import{u as s,j as e,f as i,T as c,C as o,h as a}from"./blocks-CD49I05N.js";import{I as l,D as d,C as h}from"./icon.stories-X8O_ZH8a.js";import"./iframe-CTWoi0RR.js";import"./preload-helper-PPVm8Dsz.js";import"./react-DkC3XXtW.js";import"./react-dom-CPA3uLtk.js";import"./react/jsx-runtime-DldvXD6N.js";import"./lit-X1EjRepF.js";const p="# orchestra-icon\n\n\n\n<!-- Auto Generated Below -->\n\n\n## Properties\n\n| Property            | Attribute | Description                                                                            | Type     | Default          |\n| ------------------- | --------- | -------------------------------------------------------------------------------------- | -------- | ---------------- |\n| `fill`              | `fill`    | Taking the currentcolor (inherited color of the font) by default, except if specified. | `string` | `'currentcolor'` |\n| `library`           | `library` | The name of the icon library to use. Defaults to 'core'.                               | `string` | `'core'`         |\n| `name` _(required)_ | `name`    | The name of the icon to display. Resolves using registered icon libraries.             | `string` | `undefined`      |\n| `size`              | `size`    | Taking the size of the parent element by default, except if specified.                 | `string` | `'100%'`         |\n\n\n## Dependencies\n\n### Used by\n\n - [orchestra-button](../button)\n\n### Graph\n```mermaid\ngraph TD;\n  orchestra-button --> orchestra-icon\n  style orchestra-icon fill:#f9f,stroke:#333,stroke-width:4px\n```\n\n----------------------------------------------\n\n\n";function t(r){const n={code:"code",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",...s(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:l}),`
`,e.jsx(c,{}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.h3,{id:"default-library-core",children:"Default Library (Core)"}),`
`,e.jsx(o,{of:d}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<orchestra-icon name="checked" fill="currentcolor" size="60px"></orchestra-icon>
`})}),`
`,e.jsx(n.h3,{id:"custom-library",children:"Custom Library"}),`
`,e.jsx(o,{of:h}),`
`,e.jsx(n.h4,{id:"with-hardcoded-svgs",children:"With Hardcoded SVGs"}),`
`,e.jsx(n.p,{children:"To use a custom icon library with hardcoded SVGs, register it before rendering:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`import { registerIconLibrary } from '@orchestra-kit/core'

registerIconLibrary('myIcons', {
  resolver: (name) => {
    const icons: Record<string, string> = {
      'star': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">...</svg>',
      'heart': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">...</svg>',
    }
    return icons[name] ?? ''
  }
})
`})}),`
`,e.jsx(n.h4,{id:"from-an-external-package",children:"From an External Package"}),`
`,e.jsx(n.p,{children:"For production use, import icons from an external package:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`import { registerIconLibrary } from '@orchestra-kit/core'
import * as Icons from '@your-org/icons-library'

registerIconLibrary('externalIcons', {
  resolver: (name) => {
    const iconExport = (Icons as Record<string, any>)[name]
    return typeof iconExport === 'string' ? iconExport : ''
  }
})
`})}),`
`,e.jsx(n.p,{children:"Then use it:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<orchestra-icon name="star" library="externalIcons" fill="red" size="24px"></orchestra-icon>
`})}),`
`,e.jsx(n.h2,{id:"component-properties",children:"Component Properties"}),`
`,e.jsx("div",{className:"stencil-props",children:e.jsx(a,{children:p})})]})}function w(r={}){const{wrapper:n}={...s(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(t,{...r})}):t(r)}export{w as default};
