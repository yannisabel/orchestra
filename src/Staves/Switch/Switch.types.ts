export interface SwitchProps {
  label: string
  checked: boolean
  colorOn?: 'white' | 'grey' | 'blue' | 'orange'
  colorOff?: 'black' | 'grey' | 'blue'
  className?: string
  onClick: () => void
}
