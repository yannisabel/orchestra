import styled from '@emotion/styled'
import { colors } from '../colors'
import { Box } from '../box'
import { radius } from '../radius'
import { SwitchProps } from './Switch.types'

export const Switch = ({ label, optionTrue, optionFalse, ariaChecked, onAction }: SwitchProps) => {

  const ButtonElement = styled.button`
    position: relative;
    display: block;
    width: 60px;
    height: 36px;
    margin: 0;
    overflow: hidden;
    border: none;
    border-radius: ${radius['radius-2']};
    padding: 0;
    line-height: 30px;
    text-align: center;
    cursor: pointer;

    & .switch__inner {
      display: -webkit-flex;
      display: flex;
      width: 200%;
      margin-left: -100%;
      -webkit-transition: margin .3s ease-in-out;
      transition: margin .3s ease-in-out;
    }

    &[role="switch"][aria-checked="true"] .switch__inner {
      margin-left: 0;
    }

    & .option {
      display: inline-block;
      width: 50%;
      height: 36px;
      padding: 0;
      line-height: 35px;
      font-size: 12px;
      text-transform: uppercase;
    }
    
    & .option--true {
      padding-left: 6px;
      background-color: ${colors['blue-50']};
      text-align: left;
      color: white;
    }
    
    & .option--false {
      padding-right: 6px;
      background-color: ${colors['blue-20']};
      text-align: right;
      color: white;
    }

    & .switch__switcher {
      position: absolute;
      top: 3px;
      right: 44px;
      bottom: 0;
      display: block;
      width: 12px;
      height: 30px;
      margin: 0;
      border-radius: ${radius['radius-2']};
      background: ${colors['white-0']};
      transition: all .3s ease-in-out;
    }

    &[role="switch"][aria-checked="true"] .switch__switcher {
      right: 3px;
    }
  `

  return (
    <Box display="flex">
      <label htmlFor="switch" className="switch__label">
        {label}
      </label>
      <ButtonElement
        role="switch"
        aria-checked={ariaChecked}
        onClick={onAction}
      >
        <Box renderAs="span" display="flex" width="200%" marginLeft="-100%" transition="margin .3s ease-in-out" className="switch__inner">
          <span className="option option--true">{optionTrue}</span>
          <span className="option option--false">{optionFalse}</span>
          <span className="switch__switcher" aria-hidden="true"></span>
        </Box>
      </ButtonElement>
    </Box>
  )
}
