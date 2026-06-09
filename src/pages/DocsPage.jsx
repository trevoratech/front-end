import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from './DocsPage.module.css'

function useHashScroll() {
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    const id = hash.replace('#', '')
    let r1, r2
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      })
    })
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2) }
  }, [hash])
}

const endpoints = [
  {
    method: 'POST',
    path: '/v1/auth/token',
    desc: 'Exchange client credentials for a short-lived bearer token. Tokens expire after 3600 seconds.',
    params: ['client_id', 'client_secret'],
  },
  {
    method: 'GET',
    path: '/v1/workflows',
    desc: 'List all workflows in the authenticated workspace. Supports pagination and status filtering.',
    params: ['limit?', 'offset?', 'status?'],
  },
  {
    method: 'POST',
    path: '/v1/workflows/{id}/execute',
    desc: 'Trigger a specific workflow with a JSON input payload. Returns an execution ID for status tracking.',
    params: ['id (path)', 'input (body)'],
  },
  {
    method: 'GET',
    path: '/v1/executions/{id}',
    desc: 'Poll the status and output of a workflow execution. Use webhooks for high-volume tracking.',
    params: ['id (path)'],
  },
]

const integrations = [
  {
    name: 'Salesforce CRM',
    desc: 'Sync opportunities, leads, and contact records bidirectionally. Supports Flow triggers and custom objects.',
    badge: 'Native',
  },
  {
    name: 'SAP ERP',
    desc: 'Connect S/4HANA and SAP BTP for purchase orders, inventory events, and finance process automation.',
    badge: 'Native',
  },
  {
    name: 'ServiceNow ITSM',
    desc: 'Auto-create incidents, update CMDB records, and route approvals across your IT service workflows.',
    badge: 'Native',
  },
  {
    name: 'Custom REST / GraphQL',
    desc: 'Point the integration layer at any endpoint using our schema-inference engine and auth manager.',
    badge: 'Universal',
  },
]

const changelog = [
  {
    version: 'v2.4.0',
    date: 'June 2025',
    tag: 'Latest',
    items: [
      'Upgraded to NVIDIA NIM SDK 3.1 — 40% faster inference on complex workflows',
      'Added 18 new native connectors including Workday, HubSpot, and Databricks',
      'Workflow Builder canvas now supports nested sub-flows and conditional branching',
      'New real-time execution log streaming via WebSocket',
    ],
  },
  {
    version: 'v2.3.0',
    date: 'April 2025',
    tag: 'Stable',
    items: [
      'Analytics Hub v2: custom dashboards, exportable reports, anomaly detection alerts',
      'Execution throughput increased to 2M workflows/hour per cluster',
      'Multi-region failover now GA — auto-routes to nearest healthy region',
      'Python and Node.js SDK packages published to PyPI and npm',
    ],
  },
  {
    version: 'v2.2.0',
    date: 'February 2025',
    tag: 'Stable',
    items: [
      'Business Rule Intelligence engine v2: natural-language rule authoring',
      'SOC 2 Type II certification achieved',
      'REST webhook retries with exponential backoff (configurable up to 10 attempts)',
      'Workspace-level RBAC: owner, admin, editor, viewer roles',
    ],
  },
]

