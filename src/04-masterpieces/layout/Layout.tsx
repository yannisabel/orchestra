import type { ReactNode } from 'react'
import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Navigation } from '@scores/navigation/Navigation'
import { Footer } from '@scores/footer/Footer'
import { Notification } from '@scores/notifications/Notification'
import CookieConsent, { Cookies } from 'react-cookie-consent'
import cookieCutter from 'cookie-cutter'

import { initGA } from '../../../lib/gtag'

type MetaProps = {
  title: string
  description: string
  image: string
  author: string
  keywords: Array<string>
  hasCanonical?: boolean
}

interface LayoutProps {
  meta: MetaProps
  jsonLd?: string
  children: ReactNode
}

export const Layout = ({ ...props }: LayoutProps) => {
  const { asPath } = useRouter()

  const handleAcceptCookie = () => {
    initGA()
  }

  const handleDeclineCookie = () => {
    //remove google analytics cookies
    Cookies.remove('_ga')
    Cookies.remove('_gat')
    Cookies.remove('_gid')
  }

  useEffect(() => {
    const isConsent = cookieCutter.get('gdpr-google-analytics')
    if (isConsent === 'true') {
      handleAcceptCookie()
    }
  }, [])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@400..900&display=swap"
          rel="stylesheet"
        />
        <title>{`${props.meta.title} | Yann Isabel Design System Engineer`}</title>
        <meta name="description" content={props.meta.description} />
        <meta name="keywords" content={props.meta.keywords.join(', ')} />
        <link rel="icon" href="/images/logos/favicon.png" type="image/png" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="Yann Isabel" />

        {/* Open Graph */}
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}${asPath}`}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}${props.meta.image}`}
        />
        <meta
          property="og:site_name"
          content="Yann Isabel Design System Engineer"
        />
        <meta property="og:title" content={props.meta.title} />
        <meta property="og:description" content={props.meta.description} />
        {props.meta.hasCanonical && (
          <link
            rel="canonical"
            href={`${process.env.NEXT_PUBLIC_BASE_URL}${asPath}`}
          />
        )}
        <script type="application/ld+json">{props.jsonLd}</script>
      </Head>
      <Navigation />
      <div className="wrap">{props.children}</div>
      <CookieConsent
        onAccept={handleAcceptCookie}
        onDecline={handleDeclineCookie}
        location="bottom"
        buttonText="Accept"
        disableStyles
        declineButtonText="Decline"
        cookieName="gdpr-google-analytics"
        buttonWrapperClasses="justifyself-end"
        style={{ backgroundColor: '#264B68', padding: '0' }}
        buttonClasses="button button-m--default button-s--ghost button-c--white"
        enableDeclineButton
        flipButtons
        declineButtonClasses="button button-m--default button-s--less button-c--orange"
        expires={1}
      >
        <Notification
          id="cookieMessage"
          icon="cookie"
          text="By using my website, you agree to my <a href='/legal-notice' title='Go to Legal Notice page'>privacy policy</a><br/>If you decline, your information won’t be tracked when you visit this website.<br/>A single cookie will be used in your browser to remember your preference not to be tracked."
          color="blue"
        />
      </CookieConsent>
      <Footer />
    </>
  )
}
