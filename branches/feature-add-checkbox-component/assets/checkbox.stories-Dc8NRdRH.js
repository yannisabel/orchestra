const{expect:c,waitFor:s}=__STORYBOOK_MODULE_TEST__,i={component:"orchestra-checkbox",title:"Components/orchestra-checkbox",parameters:{test:{autoplay:!1}},decorators:[t=>(setTimeout(()=>{const n=document.activeElement;(n?.tagName==="ORCHESTRA-CHECKBOX"||n?.shadowRoot?.activeElement)&&n?.blur?.()},100),t())],argTypes:{checked:{control:"boolean",description:"A boolean indicating the checked state of the checkbox.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},indeterminate:{control:"boolean",description:"A boolean indicating the indeterminate state (mixed/partial selection). Shows a dash/minus sign.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{control:"boolean",description:"A boolean indicating the disable state of the checkbox.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},name:{type:{name:"string"},control:"text",description:"A string representing the name of the checkbox for form submission."},value:{type:{name:"string"},control:"text",description:"A string representing the value of the checkbox for form submission.",table:{defaultValue:{summary:"on"}}},htmlId:{type:{name:"string"},control:"text",description:"The unique identifier for the checkbox input. Used to associate with external label elements."},label:{type:{name:"string"},control:"text",description:"Label text to associate with the checkbox (rendered as external label element)."}}},o={args:{checked:!1,indeterminate:!1,disabled:!1,htmlId:"checkbox-example",label:"Accept terms and conditions"},render:t=>{const n=document.createElement("div");n.style.display="flex",n.style.alignItems="center",n.style.gap="0.5rem";const e=document.createElement("orchestra-checkbox"),a=document.createElement("label"),r=`${t.htmlId??"checkbox-default"}-label`;return a.id=r,a.textContent=t.label??"Accept terms and conditions",a.style.cursor="pointer",e.htmlId=t.htmlId??"checkbox-example",e.name="terms",e.value="accept",e.checked=t.checked??!1,e.indeterminate=t.indeterminate??!1,e.disabled=t.disabled??!1,e.ariaLabel=t.label??"Accept terms and conditions",n.append(e,a),n},play:async({canvasElement:t,userEvent:n})=>{const e=t.querySelector("orchestra-checkbox");c(e).toBeTruthy(),await s(()=>{c(e?.shadowRoot?.querySelector("input")).toBeTruthy()});const a=e?.shadowRoot?.querySelector("input");c(a?.checked).toBe(!1),c(a?.indeterminate).toBe(!1),c(a?.disabled).toBe(!1),a&&await n.click(a),await s(()=>{c(a?.checked).toBe(!0),c(a?.indeterminate).toBe(!1)})}},l={args:{checked:!0,indeterminate:!0,disabled:!1,htmlId:"checkbox-indeterminate",label:"Partially selected items"},render:t=>{const n=document.createElement("div");n.style.display="flex",n.style.alignItems="center",n.style.gap="0.5rem";const e=document.createElement("orchestra-checkbox"),a=document.createElement("label"),r=`${t.htmlId??"checkbox-indeterminate"}-label`;return a.id=r,a.textContent=t.label??"Partially selected items",a.style.cursor="pointer",e.htmlId=t.htmlId??"checkbox-indeterminate",e.name="items",e.value="partial",e.checked=t.checked??!0,e.indeterminate=t.indeterminate??!0,e.disabled=t.disabled??!1,e.ariaLabel=t.label??"Partially selected items",n.append(e,a),n},play:async({canvasElement:t})=>{const n=t.querySelector("orchestra-checkbox");c(n).toBeTruthy(),await s(()=>{c(n?.shadowRoot?.querySelector("input")).toBeTruthy()});const e=n?.shadowRoot?.querySelector("input");c(e?.indeterminate).toBe(!0),c(e?.checked).toBe(!0),c(e?.disabled).toBe(!1)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const d=["Default","Indeterminate"],m=Object.freeze(Object.defineProperty({__proto__:null,Default:o,Indeterminate:l,__namedExportsOrder:d,default:i},Symbol.toStringTag,{value:"Module"}));export{m as C,o as D};
//# sourceMappingURL=checkbox.stories-Dc8NRdRH.js.map
