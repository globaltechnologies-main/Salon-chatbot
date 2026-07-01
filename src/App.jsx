import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BellaWidget from './components/BellaWidget'
import Home from './pages/Home'
import Services from './pages/Services'
import BookNow from './pages/BookNow'
import About from './pages/About'
import Contact from './pages/Contact'

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.35, ease: [0.65, 0, 0.35, 1] } },
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/"         element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book"     element={<BookNow />} />
          <Route path="/about"    element={<About />} />
          <Route path="/contact"  element={<Contact />} />
        </Routes>
        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="noise-overlay" aria-hidden="true" />
        <Navbar />
        <AnimatedRoutes />
        <BellaWidget />
      </BrowserRouter>
    </ThemeProvider>
  )
}
