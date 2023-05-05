import { Box } from '../Box'
import { SwitchProps } from './Switch.types'
import './Switch.scss'
import React from 'react'


export const Switch = ({ label, checked, onClick, className = '' }: SwitchProps) => {

  return (
    <Box className={`display--flex switch__container ${className}`}>
      <label className={`switch__label ${checked ? 'option-true': 'option-false'}`}>
        <Box as="button"
          role="switch"
          aria-checked={checked}
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
