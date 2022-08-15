import React from 'react'
import { Anchor } from '@symbols/anchors/Anchor'

export const SocialList = () => {
  return (
    <div>
      <p>You can find me on:</p>
      <ul className="social__list">
        <li>
          <Anchor
            isExternal
            model="round"
            state="raised"
            color="blue"
            icon="twitter"
            linkto="https://twitter.com/yann_isabel"
            title="go to my Twitter profile"
            className="social__link"
          />
        </li>
        <li>
          <Anchor
            isExternal
            model="round"
            state="raised"
            color="blue"
            icon="linkedin"
            linkto="https://www.linkedin.com/in/yannisabel"
            title="go to my Linkedin profile"
            className="social__link"
          />
        </li>
        <li>
          <Anchor
            isExternal
            model="round"
            state="raised"
            color="blue"
            icon="codepen"
            linkto="https://codepen.io/yannisabel"
            title="go to my Codepen dashboard"
            className="social__link"
          />
        </li>
        <li>
          <Anchor
            isExternal
            model="round"
            state="raised"
            color="blue"
            icon="github"
            linkto="https://github.com/yannisabel"
            title="go to my Github profile"
            className="social__link"
          />
        </li>
        <li>
          <Anchor
            isExternal
            model="round"
            state="raised"
            color="blue"
            icon="medium"
            linkto="https://medium.com/@yannisabel"
            title="go to my Medium profile"
            className="social__link"
          />
        </li>
      </ul>
    </div>
  )
}
