import{c}from"./index-Bxy2f9gc.js";const{fn:r,expect:a,waitFor:g}=__STORYBOOK_MODULE_TEST__,w={component:"orchestra-button",title:"Components/orchestra-button",parameters:{test:{autoplay:!1}},decorators:[n=>(setTimeout(()=>{const e=document.activeElement;(e?.tagName==="ORCHESTRA-BUTTON"||e?.shadowRoot?.activeElement)&&e?.blur?.()},100),n())],argTypes:{text:{type:{name:"string",required:!0},description:"This is the text which appear inside the button. It is **required**."},type:{control:"select",options:["button","reset","submit"],description:"A string indicating the behavior of the button. It relies on `HTMLButtonElement['type']`",table:{defaultValue:{summary:"button"}}},variant:{control:"select",options:["primary","secondary","tertiary"],description:"A string indicating the design variation of the button based on the level of importance.",table:{type:{summary:"string"},defaultValue:{summary:"primary"}}},size:{control:"select",options:["small","medium","large"],description:"A string indicating the size of the button.",table:{type:{summary:"string"},defaultValue:{summary:"medium"}}},icon:{control:"select",options:["none","start","end","only"],description:"It allows to render the chosen icon on the left or on the right.\nThe icon render only if `iconName` and `icon` are defined.",table:{type:{summary:"string"}}},iconName:{type:{name:"string"},control:"text",description:"Icon name to render. Keep this as a string so the name can vary by library.",if:{arg:"icon",exists:!0}},iconLibrary:{control:"select",options:["orchestra-icons","custom"],description:"Icon library to use when an icon is selected. Defaults to orchestra-icons.",if:{arg:"icon",exists:!0}},disabled:{control:"boolean",description:"A boolean indicating the disable state of the button.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},onClick:{action:"clicked"},onOrchestraFocus:{action:"orchestraFocus"},onOrchestraBlur:{action:"orchestraBlur"}},args:{onClick:r(),onOrchestraFocus:r(),onOrchestraBlur:r()}},i={args:{text:"Button",disabled:!1,variant:"primary"},play:async({canvasElement:n,userEvent:e})=>{const t=r();n.addEventListener("click",()=>t());const s=await c(n).findByShadowRole("button");await e.click(s),a(t).toHaveBeenCalledOnce()}},l={tags:["!dev"],args:{text:"Button",disabled:!0,variant:"primary",icon:"start",iconName:"checked"},play:async({canvasElement:n,userEvent:e})=>{const t=r();n.addEventListener("click",()=>t());const s=await c(n).findByShadowRole("button");await e.click(s),a(t).not.toHaveBeenCalledOnce()}},d={tags:["!dev"],args:{text:"Button",disabled:!1,variant:"primary"},play:async({canvasElement:n,userEvent:e})=>{const t=r();n.addEventListener("click",()=>t());const o=await c(n).findByShadowRole("button",{name:"Button"});await e.click(o),t.mockClear(),await e.keyboard("{Enter}"),a(t).toHaveBeenCalledOnce()}},u={tags:["!dev"],args:{text:"Button",disabled:!1,variant:"primary"},play:async({canvasElement:n,userEvent:e})=>{const t=r();n.addEventListener("click",()=>t());const o=await c(n).findByShadowRole("button",{name:"Button"});await e.click(o),t.mockClear(),await e.keyboard(" "),a(t).toHaveBeenCalledOnce()}},y={tags:["!dev"],args:{text:"Button",disabled:!0,variant:"primary"},play:async({canvasElement:n})=>{const t=await c(n).findByShadowRole("button");a(t).toBeDisabled(),a(t).toHaveAttribute("aria-disabled","true"),a(t.tabIndex).toBe(-1)}},b={args:{text:"Save changes",disabled:!0},play:async({canvasElement:n,userEvent:e})=>{const t=await c(n).findByShadowRole("button",{name:"Save changes"});a(t).toBeDisabled();const o=n.querySelector("orchestra-button");if(a(o).toBeTruthy(),!o)return;const s=r();o.addEventListener("click",s),o.disabled=!1,await g(()=>{a(t).toBeEnabled(),a(t).not.toHaveAttribute("aria-disabled"),a(t.tabIndex).toBe(0)}),await e.click(t),a(s).toHaveBeenCalledOnce()}},m={tags:["!dev"],args:{text:"Button",type:"submit",disabled:!1,variant:"primary"},play:async({canvasElement:n})=>{const t=await c(n).findByShadowRole("button");a(t).toHaveAttribute("type","submit")}},p={tags:["!dev"],args:{text:"Button",disabled:!1,variant:"primary",icon:"end",iconName:"checked"},play:async({canvasElement:n})=>{const e=n.querySelector("orchestra-button");a(e).toBeTruthy();const t=e?.shadowRoot?.querySelector("orchestra-icon"),o=e?.shadowRoot?.querySelector("span.orchestra-overflow");a(t).toBeTruthy(),a(o).toBeTruthy()}},h={tags:["!dev"],args:{text:"Button",disabled:!1,variant:"primary",icon:"only",iconName:"checked"},play:async({canvasElement:n})=>{const e=n.querySelector("orchestra-button");a(e).toBeTruthy();const t=e?.shadowRoot?.querySelector("orchestra-icon"),o=e?.shadowRoot?.querySelector("span.orchestra-overflow"),s=e?.shadowRoot?.querySelector("button");a(t).toBeTruthy(),a(o).toBeNull(),a(s).toHaveAttribute("aria-label","Button")}},v={tags:["!dev"],args:{text:"Button",disabled:!1,variant:"primary",icon:"start",iconName:"checked",iconLibrary:"custom"},play:async({canvasElement:n})=>{const e=n.querySelector("orchestra-button");a(e).toBeTruthy();const t=e?.shadowRoot?.querySelector("orchestra-icon");a(t).toBeTruthy(),a(t?.getAttribute("library")??t?.library).toBe("custom")}},B={tags:["!dev"],args:{text:"Button",disabled:!1,variant:"secondary",size:"large"},play:async({canvasElement:n})=>{const t=await c(n).findByShadowRole("button");a(t).toHaveClass("orchestra-button--secondary"),a(t).toHaveClass("orchestra-button--large")}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Button',
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
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    text: 'Button',
    disabled: true,
    variant: 'primary',
    icon: 'start',
    iconName: 'checked'
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
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    text: 'Button',
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
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    text: 'Button',
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
}`,...u.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    text: 'Button',
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
}`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Save changes',
    disabled: true
  },
  play: async ({
    canvasElement,
    userEvent
  }) => {
    const button = await within(canvasElement).findByShadowRole('button', {
      name: 'Save changes'
    });
    expect(button).toBeDisabled();
    const host = canvasElement.querySelector<HTMLElement & Components.OrchestraButton>('orchestra-button');
    expect(host).toBeTruthy();
    if (!host) return;
    const onClick = fn();
    host.addEventListener('click', onClick);
    host.disabled = false;
    await waitFor(() => {
      expect(button).toBeEnabled();
      expect(button).not.toHaveAttribute('aria-disabled');
      expect(button.tabIndex).toBe(0);
    });
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  }
}`,...b.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    text: 'Button',
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
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    text: 'Button',
    disabled: false,
    variant: 'primary',
    icon: 'end',
    iconName: 'checked'
  },
  play: async ({
    canvasElement
  }) => {
    const host = canvasElement.querySelector('orchestra-button');
    expect(host).toBeTruthy();
    const icon = host?.shadowRoot?.querySelector('orchestra-icon');
    const text = host?.shadowRoot?.querySelector('span.orchestra-overflow');
    expect(icon).toBeTruthy();
    expect(text).toBeTruthy();
  }
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    text: 'Button',
    disabled: false,
    variant: 'primary',
    icon: 'only',
    iconName: 'checked'
  },
  play: async ({
    canvasElement
  }) => {
    const host = canvasElement.querySelector('orchestra-button');
    expect(host).toBeTruthy();
    const icon = host?.shadowRoot?.querySelector('orchestra-icon');
    const text = host?.shadowRoot?.querySelector('span.orchestra-overflow');
    const button = host?.shadowRoot?.querySelector('button');
    expect(icon).toBeTruthy();
    expect(text).toBeNull();
    expect(button).toHaveAttribute('aria-label', 'Button');
  }
}`,...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    text: 'Button',
    disabled: false,
    variant: 'primary',
    icon: 'start',
    iconName: 'checked',
    iconLibrary: 'custom'
  },
  play: async ({
    canvasElement
  }) => {
    const host = canvasElement.querySelector('orchestra-button');
    expect(host).toBeTruthy();
    const icon = host?.shadowRoot?.querySelector('orchestra-icon') as (HTMLElement & {
      library?: string;
    }) | null;
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('library') ?? icon?.library).toBe('custom');
  }
}`,...v.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    text: 'Button',
    disabled: false,
    variant: 'secondary',
    size: 'large'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByShadowRole('button');
    expect(button).toHaveClass('orchestra-button--secondary');
    expect(button).toHaveClass('orchestra-button--large');
  }
}`,...B.parameters?.docs?.source}}};const f=["Default","Disabled","KeyboardEnter","KeyboardSpace","DisabledAttributes","Reenabled","SubmitType","EndIcon","IconOnly","CustomIconLibrary","VariantAndSizeClass"],k=Object.freeze(Object.defineProperty({__proto__:null,CustomIconLibrary:v,Default:i,Disabled:l,DisabledAttributes:y,EndIcon:p,IconOnly:h,KeyboardEnter:d,KeyboardSpace:u,Reenabled:b,SubmitType:m,VariantAndSizeClass:B,__namedExportsOrder:f,default:w},Symbol.toStringTag,{value:"Module"}));export{k as B,i as D};
//# sourceMappingURL=button.stories-CN-hSGJ3.js.map
