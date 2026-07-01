import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Star, Quote } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { IMG } from '../images'

/* ══════════════════════════════════════════
   HERO — Salon image right, text left
══════════════════════════════════════════ */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY    = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY   = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section ref={ref} style={{ position: 'relative', overflow: 'hidden', minHeight: '100svh', background: 'var(--cream)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '54% 46%', minHeight: '100svh' }} className="hero-grid">

        {/* LEFT */}
        <motion.div style={{ y: textY, opacity, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(96px,10vw,140px) clamp(20px,4vw,64px) 72px' }}>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
              <div style={{ width: '28px', height: '1px', background: 'var(--rose-2)' }} />
              <span className="eyebrow">Mayfair · London</span>
            </div>
          </motion.div>

          {['The', 'Art of', 'Beauty'].map((word, i) => (
            <div key={word} style={{ overflow: 'hidden', marginBottom: i === 2 ? '28px' : '0px' }}>
              <motion.div
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.35 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="display-hero" style={{ color: i === 1 ? 'var(--rose)' : 'var(--mocha)', fontStyle: i === 1 ? 'italic' : 'normal', lineHeight: 0.9 }}>
                  {word}
                </div>
              </motion.div>
            </div>
          ))}

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.7 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', fontStyle: 'italic', color: 'var(--mocha-soft)', maxWidth: '360px', marginBottom: '32px', lineHeight: 1.55 }}>
            Where every woman is treated as a work of art — and leaves feeling like one.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.7 }}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '48px' }}>
            <Link to="/book" className="btn btn-dark">Book Your Experience <ArrowRight size={13} /></Link>
            <Link to="/services" className="btn btn-outline-rose">Our Services</Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }}>
            <div style={{ display: 'flex', gap: '36px', flexWrap: 'wrap', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
              {[['500+', 'Happy Clients'], ['12+', 'Expert Artists'], ['8', 'Services']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2vw, 1.9rem)', fontWeight: 300, color: 'var(--rose)', lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '4px' }}>{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT — salon image */}
        <motion.div style={{ y: imgY, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <img
              src={IMG.hero}
              alt="Luxe & Glow — salon beauty"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
            {/* Blush fade on left edge only */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--cream) 0%, rgba(253,244,238,0.2) 28%, transparent 50%)' }} />
          </div>
          {/* Floating "LUXE & GLOW" pill badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', bottom: '36px', left: '28px',
              background: 'rgba(253,244,238,0.92)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border)',
              borderRadius: '100px',
              padding: '12px 20px',
              display: 'flex', alignItems: 'center', gap: '10px',
              boxShadow: '0 4px 24px rgba(176,96,96,0.12)',
            }}
          >
            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="var(--rose)" color="var(--rose)" />)}
            </div>
            <span style={{ fontSize: '0.68rem', color: 'var(--mocha-soft)', fontWeight: 400, letterSpacing: '0.05em' }}>5-star rated salon</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 3 }}>
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--muted)' }}>Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.9 }}
          style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, var(--rose-2), transparent)' }} />
      </motion.div>

      <style>{`
        @media (max-width: 700px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { height: 52vw; min-height: 260px; }
        }
      `}</style>
    </section>
  )
}

/* ══════════════════════════════════════════
   MARQUEE — Scrolling service labels
══════════════════════════════════════════ */
function Marquee() {
  const items = ['Hair · ', 'Makeup · ', 'Nails · ', 'Facials · ', 'Bridal · ', 'Lashes · ', 'Threading · ', 'Waxing · ']
  const text = [...items, ...items]
  return (
    <div style={{ background: 'var(--mocha)', overflow: 'hidden', padding: '16px 0' }}>
      <div className="marquee-track">
        {text.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)',
            fontWeight: 300, fontStyle: 'italic', paddingRight: '10px', whiteSpace: 'nowrap',
            color: i % 2 === 0 ? 'rgba(253,244,238,0.45)' : 'var(--rose-2)',
          }}>{item}</span>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   INTRO — Brand story, two images
══════════════════════════════════════════ */
function Intro() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const img1Y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const img2Y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} className="section" style={{ background: 'var(--white)', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px', alignItems: 'center' }}>

          {/* Two staggered images */}
          <FadeIn y={40}>
            <div style={{ position: 'relative', paddingBottom: '48px', paddingRight: '32px' }}>
              {/* Main large image */}
              <motion.div style={{ y: img1Y }}>
                <div className="img-zoom" style={{ aspectRatio: '4/5', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                  <img src={IMG.intro} alt="Luxe & Glow salon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </motion.div>
              {/* Small floating image — bottom right */}
              <motion.div style={{ y: img2Y, position: 'absolute', bottom: 0, right: 0, width: '52%', zIndex: 2 }}>
                <div style={{
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  border: '4px solid var(--white)',
                  boxShadow: '0 8px 32px rgba(176,96,96,0.18)',
                  aspectRatio: '4/3',
                }}>
                  <img src={IMG.introFloat} alt="Makeup" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </motion.div>
              {/* Decorative dot grid */}
              <div style={{
                position: 'absolute', top: '-20px', left: '-20px',
                width: '80px', height: '80px',
                backgroundImage: 'radial-gradient(var(--rose-2) 1.5px, transparent 1.5px)',
                backgroundSize: '12px 12px',
                opacity: 0.4,
              }} />
            </div>
          </FadeIn>

          {/* Text */}
          <div>
            <FadeIn><div className="eyebrow" style={{ marginBottom: '16px' }}>Our Philosophy</div></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="display-md" style={{ color: 'var(--mocha)', marginBottom: '22px' }}>
                Where Beauty<br /><em style={{ color: 'var(--rose)' }}>Becomes Art</em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="body-lg" style={{ marginBottom: '18px' }}>
                Nestled in the heart of Mayfair, Luxe &amp; Glow is London's most exclusive sanctuary for the modern woman. We don't simply offer beauty services — we craft experiences.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: '28px', fontSize: '0.9rem' }}>
                From bespoke bridal journeys to everyday luxury rituals, each visit is tailored entirely to you. Our internationally trained artisans bring decades of expertise to every appointment.
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <blockquote style={{
                borderLeft: '3px solid var(--rose-2)', paddingLeft: '18px', marginBottom: '28px',
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
                fontStyle: 'italic', color: 'var(--mauve)', lineHeight: 1.5,
              }}>
                "Every woman deserves to feel extraordinary, every single day."
              </blockquote>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Link to="/about" className="btn btn-outline-rose">Our Story <ArrowRight size={13} /></Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   SERVICE PANELS — responsive grid, rounded
══════════════════════════════════════════ */
const servicePanels = [
  { img: IMG.hair,   label: 'Hair',         sub: 'From £45',   tag: 'Most Loved', wide: true },
  { img: IMG.facial, label: 'Facials',      sub: 'From £50',   tag: null },
  { img: IMG.nails,  label: 'Nails',        sub: 'From £30',   tag: null },
  { img: IMG.makeup, label: 'Makeup',       sub: 'From £80',   tag: null },
  { img: IMG.bridal, label: 'Bridal',       sub: 'From £500',  tag: 'Premium', wide: true },
  { img: IMG.lashes, label: 'Lashes',       sub: 'From £25',   tag: null },
]

function ServicePanels() {
  return (
    <section className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <FadeIn>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: '10px' }}>What We Do</div>
              <h2 className="display-md" style={{ color: 'var(--mocha)' }}>
                Signature <em style={{ color: 'var(--rose)' }}>Services</em>
              </h2>
            </div>
            <Link to="/services" style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--rose)', transition: 'gap 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.gap = '13px'}
              onMouseLeave={e => e.currentTarget.style.gap = '7px'}
            >
              View All <ArrowRight size={11} />
            </Link>
          </div>
        </FadeIn>

        {/* Masonry-style grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }} className="services-grid">
          {servicePanels.map(({ img, label, sub, tag, wide }, i) => (
            <FadeIn key={label} delay={i * 0.07} y={24} style={wide ? { gridColumn: 'span 1' } : {}}>
              <Link to="/services" style={{ display: 'block' }}>
                <div className="img-card" style={{ height: 'clamp(240px, 26vw, 320px)' }}>
                  <img src={img} alt={label} loading="lazy" />
                  {tag && (
                    <div style={{
                      position: 'absolute', top: '14px', left: '14px',
                      background: 'rgba(253,244,238,0.92)',
                      backdropFilter: 'blur(6px)',
                      color: 'var(--rose)',
                      fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                      padding: '5px 11px', fontWeight: 500,
                      borderRadius: '100px',
                      border: '1px solid var(--border)',
                    }}>{tag}</div>
                  )}
                  <div className="img-overlay">
                    <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,250,247,0.65)', marginBottom: '4px', fontFamily: 'var(--font-body)' }}>{sub}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--white)' }}>{label}</div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
        }
        @media (max-width: 380px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

/* ══════════════════════════════════════════
   FULL-BLEED QUOTE — Parallax
══════════════════════════════════════════ */
function QuoteSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section ref={ref} style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <motion.div style={{ position: 'absolute', inset: '-15%', y }}>
        <img src={IMG.quoteBg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(30,16,14,0.72) 0%, rgba(30,16,14,0.78) 100%)' }} />
      </motion.div>
      <div className="container text-center" style={{ position: 'relative', zIndex: 2, padding: '72px var(--gutter)' }}>
        <FadeIn>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '24px' }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="var(--rose-2)" color="var(--rose-2)" />)}
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 9vw, 7rem)', lineHeight: 0.5, color: 'var(--rose-2)', opacity: 0.35, marginBottom: '16px' }}>"</div>
        </FadeIn>
        <FadeIn delay={0.14}>
          <blockquote style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3vw, 2.6rem)',
            fontWeight: 300, fontStyle: 'italic', color: 'var(--white)',
            lineHeight: 1.35, maxWidth: '740px', margin: '0 auto 32px',
          }}>
            Walking into Luxe &amp; Glow feels like entering a world where time slows down and every detail exists purely for your pleasure.
          </blockquote>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
            <div style={{ width: '28px', height: '1px', background: 'var(--rose-2)' }} />
            <span style={{ fontSize: '0.64rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--rose-2)' }}>Sofia L. — Loyal Client</span>
            <div style={{ width: '28px', height: '1px', background: 'var(--rose-2)' }} />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   GALLERY STRIP — 8 images
