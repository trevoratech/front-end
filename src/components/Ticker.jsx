import styles from './Ticker.module.css'

const items = [
  '12,400 workflows automated today',
  '99.97% uptime',
  '230ms avg execution time',
  '500+ enterprise clients',
  '50M+ automations delivered',
  'SOC 2 Type II certified',
  'NVIDIA AI infrastructure',
]

export default function Ticker() {
  const repeated = [...items, ...items, ...items]
  return (
    <div className={styles.ticker}>
      <div className={styles.track}>
        {repeated.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot} />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
