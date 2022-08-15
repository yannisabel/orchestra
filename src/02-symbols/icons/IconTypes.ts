export const allIcons = [
  'none',
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
]

export type IconTypes = typeof allIcons[number]

export interface IconProps {
  name: IconTypes
  color?: 'black' | 'white' | 'grey' | 'blue' | 'orange'
}
