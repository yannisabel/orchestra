export const radius = {
  'radius-1': '4px',
  'radius-2': '8px',
  'radius-3': '16px',
  'radius-4': '24px',
  'radius-5': '32px',
  'radius-round': '50%',
}

export type RadiusToken = keyof typeof radius

export type Radius = Record<RadiusToken, string>
