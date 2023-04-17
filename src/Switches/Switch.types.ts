export interface SwitchProps {
  label: string
  optionTrue: string
  optionFalse: string
  checked: boolean
  className?: string
  onClick: () => void
}
