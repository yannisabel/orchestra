const{expect:n,waitFor:l}=__STORYBOOK_MODULE_TEST__,s={component:"orchestra-checkbox",title:"Components/orchestra-checkbox",parameters:{test:{autoplay:!1}},decorators:[t=>(setTimeout(()=>{const e=document.activeElement;(e?.tagName==="ORCHESTRA-CHECKBOX"||e?.shadowRoot?.activeElement)&&e?.blur?.()},100),t())],argTypes:{checked:{control:"boolean",description:"A boolean indicating the checked state of the checkbox.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},indeterminate:{control:"boolean",description:"A boolean indicating the indeterminate state (mixed/partial selection). Shows a dash/minus sign.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{control:"boolean",description:"A boolean indicating the disable state of the checkbox.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},name:{type:{name:"string"},control:"text",description:"A string representing the name of the checkbox for form submission."},value:{type:{name:"string"},control:"text",description:"A string representing the value of the checkbox for form submission.",table:{defaultValue:{summary:"on"}}},htmlId:{type:{name:"string"},control:"text",description:"The unique identifier for the checkbox input. Used to associate with external label elements."},label:{type:{name:"string"},control:"text",description:"Label text to associate with the checkbox (rendered as external label element)."}}},o={args:{checked:!1,indeterminate:!1,disabled:!1,htmlId:"checkbox-example",label:"Accept terms and conditions"},render:t=>{const e=document.createElement("orchestra-checkbox");return e.htmlId=t.htmlId??"checkbox-example",e.label=t.label??"Accept terms and conditions",e.name="terms",e.value="accept",e.checked=t.checked??!1,e.indeterminate=t.indeterminate??!1,e.disabled=t.disabled??!1,e.ariaLabel=t.label??"Accept terms and conditions",e},play:async({canvasElement:t})=>{const e=t.querySelector("orchestra-checkbox");n(e).toBeTruthy(),await l(()=>{n(e?.shadowRoot?.querySelector("input")).toBeTruthy()});const a=e?.shadowRoot?.querySelector("input");n(a?.checked).toBe(!1),n(a?.indeterminate).toBe(!1),n(a?.disabled).toBe(!1)}},c={args:{checked:!0,indeterminate:!0,disabled:!1,htmlId:"checkbox-indeterminate",label:"Partially selected items"},render:t=>{const e=document.createElement("orchestra-checkbox");return e.htmlId=t.htmlId??"checkbox-indeterminate",e.label=t.label??"Partially selected items",e.name="items",e.value="partial",e.checked=t.checked??!0,e.indeterminate=t.indeterminate??!0,e.disabled=t.disabled??!1,e.ariaLabel=t.label??"Partially selected items",e},play:async({canvasElement:t})=>{const e=t.querySelector("orchestra-checkbox");n(e).toBeTruthy(),await l(()=>{n(e?.shadowRoot?.querySelector("input")).toBeTruthy()});const a=e?.shadowRoot?.querySelector("input");await l(()=>{n(a?.indeterminate).toBe(!0)}),n(a?.checked).toBe(!0),n(a?.disabled).toBe(!1)}},r={args:{checked:!1,indeterminate:!1,disabled:!1,htmlId:"checkbox-agreement",label:"I agree to the terms"},render:t=>{const e=document.createElement("orchestra-checkbox");e.htmlId=t.htmlId??"checkbox-agreement",e.label=t.label??"I agree to the terms",e.name="agreement",e.value="agreed",e.checked=t.checked??!1,e.indeterminate=t.indeterminate??!1,e.disabled=t.disabled??!1,e.ariaLabel=t.label??"I agree to the terms",e.validationMessage="You must agree to continue";const a=document.createElement("span");return a.slot="error",a.textContent="You must agree to continue",e.appendChild(a),e},play:async({canvasElement:t})=>{const e=t.querySelector("orchestra-checkbox");n(e).toBeTruthy(),await l(()=>{n(e?.shadowRoot?.querySelector("input")).toBeTruthy()});const a=e?.querySelector('[slot="error"]');n(a).toBeTruthy(),n(a?.textContent).toContain("You must agree to continue")}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
    canvasElement
  }) => {
    const checkbox = canvasElement.querySelector('orchestra-checkbox');
    expect(checkbox).toBeTruthy();
    await waitFor(() => {
      expect(checkbox?.shadowRoot?.querySelector('input')).toBeTruthy();
    });
    const input = checkbox?.shadowRoot?.querySelector('input') as HTMLInputElement | null;

    // Verify initial state without modifying (no clicks)
    expect(input?.checked).toBe(false);
    expect(input?.indeterminate).toBe(false);
    expect(input?.disabled).toBe(false);
  }
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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

    // Wait for indeterminate property to be set by component lifecycle
    await waitFor(() => {
      expect(input?.indeterminate).toBe(true);
    });
    expect(input?.checked).toBe(true);
    expect(input?.disabled).toBe(false);
  }
}`,...c.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const i=["Default","Indeterminate","WithError"],d=Object.freeze(Object.defineProperty({__proto__:null,Default:o,Indeterminate:c,WithError:r,__namedExportsOrder:i,default:s},Symbol.toStringTag,{value:"Module"}));export{d as C,o as D};
//# sourceMappingURL=checkbox.stories-DInEm3OO.js.map
