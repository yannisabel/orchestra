const{expect:c,waitFor:i}=__STORYBOOK_MODULE_TEST__,h={component:"orchestra-checkbox",title:"Components/orchestra-checkbox",parameters:{test:{autoplay:!1}},decorators:[t=>(setTimeout(()=>{const n=document.activeElement;(n?.tagName==="ORCHESTRA-CHECKBOX"||n?.shadowRoot?.activeElement)&&n?.blur?.()},100),t())],argTypes:{checked:{control:"boolean",description:"A boolean indicating the checked state of the checkbox.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},indeterminate:{control:"boolean",description:"A boolean indicating the indeterminate state (mixed/partial selection). Shows a dash/minus sign.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{control:"boolean",description:"A boolean indicating the disable state of the checkbox.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},name:{type:{name:"string"},control:"text",description:"A string representing the name of the checkbox for form submission."},value:{type:{name:"string"},control:"text",description:"A string representing the value of the checkbox for form submission.",table:{defaultValue:{summary:"on"}}},htmlId:{type:{name:"string"},control:"text",description:"The unique identifier for the checkbox input. Used to associate with external label elements."},label:{type:{name:"string"},control:"text",description:"Label text to associate with the checkbox (rendered as external label element)."}}},r={args:{checked:!1,indeterminate:!1,disabled:!1,htmlId:"checkbox-example",label:"Accept terms and conditions"},render:t=>{const n=document.createElement("div");n.style.display="flex",n.style.alignItems="center",n.style.gap="0.5rem";const e=document.createElement("orchestra-checkbox"),a=document.createElement("label"),o=`${t.htmlId??"checkbox-default"}-label`;return a.id=o,a.textContent=t.label??"Accept terms and conditions",a.style.cursor="pointer",e.htmlId=t.htmlId??"checkbox-example",e.name="terms",e.value="accept",e.checked=t.checked??!1,e.indeterminate=t.indeterminate??!1,e.disabled=t.disabled??!1,e.ariaLabel=t.label??"Accept terms and conditions",n.append(e,a),n},play:async({canvasElement:t,userEvent:n})=>{const e=t.querySelector("orchestra-checkbox");c(e).toBeTruthy(),await i(()=>{c(e?.shadowRoot?.querySelector("input")).toBeTruthy()});const a=e?.shadowRoot?.querySelector("input");c(a?.checked).toBe(!1),c(a?.indeterminate).toBe(!1),c(a?.disabled).toBe(!1),a&&await n.click(a),await i(()=>{c(a?.checked).toBe(!0),c(a?.indeterminate).toBe(!1)})}},l={args:{checked:!0,indeterminate:!0,disabled:!1,htmlId:"checkbox-indeterminate",label:"Partially selected items"},render:t=>{const n=document.createElement("div");n.style.display="flex",n.style.alignItems="center",n.style.gap="0.5rem";const e=document.createElement("orchestra-checkbox"),a=document.createElement("label"),o=`${t.htmlId??"checkbox-indeterminate"}-label`;return a.id=o,a.textContent=t.label??"Partially selected items",a.style.cursor="pointer",e.htmlId=t.htmlId??"checkbox-indeterminate",e.name="items",e.value="partial",e.checked=t.checked??!0,e.indeterminate=t.indeterminate??!0,e.disabled=t.disabled??!1,e.ariaLabel=t.label??"Partially selected items",n.append(e,a),n},play:async({canvasElement:t})=>{const n=t.querySelector("orchestra-checkbox");c(n).toBeTruthy(),await i(()=>{c(n?.shadowRoot?.querySelector("input")).toBeTruthy()});const e=n?.shadowRoot?.querySelector("input");c(e?.indeterminate).toBe(!0),c(e?.checked).toBe(!0),c(e?.disabled).toBe(!1)}},s={args:{checked:!1,indeterminate:!1,disabled:!1,htmlId:"checkbox-error",label:"I agree to the terms"},render:t=>{const n=document.createElement("div");n.style.display="flex",n.style.flexDirection="column",n.style.gap="0.5rem";const e=document.createElement("div");e.style.display="flex",e.style.alignItems="flex-start",e.style.gap="0.5rem";const a=document.createElement("orchestra-checkbox"),o=document.createElement("label"),m=`${t.htmlId??"checkbox-error"}-label`;o.id=m,o.textContent=t.label??"I agree to the terms",o.style.cursor="pointer",a.htmlId=t.htmlId??"checkbox-error",a.name="agreement",a.value="agreed",a.checked=t.checked??!1,a.indeterminate=t.indeterminate??!1,a.disabled=t.disabled??!1,a.ariaLabel=t.label??"I agree to the terms",a.validationMessage="You must agree to continue";const d=document.createElement("span");return d.slot="error",d.textContent="You must agree to continue",a.appendChild(d),e.append(a,o),n.appendChild(e),n},play:async({canvasElement:t})=>{const n=t.querySelector("orchestra-checkbox");c(n).toBeTruthy(),await i(()=>{c(n?.shadowRoot?.querySelector("input")).toBeTruthy()});const e=n?.querySelector('[slot="error"]');c(e).toBeTruthy(),c(e?.textContent).toContain("You must agree to continue")}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    htmlId: 'checkbox-example',
    label: 'Accept terms and conditions'
  },
  render: args => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.gap = '0.5rem';
    const checkbox = document.createElement('orchestra-checkbox') as HTMLElement & {
      checked?: boolean;
      indeterminate?: boolean;
      disabled?: boolean;
      name?: string;
      value?: string;
      htmlId?: string;
      ariaLabel?: string;
    };
    const label = document.createElement('label');
    const labelId = \`\${args.htmlId ?? 'checkbox-default'}-label\`;
    label.id = labelId;
    label.textContent = args.label ?? 'Accept terms and conditions';
    label.style.cursor = 'pointer';
    checkbox.htmlId = args.htmlId ?? 'checkbox-example';
    checkbox.name = 'terms';
    checkbox.value = 'accept';
    checkbox.checked = args.checked ?? false;
    checkbox.indeterminate = args.indeterminate ?? false;
    checkbox.disabled = args.disabled ?? false;
    checkbox.ariaLabel = args.label ?? 'Accept terms and conditions';
    container.append(checkbox, label);
    return container;
  },
  play: async ({
    canvasElement,
    userEvent
  }) => {
    const checkbox = canvasElement.querySelector('orchestra-checkbox');
    expect(checkbox).toBeTruthy();
    await waitFor(() => {
      expect(checkbox?.shadowRoot?.querySelector('input')).toBeTruthy();
    });
    const input = checkbox?.shadowRoot?.querySelector('input') as HTMLInputElement | null;
    expect(input?.checked).toBe(false);
    expect(input?.indeterminate).toBe(false);
    expect(input?.disabled).toBe(false);

    // Click the native input inside shadow DOM to assert state transitions.
    if (input) {
      await userEvent.click(input);
    }
    await waitFor(() => {
      expect(input?.checked).toBe(true);
      expect(input?.indeterminate).toBe(false);
    });
  }
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true,
    indeterminate: true,
    disabled: false,
    htmlId: 'checkbox-indeterminate',
    label: 'Partially selected items'
  },
  render: args => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.gap = '0.5rem';
    const checkbox = document.createElement('orchestra-checkbox') as HTMLElement & {
      checked?: boolean;
      indeterminate?: boolean;
      disabled?: boolean;
      name?: string;
      value?: string;
      htmlId?: string;
      ariaLabel?: string;
    };
    const label = document.createElement('label');
    const labelId = \`\${args.htmlId ?? 'checkbox-indeterminate'}-label\`;
    label.id = labelId;
    label.textContent = args.label ?? 'Partially selected items';
    label.style.cursor = 'pointer';
    checkbox.htmlId = args.htmlId ?? 'checkbox-indeterminate';
    checkbox.name = 'items';
    checkbox.value = 'partial';
    checkbox.checked = args.checked ?? true;
    checkbox.indeterminate = args.indeterminate ?? true;
    checkbox.disabled = args.disabled ?? false;
    checkbox.ariaLabel = args.label ?? 'Partially selected items';
    container.append(checkbox, label);
    return container;
  },
  play: async ({
    canvasElement
  }) => {
    const checkbox = canvasElement.querySelector('orchestra-checkbox');
    expect(checkbox).toBeTruthy();
    await waitFor(() => {
      expect(checkbox?.shadowRoot?.querySelector('input')).toBeTruthy();
    });
    const input = checkbox?.shadowRoot?.querySelector('input') as HTMLInputElement | null;
    expect(input?.indeterminate).toBe(true);
    expect(input?.checked).toBe(true);
    expect(input?.disabled).toBe(false);
  }
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    htmlId: 'checkbox-error',
    label: 'I agree to the terms'
  },
  render: args => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '0.5rem';
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'flex-start';
    wrapper.style.gap = '0.5rem';
    const checkbox = document.createElement('orchestra-checkbox') as HTMLElement & {
      checked?: boolean;
      indeterminate?: boolean;
      disabled?: boolean;
      name?: string;
      value?: string;
      htmlId?: string;
      ariaLabel?: string;
      validationMessage?: string;
    };
    const label = document.createElement('label');
    const labelId = \`\${args.htmlId ?? 'checkbox-error'}-label\`;
    label.id = labelId;
    label.textContent = args.label ?? 'I agree to the terms';
    label.style.cursor = 'pointer';
    checkbox.htmlId = args.htmlId ?? 'checkbox-error';
    checkbox.name = 'agreement';
    checkbox.value = 'agreed';
    checkbox.checked = args.checked ?? false;
    checkbox.indeterminate = args.indeterminate ?? false;
    checkbox.disabled = args.disabled ?? false;
    checkbox.ariaLabel = args.label ?? 'I agree to the terms';
    checkbox.validationMessage = 'You must agree to continue';
    const errorMessage = document.createElement('span');
    errorMessage.slot = 'error';
    errorMessage.textContent = 'You must agree to continue';
    checkbox.appendChild(errorMessage);
    wrapper.append(checkbox, label);
    container.appendChild(wrapper);
    return container;
  },
  play: async ({
    canvasElement
  }) => {
    const checkbox = canvasElement.querySelector('orchestra-checkbox');
    expect(checkbox).toBeTruthy();
    await waitFor(() => {
      expect(checkbox?.shadowRoot?.querySelector('input')).toBeTruthy();
    });

    // Check that the error message is slotted in the component
    const errorSlot = checkbox?.querySelector('[slot="error"]');
    expect(errorSlot).toBeTruthy();
    expect(errorSlot?.textContent).toContain('You must agree to continue');
  }
}`,...s.parameters?.docs?.source}}};const b=["Default","Indeterminate","WithError"],u=Object.freeze(Object.defineProperty({__proto__:null,Default:r,Indeterminate:l,WithError:s,__namedExportsOrder:b,default:h},Symbol.toStringTag,{value:"Module"}));export{u as C,r as D};
//# sourceMappingURL=checkbox.stories-vEuKbHzi.js.map
