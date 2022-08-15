import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Title } from '@ochestra/02-symbols/titles/Title'
import { Anchor } from '@symbols/anchors/Anchor'
import { Sticker } from '@symbols/stickers/Sticker'
import { ThemeSwitch } from '@ochestra/02-symbols/switches/Switch'

const ListNav = () => {
  const router = useRouter()

  return (
    <>
      <ul className="nav navbar-nav navbar-right" role="menu">
        <li role="none">
          <Anchor
            linkto="/"
            text="My portfolio"
            icon="image"
            title="go to my portfolio"
            role="menuitem"
            className={router.pathname == '/' ? 'active' : ''}
          />
        </li>
        <li role="none">
          <Anchor
            linkto="/about"
            text="About me"
            icon="user"
            title="go to my about page"
            role="menuitem"
            className={router.pathname == '/about' ? 'active' : ''}
          />
        </li>
      </ul>
      <ThemeSwitch />
    </>
  )
}

const OverlayListNav = () => {
  const router = useRouter()

  return (
    <ul
      className="nav navbar-nav navbar-right"
      id="overlay-menu"
      role="menu"
      aria-labelledby="toggle-menu"
    >
      <li role="none">
        <Anchor
          linkto="/"
          text="My portfolio"
          icon="image"
          title="go to my portfolio"
          role="menuitem"
          className={router.pathname == '/' ? 'active' : ''}
        />
      </li>
      <li role="none">
        <Anchor
          linkto="/about"
          text="About me"
          icon="user"
          title="go to my about page"
          role="menuitem"
          className={router.pathname == '/about' ? 'active' : ''}
        />
      </li>
      <li className="center">
        <ThemeSwitch />
      </li>
    </ul>
  )
}

export const Navigation = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen)
  }

  return (
    <div>
      <nav className="navbar fixed">
        <div className="container">
          <div className="navbar-header">
            <Sticker
              type="image"
              model="mini"
              color="blue"
              alt="Yann Isabel logo"
              image="/images/logos/favicon.png"
            />
            <h1>
              <Anchor
                linkto="/"
                text="Yann Isabel"
                title="go back to the homepage"
                className="navbar-brand"
              />
            </h1>
          </div>
          <ListNav />
        </div>
      </nav>
      <button
        type="button"
        aria-haspopup="true"
        aria-controls="overlay-menu"
        id="toggle-menu"
        className={`toggle-btn-container ${menuIsOpen && 'active'}`}
        onClick={toggleMenu}
      >
        <span className="top" aria-hidden="true" />
        <span className="middle" aria-hidden="true" />
        <span className="bottom" aria-hidden="true" />
      </button>
      <div id="overlay" className={`overlay ${menuIsOpen && 'open'}`}>
        <nav className="overlay-menu" tabIndex={-1}>
          <div className="navbar-header">
            <Link href="/">
              <a title="go back to home page">
                <Title type="h1" value="Yann Isabel" />
              </a>
            </Link>
          </div>
          <OverlayListNav />
        </nav>
      </div>
    </div>
  )
}
