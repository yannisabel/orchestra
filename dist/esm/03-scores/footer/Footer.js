import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Identity } from '@scores/identity/Identity';
import { SocialList } from '@scores/social-list/SocialList';
import { Anchor } from '@symbols/anchors/Anchor';
export const Footer = () => {
    return (_jsx("footer", Object.assign({ className: "footer" }, { children: _jsxs("div", Object.assign({ className: "footer__container wrap" }, { children: [_jsx(Identity, { className: "footer__identity" }), _jsx(SocialList, {}), _jsx(Anchor, { model: "default", state: "ghost", text: "Legal Notice", linkto: "/legal-notice", title: "go to the Legal Notice page", className: "footer__link" })] })) })));
};
//# sourceMappingURL=Footer.js.map