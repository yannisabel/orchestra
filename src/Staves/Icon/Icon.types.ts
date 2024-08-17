export const allIcons = [
  'image',
  'mail',
  'art',
  'power',
  'pen',
  'video',
  'note',
  'people',
  'user',
  'problem',
  'check',
  'twitter',
  'x',
  'pinterest',
  'linkedin',
  'behance',
  'codepen',
  'github',
  'medium',
  'date',
  'question',
  'label',
  'tools',
  'linkIcon',
  'cookie',
  'construction',
  'forum',
  'info',
]

export type IconTypes = typeof allIcons[number]

export interface IconProps {
  name: IconTypes
  className?: string
  size?: number | string
}
