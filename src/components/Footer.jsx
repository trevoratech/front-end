import { Link } from 'react-router-dom'
import { useForm, ValidationError } from '@formspree/react'
import styles from './Footer.module.css'

function Newsletter() {
  const [state, handleSubmit] = useForm("xbdeyopb")

  return (
    <div className={styles.newsletter}>
      <div className={styles.nlLeft}>
        <p className={styles.nlLabel}>Newsletter</p>
        <h3 className={styles.nlTitle}>Stay ahead of the automation curve.</h3>
        <p className={styles.nlDesc}>
          Product updates, AI automation insights, and enterprise use cases — delivered monthly. No spam.
        </p>
      </div>

      <div className={styles.nlRight}>
        {state.succeeded ? (
          <div className={styles.nlSuccess}>
            <CheckIcon />
            <div>
              <p className={styles.nlSuccessTitle}>You're subscribed.</p>
              <p className={styles.nlSuccessDesc}>Expect your first edition within the week.</p>
            </div>
          </div>
        ) : (
          <form className={styles.nlForm} onSubmit={handleSubmit}>
            <div className={styles.nlInputWrap}>
              <input
                id="email"
                type="email"
                name="email"
                className={styles.nlInput}
                placeholder="your@company.com"
                aria-label="Work email"
              />
              <button type="submit" className={styles.nlBtn} disabled={state.submitting}>
                {state.submitting ? 'Sending…' : 'Subscribe →'}
              </button>
            </div>
            <ValidationError prefix="Email" field="email" errors={state.errors} className={styles.nlError} />
            <p className={styles.nlNote}>
              By subscribing you agree to our{' '}
              <Link to="/privacy" className={styles.nlNoteLink}>Privacy Policy</Link>.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        <Newsletter />

        <div className={styles.grid}>

          {/* ── Col 1: Brand ── */}
          <div className={styles.col}>
            <Link to="/" className={styles.logoWrap}>
              <img src="/logo.svg" alt="TrevoraTech" className={styles.logoImg} />
            </Link>
            <p className={styles.tagline}>
              Intelligent enterprise automation. Built for the modern organization.
            </p>
            <div className={styles.socials}>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className={styles.social}>
                <LinkedInIcon />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className={styles.social}>
                <TwitterIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className={styles.social}>
                <FacebookIcon />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest" className={styles.social}>
                <PinterestIcon />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className={styles.social}>
                <YouTubeIcon />
              </a>
            </div>
          </div>

          {/* ── Col 2: Product ── */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Product</h4>
            <ul className={styles.colLinks}>
              <li><Link to="/product">Platform Overview</Link></li>
              <li><Link to="/#features">Features</Link></li>
              <li><Link to="/#how-it-works">Architecture</Link></li>
              <li><Link to="/#pricing">Pricing</Link></li>
            </ul>
          </div>

          {/* ── Col 3: Resources ── */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Resources</h4>
            <ul className={styles.colLinks}>
              <li><Link to="/#about">About Us</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
              <li><Link to="/docs">Documentation</Link></li>
              <li><Link to="/docs#api">Developer API</Link></li>
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Trevoratech Innovations LLC. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className={styles.checkIcon}>
      <circle cx="14" cy="14" r="12" stroke="#C8A96E" strokeWidth="1.2"/>
      <path d="M9 14l4 4 6-7" stroke="#C8A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M5 8v5M5 6v-.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 13v-3a2 2 0 0 1 4 0v3M8 8v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 3h3.5L9 7.5 12.5 3H16L11 9.5 16 15h-3.5L9 10.5 5.5 15H2l5-6.5L2 3z" fill="currentColor"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M10 9H8v5H6.5V9H5.5V7.5H6.5V6.5A2 2 0 0 1 8.5 4.5H10V6H9a.5.5 0 0 0-.5.5V7.5H10L9.75 9z" fill="currentColor"/>
    </svg>
  )
}

function PinterestIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M6.5 9c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 1.74-1.12 3-2.5 3-.45 0-.87-.13-1.22-.35L7 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="4" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M7.5 7l4 2-4 2V7z" fill="currentColor"/>
    </svg>
  )
}

