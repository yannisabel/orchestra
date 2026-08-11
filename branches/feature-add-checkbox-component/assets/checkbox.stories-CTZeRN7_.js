const{expect:a,waitFor:d}=__STORYBOOK_MODULE_TEST__,b={component:"orchestra-checkbox",title:"Components/orchestra-checkbox",parameters:{test:{autoplay:!1}},decorators:[c=>(setTimeout(()=>{const n=document.activeElement;(n?.tagName==="ORCHESTRA-CHECKBOX"||n?.shadowRoot?.activeElement)&&n?.blur?.()},100),c())],argTypes:{checked:{control:"boolean",description:"A boolean indicating the checked state of the checkbox.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},indeterminate:{control:"boolean",description:"A boolean indicating the indeterminate state (mixed/partial selection). Shows a dash/minus sign.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{control:"boolean",description:"A boolean indicating the disable state of the checkbox.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},name:{type:{name:"string"},control:"text",description:"A string representing the name of the checkbox for form submission."},value:{type:{name:"string"},control:"text",description:"A string representing the value of the checkbox for form submission.",table:{defaultValue:{summary:"on"}}},htmlId:{type:{name:"string"},control:"text",description:"The unique identifier for the checkbox input. Used to associate with external label elements."},label:{type:{name:"string"},control:"text",description:"Label text to associate with the checkbox (rendered as external label element)."}}},l={args:{checked:!1,indeterminate:!1,disabled:!1,htmlId:"checkbox-example",label:"Accept terms and conditions"},render:c=>{const n=document.createElement("div");n.style.display="flex",n.style.alignItems="center",n.style.gap="0.5rem";const e=document.createElement("orchestra-checkbox"),t=document.createElement("label"),o=c.htmlId??"checkbox-example";return t.htmlFor=o,t.textContent=c.label??"Accept terms and conditions",t.style.cursor="pointer",e.htmlId=o,e.name="terms",e.value="accept",e.checked=c.checked??!1,e.indeterminate=c.indeterminate??!1,e.disabled=c.disabled??!1,e.ariaLabel=c.label??"Accept terms and conditions",t.addEventListener("click",r=>{r.preventDefault(),e.disabled||(e.checked=!e.checked)}),n.append(e,t),n},play:async({canvasElement:c,userEvent:n})=>{const e=c.querySelector("orchestra-checkbox");a(e).toBeTruthy(),await d(()=>{a(e?.shadowRoot?.querySelector("input")).toBeTruthy()});const t=e?.shadowRoot?.querySelector("input");a(t?.checked).toBe(!1),a(t?.indeterminate).toBe(!1),a(t?.disabled).toBe(!1),t&&await n.click(t),await d(()=>{a(t?.checked).toBe(!0),a(t?.indeterminate).toBe(!1)})}},s={args:{checked:!0,indeterminate:!0,disabled:!1,htmlId:"checkbox-indeterminate",label:"Partially selected items"},render:c=>{const n=document.createElement("div");n.style.display="flex",n.style.alignItems="center",n.style.gap="0.5rem";const e=document.createElement("orchestra-checkbox"),t=document.createElement("label"),o=c.htmlId??"checkbox-indeterminate";return t.htmlFor=o,t.textContent=c.label??"Partially selected items",t.style.cursor="pointer",e.htmlId=o,e.name="items",e.value="partial",e.checked=c.checked??!0,e.indeterminate=c.indeterminate??!0,e.disabled=c.disabled??!1,e.ariaLabel=c.label??"Partially selected items",t.addEventListener("click",r=>{r.preventDefault(),e.disabled||(e.checked=!e.checked)}),n.append(e,t),n},play:async({canvasElement:c})=>{const n=c.querySelector("orchestra-checkbox");a(n).toBeTruthy(),await d(()=>{a(n?.shadowRoot?.querySelector("input")).toBeTruthy()});const e=n?.shadowRoot?.querySelector("input");a(e?.indeterminate).toBe(!0),a(e?.checked).toBe(!0),a(e?.disabled).toBe(!1)}},i={args:{checked:!1,indeterminate:!1,disabled:!1,htmlId:"checkbox-agreement",label:"I agree to the terms"},render:c=>{const n=document.createElement("div");n.style.display="flex",n.style.flexDirection="column",n.style.gap="0.5rem";const e=document.createElement("div");e.style.display="flex",e.style.alignItems="flex-start",e.style.gap="0.5rem";const t=document.createElement("orchestra-checkbox"),o=document.createElement("label"),r=c.htmlId??"checkbox-agreement";o.htmlFor=r,o.textContent=c.label??"I agree to the terms",o.style.cursor="pointer",t.htmlId=r,t.name="agreement",t.value="agreed",t.checked=c.checked??!1,t.indeterminate=c.indeterminate??!1,t.disabled=c.disabled??!1,t.ariaLabel=c.label??"I agree to the terms",t.validationMessage="You must agree to continue";const h=document.createElement("span");return h.slot="error",h.textContent="You must agree to continue",o.addEventListener("click",m=>{m.preventDefault(),t.disabled||(t.checked=!t.checked)}),t.appendChild(h),e.append(t,o),n.appendChild(e),n},play:async({canvasElement:c})=>{const n=c.querySelector("orchestra-checkbox");a(n).toBeTruthy(),await d(()=>{a(n?.shadowRoot?.querySelector("input")).toBeTruthy()});const e=n?.querySelector('[slot="error"]');a(e).toBeTruthy(),a(e?.textContent).toContain("You must agree to continue")}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
    const checkboxId = args.htmlId ?? 'checkbox-example';
    label.htmlFor = checkboxId;
    label.textContent = args.label ?? 'Accept terms and conditions';
    label.style.cursor = 'pointer';
    checkbox.htmlId = checkboxId;
    checkbox.name = 'terms';
    checkbox.value = 'accept';
    checkbox.checked = args.checked ?? false;
    checkbox.indeterminate = args.indeterminate ?? false;
    checkbox.disabled = args.disabled ?? false;
    checkbox.ariaLabel = args.label ?? 'Accept terms and conditions';

    // Handle label click to toggle checkbox (web component shadow DOM)
    label.addEventListener('click', e => {
      e.preventDefault();
      if (!checkbox.disabled) {
        checkbox.checked = !checkbox.checked;
      }
    });
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
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
    const checkboxId = args.htmlId ?? 'checkbox-indeterminate';
    label.htmlFor = checkboxId;
    label.textContent = args.label ?? 'Partially selected items';
    label.style.cursor = 'pointer';
    checkbox.htmlId = checkboxId;
    checkbox.name = 'items';
    checkbox.value = 'partial';
    checkbox.checked = args.checked ?? true;
    checkbox.indeterminate = args.indeterminate ?? true;
    checkbox.disabled = args.disabled ?? false;
    checkbox.ariaLabel = args.label ?? 'Partially selected items';

    // Handle label click to toggle checkbox (web component shadow DOM)
    label.addEventListener('click', e => {
      e.preventDefault();
      if (!checkbox.disabled) {
        checkbox.checked = !checkbox.checked;
      }
    });
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
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    htmlId: 'checkbox-agreement',
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
    const checkboxId = args.htmlId ?? 'checkbox-agreement';
    label.htmlFor = checkboxId;
    label.textContent = args.label ?? 'I agree to the terms';
    label.style.cursor = 'pointer';
    checkbox.htmlId = checkboxId;
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

    // Handle label click to toggle checkbox (web component shadow DOM)
    label.addEventListener('click', e => {
      e.preventDefault();
      if (!checkbox.disabled) {
        checkbox.checked = !checkbox.checked;
      }
    });
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
}`,...i.parameters?.docs?.source}}};const u=["Default","Indeterminate","WithError"],p=Object.freeze(Object.defineProperty({__proto__:null,Default:l,Indeterminate:s,WithError:i,__namedExportsOrder:u,default:b},Symbol.toStringTag,{value:"Module"}));export{p as C,l as D};
//# sourceMappingURL=checkbox.stories-CTZeRN7_.js.map
