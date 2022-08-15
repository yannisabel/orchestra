import { jsxs as _jsxs } from "react/jsx-runtime";
export const allColors = [
    {
        name: '$black-0',
        value: '#000000',
    },
    {
        name: '$black-V0--T10',
        value: 'rgba($black-0, .10)',
    },
    {
        name: '$black-V0--T25',
        value: 'rgba($black-0, .25)',
    },
    {
        name: '$black-V0--T50',
        value: 'rgba($black-0, .50)',
    },
    {
        name: '$black-V0--T75',
        value: 'rgba($black-0, .75)',
    },
    {
        name: '$black-V0--T90',
        value: 'rgba($black-0, .90)',
    },
];
export const ColorList = () => {
    return allColors.map((color) => {
        return (_jsxs("p", { children: ["name: ", color.name, ", value: ", color.value] }, color.name));
    });
};
//# sourceMappingURL=colors.js.map