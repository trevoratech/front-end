import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from './ProductPage.module.css'

const DASHBOARD_URL = 'https://app.trevoratech.com'

const specs = [
  { value: '230ms', label: 'Avg. Execution Time' },
  { value: '99.97%', label: 'Platform Uptime' },
  { value: '200+', label: 'Native Connectors' },
  { value: '50M+', label: 'Daily Automations' },
]

const steps = [
  {
    num: '01',
    title: 'Connect Your Systems',
    desc: 'Map every data source and endpoint in your organization through a single unified connector library — no custom middleware required.',
    features: ['200+ pre-built connectors', 'REST, GraphQL & gRPC support', 'Custom API builder', 'Real-time webhooks & event streams'],
  },
  {
    num: '02',
    title: 'Design Your Workflows',
    desc: 'Build automation logic visually with the drag-and-drop Workflow Builder. Add AI decision nodes, conditional branches, and parallel execution paths.',
    features: ['No-code visual canvas', 'AI decision & routing nodes', 'Version control & rollback', 'Collaborative real-time editing'],
  },
  {
    num: '03',
    title: 'Deploy & Scale',
    desc: 'One-click deployment to production with automatic load balancing, failover, and real-time monitoring across every active workflow.',
    features: ['One-click production deployment', 'Auto-scaling infrastructure', 'Live execution dashboards', 'Instant rollback on failure'],
  },
]

const modules = [
  {
    id: '01',
    title: 'Workflow Builder',
    tagline: 'No-code automation canvas',
    desc: 'Visual drag-and-drop canvas to design, test, and deploy multi-step automation workflows without writing a line of code.',
    features: [
      'Drag-and-drop node editor',
      'Conditional branching & loops',
      'Parallel & sequential execution',
      'Reusable workflow templates',
      'One-click test & preview mode',
    ],
    icon: <WorkflowIcon />,
  },
  {
    id: '02',
    title: 'AI Process Engine',
    tagline: 'NVIDIA-accelerated intelligence',
    desc: 'NVIDIA-accelerated inference layer that reads live data, predicts bottlenecks, and reroutes processes in real time.',
    features: [
      'Predictive bottleneck detection',
      'Real-time process rerouting',
      'LLM-powered document extraction',
      'Anomaly detection & alerts',
      'Natural language workflow triggers',
    ],
    icon: <AIIcon />,
  },
  {
    id: '03',
    title: 'Analytics Hub',
    tagline: 'Full-fidelity execution data',
    desc: 'Full-fidelity dashboards tracking every workflow event — latency, throughput, error rates, cost per execution.',
    features: [
      'Real-time execution dashboards',
      'Latency & throughput metrics',
      'Cost-per-automation tracking',
      'Custom KPI & report builder',
      'Export to Tableau & Power BI',
    ],
    icon: <AnalyticsIcon />,
  },
  {
    id: '04',
    title: 'Integration Layer',
    tagline: '200+ enterprise connectors',
    desc: '200+ native connectors to SAP, Salesforce, ServiceNow, AWS, and any REST/GraphQL endpoint in your stack.',
    features: [
      '200+ certified connectors',
      'SAP, Salesforce & ServiceNow native',
      'Custom connector SDK',
      'OAuth 2.0 & API key auth',
      'GraphQL, gRPC & SOAP support',
    ],
    icon: <IntegrationIcon />,
  },
]

const capabilities = [
  {
    category: 'Automation Engine',
    icon: <AutoCapIcon />,
    items: [
      'Visual workflow designer',
      'Event-driven & scheduled triggers',
      'Parallel & conditional branching',
      'Sub-workflow nesting',
      'Error handling & auto-retry',
      'Human-in-the-loop approvals',
    ],
  },
  {
    category: 'AI & Intelligence',
    icon: <AICapIcon />,
    items: [
      'LLM-powered document processing',
      'Predictive process optimization',
      'Anomaly detection & alerting',
      'Natural language automation',
      'Computer vision data extraction',
      'Custom ML model integration',
    ],
  },
  {
    category: 'Security & Compliance',
    icon: <SecCapIcon />,
    items: [
      'SOC 2 Type II certified',
      'GDPR & HIPAA compliant',
      'AES-256 encryption at rest',
      'TLS 1.3 encryption in transit',
      'Role-based access control',
      'Full audit trail & logging',
    ],
  },
  {
    category: 'Enterprise Operations',
    icon: <OpsCapIcon />,
    items: [
      'Multi-tenant architecture',
      'SSO & SAML 2.0 support',
      'SLA-backed 99.97% uptime',
      'Global data residency options',
      'Dedicated customer success',
      'Custom SLA & support tiers',
    ],
  },
]

