import { useEffect, useRef, useState } from 'react'
import styles from './FAQ.module.css'

const faqs = [
  {
    q: 'How long does implementation take?',
    a: 'Most organizations are live within 2–4 weeks. Our onboarding team handles connector configuration, workflow mapping, and testing — so your team can focus on outcomes, not setup.',
  },
  {
    q: 'What systems can TrevoraTech connect to?',
    a: 'TrevoraTech integrates with 200+ enterprise systems out of the box — including SAP, Salesforce, ServiceNow, Oracle, Microsoft 365, Workday, and more. Custom connectors are available for proprietary or legacy systems.',
  },
  {
    q: 'Is TrevoraTech secure and compliant?',
    a: 'Yes. TrevoraTech is SOC 2 Type II certified and built with enterprise-grade security — end-to-end encryption, role-based access control, full audit trails, and support for on-premise deployment on the Enterprise plan.',
  },
  {
    q: 'Can I start small and scale later?',
    a: 'Absolutely. The Growth plan is designed for teams automating their first workflows. As your needs expand, upgrading to Professional or Enterprise takes minutes — your configurations and data move with you.',
  },
  {
    q: 'Do I need a technical team to use TrevoraTech?',
    a: 'No. The visual workflow builder lets business teams design and deploy automations without writing code. Engineering involvement is optional, not required.',
  },
  {
    q: 'How is pricing calculated?',
    a: 'Plans are based on monthly workflow executions and feature access. Growth starts at $49/mo, Professional at $119/mo. Enterprise is custom-quoted based on scale, infrastructure, and SLA requirements.',
  },
  {
    q: 'What support is included?',
    a: 'Growth includes email support. Professional includes 24/7 priority support. Enterprise customers receive a dedicated support team, custom SLA, and a named customer success manager.',
  },
]

function Item({ faq }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef(null)

  return (
    <div className={`${styles.item} ${open ? styles.itemOpen : ''}`}>
      <button
        className={styles.question}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span>{faq.q}</span>
        <span className={styles.icon} aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      <div
        className={styles.answerWrap}
        style={{ maxHeight: open ? bodyRef.current?.scrollHeight + 'px' : '0px' }}
      >
        <p className={styles.answer} ref={bodyRef}>{faq.a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
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
    <section id="faq" className={styles.section}>
      <div className={`${styles.inner} reveal`} ref={sectionRef}>
        <div className={styles.header}>
          <div className={styles.label}>FAQ</div>
          <h2 className={styles.title}>Common Questions</h2>
          <p className={styles.desc}>
            Everything you need to know before getting started.
          </p>
        </div>
        <div className={styles.list}>
          {faqs.map((faq, i) => (
            <Item key={i} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  )
}
