import { useEffect, useRef } from 'react'
import styles from './Testimonials.module.css'

const testimonials = [
  {
    quote: "TrevoraTech cut our ops team's manual workload by 73% in the first quarter. The ROI was undeniable within weeks.",
    name: 'Sarah K.',
    title: 'VP Operations',
    company: 'Nexora Corp',
    avatar: '/Sarah K..svg',
  },
  {
    quote: "The workflow intelligence layer is unlike anything we've deployed before. It just thinks. It anticipates. It acts.",
    name: 'Marcus T.',
    title: 'CTO',
    company: 'Meridian Systems',
    avatar: '/Marcus T..svg',
  },
  {
    quote: "Our cross-department automation went live in days, not months. TrevoraTech's implementation team was exceptional.",
    name: 'Priya N.',
    title: 'Head of Digital Transformation',
    company: 'Veltex Group',
    avatar: '/Priya N..svg',
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="testimonials" className={styles.section}>
      <div className={`${styles.inner} reveal`} ref={sectionRef}>
        <div className={styles.label}>Social Proof</div>
        <h2 className={styles.title}>Trusted by Enterprise Teams</h2>
        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.card} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, si) => <StarIcon key={si} />)}
              </div>
              <blockquote className={styles.quote}>"{t.quote}"</blockquote>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  <img src={t.avatar} alt={t.name} />
                </div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.title} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="#C8A96E">
      <path d="M7 1l1.6 3.4 3.7.5-2.7 2.6.6 3.7L7 9.5l-3.2 1.7.6-3.7L1.7 4.9l3.7-.5L7 1z"/>
    </svg>
  )
}
