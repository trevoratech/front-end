import { useEffect, useRef } from 'react'
import styles from './Architecture.module.css'

const nodes = [
  { id: 'enterprise', label: 'Enterprise Systems', sub: 'ERP · CRM · Databases', x: 0, icon: '/Enterprise Systems.svg' },
  { id: 'ingestion', label: 'Data Ingestion Layer', sub: 'Connectors · ETL · Streams', x: 1, icon: '/Data Ingestion Layer.svg' },
  { id: 'ai', label: 'Automation Process Engine', sub: 'Neural Orchestration, Process Intelligence', x: 2, icon: '/Automation Process Engine.svg' },
  { id: 'orchestrator', label: 'Workflow Orchestrator', sub: 'Rules · Routing · State', x: 3, icon: '/Workflow Orchestrator.svg' },
  { id: 'output', label: 'Automated Output', sub: 'Actions · Analytics · APIs', x: 4, icon: '/Automated Output.svg' },
]

export default function Architecture() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="how-it-works" className={styles.section}>
      <div className={`${styles.inner} reveal`} ref={sectionRef}>
        <div className={styles.label}>Architecture</div>
        <h2 className={styles.title}>How TrevoraTech Works</h2>
        <p className={styles.desc}>
          A five-layer intelligent pipeline that transforms raw enterprise data
          into automated, measurable outcomes.
        </p>

        <div className={styles.diagram}>
          {nodes.map((node, i) => (
            <div key={node.id} className={styles.nodeWrap}>
              <div className={styles.node}>
                <div className={styles.nodeIcon}>
                  <img src={node.icon} alt={node.label} />
                </div>
                <div className={styles.nodeLabel}>{node.label}</div>
                <div className={styles.nodeSub}>{node.sub}</div>
              </div>
              {i < nodes.length - 1 && (
                <div className={styles.connector}>
                  <svg viewBox="0 0 80 20" preserveAspectRatio="none" className={styles.connSvg}>
                    <line
                      x1="0" y1="10" x2="80" y2="10"
                      stroke="#412D15"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      className={styles.dash}
                    />
                    <polygon points="76,6 84,10 76,14" fill="#C8A96E" className={styles.arrow} />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

