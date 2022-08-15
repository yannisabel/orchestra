import type { StickerProps } from '@symbols/stickers/Sticker';
interface BadgeProps {
    image: string;
    alt: string;
    legend: string;
    color?: StickerProps['color'];
    imgHasBackgroundColor?: boolean;
}
export declare const Badge: ({ image, alt, legend, color, imgHasBackgroundColor, }: BadgeProps) => JSX.Element;
export {};
