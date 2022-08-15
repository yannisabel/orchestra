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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Navigation } from '@scores/navigation/Navigation';
import { Footer } from '@scores/footer/Footer';
import { Notification } from '@scores/notifications/Notification';
import CookieConsent, { Cookies } from 'react-cookie-consent';
import cookieCutter from 'cookie-cutter';
import { initGA } from '../../../lib/gtag';
export const Layout = (_a) => {
    var props = __rest(_a, []);
    const { asPath } = useRouter();
    const handleAcceptCookie = () => {
        initGA();
    };
    const handleDeclineCookie = () => {
        //remove google analytics cookies
        Cookies.remove('_ga');
        Cookies.remove('_gat');
        Cookies.remove('_gid');
    };
    useEffect(() => {
        const isConsent = cookieCutter.get('gdpr-google-analytics');
        if (isConsent === 'true') {
            handleAcceptCookie();
        }
    }, []);
    return (_jsxs(_Fragment, { children: [_jsxs(Head, { children: [_jsx("meta", { charSet: "utf-8" }), _jsx("link", { href: "https://fonts.googleapis.com/css2?family=Mulish:wght@400..900&display=swap", rel: "stylesheet" }), _jsx("title", { children: `${props.meta.title} | Yann Isabel Design System Engineer` }), _jsx("meta", { name: "description", content: props.meta.description }), _jsx("meta", { name: "keywords", content: props.meta.keywords.join(', ') }), _jsx("link", { rel: "icon", href: "/images/logos/favicon.png", type: "image/png" }), _jsx("meta", { name: "twitter:card", content: "summary" }), _jsx("meta", { name: "twitter:creator", content: "Yann Isabel" }), _jsx("meta", { property: "og:url", content: `${process.env.NEXT_PUBLIC_BASE_URL}${asPath}` }), _jsx("meta", { property: "og:image", content: `${process.env.NEXT_PUBLIC_BASE_URL}${props.meta.image}` }), _jsx("meta", { property: "og:site_name", content: "Yann Isabel Design System Engineer" }), _jsx("meta", { property: "og:title", content: props.meta.title }), _jsx("meta", { property: "og:description", content: props.meta.description }), props.meta.hasCanonical && (_jsx("link", { rel: "canonical", href: `${process.env.NEXT_PUBLIC_BASE_URL}${asPath}` })), _jsx("script", Object.assign({ type: "application/ld+json" }, { children: props.jsonLd }))] }), _jsx(Navigation, {}), _jsx("div", Object.assign({ className: "wrap" }, { children: props.children })), _jsx(CookieConsent, Object.assign({ onAccept: handleAcceptCookie, onDecline: handleDeclineCookie, location: "bottom", buttonText: "Accept", disableStyles: true, declineButtonText: "Decline", cookieName: "gdpr-google-analytics", buttonWrapperClasses: "justifyself-end", style: { backgroundColor: '#264B68', padding: '0' }, buttonClasses: "button button-m--default button-s--ghost button-c--white", enableDeclineButton: true, flipButtons: true, declineButtonClasses: "button button-m--default button-s--less button-c--orange", expires: 1 }, { children: _jsx(Notification, { id: "cookieMessage", icon: "cookie", text: "By using my website, you agree to my <a href='/legal-notice' title='Go to Legal Notice page'>privacy policy</a><br/>If you decline, your information won\u2019t be tracked when you visit this website.<br/>A single cookie will be used in your browser to remember your preference not to be tracked.", color: "blue" }) })), _jsx(Footer, {})] }));
};
//# sourceMappingURL=Layout.js.map