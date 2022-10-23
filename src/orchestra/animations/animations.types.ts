import { transitions } from './animations'

export type TransitionToken = keyof typeof transitions

export type Transitions = Record<TransitionToken, string>
