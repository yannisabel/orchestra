const s={component:"orchestra-checkbox",title:"Components/orchestra-checkbox",parameters:{test:{autoplay:!1}},decorators:[e=>(setTimeout(()=>{const l=document.activeElement;(l?.tagName==="ORCHESTRA-CHECKBOX"||l?.shadowRoot?.activeElement)&&l?.blur?.()},100),e())],argTypes:{checked:{control:"boolean",description:"A boolean indicating the checked state of the checkbox.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},indeterminate:{control:"boolean",description:"A boolean indicating the indeterminate state (mixed/partial selection). Shows a dash/minus sign.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{control:"boolean",description:"A boolean indicating the disable state of the checkbox.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},name:{type:{name:"string"},control:"text",description:"A string representing the name of the checkbox for form submission."},value:{type:{name:"string"},control:"text",description:"A string representing the value of the checkbox for form submission.",table:{defaultValue:{summary:"on"}}},htmlId:{type:{name:"string"},control:"text",description:"The unique identifier for the checkbox input. Used to associate with external label elements."},label:{type:{name:"string"},control:"text",description:"Label text to associate with the checkbox (rendered as external label element)."}}},t={args:{checked:!1,indeterminate:!1,disabled:!1,htmlId:"checkbox-example",label:"Accept terms and conditions"},render:e=>`
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <orchestra-checkbox
        html-id="${e.htmlId}"
        name="terms"
        value="accept"
        ${e.checked?"checked":""}
        ${e.indeterminate?"indeterminate":""}
        ${e.disabled?"disabled":""}
      ></orchestra-checkbox>
      <label for="${e.htmlId}" style="cursor: pointer;">
        ${e.label}
      </label>
    </div>
  `},a={args:{checked:!0,indeterminate:!1,disabled:!1,htmlId:"checkbox-checked",label:"Terms accepted"},render:e=>`
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <orchestra-checkbox
        html-id="${e.htmlId}"
        name="terms"
        value="accept"
        checked
        ${e.disabled?"disabled":""}
      ></orchestra-checkbox>
      <label for="${e.htmlId}" style="cursor: pointer;">
        ${e.label}
      </label>
    </div>
  `},r={args:{checked:!1,indeterminate:!0,disabled:!1,htmlId:"checkbox-indeterminate",label:"Partially selected items"},render:e=>`
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <orchestra-checkbox
        html-id="${e.htmlId}"
        name="items"
        value="partial"
        indeterminate
        ${e.disabled?"disabled":""}
      ></orchestra-checkbox>
      <label for="${e.htmlId}" style="cursor: pointer;">
        ${e.label}
      </label>
    </div>
  `};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    htmlId: 'checkbox-example',
    label: 'Accept terms and conditions'
  },
  render: args => \`
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <orchestra-checkbox
        html-id="\${args.htmlId}"
        name="terms"
        value="accept"
        \${args.checked ? 'checked' : ''}
        \${args.indeterminate ? 'indeterminate' : ''}
        \${args.disabled ? 'disabled' : ''}
      ></orchestra-checkbox>
      <label for="\${args.htmlId}" style="cursor: pointer;">
        \${args.label}
      </label>
    </div>
  \`
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true,
    indeterminate: false,
    disabled: false,
    htmlId: 'checkbox-checked',
    label: 'Terms accepted'
  },
  render: args => \`
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <orchestra-checkbox
        html-id="\${args.htmlId}"
        name="terms"
        value="accept"
        checked
        \${args.disabled ? 'disabled' : ''}
      ></orchestra-checkbox>
      <label for="\${args.htmlId}" style="cursor: pointer;">
        \${args.label}
      </label>
    </div>
  \`
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    indeterminate: true,
    disabled: false,
    htmlId: 'checkbox-indeterminate',
    label: 'Partially selected items'
  },
  render: args => \`
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <orchestra-checkbox
        html-id="\${args.htmlId}"
        name="items"
        value="partial"
        indeterminate
        \${args.disabled ? 'disabled' : ''}
      ></orchestra-checkbox>
      <label for="\${args.htmlId}" style="cursor: pointer;">
        \${args.label}
      </label>
    </div>
  \`
}`,...r.parameters?.docs?.source}}};const c=["Default","Checked","Indeterminate"],i=Object.freeze(Object.defineProperty({__proto__:null,Checked:a,Default:t,Indeterminate:r,__namedExportsOrder:c,default:s},Symbol.toStringTag,{value:"Module"}));export{i as C,t as D};
//# sourceMappingURL=checkbox.stories-D1aHzPU6.js.map
