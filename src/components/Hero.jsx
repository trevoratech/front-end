import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

export default function Hero() {
  const svgRef = useRef(null)

  useEffect(() => {
    const words = document.querySelectorAll(`.${styles.word}`)
    words.forEach((w, i) => {
      w.style.transitionDelay = `${0.1 + i * 0.12}s`
      w.classList.add(styles.visible)
    })
  }, [])

  return (
    <section id="home" className={styles.hero}>
      <CircuitCanvas />
      <div className={styles.content}>
        <p className={styles.eyebrow}>Intelligent Enterprise Platform</p>
        <h1 className={styles.heading} aria-label="Enterprise Automation Intelligence">
          {['ENTERPRISE', 'AUTOMATION', 'INTELLIGENCE'].map((w, i) => (
            <span key={w} className={styles.line}>
              <span className={styles.word}>{w}</span>
            </span>
          ))}
        </h1>
        <p className={styles.sub}>
          Intelligent workflow orchestration for the modern enterprise.
          <br />Built for scale. Engineered for precision.
        </p>
        <div className={styles.actions}>
          <Link to="/Product" className={styles.btnPrimary}>
            See the Platform →
          </Link>
          <a href="#how-it-works" className={styles.btnGhost}>
            Explore Architecture ↓
          </a>
        </div>
      </div>
      <div className={styles.scrollHint}>
        <span />
      </div>
    </section>
  )
}

function CircuitCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const nodes = Array.from({ length: 28 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2.5 + 1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.004

      nodes.forEach(n => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      })

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = b.x - a.x, dy = b.y - a.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 220) {
            const alpha = (1 - dist / 220) * 0.22
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(200,169,110,${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      nodes.forEach(n => {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        const pulse = 0.3 + 0.2 * Math.sin(t * 2 + n.x)
        ctx.fillStyle = `rgba(200,169,110,${pulse})`
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}
