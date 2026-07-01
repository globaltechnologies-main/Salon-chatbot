import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { to: '/',         label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about',    label: 'About' },
  { to: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: scrolled ? '14px 0' : '22px 0',
          background: scrolled
            ? theme === 'dark' ? 'rgba(26,15,12,0.96)' : 'rgba(253,244,238,0.96)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ lineHeight: 1 }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 2.2vw, 1.55rem)',
              fontWeight: 400,
              letterSpacing: '0.15em',
              color: 'var(--mocha)',
            }}>
              LUXE <span style={{ color: 'var(--rose)', fontStyle: 'italic' }}>&amp;</span> GLOW
            </div>
            <div style={{
              fontSize: '0.56rem',
              letterSpacing: '0.3em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
            }}>Mayfair · London</div>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }} className="desktop-nav">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                style={({ isActive }) => ({
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--rose)' : 'var(--mocha-soft)',
                  transition: 'color 0.3s',
                  position: 'relative',
                })}
                className="nav-link"
              >
                {label}
              </NavLink>
            ))}
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.88 }}
              aria-label="Toggle dark mode"
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                border: '1.5px solid var(--border)',
                background: 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--mocha-soft)',
                transition: 'background 0.3s, color 0.3s, border-color 0.3s',
                cursor: 'pointer',
                flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = 'var(--rose)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--mocha-soft)'; }}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark'
                  ? <motion.div key="sun"  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.22 }}><Sun  size={15} /></motion.div>
                  : <motion.div key="moon" initial={{ rotate: 90,  opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.22 }}><Moon size={15} /></motion.div>
                }
              </AnimatePresence>
            </motion.button>

            <Link to="/book" className="btn btn-dark" style={{ padding: '10px 24px', fontSize: '0.66rem' }}>
              Book Now
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
            style={{ color: 'var(--mocha)', display: 'none' }}
            className="hamburger"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'var(--surface)',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center', gap: '44px',
            }}
          >
            {[...links, { to: '/book', label: 'Book Now' }].map(({ to, label }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <NavLink
                  to={to}
                  end={to === '/'}
                  style={({ isActive }) => ({
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.6rem',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: isActive ? 'var(--rose)' : 'var(--mocha)',
                    letterSpacing: '0.02em',
                  })}
                >
                  {label}
                </NavLink>
              </motion.div>
            ))}
            <motion.button
              onClick={toggleTheme}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.4 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: 'transparent', border: '1.5px solid var(--border)',
                borderRadius: '100px', padding: '10px 22px',
                color: 'var(--mocha-soft)', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: '0.7rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
              }}
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </motion.button>
            <div style={{ marginTop: 8 }}>
              <div className="eyebrow" style={{ textAlign: 'center' }}>Mayfair, London · Mon–Sat 9–7</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
        .nav-link::after {
          content: '';
          position: absolute; bottom: -4px; left: 0; right: 0;
          height: 1px; background: var(--rose);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s ease;
        }
        .nav-link:hover::after,
        .nav-link.active::after { transform: scaleX(1); }
        .nav-link:hover { color: var(--rose) !important; }
      `}</style>
    </>
  )
}
