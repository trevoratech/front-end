import { useEffect, useState } from 'react'
import styles from './CookieBanner.module.css'

const STORAGE_KEY = 'tt_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // only show if no prior choice stored
    if (!localStorage.getItem(STORAGE_KEY)) {
      // slight delay so it doesn't flash on initial paint
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <div className={styles.inner}>
        <div className={styles.left}>
          <CookieIcon />
          <div className={styles.text}>
            <p className={styles.title}>We use cookies</p>
            <p className={styles.desc}>
              We use cookies to enhance your experience, analyse traffic, and personalise
              content. You can choose to accept or decline non-essential cookies.{' '}
              <a href="#contact" className={styles.link}>Privacy Policy</a>
            </p>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.btnDecline} onClick={decline}>
            Decline
          </button>
          <button className={styles.btnAccept} onClick={accept}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}

function CookieIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className={styles.icon}>
      <circle cx="14" cy="14" r="12" stroke="#C8A96E" strokeWidth="1.2"/>
      <circle cx="9" cy="11" r="1.5" fill="#C8A96E"/>
      <circle cx="15" cy="8"  r="1.5" fill="#C8A96E"/>
      <circle cx="18" cy="15" r="1.5" fill="#C8A96E"/>
      <circle cx="11" cy="17" r="1.5" fill="#C8A96E"/>
      <circle cx="16" cy="20" r="1.5" fill="#C8A96E" opacity="0.5"/>
      <path d="M12 5.5a2 2 0 0 1 2-2" stroke="#C8A96E" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    </svg>
  )
}
