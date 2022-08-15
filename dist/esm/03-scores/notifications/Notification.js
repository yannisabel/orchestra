import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sticker } from '@symbols/stickers/Sticker';
export const Notification = ({ id, icon, text, className, color = 'blue', }) => {
    const notificationClasses = `notification notification-c--${color}`;
    return (_jsx("div", Object.assign({ id: id, className: `${notificationClasses} ${className}` }, { children: _jsxs("div", Object.assign({ className: "status-message" }, { children: [_jsx(Sticker, { type: "icon", model: "mini", icon: icon }), _jsx("div", { dangerouslySetInnerHTML: { __html: text } })] })) })));
};
//# sourceMappingURL=Notification.js.map