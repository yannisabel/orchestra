import './_image.scss';
interface PictureProps {
    src: string;
    width?: number | string;
    height?: number | string;
    alt: string;
    classes?: string;
}
export declare const Picture: ({ src, width, height, alt, classes, ...resProps }: PictureProps) => JSX.Element;
export {};