══════════════════════════════════════════ */
function GalleryStrip() {
  const imgs = [IMG.g1, IMG.g2, IMG.g3, IMG.g4, IMG.g5, IMG.g6, IMG.g7, IMG.g8]
  return (
    <section style={{ background: 'var(--white)', paddingBottom: 'var(--section-v)' }}>
      <FadeIn>
        <div className="text-center" style={{ padding: 'var(--section-v) 0 36px' }}>
          <div className="eyebrow" style={{ marginBottom: '10px' }}>The Experience</div>
          <h2 className="display-md" style={{ color: 'var(--mocha)' }}>
            A Glimpse Inside <em style={{ color: 'var(--rose)' }}>Luxe &amp; Glow</em>
          </h2>
        </div>
      </FadeIn>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '6px', padding: '0 var(--gutter)' }} className="gallery-strip">
        {imgs.map((src, i) => (
          <FadeIn key={i} delay={i * 0.04} y={16}>
            <div className="img-zoom" style={{ aspectRatio: '1', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
              <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
            </div>
          </FadeIn>
        ))}
      </div>
      <style>{`
        @media (max-width: 640px) { .gallery-strip { grid-template-columns: repeat(4, 1fr) !important; } }
        @media (max-width: 400px) { .gallery-strip { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </section>
  )
}

/* ══════════════════════════════════════════
   TESTIMONIALS — Auto-scrolling marquee
══════════════════════════════════════════ */
const reviews = [
  { name: 'Isabella M.',  role: 'Bride 2024',        stars: 5, text: 'The bridal package was flawless. My hair, makeup and nails were beyond anything I imagined. Everyone asked who did my beauty!' },
  { name: 'Charlotte R.', role: 'Regular Client',     stars: 5, text: 'I\'ve tried salons across London and nothing compares to Luxe & Glow. The team genuinely listens and the results are always stunning.' },
  { name: 'Amara O.',     role: 'Monthly Visitor',    stars: 5, text: 'My HydraFacial has completely transformed my skin. The therapists are knowledgeable and the experience is truly luxurious.' },
  { name: 'Priya K.',     role: 'First-time Client',  stars: 5, text: 'I came in for a cut and blowdry and honestly felt like a new woman. The atmosphere is divine and the staff are so warm.' },
  { name: 'Sophie T.',    role: 'Loyal Client',       stars: 5, text: 'The gel extensions lasted four weeks perfectly. Absolute perfectionists here. I won\'t go anywhere else in London.' },
  { name: 'Layla H.',     role: 'Bridal Client',      stars: 5, text: 'From my trial to my wedding day, Bella and the team were incredible. I cried looking in the mirror — in the best way!' },
]

function ReviewCard({ name, role, stars, text }) {
  return (
    <div style={{
      background: 'var(--white)',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--border)',
      padding: '28px 28px',
      width: '320px',
      flexShrink: 0,
      boxShadow: '0 2px 16px rgba(176,96,96,0.07)',
    }}>
      <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
        {[...Array(stars)].map((_, i) => <Star key={i} size={11} fill="var(--rose)" color="var(--rose)" />)}
      </div>
      <p style={{
        fontFamily: 'var(--font-display)', fontSize: '1.02rem', fontStyle: 'italic',
        fontWeight: 300, color: 'var(--mocha)', lineHeight: 1.65, marginBottom: '20px',
      }}>
        "{text}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '50%',
          background: 'var(--surface-2)', border: '1.5px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--rose)',
        }}>{name[0]}</div>
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--mocha)' }}>{name}</div>
          <div style={{ fontSize: '0.68rem', color: 'var(--muted)', fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>{role}</div>
        </div>
      </div>
    </div>
  )
}

function Testimonials() {
  const doubled = [...reviews, ...reviews]
  return (
    <section className="section" style={{ background: 'var(--surface)', overflow: 'hidden' }}>
      <FadeIn>
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <div className="eyebrow" style={{ marginBottom: '10px' }}>Client Love</div>
          <h2 className="display-md" style={{ color: 'var(--mocha)' }}>
            What Our Clients <em style={{ color: 'var(--rose)' }}>Say</em>
          </h2>
        </div>
      </FadeIn>

      {/* Auto-scroll marquee — pause on hover */}
      <div style={{ overflow: 'hidden', paddingBottom: '8px' }}>
        <div className="reviews-track" style={{ padding: '8px 0' }}>
          {doubled.map((r, i) => <ReviewCard key={i} {...r} />)}
        </div>
      </div>

      <FadeIn delay={0.2}>
        <div className="text-center" style={{ marginTop: '36px' }}>
          <Link to="/book" className="btn btn-rose">Book Your Experience <ArrowRight size={13} /></Link>
        </div>
      </FadeIn>
    </section>
  )
}

/* ══════════════════════════════════════════
   WHY CHOOSE US — 3 soft cards
══════════════════════════════════════════ */
function WhyUs() {
  const points = [
    { icon: '✦', title: 'International Artists', desc: 'Our team trained in Paris, Milan & New York — bringing world-class technique to every appointment.' },
    { icon: '◈', title: 'Luxury Products Only', desc: 'We use only the finest colour lines, skincare and nail products. Zero compromises.' },
    { icon: '❋', title: 'Bespoke Every Time', desc: 'Every appointment begins with a personal consultation. No two clients, no two looks — ever the same.' },
  ]
  return (
    <section className="section" style={{ background: 'var(--white)' }}>
      <div className="container">
        <FadeIn>
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <div className="eyebrow" style={{ marginBottom: '10px' }}>Why Luxe & Glow</div>
            <h2 className="display-md" style={{ color: 'var(--mocha)' }}>
              The <em style={{ color: 'var(--rose)' }}>Difference</em>
            </h2>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {points.map(({ icon, title, desc }, i) => (
            <FadeIn key={title} delay={i * 0.1}>
              <div className="card-soft" style={{ padding: '36px 30px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.6rem', color: 'var(--rose-2)', marginBottom: '18px', lineHeight: 1 }}>{icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 400, color: 'var(--mocha)', marginBottom: '12px' }}>{title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.8 }}>{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   CTA — Split with image
══════════════════════════════════════════ */
function CTA() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

  return (
    <section ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }} className="cta-grid">
      <FadeIn>
        <div style={{
          background: 'var(--mocha)', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(56px,7vw,88px) clamp(36px,5.5vw,72px)',
        }}>
          <div className="eyebrow" style={{ color: 'var(--rose-2)', marginBottom: '20px' }}>Your Journey Awaits</div>
          <h2 className="display-lg" style={{ color: 'var(--white)', marginBottom: '20px' }}>
            Ready to<br /><em style={{ color: 'var(--rose-2)' }}>Glow?</em>
          </h2>
          <p style={{ color: 'rgba(253,244,238,0.6)', lineHeight: 1.85, maxWidth: '340px', marginBottom: '36px', fontSize: '0.92rem' }}>
            Book your appointment at Mayfair's most coveted salon. Mon – Sat, 9am – 7pm. Confirmed within 2 hours.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn btn-rose">Book Now <ArrowRight size={13} /></Link>
            <Link to="/contact" className="btn btn-outline-white">Get in Touch</Link>
          </div>
        </div>
      </FadeIn>
      <div style={{ overflow: 'hidden', position: 'relative', minHeight: '400px' }}>
        <motion.div style={{ y: imgY, position: 'absolute', inset: '-15%' }}>
          <img src={IMG.ctaBg} alt="Salon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(176,96,96,0.12)' }} />
        </motion.div>
      </div>
      <style>{`@media (max-width: 600px) { .cta-grid { grid-template-columns: 1fr !important; } .cta-grid > div:last-child { min-height: 240px; } }`}</style>
    </section>
  )
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <ServicePanels />
      <QuoteSection />
      <GalleryStrip />
      <Testimonials />
      <WhyUs />
      <CTA />
    </>
  )
}
