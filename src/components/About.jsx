import { useEffect, useRef, useState } from 'react'
import styles from './About.module.css'

const stats = [
  { value: 500, suffix: '+', label: 'Organizations Served' },
  { value: 50, suffix: 'M+', label: 'Automations Delivered' },
  { value: 99.97, suffix: '%', label: 'Uptime SLA' },
  { value: 4.9, suffix: '/5', label: 'Customer Rating' },
]

function useCountUp(target, duration = 2000, started) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    const isDecimal = !Number.isInteger(target)
    const step = target / (duration / 16)
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + step, target)
      setCount(isDecimal ? parseFloat(current.toFixed(2)) : Math.floor(current))
      if (current >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])
  return count
}

function StatCard({ stat, started }) {
  const val = useCountUp(stat.value, 1800, started)
  return (
    <div className={styles.stat}>
      <div className={styles.statValue}>
        {val}{stat.suffix}
      </div>
      <div className={styles.statLabel}>{stat.label}</div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          setStarted(true)
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" className={styles.section}>
      <div className={`${styles.inner} reveal`} ref={sectionRef}>
        <div className={styles.left}>
          <div className={styles.label}>Our Mission</div>
          <h2 className={styles.title}>
            We Automate What<br />
            <span className={styles.accent}>Slows You Down.</span>
          </h2>
          <p className={styles.body}>
            TrevoraTech was founded on a single conviction: enterprise operations
            should be driven by intelligence, not headcount. We build automation
            systems that see across your entire organization, understanding data,
            context, and intent, then act with the precision of your best operator.
          </p>
          <p className={styles.body}>
            From financial services to logistics to healthcare, our clients deploy
            TrevoraTech not as a tool, but as an operational layer — the silent
            system that runs the work that matters.
          </p>
          <a href="#contact" className={styles.cta}>
            Work With Us →
          </a>
        </div>
        <div className={styles.right}>
          <div className={styles.statGrid}>
            {stats.map((s, i) => (
              <StatCard key={s.label} stat={s} started={started} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
