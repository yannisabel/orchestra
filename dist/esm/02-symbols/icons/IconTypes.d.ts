export declare const allIcons: string[];
export declare type IconTypes = typeof allIcons[number];
export interface IconProps {
    name: IconTypes;
    color?: 'black' | 'white' | 'grey' | 'blue' | 'orange';
}
