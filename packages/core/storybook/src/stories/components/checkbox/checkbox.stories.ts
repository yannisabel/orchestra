import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta = {
    component: 'orchestra-checkbox',
    title: 'Components/orchestra-checkbox',
    argTypes: {
        onOrchestraCheckboxChange: { action: 'orchestraCheckboxChange' },
        label: {
            type: { name: 'string', required: true },
            description: 'This is the text which accompany the checkbox. It is **required** for accessibility concerns.'
        },
        value: {
            type: { name: 'string', required: true },
            description: 'The immutable value sent in the payload as identifier. It is **required**.'
        },
        format: {
            control: 'select',
            options: ['right', 'left', 'hidden'],
            description: 'A string indicating the position of the label or if it is hidden.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'right' }
            }
        },
        checked: {
            control: 'boolean',
            options: [true, false],
            description: 'A Boolean indicating whether the box is checked or unchecked. It should be false if the checkbox is `indeterminate`.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            }
        },
        disabled: {
            control: 'boolean',
            options: [true, false],
            description: 'A boolean indicating the disable state of the checkbox. The `aria-disabled` attribute relies on this property.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            }
        },
        args: {
            onOrchestraCheckboxChange: fn(),
        },
    }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        text: 'Checkbox',
        disabled: false,
    },
    play: async ({ canvasElement, args }) => {
        const checkbox = canvasElement.querySelector('orchestra-checkbox');
        checkbox?.addEventListener('orchestraCheckboxChange', args.onOrchestraCheckboxChange);
    },
};
