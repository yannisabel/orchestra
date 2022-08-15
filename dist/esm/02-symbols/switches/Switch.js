import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import './_switch.scss';
export const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    React.useEffect(() => setMounted(true), []);
    if (!mounted) {
        return null;
    }
    const storageTheme = typeof localStorage.getItem('theme') !== 'undefined' &&
        localStorage.getItem('theme');
    const isDark = theme === 'dark' || storageTheme === 'dark';
    return (_jsxs("div", Object.assign({ className: "switch__container" }, { children: [_jsx("label", Object.assign({ htmlFor: "switch", className: "switch__label" }, { children: theme })), _jsx("button", Object.assign({ role: "switch", id: "switch", className: "switch__button", "aria-checked": isDark, onClick: () => setTheme(isDark ? 'light' : 'dark') }, { children: _jsxs("span", Object.assign({ className: "switch__inner" }, { children: [_jsx("span", Object.assign({ className: "option option--true" }, { children: "Dark" })), _jsx("span", Object.assign({ className: "option option--false" }, { children: "Light" })), _jsx("span", { className: "switch__switcher", "aria-hidden": "true" })] })) }))] })));
};
//# sourceMappingURL=Switch.js.map