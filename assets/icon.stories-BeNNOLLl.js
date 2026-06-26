const o=["checked"],s={component:"orchestra-icon",title:"Components/orchestra-icon",argTypes:{name:{type:{name:"string",required:!0},control:{type:"select"},options:o,description:"Icon name from the registered library"},fill:{control:{type:"text"},description:"SVG fill color"},size:{control:{type:"text"},description:"Icon size (CSS unit)"}},args:{name:o[0],fill:"currentcolor",size:"60px"}},r={render:e=>`<orchestra-icon name="${e.name}" library="core" fill="${e.fill}" size="${e.size}"></orchestra-icon>`,args:{name:"checked",fill:"currentcolor",size:"60px"}},t={render:e=>`<orchestra-icon name="${e.name}" library="custom" fill="${e.fill}" size="${e.size}"></orchestra-icon>`,args:{name:"star",fill:"currentcolor",size:"60px"},argTypes:{name:{control:{type:"text"},description:"Icon name from the custom library (string input)"}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => \`<orchestra-icon name="\${args.name}" library="core" fill="\${args.fill}" size="\${args.size}"></orchestra-icon>\`,
  args: {
    name: 'checked',
    fill: 'currentcolor',
    size: '60px'
  } as OrchestraIconArgs
} satisfies Story`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => \`<orchestra-icon name="\${args.name}" library="custom" fill="\${args.fill}" size="\${args.size}"></orchestra-icon>\`,
  args: {
    name: 'star',
    fill: 'currentcolor',
    size: '60px'
  },
  argTypes: {
    name: {
      control: {
        type: 'text'
      },
      description: 'Icon name from the custom library (string input)'
    }
  }
} satisfies Story`,...t.parameters?.docs?.source}}};const i=["Default","CustomLibrary"],n=Object.freeze(Object.defineProperty({__proto__:null,CustomLibrary:t,Default:r,__namedExportsOrder:i,default:s},Symbol.toStringTag,{value:"Module"}));export{t as C,r as D,n as I};
