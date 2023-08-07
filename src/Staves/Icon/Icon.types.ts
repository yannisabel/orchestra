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
]

export type IconTypes = typeof allIcons[number]

export interface IconProps {
  name: IconTypes
  className?: string
  size?: number | string
}
