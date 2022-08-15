import type { AnchorProps } from '@ochestra/02-symbols/anchors/Anchor';
interface ButtonWithCaptionProps {
    linkto: string;
    model: AnchorProps['model'];
    state: AnchorProps['state'];
    color: AnchorProps['color'];
    text: string;
    title: string;
    target: string;
    caption: string;
}
export declare const ButtonWithCaption: ({ linkto, model, state, color, text, title, caption, }: ButtonWithCaptionProps) => JSX.Element;
export {};
