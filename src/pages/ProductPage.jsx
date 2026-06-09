import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from './ProductPage.module.css'

const DASHBOARD_URL = 'https://dashboard.trevoratech.com'

const modules = [
  {
    id: '01',
    title: 'Workflow Builder',
    desc: 'Visual drag-and-drop canvas to design, test, and deploy multi-step automation workflows without writing a line of code.',
    icon: <WorkflowIcon />,
  },
  {
    id: '02',
    title: 'AI Process Engine',
    desc: 'NVIDIA-accelerated inference layer that reads live data, predicts bottlenecks, and reroutes processes in real time.',
    icon: <AIIcon />,
  },
  {
    id: '03',
    title: 'Analytics Hub',
    desc: 'Full-fidelity dashboards tracking every workflow event — latency, throughput, error rates, cost per execution.',
    icon: <AnalyticsIcon />,
  },
  {
    id: '04',
    title: 'Integration Layer',
    desc: '200+ native connectors to SAP, Salesforce, ServiceNow, AWS, and any REST/GraphQL endpoint in your stack.',
    icon: <IntegrationIcon />,
  },
]

const specs = [
  { value: '230ms', label: 'Avg. Execution Time' },
  { value: '99.97%', label: 'Platform Uptime' },
  { value: '200+', label: 'Native Connectors' },
  { value: '50M+', label: 'Daily Automations' },
]

export default function ProductPage() {
  const modulesRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={styles.heroBgLine} style={{ '--i': i }} />
          ))}
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Platform Overview
          </div>
          <h1 className={styles.heroTitle}>
            <span>THE TREVORATECH</span>
            <span className={styles.heroTitleOutline}>PLATFORM</span>
          </h1>
          <p className={styles.heroSub}>
            One unified command center for every automation across your enterprise.
            Connect systems, deploy intelligence, and act at machine speed.
          </p>
          <div className={styles.heroActions}>
            <a
              href={DASHBOARD_URL}
              target="_blank"
              rel="noreferrer"
              className={styles.btnPrimary}
            >
              Launch Dashboard →
            </a>
            <Link to="/" className={styles.btnGhost}>
              ← Back to Overview
            </Link>
          </div>
        </div>
      </section>

      {/* ── Spec strip ── */}
      <div className={styles.specStrip}>
        {specs.map(s => (
          <div key={s.label} className={styles.specItem}>
            <span className={styles.specValue}>{s.value}</span>
            <span className={styles.specLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Platform Modules ── */}
      <section className={styles.modulesSection}>
        <div className={`${styles.modulesInner} reveal`} ref={modulesRef}>
          <div className={styles.sectionHeader}>
            <div className={styles.label}>Platform Modules</div>
            <h2 className={styles.sectionTitle}>Four Layers. One Platform.</h2>
            <p className={styles.sectionDesc}>
              Every enterprise automation need — from no-code to deep API — covered natively.
            </p>
          </div>
          <div className={styles.modulesGrid}>
            {modules.map((m, i) => (
              <div
                key={m.id}
                className={styles.moduleCard}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={styles.moduleNum}>{m.id}</div>
                <div className={styles.moduleIcon}>{m.icon}</div>
                <h3 className={styles.moduleTitle}>{m.title}</h3>
                <p className={styles.moduleDesc}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className={styles.ctaSection}>
        <div className={`${styles.ctaInner} reveal`}>
          <div className={styles.ctaGlow} aria-hidden="true" />
          <p className={styles.ctaEyebrow}>Live Environment</p>
          <h2 className={styles.ctaTitle}>Experience it in action.</h2>
          <p className={styles.ctaDesc}>
            Your enterprise dashboard is ready. Log in to deploy your first workflow in under 10 minutes.
          </p>
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noreferrer"
            className={styles.ctaBtn}
          >
            Open Dashboard →
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
}

function WorkflowIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
      <rect x="4" y="18" width="12" height="12" rx="3" stroke="#C8A96E" strokeWidth="1.5"/>
      <rect x="32" y="8" width="12" height="12" rx="3" stroke="#C8A96E" strokeWidth="1.5"/>
      <rect x="32" y="28" width="12" height="12" rx="3" stroke="#C8A96E" strokeWidth="1.5"/>
      <path d="M16 24h8v-10h8M16 24h8v10h8" stroke="#C8A96E" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

function AIIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
      <polygon points="24,4 40,13 40,31 24,40 8,31 8,13" stroke="#C8A96E" strokeWidth="1.5"/>
      <circle cx="24" cy="22" r="5" fill="#C8A96E" opacity="0.2"/>
      <circle cx="24" cy="22" r="2.5" fill="#C8A96E"/>
      <line x1="24" y1="4" x2="24" y2="17" stroke="#C8A96E" strokeWidth="1" opacity="0.6"/>
      <line x1="24" y1="27" x2="24" y2="40" stroke="#C8A96E" strokeWidth="1" opacity="0.6"/>
      <line x1="40" y1="13" x2="29" y2="18" stroke="#C8A96E" strokeWidth="1" opacity="0.6"/>
      <line x1="8" y1="31" x2="19" y2="26" stroke="#C8A96E" strokeWidth="1" opacity="0.6"/>
    </svg>
  )
}

function AnalyticsIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
      <rect x="6" y="30" width="8" height="12" rx="2" fill="#412D15" stroke="#C8A96E" strokeWidth="1.5"/>
      <rect x="20" y="20" width="8" height="22" rx="2" fill="#412D15" stroke="#C8A96E" strokeWidth="1.5"/>
      <rect x="34" y="10" width="8" height="32" rx="2" fill="#412D15" stroke="#C8A96E" strokeWidth="1.5"/>
      <path d="M4 42h40" stroke="#412D15" strokeWidth="1"/>
      <path d="M7 28l14-10 14 4" stroke="#C8A96E" strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/>
    </svg>
  )
}

function IntegrationIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
      <circle cx="24" cy="24" r="5" stroke="#C8A96E" strokeWidth="1.5"/>
      <circle cx="8" cy="12" r="4" stroke="#C8A96E" strokeWidth="1.5"/>
      <circle cx="40" cy="12" r="4" stroke="#C8A96E" strokeWidth="1.5"/>
      <circle cx="8" cy="36" r="4" stroke="#C8A96E" strokeWidth="1.5"/>
      <circle cx="40" cy="36" r="4" stroke="#C8A96E" strokeWidth="1.5"/>
      <path d="M12 14l9 8M36 14l-9 8M12 34l9-8M36 34l-9-8" stroke="#C8A96E" strokeWidth="1" opacity="0.7"/>
    </svg>
  )
}
