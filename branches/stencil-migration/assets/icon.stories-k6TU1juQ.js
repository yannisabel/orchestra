const t=["checked"],o={component:"orchestra-icon",title:"Components/orchestra-icon",argTypes:{name:{type:{name:"string",required:!0},control:{type:"select"},options:t,description:"Icon name from the registered library"},fill:{control:{type:"text"},description:"SVG fill color"},size:{control:{type:"text"},description:"Icon size (CSS unit)"},library:{control:{type:"select"},options:["orchestra-icons","custom","core"],description:"Icon library to use. Leave empty to use the default orchestra-icons library."}},args:{name:t[0],fill:"currentcolor",size:"60px"}},e={render:r=>`<orchestra-icon name="${r.name}"${r.library?` library="${r.library}"`:""} fill="${r.fill}" size="${r.size}"></orchestra-icon>`,args:{name:"checked",fill:"currentcolor",size:"60px"}},n={render:r=>`<orchestra-icon name="${r.name}"${r.library?` library="${r.library}"`:""} fill="${r.fill}" size="${r.size}"></orchestra-icon>`,args:{name:"star",fill:"currentcolor",size:"60px",library:"custom"},argTypes:{name:{control:{type:"text"},description:"Icon name from the custom library (string input)"}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => \`<orchestra-icon name="\${args.name}"\${args.library ? \` library="\${args.library}"\` : ''} fill="\${args.fill}" size="\${args.size}"></orchestra-icon>\`,
  args: {
    name: 'checked',
    fill: 'currentcolor',
    size: '60px'
  } as OrchestraIconArgs
} satisfies Story`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
} satisfies Story`,...n.parameters?.docs?.source}}};const s=["Default","CustomLibrary"],i=Object.freeze(Object.defineProperty({__proto__:null,CustomLibrary:n,Default:e,__namedExportsOrder:s,default:o},Symbol.toStringTag,{value:"Module"}));export{n as C,e as D,i as I};
