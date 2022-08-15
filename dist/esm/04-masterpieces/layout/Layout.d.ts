import type { ReactNode } from 'react';
declare type MetaProps = {
    title: string;
    description: string;
    image: string;
    author: string;
    keywords: Array<string>;
    hasCanonical?: boolean;
};
interface LayoutProps {
    meta: MetaProps;
    jsonLd?: string;
    children: ReactNode;
}
export declare const Layout: ({ ...props }: LayoutProps) => JSX.Element;
export {};