const integrations = [
  { category: 'ERP & CRM', items: ['SAP S/4HANA', 'Salesforce', 'HubSpot', 'Oracle ERP', 'MS Dynamics'] },
  { category: 'ITSM & DevOps', items: ['ServiceNow', 'Jira', 'PagerDuty', 'GitHub', 'GitLab'] },
  { category: 'Cloud Infrastructure', items: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Cloudflare', 'Terraform'] },
  { category: 'Data & Analytics', items: ['Snowflake', 'Databricks', 'BigQuery', 'Tableau', 'Power BI'] },
  { category: 'Communication', items: ['Slack', 'Microsoft Teams', 'Twilio', 'SendGrid', 'Zendesk'] },
  { category: 'Finance & Payments', items: ['Stripe', 'SAP Finance', 'QuickBooks', 'NetSuite', 'Plaid'] },
]

const useCases = [
  {
    industry: 'Financial Services',
    title: 'Trade Settlement Automation',
    desc: 'A global investment bank automated post-trade reconciliation across 12 systems, eliminating 4,200 manual steps per day and cutting settlement time from 48 hours to under 3.',
    metric: '94%',
    metricLabel: 'reduction in settlement time',
    tags: ['SAP Finance', 'Bloomberg API', 'AI Reconciliation'],
  },
  {
    industry: 'Healthcare',
    title: 'Patient Data Synchronization',
    desc: 'A multi-hospital network unified EHR data across Epic, Cerner, and internal systems — ensuring real-time patient record accuracy with zero manual data entry.',
    metric: '99.9%',
    metricLabel: 'data accuracy achieved',
    tags: ['Epic', 'Cerner', 'HIPAA Compliant'],
  },
  {
    industry: 'Manufacturing',
    title: 'Supply Chain Orchestration',
    desc: 'A Tier-1 automotive supplier automated procurement, inventory, and logistics workflows across 34 factories — predicting supply disruptions 72 hours in advance.',
    metric: '40%',
    metricLabel: 'operational cost reduction',
    tags: ['SAP S/4HANA', 'Oracle', 'Predictive AI'],
  },
]

export default function ProductPage() {
  useEffect(() => {
    window.scrollTo(0, 0)

    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.08 }
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
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className={styles.btnPrimary}>
              Launch Dashboard →
            </a>
            <Link to="/" className={styles.btnGhost}>← Back to Overview</Link>
          </div>
        </div>
      </section>

      {/* ── Spec Strip ── */}
      <div className={styles.specStrip}>
        {specs.map(s => (
          <div key={s.label} className={styles.specItem}>
            <span className={styles.specValue}>{s.value}</span>
            <span className={styles.specLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── How It Works ── */}
      <section className={styles.stepsSection}>
        <div className={`${styles.stepsInner} reveal`}>
          <div className={styles.sectionHeader}>
            <div className={styles.label}>How It Works</div>
            <h2 className={styles.sectionTitle}>Three Steps to Full Automation</h2>
            <p className={styles.sectionDesc}>
              From first connector to live deployment — TrevoraTech is built to move fast without compromising on control.
            </p>
          </div>
          <div className={styles.stepsGrid}>
            {steps.map(step => (
              <div key={step.num} className={styles.stepCard}>
                <div className={styles.stepNum}>{step.num}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
                <ul className={styles.stepFeatures}>
                  {step.features.map(f => (
                    <li key={f} className={styles.stepFeature}>
                      <span className={styles.stepArrow} aria-hidden="true">→</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Modules ── */}
      <section className={styles.modulesSection}>
        <div className={`${styles.modulesInner} reveal`}>
          <div className={styles.sectionHeader}>
            <div className={styles.label}>Platform Modules</div>
            <h2 className={styles.sectionTitle}>Four Layers. One Platform.</h2>
            <p className={styles.sectionDesc}>
              Every enterprise automation need — from no-code to deep API — covered natively.
            </p>
          </div>
          <div className={styles.modulesGrid}>
            {modules.map((m, i) => (
              <div key={m.id} className={styles.moduleCard} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.moduleNum}>{m.id}</div>
                <div className={styles.moduleIcon}>{m.icon}</div>
                <div className={styles.moduleTagline}>{m.tagline}</div>
                <h3 className={styles.moduleTitle}>{m.title}</h3>
                <p className={styles.moduleDesc}>{m.desc}</p>
                <ul className={styles.moduleFeatures}>
                  {m.features.map(f => (
                    <li key={f} className={styles.moduleFeature}>
                      <span aria-hidden="true" className={styles.moduleDash}>—</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full Capabilities ── */}
      <section className={styles.capSection}>
        <div className={`${styles.capInner} reveal`}>
          <div className={styles.sectionHeader}>
            <div className={styles.label}>Full Capabilities</div>
            <h2 className={styles.sectionTitle}>Everything Your Enterprise Needs</h2>
            <p className={styles.sectionDesc}>
              A complete platform built for reliability, security, and scale from day one.
            </p>
          </div>
          <div className={styles.capGrid}>
            {capabilities.map(cap => (
              <div key={cap.category} className={styles.capCard}>
                <div className={styles.capIconWrap}>{cap.icon}</div>
                <h3 className={styles.capTitle}>{cap.category}</h3>
                <ul className={styles.capList}>
                  {cap.items.map(item => (
                    <li key={item} className={styles.capItem}>
                      <span className={styles.capCheck} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Integration Showcase ── */}
      <section className={styles.intSection}>
        <div className={`${styles.intInner} reveal`}>
          <div className={styles.intHeader}>
            <div className={styles.intHeaderText}>
              <div className={styles.label}>Integrations</div>
              <h2 className={styles.sectionTitle}>Connects to Your Entire Stack</h2>
              <p className={styles.sectionDesc}>
                200+ certified connectors across every category of enterprise software — ready on day one.
              </p>
            </div>
            <div className={styles.intStat}>
              <span className={styles.intStatValue}>200+</span>
              <span className={styles.intStatLabel}>Native Connectors</span>
            </div>
          </div>
          <div className={styles.intGrid}>
            {integrations.map(group => (
              <div key={group.category} className={styles.intGroup}>
                <div className={styles.intGroupTitle}>{group.category}</div>
                <ul className={styles.intItems}>
                  {group.items.map(item => (
                    <li key={item} className={styles.intItem}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={styles.intNote}>
            + hundreds more via REST API, GraphQL, gRPC, and the custom connector SDK
          </p>
        </div>
      </section>

      {/* ── Customer Outcomes ── */}
      <section className={styles.useCaseSection}>
        <div className={`${styles.useCaseInner} reveal`}>
          <div className={styles.sectionHeader}>
            <div className={styles.label}>Customer Outcomes</div>
            <h2 className={styles.sectionTitle}>Real Results. Real Enterprises.</h2>
            <p className={styles.sectionDesc}>
              How leading organizations are transforming operations with TrevoraTech.
            </p>
          </div>
          <div className={styles.useCaseGrid}>
            {useCases.map(uc => (
              <div key={uc.title} className={styles.useCaseCard}>
                <div className={styles.useCaseIndustry}>{uc.industry}</div>
                <h3 className={styles.useCaseTitle}>{uc.title}</h3>
                <p className={styles.useCaseDesc}>{uc.desc}</p>
                <div className={styles.useCaseMetricWrap}>
                  <span className={styles.useCaseMetricValue}>{uc.metric}</span>
                  <span className={styles.useCaseMetricLabel}>{uc.metricLabel}</span>
                </div>
                <div className={styles.useCaseTags}>
                  {uc.tags.map(tag => (
                    <span key={tag} className={styles.useCaseTag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={`${styles.ctaInner} reveal`}>
          <div className={styles.ctaGlow} aria-hidden="true" />
          <p className={styles.ctaEyebrow}>Live Environment</p>
          <h2 className={styles.ctaTitle}>Experience it in action.</h2>
          <p className={styles.ctaDesc}>
            Your enterprise dashboard is ready. Log in to deploy your first workflow in under 10 minutes.
          </p>
          <div className={styles.ctaActions}>
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className={styles.ctaBtn}>
              Open Dashboard →
            </a>
            <Link to="/#contact" className={styles.ctaBtnGhost}>Talk to Sales</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

/* ── Module Icons ── */
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

/* ── Capability Icons ── */
function AutoCapIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
      <circle cx="16" cy="16" r="6" stroke="#C8A96E" strokeWidth="1.4"/>
      <circle cx="16" cy="16" r="2" fill="#C8A96E"/>
      <path d="M16 4v4M16 24v4M4 16h4M24 16h4" stroke="#C8A96E" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M7.8 7.8l2.8 2.8M21.4 21.4l2.8 2.8M7.8 24.2l2.8-2.8M21.4 10.6l2.8-2.8" stroke="#C8A96E" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
    </svg>
  )
}

function AICapIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
      <rect x="6" y="10" width="8" height="8" rx="2" stroke="#C8A96E" strokeWidth="1.4"/>
      <rect x="18" y="6" width="8" height="8" rx="2" stroke="#C8A96E" strokeWidth="1.4"/>
      <rect x="18" y="18" width="8" height="8" rx="2" stroke="#C8A96E" strokeWidth="1.4"/>
      <path d="M14 14l4-4M14 14l4 4" stroke="#C8A96E" strokeWidth="1.2" opacity="0.7"/>
      <circle cx="10" cy="14" r="1.5" fill="#C8A96E"/>
      <circle cx="22" cy="10" r="1.5" fill="#C8A96E"/>
      <circle cx="22" cy="22" r="1.5" fill="#C8A96E"/>
    </svg>
  )
}

function SecCapIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
      <path d="M16 3l10 4v8c0 6-4.5 10.5-10 12C10.5 25.5 6 21 6 15V7l10-4z" stroke="#C8A96E" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M11 16l3 3 7-7" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function OpsCapIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
      <rect x="4" y="5" width="24" height="7" rx="2" stroke="#C8A96E" strokeWidth="1.4"/>
      <rect x="4" y="14" width="24" height="7" rx="2" stroke="#C8A96E" strokeWidth="1.4"/>
      <rect x="4" y="23" width="24" height="4" rx="2" stroke="#C8A96E" strokeWidth="1.4"/>
      <circle cx="26" cy="8.5" r="1.2" fill="#C8A96E"/>
      <circle cx="26" cy="17.5" r="1.2" fill="#C8A96E"/>
      <circle cx="22" cy="8.5" r="1.2" fill="#C8A96E" opacity="0.5"/>
      <circle cx="22" cy="17.5" r="1.2" fill="#C8A96E" opacity="0.5"/>
    </svg>
  )
}
