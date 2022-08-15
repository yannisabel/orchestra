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
import { Icon } from '@symbols/icons/Icons';
import './_button.scss';
export const Button = (_a) => {
    var { model = 'default', state = 'base', color = 'none', type = 'button', text, icon, role, tabIndex, onAction } = _a, props = __rest(_a, ["model", "state", "color", "type", "text", "icon", "role", "tabIndex", "onAction"]);
    const [isDown, setIsDown] = useState(false);
    const getButtonClasses = () => {
        const buttonClasses = [
            'button',
            `button-m--${model}`,
            `button-s--${state}`,
            `button-c--${color}`,
        ];
        icon && icon !== 'none' && buttonClasses.push('button--icon');
        return buttonClasses.join(' ');
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
    const buttonClasses = `${isDown
        ? [getButtonClasses(), props.className, 'button-s--pressed'].join(' ')
        : [getButtonClasses(), props.className].join(' ')}`;
    return (_jsxs("button", Object.assign({ type: type, role: role, className: buttonClasses, onMouseDown: pressOrRelease, onTouchStart: pressOrRelease, onMouseUp: pressOrRelease, onTouchEnd: pressOrRelease, onClick: onAction, tabIndex: tabIndex }, { children: [icon && _jsx(Icon, { name: icon }), text] })));
};
//# sourceMappingURL=Button.js.map