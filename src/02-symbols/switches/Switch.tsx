import styled from '@emotion/styled'
import { Box } from '@symbols/layout'
import { SwitchProps } from './Switch.types'
import './_switch.scss'

export const Switch = ({ label, optionTrue, optionFalse, ariaChecked, onAction }: SwitchProps) => {

  const ButtonElement = styled.button`
    position: relative;
    display: block;
    width: 60px;
    height: 36px;
    margin: 0;
    overflow: hidden;
    border: none;
    border-radius: $radius-2;
    padding: 0;
    line-height: 30px;
    text-align: center;
    cursor: pointer;

    .option {
      display: inline-block;
      width: 50%;
      height: 36px;
      padding: 0;
      line-height: 35px;
      font-size: 12px;
      text-transform: uppercase;
    }
    
    option--true {
      padding-left: 6px;
      background-color: $blue-50;
      text-align: left;
      color: white;
    }
    
    option--false {
      padding-right: 6px;
      background-color: $blue-20;
      text-align: right;
      color: white;
    }

    [role="switch"][aria-checked="true"] > span {
      margin-left: 0;
    }

    [role="switch"][aria-checked="true"] .switch__switcher {
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
        <Box renderAs="span" display="flex" width="200%" marginLeft="-100%" transition="margin .3s ease-in-out">
          <span className="option option--true">{optionTrue}</span>
          <span className="option option--false">{optionFalse}</span>
          <span className="switch__switcher" aria-hidden="true"></span>
        </Box>
      </ButtonElement>
    </Box>
  )
}
