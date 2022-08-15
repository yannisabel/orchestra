// Model for a potential third part in the footer

import { Anchor } from '@symbols/anchors/Anchor'

export const UsefulLink = () => {
  return (
    <div>
      <p>Useful Link:</p>
      <ul className="useful-links">
        <li>
          <Anchor
            model="default"
            state="ghost"
            color="none"
            text=""
            title=""
            linkto=""
          />
        </li>
      </ul>
    </div>
  )
}
