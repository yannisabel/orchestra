import type { ReactNode } from 'react';
interface TitleProps {
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    value: string | ReactNode;
    styleTitle?: string;
}
export declare const Title: ({ type, value, styleTitle }: TitleProps) => JSX.Element | null;
export {};
