import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Anchor } from '@ochestra/02-symbols/anchors/Anchor';
export const ButtonWithCaption = ({ linkto, model = 'default', state = 'raised', color = 'blue', text, title, caption, }) => {
    return (_jsxs("div", Object.assign({ className: "button-caption" }, { children: [_jsx(Anchor, { linkto: linkto, model: model, state: state, color: color, text: text, title: title, isExternal: true }), _jsx("p", { children: caption })] })));
};
//# sourceMappingURL=ButtonWithCaption.js.map