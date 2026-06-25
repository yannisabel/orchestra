import{r as n}from"./iframe-h5-g_zNS.js";const i=["checked"],c={component:"orchestra-icon",title:"Components/orchestra-icon",argTypes:{name:{type:{name:"string",required:!0},control:{type:"select"},options:i,description:"Icon name from the registered library"},fill:{control:{type:"text"},description:"SVG fill color"},size:{control:{type:"text"},description:"Icon size (CSS unit)"}},args:{name:i[0],fill:"currentcolor",size:"60px"}},r={render:e=>`<orchestra-icon name="${e.name}" library="core" fill="${e.fill}" size="${e.size}"></orchestra-icon>`,args:{name:"checked",fill:"currentcolor",size:"60px"}},t={render:e=>`<orchestra-icon name="${e.name}" library="custom" fill="${e.fill}" size="${e.size}"></orchestra-icon>`,args:{name:"star",fill:"currentcolor",size:"60px"},play:async()=>{const e={star:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg>',heart:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/></svg>'};n("custom",{resolver:s=>e[s]??""});const o=document.querySelector("orchestra-icon");o&&(o.library="core",await new Promise(s=>setTimeout(s,100)),o.library="custom")},argTypes:{name:{control:{type:"text"},description:"Icon name from the custom library (string input)"}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => \`<orchestra-icon name="\${args.name}" library="core" fill="\${args.fill}" size="\${args.size}"></orchestra-icon>\`,
  args: {
    name: 'checked',
    fill: 'currentcolor',
    size: '60px'
  }
} satisfies Story`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => \`<orchestra-icon name="\${args.name}" library="custom" fill="\${args.fill}" size="\${args.size}"></orchestra-icon>\`,
  args: {
    name: 'star',
    fill: 'currentcolor',
    size: '60px'
  },
  play: async () => {
    // This runs AFTER the component is mounted in the DOM
    const customIcons: Record<string, string> = {
      'star': \`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg>\`,
      'heart': \`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/></svg>\`
    };

    // Register the library
    registerIconLibrary('custom', {
      resolver: name => customIcons[name] ?? ''
    });

    // Find the icon component and trigger a refresh
    const icon = document.querySelector('orchestra-icon') as any;
    if (icon) {
      // Trigger the library change watcher
      icon.library = 'core';
      await new Promise(resolve => setTimeout(resolve, 100));
      icon.library = 'custom';
    }
  },
  argTypes: {
    name: {
      control: {
        type: 'text'
      },
      description: 'Icon name from the custom library (string input)'
    }
  }
} satisfies Story`,...t.parameters?.docs?.source}}};const a=["Default","CustomLibrary"],m=Object.freeze(Object.defineProperty({__proto__:null,CustomLibrary:t,Default:r,__namedExportsOrder:a,default:c},Symbol.toStringTag,{value:"Module"}));export{t as C,r as D,m as I};
