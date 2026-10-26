import{c as s}from"./index-Bxy2f9gc.js";const c=["checkboxCheck","checkboxIndeterminate","checked"],{expect:t,waitFor:o}=__STORYBOOK_MODULE_TEST__,l={component:"orchestra-icon",title:"Components/orchestra-icon",render:a=>{const e=document.createElement("orchestra-icon");return e.name=a.name,e.label=a.label,e.size=a.size,e.fill=a.fill,a.library&&(e.library=a.library),e},argTypes:{name:{type:{name:"string",required:!0},control:{type:"select"},options:c,description:"Icon name from the registered library"},fill:{control:{type:"text"},description:"SVG fill color"},size:{control:{type:"text"},description:"Icon size (CSS unit)"},library:{control:{type:"select"},options:["orchestra-icons","custom","core"],description:"Icon library to use. Leave empty to use the default orchestra-icons library."},label:{control:{type:"text"},description:"Accessible name. Leave blank for a decorative icon."}},args:{name:c[0],fill:"currentcolor",size:"60px"}},r={args:{name:"checkbox-check",label:"Completed"},play:async({canvasElement:a})=>{const e=await s(a).findByShadowRole("img",{name:"Completed"});t(e).not.toHaveAttribute("aria-hidden"),t(e.shadowRoot?.querySelector("svg")).toHaveAttribute("aria-hidden","true"),t(e.shadowRoot?.querySelector("svg")).toHaveAttribute("focusable","false"),e.label="Updated status",await o(()=>t(e).toHaveAccessibleName("Updated status")),e.name="checkbox-indeterminate",await o(()=>t(e).toHaveAccessibleName("Updated status")),t(e).not.toHaveAttribute("aria-hidden"),e.label=" ",await o(()=>{t(e).toHaveAttribute("aria-hidden","true"),t(e).not.toHaveAttribute("role"),t(e).not.toHaveAttribute("aria-label")}),e.label="Restored status",await o(()=>t(e).toHaveAccessibleName("Restored status")),t(e).toHaveAttribute("role","img"),t(e).not.toHaveAttribute("aria-hidden")}},n={args:{name:"checked",fill:"currentcolor",size:"60px"},play:async({canvasElement:a})=>{const e=a.querySelector("orchestra-icon");await o(()=>t(e).toHaveAttribute("aria-hidden","true")),t(e).not.toHaveAttribute("role"),t(s(a).queryByShadowRole("img")).toBeNull()}},i={args:{name:"star",fill:"currentcolor",size:"60px",library:"custom"},argTypes:{name:{control:{type:"text"},description:"Icon name from the custom library (string input)"}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'checkbox-check',
    label: 'Completed'
  },
  play: async ({
    canvasElement
  }) => {
    const icon = (await within(canvasElement).findByShadowRole('img', {
      name: 'Completed'
    })) as HTMLElement & Components.OrchestraIcon;
    expect(icon).not.toHaveAttribute('aria-hidden');
    expect(icon.shadowRoot?.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(icon.shadowRoot?.querySelector('svg')).toHaveAttribute('focusable', 'false');
    icon.label = 'Updated status';
    await waitFor(() => expect(icon).toHaveAccessibleName('Updated status'));
    icon.name = 'checkbox-indeterminate';
    await waitFor(() => expect(icon).toHaveAccessibleName('Updated status'));
    expect(icon).not.toHaveAttribute('aria-hidden');
    icon.label = ' ';
    await waitFor(() => {
      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon).not.toHaveAttribute('role');
      expect(icon).not.toHaveAttribute('aria-label');
    });
    icon.label = 'Restored status';
    await waitFor(() => expect(icon).toHaveAccessibleName('Restored status'));
    expect(icon).toHaveAttribute('role', 'img');
    expect(icon).not.toHaveAttribute('aria-hidden');
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'checked',
    fill: 'currentcolor',
    size: '60px'
  } as OrchestraIconArgs,
  play: async ({
    canvasElement
  }) => {
    const icon = canvasElement.querySelector('orchestra-icon');
    await waitFor(() => expect(icon).toHaveAttribute('aria-hidden', 'true'));
    expect(icon).not.toHaveAttribute('role');
    expect(within(canvasElement).queryByShadowRole('img')).toBeNull();
  }
} satisfies Story`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
} satisfies Story`,...i.parameters?.docs?.source}}};const d=["Informative","Default","CustomLibrary"],m=Object.freeze(Object.defineProperty({__proto__:null,CustomLibrary:i,Default:n,Informative:r,__namedExportsOrder:d,default:l},Symbol.toStringTag,{value:"Module"}));export{i as C,n as D,m as I,r as a};
//# sourceMappingURL=icon.stories-BlwoJ91s.js.map
