import { jsx as _jsx } from "react/jsx-runtime";
export const Title = ({ type, value, styleTitle = null }) => {
    switch (type) {
        case 'h1':
            return _jsx("h1", Object.assign({ className: styleTitle }, { children: value }));
        case 'h2':
            return _jsx("h2", Object.assign({ className: styleTitle }, { children: value }));
        case 'h3':
            return _jsx("h3", Object.assign({ className: styleTitle }, { children: value }));
        case 'h4':
            return _jsx("h4", Object.assign({ className: styleTitle }, { children: value }));
        case 'h5':
            return _jsx("h5", Object.assign({ className: styleTitle }, { children: value }));
        case 'h6':
            return _jsx("h6", Object.assign({ className: styleTitle }, { children: value }));
        default:
            return null;
    }
};
//# sourceMappingURL=Title.js.map