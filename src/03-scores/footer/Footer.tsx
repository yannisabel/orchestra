import { Identity } from '@scores/identity/Identity'
import { SocialList } from '@scores/social-list/SocialList'
import { Anchor } from '@symbols/anchors/Anchor'

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container wrap">
        <Identity className="footer__identity" />
        <SocialList />
        <Anchor
          model="default"
          state="ghost"
          text="Legal Notice"
          linkto="/legal-notice"
          title="go to the Legal Notice page"
          className="footer__link"
        />
      </div>
    </footer>
  )
}
