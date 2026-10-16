const o={title:"Accessibility/Consumer Interface",render:()=>{const e=document.createElement("section");e.setAttribute("aria-label","Preferences"),e.innerHTML=`
      <orchestra-checkbox label="Accept privacy policy"></orchestra-checkbox>
      <orchestra-button text="Save changes"></orchestra-button>
      <orchestra-button text="Unavailable action" disabled></orchestra-button>
      <orchestra-icon name="checkbox-check" size="24px" label="Completed"></orchestra-icon>
      <orchestra-icon name="checkbox-check" size="24px"></orchestra-icon>
      <p role="status">Not saved</p>
    `;let r=0;return e.querySelector("orchestra-button")?.addEventListener("click",()=>{r+=1;const c=e.querySelector('[role="status"]');c&&(c.textContent=`Saved ${r} ${r===1?"time":"times"}`)}),e}},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const s=["Preferences"];export{t as Preferences,s as __namedExportsOrder,o as default};
//# sourceMappingURL=consumer-interface.stories-DCtl9SAW.js.map
