import './_sticker.scss';
interface StickerCommonProps {
    model?: 'default' | 'mini';
    color?: 'white' | 'blue' | 'orange' | 'blue-grey' | 'none';
    className?: string;
}
interface StickerImageProps {
    type: 'image';
    image: string;
    alt: string;
    imgHasBackgroundColor?: boolean;
}
interface StickerIconProps {
    type: 'icon';
    icon: string;
}
interface StickerTextProps {
    type: 'text';
    text: string;
}
export declare type StickerProps = StickerCommonProps & (StickerImageProps | StickerIconProps | StickerTextProps);
export declare const Sticker: ({ model, color, ...props }: StickerProps) => JSX.Element;
export {};
