import { useEffect, useRef } from 'react'
import styles from './Features.module.css'

const features = [
  {
    title: 'Intelligent Workflow Automation',
    desc: 'Autonomous multi-step process execution that adapts in real-time to data signals and business conditions.',
    icon: '/Intelligent Workflow Automation.svg',
  },
  {
    title: 'Intelligent Process Optimization',
    desc: 'Continuous data-driven refinement of execution paths, reducing latency and eliminating operational waste.',
    icon: '/Intelligent Process Optimization.svg',
  },
  {
    title: 'Cross-System Orchestration',
    desc: 'Unified control plane connecting 200+ enterprise systems — ERP, CRM, ITSM — via native connectors.',
    icon: '/Cross-System Orchestration.svg',
  },
  {
    title: 'Business Rule Intelligence',
    desc: 'Dynamic rule engines that interpret business logic, compliance requirements, and edge-case handling at scale.',
    icon: '/Business Rule Intelligence.svg',
  },
  {
    title: 'Enterprise Analytics',
    desc: 'Real-time dashboards and predictive insights across all automated workflows with full audit trails.',
    icon: '/Enterprise Analytics.svg',
  },
  {
    title: 'Scalable Architecture',
    desc: 'Multi-tenant, cloud-native infrastructure built to handle millions of workflow executions per hour.',
    icon: '/Scalable Architecture.svg',
  },
]

export default function Features() {
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
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add(styles.cardVisible) })
      },
      { threshold: 0.1 }
    )
    cards.forEach(c => cardObs.observe(c))

    return () => { obs.disconnect(); cardObs.disconnect() }
  }, [])

  return (
    <section id="features" className={styles.section}>
      <div className={`${styles.inner} reveal`} ref={sectionRef}>
        <div className={styles.header}>
          <div className={styles.label}>Capabilities</div>
          <h2 className={styles.title}>Built for Enterprise Scale</h2>
          <p className={styles.desc}>
            Six core pillars powering end-to-end enterprise automation.
          </p>
        </div>
        <div className={styles.grid}>
          {features.map((f, i) => (
            <div
              key={f.title}
              className={styles.card}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className={styles.cardIcon}>
                <img src={f.icon} alt={f.title} />
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
              <div className={styles.cardArrow}>→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
