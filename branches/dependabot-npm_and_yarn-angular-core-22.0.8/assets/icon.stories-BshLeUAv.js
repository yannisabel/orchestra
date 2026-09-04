const t=["checkboxCheck","checkboxIndeterminate","checked"],o={component:"orchestra-icon",title:"Components/orchestra-icon",argTypes:{name:{type:{name:"string",required:!0},control:{type:"select"},options:t,description:"Icon name from the registered library"},fill:{control:{type:"text"},description:"SVG fill color"},size:{control:{type:"text"},description:"Icon size (CSS unit)"},library:{control:{type:"select"},options:["orchestra-icons","custom","core"],description:"Icon library to use. Leave empty to use the default orchestra-icons library."}},args:{name:t[0],fill:"currentcolor",size:"60px"}},r={render:e=>`<orchestra-icon name="${e.name}"${e.library?` library="${e.library}"`:""} fill="${e.fill}" size="${e.size}"></orchestra-icon>`,args:{name:"checked",fill:"currentcolor",size:"60px"}},n={render:e=>`<orchestra-icon name="${e.name}"${e.library?` library="${e.library}"`:""} fill="${e.fill}" size="${e.size}"></orchestra-icon>`,args:{name:"star",fill:"currentcolor",size:"60px",library:"custom"},argTypes:{name:{control:{type:"text"},description:"Icon name from the custom library (string input)"}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => \`<orchestra-icon name="\${args.name}"\${args.library ? \` library="\${args.library}"\` : ''} fill="\${args.fill}" size="\${args.size}"></orchestra-icon>\`,
  args: {
    name: 'checked',
    fill: 'currentcolor',
    size: '60px'
  } as OrchestraIconArgs
} satisfies Story`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => \`<orchestra-icon name="\${args.name}"\${args.library ? \` library="\${args.library}"\` : ''} fill="\${args.fill}" size="\${args.size}"></orchestra-icon>\`,
  args: {
    name: 'star',
    fill: 'currentcolor',
    size: '60px',
    library: 'custom'
  },
  argTypes: {
    name: {
      control: {
        type: 'text'
      },
      description: 'Icon name from the custom library (string input)'
    }
  }
} satisfies Story`,...n.parameters?.docs?.source}}};const i=["Default","CustomLibrary"],s=Object.freeze(Object.defineProperty({__proto__:null,CustomLibrary:n,Default:r,__namedExportsOrder:i,default:o},Symbol.toStringTag,{value:"Module"}));export{n as C,r as D,s as I};
//# sourceMappingURL=icon.stories-BshLeUAv.js.map
