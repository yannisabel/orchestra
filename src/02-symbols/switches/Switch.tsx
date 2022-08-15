import { SwitchProps } from './Switch.types'
import './_switch.scss'

export const Switch = ({ label, optionTrue, optionFalse, ariaChecked, onAction }: SwitchProps) => {

  return (
    <div className="switch__container">
      <label htmlFor="switch" className="switch__label">
        {label}
      </label>
      <button
        role="switch"
        id="switch"
        className="switch__button"
        aria-checked={ariaChecked}
        onClick={onAction}
      >
        <span className="switch__inner">
          <span className="option option--true">{optionTrue}</span>
          <span className="option option--false">{optionFalse}</span>
          <span className="switch__switcher" aria-hidden="true"></span>
        </span>
      </button>
    </div>
  )
}
