import{b as h}from"./lit-DiJmft_s.js";import{c as o}from"./index-gaHCqlrM.js";const{fn:s,expect:n,waitFor:w}=__STORYBOOK_MODULE_TEST__,B={component:"orchestra-button",title:"Components/orchestra-button",render:t=>h`
    <orchestra-button
      .type=${t.type??"button"}
      .variant=${t.variant??"primary"}
      .size=${t.size??"medium"}
      .disabled=${t.disabled??!1}
      >Button</orchestra-button
    >
  `,parameters:{test:{autoplay:!1}},decorators:[t=>(setTimeout(()=>{const a=document.activeElement;(a?.tagName==="ORCHESTRA-BUTTON"||a?.shadowRoot?.activeElement)&&a?.blur?.()},100),t())],argTypes:{type:{control:"select",options:["button","reset","submit"],description:"A string indicating the behavior of the button. It relies on `HTMLButtonElement['type']`",table:{defaultValue:{summary:"button"}}},variant:{control:"select",options:["primary","secondary","tertiary"],description:"A string indicating the design variation of the button based on the level of importance.",table:{type:{summary:"string"},defaultValue:{summary:"primary"}}},size:{control:"select",options:["small","medium","large"],description:"A string indicating the size of the button.",table:{type:{summary:"string"},defaultValue:{summary:"medium"}}},disabled:{control:"boolean",description:"A boolean indicating the disable state of the button.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},onClick:{action:"clicked"},onOrchestraFocus:{action:"orchestraFocus"},onOrchestraBlur:{action:"orchestraBlur"}},args:{onClick:s(),onOrchestraFocus:s(),onOrchestraBlur:s()}},c={args:{disabled:!1,variant:"primary"},play:async({canvasElement:t,userEvent:a})=>{const e=s();t.addEventListener("click",()=>e());const g=await o(t).findByShadowRole("button");await a.click(g),n(e).toHaveBeenCalledOnce()}},i={tags:["!dev"],args:{disabled:!0,variant:"primary"},play:async({canvasElement:t,userEvent:a})=>{const e=s();t.addEventListener("click",()=>e());const g=await o(t).findByShadowRole("button");await a.click(g),n(e).not.toHaveBeenCalledOnce()}},l={tags:["!dev"],args:{disabled:!1,variant:"primary"},play:async({canvasElement:t,userEvent:a})=>{const e=s();t.addEventListener("click",()=>e());const r=await o(t).findByShadowRole("button",{name:"Button"});await a.click(r),e.mockClear(),await a.keyboard("{Enter}"),n(e).toHaveBeenCalledOnce()}},d={tags:["!dev"],args:{disabled:!1,variant:"primary"},play:async({canvasElement:t,userEvent:a})=>{const e=s();t.addEventListener("click",()=>e());const r=await o(t).findByShadowRole("button",{name:"Button"});await a.click(r),e.mockClear(),await a.keyboard(" "),n(e).toHaveBeenCalledOnce()}},u={tags:["!dev"],args:{disabled:!0,variant:"primary"},play:async({canvasElement:t})=>{const e=await o(t).findByShadowRole("button");n(e).toBeDisabled(),n(e).toHaveAttribute("aria-disabled","true"),n(e.tabIndex).toBe(-1)}},b={tags:["!dev"],args:{type:"submit",disabled:!1,variant:"primary"},play:async({canvasElement:t})=>{const e=await o(t).findByShadowRole("button");n(e).toHaveAttribute("type","submit")}},m={args:{disabled:!1,variant:"primary",size:"medium"},render:t=>h`
    <orchestra-button
      size=${t.size}
      variant=${t.variant}
      disabled=${t.disabled}
      type=${t.type}
    >
      <orchestra-icon name="checkmark" label="Validation"></orchestra-icon>
      <span>Button</span>
    </orchestra-button>
  `,play:async({canvasElement:t})=>{const a=t.querySelector("orchestra-button");n(a).toBeTruthy();const e=a?.querySelector("orchestra-icon");n(e).toBeTruthy(),await w(()=>{const r=a?.shadowRoot?.querySelector("slot");n(r?.assignedElements()).toContain(e)})}},y={tags:["!dev"],args:{disabled:!1,variant:"primary"},render:()=>h`
    <orchestra-button>
      <orchestra-icon name="checked" label="Checked"></orchestra-icon>
    </orchestra-button>
  `,play:async({canvasElement:t})=>{const a=t.querySelector("orchestra-button");n(a?.textContent?.trim()).toBe("");const e=await o(t).findByShadowRole("button",{name:"Checked"});n(e).toBeTruthy()}},p={tags:["!dev"],args:{disabled:!1,variant:"primary"},render:()=>h`
    <orchestra-button>
      <orchestra-icon name="star" library="custom"></orchestra-icon>
      <span>Button</span>
    </orchestra-button>
  `,play:async({canvasElement:t})=>{const a=t.querySelector("orchestra-button");n(a).toBeTruthy(),await w(()=>{const e=a?.querySelector("orchestra-icon");n(e).toBeTruthy(),n(e?.getAttribute("library")??e?.library).toBe("custom"),n(e?.shadowRoot?.querySelector("svg")).toBeInTheDocument()})}},v={tags:["!dev"],args:{disabled:!1,variant:"secondary",size:"large"},play:async({canvasElement:t})=>{const e=await o(t).findByShadowRole("button");n(e).toHaveAttribute("data-variant","secondary"),n(e).toHaveAttribute("data-size","large")}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    variant: 'primary'
  },
  play: async ({
    canvasElement,
    userEvent
  }) => {
    const onClick = fn();
    canvasElement.addEventListener('click', () => onClick());
    const canvas = within(canvasElement);
    const button = await canvas.findByShadowRole('button');
    // Click
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    disabled: true,
    variant: 'primary'
  },
  play: async ({
    canvasElement,
    userEvent
  }) => {
    const onClick = fn();
    canvasElement.addEventListener('click', () => onClick());
    const canvas = within(canvasElement);
    const button = await canvas.findByShadowRole('button');
    // Click
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalledOnce();
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    disabled: false,
    variant: 'primary'
  },
  play: async ({
    canvasElement,
    userEvent
  }) => {
    const onClick = fn();
    canvasElement.addEventListener('click', () => onClick());
    const button = await within(canvasElement).findByShadowRole('button', {
      name: 'Button'
    });
    await userEvent.click(button);
    onClick.mockClear();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    disabled: false,
    variant: 'primary'
  },
  play: async ({
    canvasElement,
    userEvent
  }) => {
    const onClick = fn();
    canvasElement.addEventListener('click', () => onClick());
    const button = await within(canvasElement).findByShadowRole('button', {
      name: 'Button'
    });
    await userEvent.click(button);
    onClick.mockClear();
    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledOnce();
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    disabled: true,
    variant: 'primary'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByShadowRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button.tabIndex).toBe(-1);
  }
}`,...u.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    type: 'submit',
    disabled: false,
    variant: 'primary'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByShadowRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  }
}`,...b.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    variant: 'primary',
    size: 'medium'
  },
  render: args => html\`
    <orchestra-button
      size=\${args.size}
      variant=\${args.variant}
      disabled=\${args.disabled}
      type=\${args.type}
    >
      <orchestra-icon name="checkmark" label="Validation"></orchestra-icon>
      <span>Button</span>
    </orchestra-button>
  \`,
  play: async ({
    canvasElement
  }) => {
    const host = canvasElement.querySelector('orchestra-button');
    expect(host).toBeTruthy();
    const icon = host?.querySelector('orchestra-icon');
    expect(icon).toBeTruthy();
    await waitFor(() => {
      const slot = host?.shadowRoot?.querySelector('slot');
      expect(slot?.assignedElements()).toContain(icon);
    });
  }
}`,...m.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    disabled: false,
    variant: 'primary'
  },
  render: () => html\`
    <orchestra-button>
      <orchestra-icon name="checked" label="Checked"></orchestra-icon>
    </orchestra-button>
  \`,
  play: async ({
    canvasElement
  }) => {
    const host = canvasElement.querySelector('orchestra-button');
    expect(host?.textContent?.trim()).toBe('');
    const button = await within(canvasElement).findByShadowRole('button', {
      name: 'Checked'
    });
    expect(button).toBeTruthy();
  }
}`,...y.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    disabled: false,
    variant: 'primary'
  },
  render: () => html\`
    <orchestra-button>
      <orchestra-icon name="star" library="custom"></orchestra-icon>
      <span>Button</span>
    </orchestra-button>
  \`,
  play: async ({
    canvasElement
  }) => {
    const host = canvasElement.querySelector('orchestra-button');
    expect(host).toBeTruthy();
    await waitFor(() => {
      const icon = host?.querySelector('orchestra-icon') as (HTMLElement & {
        library?: string;
      }) | null;
      expect(icon).toBeTruthy();
      expect(icon?.getAttribute('library') ?? icon?.library).toBe('custom');
      expect(icon?.shadowRoot?.querySelector('svg')).toBeInTheDocument();
    });
  }
}`,...p.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    disabled: false,
    variant: 'secondary',
    size: 'large'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByShadowRole('button');
    expect(button).toHaveAttribute('data-variant', 'secondary');
    expect(button).toHaveAttribute('data-size', 'large');
  }
}`,...v.parameters?.docs?.source}}};const f=["Default","Disabled","KeyboardEnter","KeyboardSpace","DisabledAttributes","SubmitType","WithIcon","IconOnly","CustomIconLibrary","VariantAndSizeAttributes"],E=Object.freeze(Object.defineProperty({__proto__:null,CustomIconLibrary:p,Default:c,Disabled:i,DisabledAttributes:u,IconOnly:y,KeyboardEnter:l,KeyboardSpace:d,SubmitType:b,VariantAndSizeAttributes:v,WithIcon:m,__namedExportsOrder:f,default:B},Symbol.toStringTag,{value:"Module"}));export{E as B,c as D,m as W};
//# sourceMappingURL=button.stories-BbAYvNUR.js.map
