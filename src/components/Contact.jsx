import { useEffect, useRef, useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import ReCAPTCHA from 'react-google-recaptcha'
import styles from './Contact.module.css'

const RECAPTCHA_SITE_KEY = '6Ld6NRUtAAAAAErJlU0Jk-qXCVN-6DiJ0bf_v_QV'

export default function Contact() {
  const sectionRef = useRef(null)
  const recaptchaRef = useRef(null)
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const [recaptchaError, setRecaptchaError] = useState(false)
  const [state, handleSubmit] = useForm("mvznravv")

  useEffect(() => {
    const el = sectionRef.current
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (state.succeeded) recaptchaRef.current?.reset()
  }, [state.succeeded])

  const onSubmit = (e) => {
    if (!recaptchaToken) {
      e.preventDefault()
      setRecaptchaError(true)
      return
    }
    setRecaptchaError(false)
    handleSubmit(e)
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={`${styles.inner} reveal`} ref={sectionRef}>
        <div className={styles.left}>
          <div className={styles.label}>Get in Touch</div>
          <h2 className={styles.title}>
            Ready to Automate<br />Your Enterprise?
          </h2>
          <p className={styles.desc}>
            Our solutions team works with enterprise clients to scope, deploy, and
            scale automation programs that move the needle from day one.
          </p>
          <div className={styles.founderCard}>
            <div className={styles.founderInfo}>
              <div className={styles.founderName}>Jason Perera</div>
              <div className={styles.founderRole}>Founder &amp; CEO — Trevoratech Innovations LLC</div>
            </div>
          </div>
          <div className={styles.contactItems}>
            <div className={styles.contactItem}>
              <EmailIcon />
              <span>help@trevoratech.com</span>
            </div>
            <div className={styles.contactItem}>
              <GlobeIcon />
              <a href="https://trevoratech.com" target="_blank" rel="noreferrer">trevoratech.com</a>
            </div>
            <div className={styles.contactItem}>
              <PhoneIcon />
              <span>+1 (415) 555-0108</span>
            </div>
            <div className={styles.contactItem}>
              <LocationIcon />
              <span>425 Market Street, Suite 900<br />San Francisco, CA 94105, USA</span>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          {state.succeeded ? (
            <div className={styles.successState}>
              <CheckIcon />
              <h3>Request Received</h3>
              <p>Our enterprise team will contact you within 1 business day.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={onSubmit}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="company">Company Name</label>
                  <input
                    id="company"
                    name="company"
                    placeholder="Acme Corporation"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Jane Smith"
                    required
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Work Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="jane@acmecorp.com"
                  required
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className={styles.fieldError} />
              </div>
              <div className={styles.field}>
                <label htmlFor="useCase">Use Case</label>
                <select id="useCase" name="useCase" required defaultValue="">
                  <option value="" disabled>Select your primary use case</option>
                  <option value="workflow">Workflow Automation</option>
                  <option value="process">Process Optimization</option>
                  <option value="integration">System Integration</option>
                  <option value="custom">Custom Solution</option>
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your automation goals and current infrastructure..."
                  rows={4}
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className={styles.fieldError} />
              </div>
              <input type="hidden" name="g-recaptcha-response" value={recaptchaToken || ''} />

              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                theme="dark"
                onChange={(token) => { setRecaptchaToken(token); setRecaptchaError(false) }}
                onExpired={() => setRecaptchaToken(null)}
              />
              {recaptchaError && (
                <p className={styles.recaptchaError}>Please complete the reCAPTCHA verification.</p>
              )}

              <button type="submit" className={styles.submit} disabled={state.submitting}>
                {state.submitting ? 'Sending…' : 'Request Access →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="4" width="14" height="10" rx="2" stroke="#C8A96E" strokeWidth="1.2"/>
      <path d="M2 6l7 5 7-5" stroke="#C8A96E" strokeWidth="1.2"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 2h3l1.5 3.5-2 1.5A10 10 0 0 0 12 12l1.5-2L17 11.5V15a1 1 0 0 1-1 1C6 16 2 10 2 4a1 1 0 0 1 1-1l1-.5z" stroke="#C8A96E" strokeWidth="1.2"/>
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2a5 5 0 0 1 5 5c0 3.5-5 9-5 9S4 10.5 4 7a5 5 0 0 1 5-5z" stroke="#C8A96E" strokeWidth="1.2"/>
      <circle cx="9" cy="7" r="1.5" stroke="#C8A96E" strokeWidth="1.2"/>
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="#C8A96E" strokeWidth="1.2"/>
      <path d="M2 9h14M9 2a10 10 0 0 1 0 14M9 2a10 10 0 0 0 0 14" stroke="#C8A96E" strokeWidth="1.2"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke="#C8A96E" strokeWidth="1.5"/>
      <path d="M10 16l4 4 8-8" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
