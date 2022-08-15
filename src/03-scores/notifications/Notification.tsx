import { Sticker } from '../../02-symbols/stickers/Sticker'

interface NotificationProps {
  id: string
  icon: string
  text: string
  className?: string
  color: 'orange' | 'blue' | 'none'
}

export const Notification = ({
  id,
  icon,
  text,
  className,
  color = 'blue',
}: NotificationProps) => {
  const notificationClasses = `notification notification-c--${color}`

  return (
    <div id={id} className={`${notificationClasses} ${className}`}>
      <div className="status-message">
        <Sticker type="icon" model="mini" icon={icon} />
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  )
}
