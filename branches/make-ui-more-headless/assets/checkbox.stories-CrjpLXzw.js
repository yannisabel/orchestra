import{r as p}from"./iframe-CbbhJtEC.js";import{b as r}from"./lit-DiJmft_s.js";import{c as k}from"./index-gaHCqlrM.js";const{expect:t,fn:x,userEvent:y,waitFor:a}=__STORYBOOK_MODULE_TEST__,b="checkbox-custom",g={cross:'<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 2L12 10L20 2L22 4L14 12L22 20L20 22L12 14L4 22L2 20L10 12L2 4Z" fill="currentColor"/></svg>',bar:'<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="10" width="18" height="4" fill="currentColor"/></svg>'};p(b,{resolver:e=>g[e]??""});const f={component:"orchestra-checkbox",title:"Components/orchestra-checkbox",parameters:{test:{autoplay:!1}},decorators:[e=>(setTimeout(()=>{const c=document.activeElement;(c?.tagName==="ORCHESTRA-CHECKBOX"||c?.shadowRoot?.activeElement)&&c?.blur?.()},100),e())],argTypes:{checked:{control:"boolean",description:"A boolean indicating the checked state of the checkbox.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},indeterminate:{control:"boolean",description:"A boolean indicating the indeterminate state (mixed/partial selection). Shows a dash/minus sign.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{control:"boolean",description:"A boolean indicating the disable state of the checkbox.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},name:{type:{name:"string"},control:"text",description:"A string representing the name of the checkbox for form submission."},value:{type:{name:"string"},control:"text",description:"A string representing the value of the checkbox for form submission.",table:{defaultValue:{summary:"on"}}},htmlId:{type:{name:"string"},control:"text",description:"The unique identifier for the checkbox input. Sets the id of the native input and the for attribute of the internal label."},label:{type:{name:"string"},control:"text",description:"Required. Visible label text rendered next to the checkbox. It also provides the checkbox accessible name.",table:{type:{summary:"string"}}}}},s={args:{label:"Accept privacy policy"},parameters:{docs:{source:{code:'<orchestra-checkbox label="Accept privacy policy"></orchestra-checkbox>'}}},render:e=>r`
    <orchestra-checkbox label=${e.label}></orchestra-checkbox>
  `,play:async({canvasElement:e})=>{const c=await k(e).findByShadowRole("checkbox",{name:"Accept privacy policy"});t(c).toBeVisible(),t(c).not.toBeChecked();const o=e.querySelector("orchestra-checkbox"),m=x();o?.addEventListener("orchestraChange",m);const u=o?.shadowRoot?.querySelector("label");t(u).toBeTruthy(),u?.click(),await a(()=>t(c).toBeChecked()),await a(()=>t(o?.checked).toBe(!0)),t(m).toHaveBeenCalledTimes(1),await y.click(c),await a(()=>t(c).not.toBeChecked()),await a(()=>t(o?.checked).toBe(!1)),t(m).toHaveBeenCalledTimes(2)}},n={args:{checked:!1,indeterminate:!1,disabled:!1,htmlId:"checkbox-example",label:"Accept terms and conditions"},parameters:{docs:{source:{code:`<orchestra-checkbox
  html-id="checkbox-example"
  label="Accept terms and conditions"
  name="terms"
  value="accept"
></orchestra-checkbox>`}}},render:e=>r`
    <orchestra-checkbox
      html-id=${e.htmlId??"checkbox-example"}
      label=${e.label??"Accept terms and conditions"}
      name="terms"
      value="accept"
      ?checked=${e.checked??!1}
      ?indeterminate=${e.indeterminate??!1}
      ?disabled=${e.disabled??!1}
    ></orchestra-checkbox>
  `,play:async({canvasElement:e})=>{const c=e.querySelector("orchestra-checkbox");t(c).toBeTruthy(),await a(()=>{t(c?.shadowRoot?.querySelector("input")).toBeTruthy()});const o=c?.shadowRoot?.querySelector("input");t(o?.checked).toBe(!1),t(o?.indeterminate).toBe(!1),t(o?.disabled).toBe(!1)}},l={args:{checked:!0,indeterminate:!0,disabled:!1,htmlId:"checkbox-indeterminate",label:"Partially selected items"},parameters:{docs:{source:{code:`<orchestra-checkbox
  html-id="checkbox-indeterminate"
  label="Partially selected items"
  name="items"
  value="partial"
  checked
  indeterminate
></orchestra-checkbox>`}}},render:e=>r`
    <orchestra-checkbox
      html-id=${e.htmlId??"checkbox-indeterminate"}
      label=${e.label??"Partially selected items"}
      name="items"
      value="partial"
      ?checked=${e.checked??!0}
      ?indeterminate=${e.indeterminate??!0}
      ?disabled=${e.disabled??!1}
    ></orchestra-checkbox>
  `,play:async({canvasElement:e})=>{const c=e.querySelector("orchestra-checkbox");t(c).toBeTruthy(),await a(()=>{t(c?.shadowRoot?.querySelector("input")).toBeTruthy()});const o=c?.shadowRoot?.querySelector("input");await a(()=>{t(o?.indeterminate).toBe(!0)}),t(o?.checked).toBe(!0),t(o?.disabled).toBe(!1)}},i={args:{checked:!1,indeterminate:!1,disabled:!1,htmlId:"checkbox-agreement",label:"I agree to the terms"},parameters:{docs:{source:{code:`<orchestra-checkbox
  html-id="checkbox-agreement"
  label="I agree to the terms"
  name="agreement"
  value="agreed"
  validation-message="You must agree to continue"
>
  <span slot="error">You must agree to continue</span>
</orchestra-checkbox>`}}},render:e=>r`
    <orchestra-checkbox
      html-id=${e.htmlId??"checkbox-agreement"}
      label=${e.label??"I agree to the terms"}
      name="agreement"
      value="agreed"
      validation-message="You must agree to continue"
      ?checked=${e.checked??!1}
      ?indeterminate=${e.indeterminate??!1}
      ?disabled=${e.disabled??!1}
    >
      <span slot="error">You must agree to continue</span>
    </orchestra-checkbox>
  `,play:async({canvasElement:e})=>{const c=e.querySelector("orchestra-checkbox");t(c).toBeTruthy(),await a(()=>{t(c?.shadowRoot?.querySelector("input")).toBeTruthy()});const o=c?.querySelector('[slot="error"]');t(o).toBeTruthy(),t(o?.textContent).toContain("You must agree to continue")}},h={parameters:{docs:{source:{code:`<orchestra-checkbox
  label="Checked with cross icon"
  checked
  icon-library="checkbox-custom"
  icon-names="cross,bar"
></orchestra-checkbox>`}}},render:()=>r`
    <orchestra-checkbox
      label="Checked with cross icon"
      checked
      icon-library="checkbox-custom"
      icon-names="cross,bar"
    ></orchestra-checkbox>
  `,play:async({canvasElement:e})=>{const c=e.querySelector("orchestra-checkbox");t(c).toBeTruthy();const o=c?.shadowRoot?.querySelector('[part="icon"]');t(o?.name).toBe("cross"),t(o?.library).toBe(b),await a(()=>{t(o?.shadowRoot?.querySelector("svg")).toBeTruthy()})}},d={parameters:{docs:{source:{code:`<orchestra-checkbox
  label="Partially selected with custom icon"
  checked
  indeterminate
  icon-library="checkbox-custom"
  icon-names="cross,bar"
></orchestra-checkbox>`}}},render:()=>r`
    <orchestra-checkbox
      label="Partially selected with custom icon"
      checked
      indeterminate
      icon-library="checkbox-custom"
      icon-names="cross,bar"
    ></orchestra-checkbox>
  `,play:async({canvasElement:e})=>{const c=e.querySelector("orchestra-checkbox");t(c).toBeTruthy();const o=c?.shadowRoot?.querySelector('[part="icon"]');t(o?.name).toBe("bar"),t(o?.library).toBe(b),await a(()=>{t(o?.shadowRoot?.querySelector("svg")).toBeTruthy()})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Accept privacy policy'
  },
  parameters: {
    docs: {
      source: {
        code: \`<orchestra-checkbox label="Accept privacy policy"></orchestra-checkbox>\`
      }
    }
  },
  render: args => html\`
    <orchestra-checkbox label=\${args.label}></orchestra-checkbox>
  \`,
  play: async ({
    canvasElement
  }) => {
    const input = await within(canvasElement).findByShadowRole('checkbox', {
      name: 'Accept privacy policy'
    });
    expect(input).toBeVisible();
    expect(input).not.toBeChecked();
    const checkbox = canvasElement.querySelector<HTMLElement & Components.OrchestraCheckbox>('orchestra-checkbox');
    const onChange = fn();
    checkbox?.addEventListener('orchestraChange', onChange);
    const label = checkbox?.shadowRoot?.querySelector('label');
    expect(label).toBeTruthy();
    label?.click();
    await waitFor(() => expect(input).toBeChecked());
    await waitFor(() => expect(checkbox?.checked).toBe(true));
    expect(onChange).toHaveBeenCalledTimes(1);
    await userEvent.click(input);
    await waitFor(() => expect(input).not.toBeChecked());
    await waitFor(() => expect(checkbox?.checked).toBe(false));
    expect(onChange).toHaveBeenCalledTimes(2);
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    htmlId: 'checkbox-example',
    label: 'Accept terms and conditions'
  },
  parameters: {
    docs: {
      source: {
        code: \`<orchestra-checkbox
  html-id="checkbox-example"
  label="Accept terms and conditions"
  name="terms"
  value="accept"
></orchestra-checkbox>\`
      }
    }
  },
  render: args => html\`
    <orchestra-checkbox
      html-id=\${args.htmlId ?? 'checkbox-example'}
      label=\${args.label ?? 'Accept terms and conditions'}
      name="terms"
      value="accept"
      ?checked=\${args.checked ?? false}
      ?indeterminate=\${args.indeterminate ?? false}
      ?disabled=\${args.disabled ?? false}
    ></orchestra-checkbox>
  \`,
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
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true,
    indeterminate: true,
    disabled: false,
    htmlId: 'checkbox-indeterminate',
    label: 'Partially selected items'
  },
  parameters: {
    docs: {
      source: {
        code: \`<orchestra-checkbox
  html-id="checkbox-indeterminate"
  label="Partially selected items"
  name="items"
  value="partial"
  checked
  indeterminate
></orchestra-checkbox>\`
      }
    }
  },
  render: args => html\`
    <orchestra-checkbox
      html-id=\${args.htmlId ?? 'checkbox-indeterminate'}
      label=\${args.label ?? 'Partially selected items'}
      name="items"
      value="partial"
      ?checked=\${args.checked ?? true}
      ?indeterminate=\${args.indeterminate ?? true}
      ?disabled=\${args.disabled ?? false}
    ></orchestra-checkbox>
  \`,
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
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    htmlId: 'checkbox-agreement',
    label: 'I agree to the terms'
  },
  parameters: {
    docs: {
      source: {
        code: \`<orchestra-checkbox
  html-id="checkbox-agreement"
  label="I agree to the terms"
  name="agreement"
  value="agreed"
  validation-message="You must agree to continue"
>
  <span slot="error">You must agree to continue</span>
</orchestra-checkbox>\`
      }
    }
  },
  render: args => html\`
    <orchestra-checkbox
      html-id=\${args.htmlId ?? 'checkbox-agreement'}
      label=\${args.label ?? 'I agree to the terms'}
      name="agreement"
      value="agreed"
      validation-message="You must agree to continue"
      ?checked=\${args.checked ?? false}
      ?indeterminate=\${args.indeterminate ?? false}
      ?disabled=\${args.disabled ?? false}
    >
      <span slot="error">You must agree to continue</span>
    </orchestra-checkbox>
  \`,
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
}`,...i.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      source: {
        code: \`<orchestra-checkbox
  label="Checked with cross icon"
  checked
  icon-library="checkbox-custom"
  icon-names="cross,bar"
></orchestra-checkbox>\`
      }
    }
  },
  render: () => html\`
    <orchestra-checkbox
      label="Checked with cross icon"
      checked
      icon-library="checkbox-custom"
      icon-names="cross,bar"
    ></orchestra-checkbox>
  \`,
  play: async ({
    canvasElement
  }) => {
    const checkbox = canvasElement.querySelector('orchestra-checkbox');
    expect(checkbox).toBeTruthy();
    const icon = checkbox?.shadowRoot?.querySelector<HTMLElement & Components.OrchestraIcon>('[part="icon"]');
    expect(icon?.name).toBe('cross');
    expect(icon?.library).toBe(CUSTOM_ICON_LIBRARY);
    await waitFor(() => {
      expect(icon?.shadowRoot?.querySelector('svg')).toBeTruthy();
    });
  }
}`,...h.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      source: {
        code: \`<orchestra-checkbox
  label="Partially selected with custom icon"
  checked
  indeterminate
  icon-library="checkbox-custom"
  icon-names="cross,bar"
></orchestra-checkbox>\`
      }
    }
  },
  render: () => html\`
    <orchestra-checkbox
      label="Partially selected with custom icon"
      checked
      indeterminate
      icon-library="checkbox-custom"
      icon-names="cross,bar"
    ></orchestra-checkbox>
  \`,
  play: async ({
    canvasElement
  }) => {
    const checkbox = canvasElement.querySelector('orchestra-checkbox');
    expect(checkbox).toBeTruthy();
    const icon = checkbox?.shadowRoot?.querySelector<HTMLElement & Components.OrchestraIcon>('[part="icon"]');
    expect(icon?.name).toBe('bar');
    expect(icon?.library).toBe(CUSTOM_ICON_LIBRARY);
    await waitFor(() => {
      expect(icon?.shadowRoot?.querySelector('svg')).toBeTruthy();
    });
  }
}`,...d.parameters?.docs?.source}}};const w=["AccessibleLabel","Default","Indeterminate","WithError","CustomIcons","CustomIconIndeterminate"],C=Object.freeze(Object.defineProperty({__proto__:null,AccessibleLabel:s,CustomIconIndeterminate:d,CustomIcons:h,Default:n,Indeterminate:l,WithError:i,__namedExportsOrder:w,default:f},Symbol.toStringTag,{value:"Module"}));export{C,n as D,h as a,d as b};
//# sourceMappingURL=checkbox.stories-CrjpLXzw.js.map
