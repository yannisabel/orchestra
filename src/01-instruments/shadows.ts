export const shadows = {
  'depth-1': '0 1px 1px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 -1px 2px rgba(0, 0, 0, .12)',
  'depth-2': '0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .23)',
  'depth-3': '0 10px 20px rgba(0, 0, 0, .19), 0 6px 6px rgba(0, 0, 0, .23)',
  'depth-4': '0 10px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22)',
  'depth-5': '0 19px 38px rgba(0, 0, 0, .3), 0 15px 12px rgba(0, 0, 0, .22)',

  'depth-1--reversed': '0 -1px 1px rgba(0, 0, 0, .2), 0 -2px 2px rgba(0, 0, 0, .14), 0 -1px 2px rgba(0, 0, 0, .12)',
  'depth-2--reversed': '0 -3px 6px rgba(0, 0, 0, .16), 0 -3px 6px rgba(0, 0, 0, .23)',
  'depth-3--reversed': '0 -10px 20px rgba(0, 0, 0, .19), 0 -6px 6px rgba(0, 0, 0, .23)',
  'depth-4--reversed': '0 -10px 28px rgba(0, 0, 0, .25), 0 -10px 10px rgba(0, 0, 0, .22)',
  'depth-5--reversed': '0 -19px 38px rgba(0, 0, 0, .3), 0 -15px 12px rgba(0, 0, 0, .22)',
}

export type ShadowsToken = keyof typeof shadows

export type Shadows = Record<ShadowsToken, string>
