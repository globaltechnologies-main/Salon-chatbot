import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { IMG } from '../images'

const serviceData = [
  { id: 'hair',     category: 'Hair',           icon: '✦', tagline: 'Transformative colour, precision cuts & luxurious treatments', img: IMG.hair,
    items: [{ name: 'Cut & Blowdry', price: '£45' }, { name: 'Colour', price: '£85' }, { name: 'Highlights', price: '£120' }, { name: 'Balayage', price: '£150' }, { name: 'Keratin Treatment', price: '£200' }, { name: 'Conditioning', price: '£55' }, { name: 'Hair Spa', price: '£70' }, { name: 'Extensions', price: '£250+' }] },
  { id: 'makeup',   category: 'Makeup',         icon: '◈', tagline: 'From effortless day looks to editorial masterpieces', img: IMG.makeup,
    items: [{ name: 'Day / Party', price: '£80' }, { name: 'Editorial', price: '£120' }, { name: 'Engagement', price: '£150' }, { name: 'Bridal Makeup', price: '£350' }] },
  { id: 'nails',    category: 'Nails',          icon: '◇', tagline: 'Flawless nails crafted with precision and care', img: IMG.nails,
    items: [{ name: 'Manicure', price: '£30' }, { name: 'Pedicure', price: '£40' }, { name: 'Gel Manicure', price: '£45' }, { name: 'Gel Pedicure', price: '£55' }, { name: 'Nail Art', price: '£10 / nail' }, { name: 'Acrylics', price: '£75' }, { name: 'Gel Extensions', price: '£85' }] },
  { id: 'facials',  category: 'Facials',        icon: '❋', tagline: 'Clinic-grade skin treatments for luminous results', img: IMG.facial,
    items: [{ name: 'Express Cleanup', price: '£50' }, { name: 'Gold Facial', price: '£90' }, { name: 'HydraFacial', price: '£150' }, { name: 'Vitamin C Facial', price: '£110' }, { name: 'Microdermabrasion', price: '£130' }, { name: 'LED Therapy', price: '£80' }, { name: 'Chemical Peel', price: '£160' }] },
  { id: 'waxing',   category: 'Waxing',         icon: '○', tagline: 'Smooth, lasting results with expert technique',
    items: [{ name: 'Full Arms', price: '£25' }, { name: 'Full Legs', price: '£35' }, { name: 'Underarms', price: '£15' }, { name: 'Half Leg', price: '£20' }, { name: 'Full Body', price: '£90' }, { name: 'Brazilian', price: '£40' }] },
  { id: 'threading',category: 'Threading',      icon: '⌇', tagline: 'Precise threading for perfectly defined features',
    items: [{ name: 'Brows', price: '£12' }, { name: 'Upper Lip', price: '£8' }, { name: 'Full Face', price: '£25' }] },
  { id: 'lashes',   category: 'Lashes & Brows', icon: '◉', tagline: 'Define your gaze with expert lash and brow artistry', img: IMG.lashes,
    items: [{ name: 'Lash Lift', price: '£55' }, { name: 'Lash Tint', price: '£25' }, { name: 'Brow Lamination', price: '£45' }, { name: 'HD Brows', price: '£40' }, { name: 'Classic Lash Extensions', price: '£90' }, { name: 'Volume Lash Extensions', price: '£120' }] },
  { id: 'bridal',   category: 'Bridal Packages', icon: '❀', tagline: 'Complete bridal beauty — your perfect day, perfected', img: IMG.bridal, featured: true,
    items: [{ name: 'Silver Package', price: '£500', note: 'Hair + Makeup' }, { name: 'Gold Package', price: '£900', note: 'Hair + Makeup + Nails + Facial' }, { name: 'Platinum Package', price: '£1,500', note: 'Full luxury bridal experience' }] },
]

function PageHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  return (
    <section ref={ref} style={{ minHeight: '56vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', paddingTop: '120px', paddingBottom: '80px' }}>
      <motion.div style={{ position: 'absolute', inset: '-20%', y }}>
        <img src={IMG.hair} alt="Salon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(253,244,238,0.96) 0%, rgba(253,244,238,0.85) 50%, rgba(248,235,228,0.5) 100%)' }} />
      </motion.div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="eyebrow" style={{ marginBottom: '20px' }}>Full Price List</div>
          <h1 className="display-lg" style={{ color: 'var(--mocha)', marginBottom: '24px' }}>
            Our Beauty<br /><em style={{ color: 'var(--rose)' }}>Menu</em>
          </h1>
          <p className="body-lg" style={{ color: 'var(--mocha-soft)', maxWidth: '480px', marginBottom: '36px' }}>
            Every service is a ritual. Every appointment, a moment of pure indulgence. All prices in GBP.
          </p>
          <Link to="/book" className="btn btn-dark">Book an Appointment <ArrowRight size={13} /></Link>
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }) {
  const [open, setOpen] = useState(index < 2)
  return (
    <FadeIn delay={index * 0.06} y={20}>
      <div style={{
        border: `1.5px solid ${service.featured ? 'var(--rose-2)' : 'var(--border)'}`,
        background: service.featured ? 'var(--surface)' : 'var(--white)',
        marginBottom: '8px',
        overflow: 'hidden',
        borderRadius: 'var(--radius)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}>
        <button
          onClick={() => setOpen(v => !v)}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '26px 36px', background: 'none', color: 'inherit', textAlign: 'left' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {service.img && (
              <div style={{ width: '48px', height: '48px', overflow: 'hidden', flexShrink: 0, borderRadius: '0' }}>
                <img src={service.img} alt={service.category} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            {!service.img && (
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--rose-2)', minWidth: '24px' }}>{service.icon}</span>
            )}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 400, color: open ? 'var(--rose)' : 'var(--mocha)', transition: 'color 0.3s' }}>
                  {service.category}
                </h3>
                {service.featured && (
                  <span style={{ background: 'var(--rose)', color: 'white', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 10px', fontFamily: 'var(--font-body)', fontWeight: 500 }}>Premium</span>
                )}
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: '3px', fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>{service.tagline}</p>
            </div>
          </div>
          <div style={{ color: 'var(--rose)', flexShrink: 0, marginLeft: '16px' }}>
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </button>

        <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
          <div style={{ padding: '0 36px 36px' }}>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2px' }}>
              {service.items.map(({ name, price, note }) => (
                <div key={name}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '14px 18px', background: 'var(--surface)', border: '1px solid transparent', transition: 'border-color 0.3s, background 0.3s', gap: '16px' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--rose-2)'; e.currentTarget.style.background = 'rgba(192,120,120,0.04)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = 'var(--surface)' }}
                >
                  <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--mocha)', fontWeight: 400 }}>{name}</div>
                    {note && <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '3px', fontStyle: 'italic' }}>{note}</div>}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 400, color: 'var(--rose)', whiteSpace: 'nowrap' }}>{price}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </FadeIn>
  )
}

export default function Services() {
  return (
    <>
      <PageHero />
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <FadeIn>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: '10px' }}>Explore</div>
                <h2 className="display-sm" style={{ color: 'var(--mocha)' }}>All Treatments &amp; <em style={{ color: 'var(--rose)' }}>Prices</em></h2>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.82rem', maxWidth: '300px', textAlign: 'right', lineHeight: 1.7 }}>
                Click any category to expand. Consultations available for bespoke treatments.
              </p>
            </div>
          </FadeIn>
          {serviceData.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          <FadeIn delay={0.2}>
            <div style={{ marginTop: '48px', background: 'var(--surface-2)', borderRadius: 'var(--radius)', border: '1.5px solid var(--border)', padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: '10px' }}>Ready?</div>
                <h3 className="display-sm" style={{ color: 'var(--mocha)' }}>Book Your <em style={{ color: 'var(--rose)' }}>Treatment</em></h3>
              </div>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link to="/book" className="btn btn-dark">Book Now <ArrowRight size={13} /></Link>
                <Link to="/contact" className="btn btn-outline-rose">Ask a Question</Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
