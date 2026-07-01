import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Reusable fade-in-on-scroll wrapper.
 * Props:
 *   delay    – stagger delay in seconds (default 0)
 *   y        – starting Y offset (default 32)
 *   once     – only animate once (default true)
 *   children – content
 */
export default function FadeIn({ children, delay = 0, y = 32, once = true, className = '', style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
