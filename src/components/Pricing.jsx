import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Pricing.module.css'

const plans = [
  {
    name: 'Growth',
    price: '$49',
    period: '/month',
    desc: 'For scaling teams automating their first enterprise workflows.',
    cta: 'Get Started',
    ctaHref: 'https://buy.stripe.com/test_7sY9ANgsQgbM4rCcm567S00',
    features: [
      '5,000 workflow executions/mo',
      '20 native connectors',
      'Core automation engine',
      'Visual workflow builder',
      'Standard analytics',
      '1 workspace',
      'Email support',
    ],
    unavailable: ['Custom business rules', 'Dedicated SLA', 'On-premise deployment'],
  },
  {
    name: 'Professional',
    price: '$119',
    period: '/month',
    desc: 'For enterprises running mission-critical automation at scale.',
    cta: 'Get Professional',
    ctaHref: 'https://buy.stripe.com/test_00wbIVgsQ2kW2ju99T67S01',
    badge: 'Most Popular',
    highlight: true,
    features: [
      '50,000 workflow executions/mo',
      '100+ native connectors',
      'Full automation engine',
      'Advanced analytics hub',
      'Custom business rules',
      '5 workspaces',
      '24/7 priority support',
    ],
    unavailable: ['On-premise deployment'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Unlimited scale, dedicated infrastructure, and full enterprise platform access.',
    cta: 'Contact Sales',
    ctaHref: '/#contact',
    features: [
      'Unlimited workflow executions',
      '200+ native connectors',
      'Predictive analytics',
      'Custom business rules',
      'SOC 2 Type II certified',
      'Custom SLA & uptime guarantee',
      'Enterprise SSO & role-based access control',
      'Unlimited scale',
      'Dedicated infrastructure',
      'Full enterprise platform access',
    ],
    unavailable: [],
  },
]

export default function Pricing() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(el)

    const cards = el.querySelectorAll(`.${styles.card}`)
    const cardObs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add(styles.cardVisible)
      }),
      { threshold: 0.1 }
    )
    cards.forEach(c => cardObs.observe(c))

    return () => { obs.disconnect(); cardObs.disconnect() }
  }, [])

  return (
    <section id="pricing" className={styles.section}>
      <div className={`${styles.inner} reveal`} ref={sectionRef}>
        <div className={styles.header}>
          <div className={styles.label}>Pricing</div>
          <h2 className={styles.title}>Transparent. Scalable. Enterprise-ready.</h2>
          <p className={styles.desc}>
            Every plan includes unlimited users, SOC 2 compliance, and a 14-day free trial.
            No credit card required.
          </p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`${styles.card} ${plan.highlight ? styles.highlighted : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {plan.badge && (
                <div className={styles.badge}>{plan.badge}</div>
              )}

              <div className={styles.planTop}>
                <div className={styles.planName}>{plan.name}</div>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{plan.price}</span>
                  {plan.period && <span className={styles.period}>{plan.period}</span>}
                </div>
                <p className={styles.planDesc}>{plan.desc}</p>
              </div>

              {plan.ctaHref.startsWith('http') ? (
                <a
                  href={plan.ctaHref}
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.cta} ${plan.highlight ? styles.ctaPrimary : styles.ctaGhost}`}
                >
                  {plan.cta} →
                </a>
              ) : (
                <Link
                  to={plan.ctaHref}
                  className={`${styles.cta} ${plan.highlight ? styles.ctaPrimary : styles.ctaGhost}`}
                >
                  {plan.cta} →
                </Link>
              )}

              <div className={styles.divider} />

              <ul className={styles.features}>
                {plan.features.map(f => (
                  <li key={f} className={styles.feature}>
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
                {plan.unavailable.map(f => (
                  <li key={f} className={`${styles.feature} ${styles.featureOff}`}>
                    <XIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className={styles.footnote}>
          All plans include a 14-day free trial · Annual billing saves 20% · Custom enterprise agreements available
        </p>
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={styles.checkIcon}>
      <circle cx="7" cy="7" r="6" stroke="#C8A96E" strokeWidth="1"/>
      <path d="M4.5 7l2 2 3-3" stroke="#C8A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={styles.xIcon}>
      <circle cx="7" cy="7" r="6" stroke="#412D15" strokeWidth="1"/>
      <path d="M5 5l4 4M9 5l-4 4" stroke="#412D15" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}
