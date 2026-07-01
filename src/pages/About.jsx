import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Heart, Award, Users, Star } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { IMG } from '../images'

const team = [
  { name: 'Sophia Laurent', role: 'Creative Director & Master Colourist', spec: 'Balayage · Colour · Extensions', img: IMG.team1 },
  { name: 'Amira Khalil',   role: 'Lead Makeup Artist',                   spec: 'Bridal · Editorial · Natural Skin', img: IMG.team2 },
  { name: 'Elena Voss',     role: 'Senior Nail Technician',                spec: 'Nail Art · Gel · Bespoke Design', img: IMG.team3 },
  { name: 'Priya Shah',     role: 'Skin Therapist & Facial Expert',        spec: 'HydraFacial · Chemical Peels · LED', img: IMG.team4 },
]

function PageHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  return (
    <section ref={ref} style={{ minHeight: '60vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', paddingTop: '120px', paddingBottom: '80px' }}>
      <motion.div style={{ position: 'absolute', inset: '-20%', y }}>
        <img src={IMG.aboutHero} alt="Salon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(253,244,238,0.97) 0%, rgba(248,235,228,0.88) 50%, rgba(242,219,212,0.5) 100%)' }} />
      </motion.div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="eyebrow" style={{ marginBottom: '20px' }}>Our Story</div>
          <h1 className="display-lg" style={{ color: 'var(--mocha)', marginBottom: '24px' }}>
            About<br /><em style={{ color: 'var(--rose)' }}>Luxe &amp; Glow</em>
          </h1>
          <p className="body-lg" style={{ color: 'var(--mocha-soft)', maxWidth: '500px' }}>
            Born from a passion for feminine luxury and an obsession with exceptional craft. The story behind Mayfair's most celebrated salon.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function Story() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section ref={ref} className="section" style={{ background: 'var(--white)', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
          <div>
            <FadeIn><div className="eyebrow" style={{ marginBottom: '18px' }}>The Beginning</div></FadeIn>
            <FadeIn delay={0.1}><h2 className="display-md" style={{ color: 'var(--mocha)', marginBottom: '28px' }}>A Sanctuary<br /><em style={{ color: 'var(--rose)' }}>Born in Mayfair</em></h2></FadeIn>
            <FadeIn delay={0.15}><p style={{ color: 'var(--mocha-soft)', lineHeight: 1.9, marginBottom: '20px', fontSize: '0.95rem' }}>Luxe &amp; Glow was founded on a single conviction: that every woman deserves to be treated like royalty. We opened our doors in the heart of Mayfair with a hand-picked team of internationally trained artists united by this belief.</p></FadeIn>
            <FadeIn delay={0.2}><p style={{ color: 'var(--muted)', lineHeight: 1.9, marginBottom: '32px', fontSize: '0.95rem' }}>Mayfair isn't just an address — it's a statement. It represents our commitment to serving London's most discerning women: those who travel internationally, appreciate craft, and understand that true luxury lives in the details.</p></FadeIn>
            <FadeIn delay={0.25}><Link to="/book" className="btn btn-dark">Begin Your Journey <ArrowRight size={13} /></Link></FadeIn>
          </div>
          <FadeIn y={48} delay={0.1}>
            <div className="photo-frame" style={{ maxWidth: '460px', margin: '32px 0 0 16px' }}>
              <motion.div style={{ y: imgY }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
                  {[['500+', 'Happy Clients', 'and growing'], ['12+', 'Expert Artists', 'world-trained'], ['8', 'Service Categories', 'under one roof'], ['6', 'Days a Week', 'Mon – Sat, 9–7']].map(([v, l, s]) => (
                    <div key={l} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '28px 24px', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--rose)', lineHeight: 1, marginBottom: '6px' }}>{v}</div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 500, color: 'var(--mocha)', marginBottom: '3px', letterSpacing: '0.05em' }}>{l}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--muted)', fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>{s}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function Values() {
  const vals = [
    { Icon: Heart,  title: 'Client-First Always',         desc: 'Every decision begins with one question: how does this serve our client? Your comfort, satisfaction, and joy are our highest measure of success.' },
    { Icon: Award,  title: 'Uncompromising Quality',      desc: 'We use only the finest products. Our standards don\'t bend, regardless of appointment size.' },
    { Icon: Users,  title: 'Expert Artisans',             desc: 'Our team trained in Paris, Milan, and New York. We invest continuously in education because beauty evolves.' },
    { Icon: Star,   title: 'The Luxe Experience',         desc: 'From arrival to departure, every touchpoint is considered. Complimentary refreshments, bespoke consultation, sanctuary atmosphere.' },
  ]
  return (
    <section className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <FadeIn><div className="text-center" style={{ marginBottom: '64px' }}><div className="eyebrow" style={{ marginBottom: '12px' }}>What We Stand For</div><h2 className="display-md" style={{ color: 'var(--mocha)' }}>Our <em style={{ color: 'var(--rose)' }}>Values</em></h2></div></FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2px' }}>
          {vals.map(({ Icon, title, desc }, i) => (
            <FadeIn key={title} delay={i * 0.1}>
              <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', padding: '44px 36px', transition: 'transform 0.4s var(--ease), border-color 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--rose-2)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <div style={{ width: '44px', height: '44px', background: 'var(--rose-dim)', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <Icon size={18} color="var(--rose)" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 400, color: 'var(--mocha)', marginBottom: '14px' }}>{title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.9rem' }}>{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section className="section" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <FadeIn><div className="text-center" style={{ marginBottom: '64px' }}><div className="eyebrow" style={{ marginBottom: '12px' }}>The Artisans</div><h2 className="display-md" style={{ color: 'var(--mocha)' }}>Meet Our <em style={{ color: 'var(--rose)' }}>Team</em></h2></div></FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {team.map(({ name, role, spec, img }, i) => (
            <FadeIn key={name} delay={i * 0.1}>
              <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', overflow: 'hidden', transition: 'box-shadow 0.4s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 16px 48px rgba(192,120,120,0.14)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div className="img-zoom" style={{ aspectRatio: '3/4', maxHeight: '300px' }}>
                  <img src={img} alt={name} />
                </div>
                <div style={{ padding: '24px 28px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 400, color: 'var(--mocha)', marginBottom: '4px' }}>{name}</h3>
                  <div style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--rose)', marginBottom: '10px', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{role}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>{spec}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <PageHero />
      <Story />
      <Values />
      <Team />
    </>
  )
}
