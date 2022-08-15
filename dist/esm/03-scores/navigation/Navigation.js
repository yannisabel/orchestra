import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Title } from '@ochestra/02-symbols/titles/Title';
import { Anchor } from '@symbols/anchors/Anchor';
import { Sticker } from '@symbols/stickers/Sticker';
import { ThemeSwitch } from '@ochestra/02-symbols/switches/Switch';
const ListNav = () => {
    const router = useRouter();
    return (_jsxs(_Fragment, { children: [_jsxs("ul", Object.assign({ className: "nav navbar-nav navbar-right", role: "menu" }, { children: [_jsx("li", Object.assign({ role: "none" }, { children: _jsx(Anchor, { linkto: "/", text: "My portfolio", icon: "image", title: "go to my portfolio", role: "menuitem", className: router.pathname == '/' ? 'active' : '' }) })), _jsx("li", Object.assign({ role: "none" }, { children: _jsx(Anchor, { linkto: "/about", text: "About me", icon: "user", title: "go to my about page", role: "menuitem", className: router.pathname == '/about' ? 'active' : '' }) }))] })), _jsx(ThemeSwitch, {})] }));
};
const OverlayListNav = () => {
    const router = useRouter();
    return (_jsxs("ul", Object.assign({ className: "nav navbar-nav navbar-right", id: "overlay-menu", role: "menu", "aria-labelledby": "toggle-menu" }, { children: [_jsx("li", Object.assign({ role: "none" }, { children: _jsx(Anchor, { linkto: "/", text: "My portfolio", icon: "image", title: "go to my portfolio", role: "menuitem", className: router.pathname == '/' ? 'active' : '' }) })), _jsx("li", Object.assign({ role: "none" }, { children: _jsx(Anchor, { linkto: "/about", text: "About me", icon: "user", title: "go to my about page", role: "menuitem", className: router.pathname == '/about' ? 'active' : '' }) })), _jsx("li", Object.assign({ className: "center" }, { children: _jsx(ThemeSwitch, {}) }))] })));
};
export const Navigation = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const toggleMenu = () => {
        setMenuIsOpen(!menuIsOpen);
    };
    return (_jsxs("div", { children: [_jsx("nav", Object.assign({ className: "navbar fixed" }, { children: _jsxs("div", Object.assign({ className: "container" }, { children: [_jsxs("div", Object.assign({ className: "navbar-header" }, { children: [_jsx(Sticker, { type: "image", model: "mini", color: "blue", alt: "Yann Isabel logo", image: "/images/logos/favicon.png" }), _jsx("h1", { children: _jsx(Anchor, { linkto: "/", text: "Yann Isabel", title: "go back to the homepage", className: "navbar-brand" }) })] })), _jsx(ListNav, {})] })) })), _jsxs("button", Object.assign({ type: "button", "aria-haspopup": "true", "aria-controls": "overlay-menu", id: "toggle-menu", className: `toggle-btn-container ${menuIsOpen && 'active'}`, onClick: toggleMenu }, { children: [_jsx("span", { className: "top", "aria-hidden": "true" }), _jsx("span", { className: "middle", "aria-hidden": "true" }), _jsx("span", { className: "bottom", "aria-hidden": "true" })] })), _jsx("div", Object.assign({ id: "overlay", className: `overlay ${menuIsOpen && 'open'}` }, { children: _jsxs("nav", Object.assign({ className: "overlay-menu", tabIndex: -1 }, { children: [_jsx("div", Object.assign({ className: "navbar-header" }, { children: _jsx(Link, Object.assign({ href: "/" }, { children: _jsx("a", Object.assign({ title: "go back to home page" }, { children: _jsx(Title, { type: "h1", value: "Yann Isabel" }) })) })) })), _jsx(OverlayListNav, {})] })) }))] }));
};
//# sourceMappingURL=Navigation.js.map