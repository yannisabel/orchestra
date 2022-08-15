import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sticker } from '@symbols/stickers/Sticker';
export const Badge = ({ image, alt, legend, color = 'white', imgHasBackgroundColor = false, }) => {
    return (_jsxs("div", Object.assign({ className: "badge" }, { children: [_jsx(Sticker, { type: "image", image: image, alt: alt, color: color, imgHasBackgroundColor: imgHasBackgroundColor }), _jsx("p", { className: "badge__legend", dangerouslySetInnerHTML: { __html: legend } })] })));
};
//# sourceMappingURL=Badge.js.map