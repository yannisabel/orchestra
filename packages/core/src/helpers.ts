/**
 * From an object pick a set of keys.
 *
 * @param object Object to pick from.
 * @param keys They keys to pick.
 * @returns New object with only the picked keys.
 */
export const pick = <T, K extends keyof T>(
  object: T,
  ...keys: K[]
): Pick<T, K> => {
  const returnValue: Partial<Pick<T, K>> = {}
  for (const key of keys) returnValue[key] = object[key]
  return returnValue as Pick<T, K>
}

export type QdsFocusEventDetail = Pick<FocusEvent, 'relatedTarget'>
export type QdsInputEventDetail = Pick<
  InputEvent,
  'data' | 'inputType' | 'isComposing'
>
export const pickFocusEventAttributes = (
  event: FocusEvent,
): QdsFocusEventDetail => pick(event, 'relatedTarget')
export const pickInputEventAttributes = (
  event: InputEvent,
): QdsInputEventDetail => pick(event, 'data', 'inputType', 'isComposing')

const prefix = 'Invariant failed'

export function invariant(value: unknown, message?: string): asserts value {
   
  if (value) return

  const error = message === undefined ? prefix : `${prefix}: ${message}`
  throw new Error(error)
}
