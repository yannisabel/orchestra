var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@symbols/icons/Icons';
export const Anchor = (_a) => {
    var { model = 'default', state = 'base', color = 'none', linkto, text, title, icon, role, tabIndex, isExternal = false } = _a, props = __rest(_a, ["model", "state", "color", "linkto", "text", "title", "icon", "role", "tabIndex", "isExternal"]);
    const [isDown, setIsDown] = useState(false);
    const getAnchorClasses = () => {
        const AnchorClasses = [
            'button',
            `button-m--${model}`,
            `button-s--${state}`,
            `button-c--${color}`,
        ];
        icon && icon !== 'none' && AnchorClasses.push('button--icon');
        return AnchorClasses.join(' ');
    };
    const pressOrRelease = () => {
        let bool;
        if (state === 'raised') {
            setIsDown(!isDown);
            bool = true;
        }
        else {
            bool = false;
        }
        return bool;
    };
    const anchorClasses = `${isDown
        ? [getAnchorClasses(), props.className, 'button-s--pressed'].join(' ')
        : [getAnchorClasses(), props.className].join(' ')}`;
    if (isExternal) {
        return (_jsxs("a", Object.assign({ href: linkto, className: anchorClasses, onMouseDown: pressOrRelease, onTouchStart: pressOrRelease, onMouseUp: pressOrRelease, onTouchEnd: pressOrRelease, title: title, target: "_blank", rel: "noopener noreferer" }, { children: [icon && _jsx(Icon, { name: icon }), text] })));
    }
    return (_jsx(Link, Object.assign({ href: linkto }, { children: _jsxs("a", Object.assign({ className: anchorClasses, onMouseDown: pressOrRelease, onTouchStart: pressOrRelease, onMouseUp: pressOrRelease, onTouchEnd: pressOrRelease, title: title, role: role, tabIndex: tabIndex }, { children: [icon && _jsx(Icon, { name: icon }), text] })) })));
};
//# sourceMappingURL=Anchor.js.map