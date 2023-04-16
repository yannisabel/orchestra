import { transitions } from './Animations'

export type TransitionToken = keyof typeof transitions

export type Transitions = Record<TransitionToken, string>
