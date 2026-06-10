import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const links = [
  { label: 'Platform', to: '/#how-it-works' },
  { label: 'Features', to: '/#features' },
  { label: 'Pricing',  to: '/#pricing' },
  { label: 'About',    to: '/#about' },
  { label: 'Contact',  to: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const locked = useRef(false)
  const lockTimer = useRef(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'))

    const onScroll = () => {
      if (locked.current) return
      const mid = window.innerHeight / 2
      let current = ''
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= mid) current = s.id
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  const handleLinkClick = (sectionId) => {
    close()
    setActiveSection(sectionId)
    locked.current = true
    clearTimeout(lockTimer.current)
    lockTimer.current = setTimeout(() => { locked.current = false }, 1200)
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>

        <Link to="/" className={styles.logo} onClick={close}>
          <img src="/logo.svg" alt="TrevoraTech" className={styles.logoImg} />
        </Link>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {links.map(l => {
            const sectionId = l.to.replace('/#', '')
            const isActive = activeSection === sectionId
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
                  onClick={() => handleLinkClick(sectionId)}
                >
                  {l.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className={styles.right}>
          <Link to="/Product" className={styles.cta} onClick={close}>
            TrevoraTech Platform
          </Link>
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

      </div>
    </nav>
  )
}
