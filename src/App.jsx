import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Architecture from './components/Architecture'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import ProductPage from './pages/ProductPage'
import DocsPage from './pages/DocsPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import './App.css'

/* After a React Router navigation to /#section, history.pushState
   does NOT trigger the browser's native hash-scroll. This hook fills
   that gap: it watches location.hash and scrolls to the target element
   once the DOM has been painted. Uses double-rAF to guarantee the
   render is committed before scrolling. */
function useHashScroll() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
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

function useScrollSpy() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'))
    const onScroll = () => {
      const mid = window.innerHeight / 2
      let current = 'home'
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= mid) current = s.id
      }
      const hash = current === 'home' ? '' : `#${current}`
      history.replaceState(null, '', `/${hash}`)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}

function HomePage() {
  useHashScroll()
  useScrollSpy()
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Architecture />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <>
      <Cursor />
      <CookieBanner />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </>
  )
}

export default App
