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
import { jsx as _jsx } from "react/jsx-runtime";
import { Picture } from '@symbols/images/Picture';
import { Icon } from '@symbols/icons/Icons';
import './_sticker.scss';
export const Sticker = (_a) => {
    var { model = 'default', color = 'white' } = _a, props = __rest(_a, ["model", "color"]);
    const getStickerClasses = () => {
        const stickerClasses = [
            'sticker',
            `sticker-m--${model}`,
            `sticker-c--${color}`,
        ];
        return stickerClasses.join(' ');
    };
    const stickerClasses = `${[
        getStickerClasses(),
        props.className,
        props.type === 'image' ? 'has-img' : '',
    ].join(' ')}`;
    const Content = () => {
        if (props.type === 'image') {
            return (_jsx("div", Object.assign({ className: "sticker-content" }, { children: _jsx("div", Object.assign({ className: props.imgHasBackgroundColor ? 'has-background' : '' }, { children: _jsx(Picture, { src: props.image, alt: props.alt }) })) })));
        }
        if (props.type === 'icon') {
            return _jsx(Icon, { name: props.icon });
        }
        return _jsx("span", { children: props.text });
    };
    return (_jsx("div", Object.assign({ className: stickerClasses }, { children: _jsx(Content, {}) })));
};
//# sourceMappingURL=Sticker.js.map