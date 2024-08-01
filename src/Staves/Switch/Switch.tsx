import { Box } from '../Box'
import { SwitchProps } from './Switch.types'
import './switch.scss'
import React from 'react'


export const Switch = ({ label, checked, onClick, className = '', colorOn = 'blue', colorOff = 'grey' }: SwitchProps) => {

  return (
    <Box className={`display--flex switch__container switch-on--${colorOn} switch-off--${colorOff} ${className}`}>
      <label className={`switch__label ${checked ? 'option-true': 'option-false'}`}>
        <Box as="button"
          role="switch"
          aria-checked={checked}
          aria-label={label}
          onClick={onClick}
          className="switch__button"
        >
            <Box as="span" className="switch__switcher" aria-hidden="true" />
        </Box>
        {label}
      </label>
    </Box>
  )
}
