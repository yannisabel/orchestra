const{expect:a,waitFor:l}=__STORYBOOK_MODULE_TEST__,i={component:"orchestra-checkbox",title:"Components/orchestra-checkbox",parameters:{test:{autoplay:!1}},decorators:[t=>(setTimeout(()=>{const e=document.activeElement;(e?.tagName==="ORCHESTRA-CHECKBOX"||e?.shadowRoot?.activeElement)&&e?.blur?.()},100),t())],argTypes:{checked:{control:"boolean",description:"A boolean indicating the checked state of the checkbox.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},indeterminate:{control:"boolean",description:"A boolean indicating the indeterminate state (mixed/partial selection). Shows a dash/minus sign.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{control:"boolean",description:"A boolean indicating the disable state of the checkbox.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},name:{type:{name:"string"},control:"text",description:"A string representing the name of the checkbox for form submission."},value:{type:{name:"string"},control:"text",description:"A string representing the value of the checkbox for form submission.",table:{defaultValue:{summary:"on"}}},htmlId:{type:{name:"string"},control:"text",description:"The unique identifier for the checkbox input. Used to associate with external label elements."},label:{type:{name:"string"},control:"text",description:"Label text to associate with the checkbox (rendered as external label element)."}}},o={args:{checked:!1,indeterminate:!1,disabled:!1,htmlId:"checkbox-example",label:"Accept terms and conditions"},render:t=>{const e=document.createElement("orchestra-checkbox");return e.htmlId=t.htmlId??"checkbox-example",e.label=t.label??"Accept terms and conditions",e.name="terms",e.value="accept",e.checked=t.checked??!1,e.indeterminate=t.indeterminate??!1,e.disabled=t.disabled??!1,e.ariaLabel=t.label??"Accept terms and conditions",e},play:async({canvasElement:t,userEvent:e})=>{const n=t.querySelector("orchestra-checkbox");a(n).toBeTruthy(),await l(()=>{a(n?.shadowRoot?.querySelector("input")).toBeTruthy()});const c=n?.shadowRoot?.querySelector("input");a(c?.checked).toBe(!1),a(c?.indeterminate).toBe(!1),a(c?.disabled).toBe(!1),c&&await e.click(c),await l(()=>{a(c?.checked).toBe(!0),a(c?.indeterminate).toBe(!1)}),c&&await e.click(c),await l(()=>{a(c?.checked).toBe(!1)})}},r={args:{checked:!0,indeterminate:!0,disabled:!1,htmlId:"checkbox-indeterminate",label:"Partially selected items"},render:t=>{const e=document.createElement("orchestra-checkbox");return e.htmlId=t.htmlId??"checkbox-indeterminate",e.label=t.label??"Partially selected items",e.name="items",e.value="partial",e.checked=t.checked??!0,e.indeterminate=t.indeterminate??!0,e.disabled=t.disabled??!1,e.ariaLabel=t.label??"Partially selected items",e},play:async({canvasElement:t})=>{const e=t.querySelector("orchestra-checkbox");a(e).toBeTruthy(),await l(()=>{a(e?.shadowRoot?.querySelector("input")).toBeTruthy()});const n=e?.shadowRoot?.querySelector("input");a(n?.indeterminate).toBe(!0),a(n?.checked).toBe(!0),a(n?.disabled).toBe(!1)}},s={args:{checked:!1,indeterminate:!1,disabled:!1,htmlId:"checkbox-agreement",label:"I agree to the terms"},render:t=>{const e=document.createElement("orchestra-checkbox");e.htmlId=t.htmlId??"checkbox-agreement",e.label=t.label??"I agree to the terms",e.name="agreement",e.value="agreed",e.checked=t.checked??!1,e.indeterminate=t.indeterminate??!1,e.disabled=t.disabled??!1,e.ariaLabel=t.label??"I agree to the terms",e.validationMessage="You must agree to continue";const n=document.createElement("span");return n.slot="error",n.textContent="You must agree to continue",e.appendChild(n),e},play:async({canvasElement:t})=>{const e=t.querySelector("orchestra-checkbox");a(e).toBeTruthy(),await l(()=>{a(e?.shadowRoot?.querySelector("input")).toBeTruthy()});const n=e?.querySelector('[slot="error"]');a(n).toBeTruthy(),a(n?.textContent).toContain("You must agree to continue")}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    htmlId: 'checkbox-example',
    label: 'Accept terms and conditions'
  },
  render: args => {
    const checkbox = document.createElement('orchestra-checkbox') as HTMLElement & {
      checked?: boolean;
      indeterminate?: boolean;
      disabled?: boolean;
      name?: string;
      value?: string;
      htmlId?: string;
      label?: string;
      ariaLabel?: string;
    };
    checkbox.htmlId = args.htmlId ?? 'checkbox-example';
    checkbox.label = args.label ?? 'Accept terms and conditions';
    checkbox.name = 'terms';
    checkbox.value = 'accept';
    checkbox.checked = args.checked ?? false;
    checkbox.indeterminate = args.indeterminate ?? false;
    checkbox.disabled = args.disabled ?? false;
    checkbox.ariaLabel = args.label ?? 'Accept terms and conditions';
    return checkbox;
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

    // Click again to restore initial unchecked state for story display
    if (input) {
      await userEvent.click(input);
    }
    await waitFor(() => {
      expect(input?.checked).toBe(false);
    });
  }
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true,
    indeterminate: true,
    disabled: false,
    htmlId: 'checkbox-indeterminate',
    label: 'Partially selected items'
  },
  render: args => {
    const checkbox = document.createElement('orchestra-checkbox') as HTMLElement & {
      checked?: boolean;
      indeterminate?: boolean;
      disabled?: boolean;
      name?: string;
      value?: string;
      htmlId?: string;
      label?: string;
      ariaLabel?: string;
    };
    checkbox.htmlId = args.htmlId ?? 'checkbox-indeterminate';
    checkbox.label = args.label ?? 'Partially selected items';
    checkbox.name = 'items';
    checkbox.value = 'partial';
    checkbox.checked = args.checked ?? true;
    checkbox.indeterminate = args.indeterminate ?? true;
    checkbox.disabled = args.disabled ?? false;
    checkbox.ariaLabel = args.label ?? 'Partially selected items';
    return checkbox;
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
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    htmlId: 'checkbox-agreement',
    label: 'I agree to the terms'
  },
  render: args => {
    const checkbox = document.createElement('orchestra-checkbox') as HTMLElement & {
      checked?: boolean;
      indeterminate?: boolean;
      disabled?: boolean;
      name?: string;
      value?: string;
      htmlId?: string;
      label?: string;
      ariaLabel?: string;
      validationMessage?: string;
    };
    checkbox.htmlId = args.htmlId ?? 'checkbox-agreement';
    checkbox.label = args.label ?? 'I agree to the terms';
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
    return checkbox;
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
}`,...s.parameters?.docs?.source}}};const d=["Default","Indeterminate","WithError"],h=Object.freeze(Object.defineProperty({__proto__:null,Default:o,Indeterminate:r,WithError:s,__namedExportsOrder:d,default:i},Symbol.toStringTag,{value:"Module"}));export{h as C,o as D};
//# sourceMappingURL=checkbox.stories-B4hdf9fc.js.map
