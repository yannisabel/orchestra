const a=["checked"],{expect:t,waitFor:c}=__STORYBOOK_MODULE_TEST__,i={component:"orchestra-icon",title:"Components/orchestra-icon",argTypes:{name:{type:{name:"string",required:!0},control:{type:"select"},options:a,description:"Icon name from the registered library"},fill:{control:{type:"text"},description:"SVG fill color"},size:{control:{type:"text"},description:"Icon size (CSS unit)"},library:{control:{type:"select"},options:["orchestra-icons","custom","core"],description:"Icon library to use. Leave empty to use the default orchestra-icons library."}},args:{name:a[0],fill:"currentcolor",size:"60px"}},o={render:e=>`<orchestra-icon name="${e.name}"${e.library?` library="${e.library}"`:""} fill="${e.fill}" size="${e.size}"></orchestra-icon>`,args:{name:"checked",fill:"currentcolor",size:"60px"},play:async({canvasElement:e})=>{const r=e.querySelector("orchestra-icon");t(r).toBeTruthy(),t(r).toHaveAttribute("name","checked"),t(r).toHaveAttribute("fill","currentcolor"),t(r).toHaveAttribute("size","60px"),await c(()=>{t(r?.shadowRoot?.querySelector("svg")).toBeTruthy()})}},n={render:e=>`<orchestra-icon name="${e.name}"${e.library?` library="${e.library}"`:""} fill="${e.fill}" size="${e.size}"></orchestra-icon>`,args:{name:"star",fill:"currentcolor",size:"60px",library:"custom"},play:async({canvasElement:e})=>{const r=e.querySelector("orchestra-icon");t(r).toBeTruthy(),t(r).toHaveAttribute("name","star"),t(r).toHaveAttribute("library","custom"),await c(()=>{t(r?.shadowRoot?.querySelector("svg")).toBeTruthy()})},argTypes:{name:{control:{type:"text"},description:"Icon name from the custom library (string input)"}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => \`<orchestra-icon name="\${args.name}"\${args.library ? \` library="\${args.library}"\` : ''} fill="\${args.fill}" size="\${args.size}"></orchestra-icon>\`,
  args: {
    name: 'checked',
    fill: 'currentcolor',
    size: '60px'
  } as OrchestraIconArgs,
  play: async ({
    canvasElement
  }) => {
    const icon = canvasElement.querySelector('orchestra-icon');
    expect(icon).toBeTruthy();
    expect(icon).toHaveAttribute('name', 'checked');
    expect(icon).toHaveAttribute('fill', 'currentcolor');
    expect(icon).toHaveAttribute('size', '60px');
    await waitFor(() => {
      expect(icon?.shadowRoot?.querySelector('svg')).toBeTruthy();
    });
  }
} satisfies Story`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => \`<orchestra-icon name="\${args.name}"\${args.library ? \` library="\${args.library}"\` : ''} fill="\${args.fill}" size="\${args.size}"></orchestra-icon>\`,
  args: {
    name: 'star',
    fill: 'currentcolor',
    size: '60px',
    library: 'custom'
  },
  play: async ({
    canvasElement
  }) => {
    const icon = canvasElement.querySelector('orchestra-icon');
    expect(icon).toBeTruthy();
    expect(icon).toHaveAttribute('name', 'star');
    expect(icon).toHaveAttribute('library', 'custom');
    await waitFor(() => {
      expect(icon?.shadowRoot?.querySelector('svg')).toBeTruthy();
    });
  },
  argTypes: {
    name: {
      control: {
        type: 'text'
      },
      description: 'Icon name from the custom library (string input)'
    }
  }
} satisfies Story`,...n.parameters?.docs?.source}}};const s=["Default","CustomLibrary"],l=Object.freeze(Object.defineProperty({__proto__:null,CustomLibrary:n,Default:o,__namedExportsOrder:s,default:i},Symbol.toStringTag,{value:"Module"}));export{n as C,o as D,l as I};
