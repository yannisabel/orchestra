import type { IconTypes } from '../icons/IconTypes';
export interface AnchorProps {
    model?: 'default' | 'round';
    state?: 'base' | 'raised' | 'less' | 'ghost';
    color?: 'blue' | 'orange' | 'white' | 'none';
    linkto: string;
    text?: string;
    title: string;
    icon?: IconTypes;
    role?: string;
    tabIndex?: number;
    isExternal?: boolean;
    className?: string;
}
export declare const Anchor: ({ model, state, color, linkto, text, title, icon, role, tabIndex, isExternal, ...props }: AnchorProps) => JSX.Element;