export default function DocsPage() {
  useHashScroll()

  useEffect(() => {
    window.scrollTo(0, 0)
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
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
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            API v2.4  ·  REST  ·  JSON
          </div>
          <h1 className={styles.heroTitle}>
            Developer<br />
            <span className={styles.heroTitleOutline}>Documentation</span>
          </h1>
          <p className={styles.heroSub}>
            Everything you need to integrate TrevoraTech into your stack — authentication,
            workflow execution, webhooks, and 200+ native connectors.
          </p>
          <div className={styles.heroNav}>
            <a href="#quickstart" className={styles.heroNavLink}>Quick Start</a>
            <span className={styles.sep}>·</span>
            <a href="#api" className={styles.heroNavLink}>API Reference</a>
            <span className={styles.sep}>·</span>
            <a href="#integrations" className={styles.heroNavLink}>Integrations</a>
            <span className={styles.sep}>·</span>
            <a href="#changelog" className={styles.heroNavLink}>Changelog</a>
          </div>
        </div>
      </section>

      {/* ── Quick Start ── */}
      <section id="quickstart" className={styles.section}>
        <div className={`${styles.inner} reveal`}>
          <div className={styles.sectionHeader}>
            <div className={styles.label}>Quick Start</div>
            <h2 className={styles.sectionTitle}>Up and running in 5 minutes.</h2>
            <p className={styles.sectionDesc}>
              Authenticate, list your workflows, and trigger your first execution with three API calls.
            </p>
          </div>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <div className={styles.codeDots}>
                <span /><span /><span />
              </div>
              <span className={styles.codeLang}>bash</span>
            </div>
            <pre className={styles.code}>{`# 1 — Authenticate and get a bearer token
curl -X POST https://api.trevoratech.com/v1/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"client_id":"YOUR_ID","client_secret":"YOUR_SECRET"}'

# → { "token": "tt_live_…", "expires_in": 3600 }

# 2 — List your available workflows
curl https://api.trevoratech.com/v1/workflows \\
  -H "Authorization: Bearer tt_live_…"

# 3 — Execute a workflow with an input payload
curl -X POST https://api.trevoratech.com/v1/workflows/wf_abc123/execute \\
  -H "Authorization: Bearer tt_live_…" \\
  -H "Content-Type: application/json" \\
  -d '{"input":{"source":"crm","event":"deal.closed","payload":{…}}}'

# → { "execution_id": "exec_xyz", "status": "queued" }`}</pre>
          </div>

          <div className={styles.quickLinks}>
            <Link to="/#contact" className={styles.quickLinkBtn}>
              Get API Credentials →
            </Link>
            <a href="#api" className={styles.quickLinkGhost}>
              Full API Reference ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── API Reference ── */}
      <section id="api" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={`${styles.inner} reveal`}>
          <div className={styles.sectionHeader}>
            <div className={styles.label}>API Reference</div>
            <h2 className={styles.sectionTitle}>Core endpoints.</h2>
            <p className={styles.sectionDesc}>
              Base URL: <code className={styles.inlineCode}>https://api.trevoratech.com</code>
              &nbsp;· All requests require a bearer token except <code className={styles.inlineCode}>/auth/token</code>.
            </p>
          </div>
          <div className={styles.endpointList}>
            {endpoints.map(ep => (
              <div key={ep.path} className={styles.endpoint}>
                <div className={styles.endpointMeta}>
                  <span className={`${styles.method} ${styles[`method${ep.method}`]}`}>
                    {ep.method}
                  </span>
                  <code className={styles.path}>{ep.path}</code>
                </div>
                <p className={styles.endpointDesc}>{ep.desc}</p>
                <div className={styles.params}>
                  {ep.params.map(p => (
                    <code key={p} className={styles.param}>{p}</code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Integration Guides ── */}
      <section id="integrations" className={styles.section}>
        <div className={`${styles.inner} reveal`}>
          <div className={styles.sectionHeader}>
            <div className={styles.label}>Integration Guides</div>
            <h2 className={styles.sectionTitle}>Connect your stack.</h2>
            <p className={styles.sectionDesc}>
              200+ native connectors ship out of the box. Each guide covers auth setup,
              event mapping, and production deployment checklist.
            </p>
          </div>
          <div className={styles.intGrid}>
            {integrations.map(int => (
              <div key={int.name} className={styles.intCard}>
                <div className={styles.intTop}>
                  <span className={styles.intBadge}>{int.badge}</span>
                </div>
                <h3 className={styles.intName}>{int.name}</h3>
                <p className={styles.intDesc}>{int.desc}</p>
                <Link to="/#contact" className={styles.intLink}>
                  View Guide →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Changelog ── */}
      <section id="changelog" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={`${styles.inner} reveal`}>
          <div className={styles.sectionHeader}>
            <div className={styles.label}>Changelog</div>
            <h2 className={styles.sectionTitle}>What's new.</h2>
            <p className={styles.sectionDesc}>
              Platform releases, API changes, and deprecation notices.
            </p>
          </div>
          <div className={styles.changelog}>
            {changelog.map((release, i) => (
              <div key={release.version} className={styles.release}>
                <div className={styles.releaseHeader}>
                  <div className={styles.releaseVersion}>{release.version}</div>
                  <div className={styles.releaseMeta}>
                    <span className={`${styles.releaseTag} ${i === 0 ? styles.tagLatest : styles.tagStable}`}>
                      {release.tag}
                    </span>
                    <span className={styles.releaseDate}>{release.date}</span>
                  </div>
                </div>
                <ul className={styles.releaseItems}>
                  {release.items.map(item => (
                    <li key={item} className={styles.releaseItem}>
                      <span className={styles.releaseBullet} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
