interface NotificationProps {
    id: string;
    icon: string;
    text: string;
    className?: string;
    color: 'orange' | 'blue' | 'none';
}
export declare const Notification: ({ id, icon, text, className, color, }: NotificationProps) => JSX.Element;
export {};
