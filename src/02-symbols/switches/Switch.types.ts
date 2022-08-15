export interface SwitchProps {
  label: string
  optionTrue: string
  optionFalse: string
  ariaChecked: boolean
  onAction: () => void
}
