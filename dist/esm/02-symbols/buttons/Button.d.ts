import type { IconTypes } from '../icons/IconTypes';
import './_button.scss';
export interface ButtonProps {
    model?: 'default' | 'round';
    state?: 'base' | 'raised' | 'less' | 'ghost';
    color?: 'blue' | 'orange' | 'white' | 'none';
    type: 'button' | 'submit' | 'reset';
    text?: string;
    icon?: IconTypes;
    role?: string;
    tabIndex?: number;
    className?: string;
    onAction?: () => void;
}
export declare const Button: ({ model, state, color, type, text, icon, role, tabIndex, onAction, ...props }: ButtonProps) => JSX.Element;
