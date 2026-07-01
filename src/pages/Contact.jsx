import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, ArrowRight, Check, Instagram, Facebook } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { IMG } from '../images'

function PageHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  return (
    <section ref={ref} style={{ minHeight: '50vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', paddingTop: '120px', paddingBottom: '80px' }}>
      <motion.div style={{ position: 'absolute', inset: '-20%', y }}>
        <img src={IMG.facial} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(253,244,238,0.97) 0%, rgba(253,244,238,0.9) 45%, rgba(248,235,228,0.55) 100%)' }} />
      </motion.div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="eyebrow" style={{ marginBottom: '18px' }}>Get in Touch</div>
          <h1 className="display-lg" style={{ color: 'var(--mocha)', marginBottom: '20px' }}>
            Say<br /><em style={{ color: 'var(--rose)' }}>Hello</em>
          </h1>
          <p className="body-lg" style={{ color: 'var(--mocha-soft)', maxWidth: '420px' }}>We'd love to hear from you. Questions, consultations, or a simple hello — we're here.</p>
        </motion.div>
      </div>
    </section>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1100))
    setLoading(false)
    setSent(true)
  }

  return (
    <>
      <PageHero />
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'start' }}>
            {/* Info */}
            <div>
              <FadeIn><div className="eyebrow" style={{ marginBottom: '18px' }}>Find Us</div></FadeIn>
              <FadeIn delay={0.05}><h2 className="display-sm" style={{ color: 'var(--mocha)', marginBottom: '40px' }}>Salon <em style={{ color: 'var(--rose)' }}>Information</em></h2></FadeIn>
              {[
                { Icon: MapPin, label: 'Location', value: 'Mayfair, London\nUnited Kingdom', href: null },
                { Icon: Clock,  label: 'Hours',    value: 'Monday – Saturday\n9:00 AM – 7:00 PM', href: null },
                { Icon: Phone,  label: 'Phone',    value: '+44 20 XXXX XXXX', href: 'tel:+442000000000' },
                { Icon: Mail,   label: 'Email',    value: 'hello@luxeandglow.co.uk', href: 'mailto:hello@luxeandglow.co.uk' },
              ].map(({ Icon, label, value, href }, i) => (
                <FadeIn key={label} delay={i * 0.07}>
                  <div style={{ display: 'flex', gap: '18px', padding: '22px 0', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--rose-dim)', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={15} color="var(--rose)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', marginBottom: '6px', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{label}</div>
                      {href
                        ? <a href={href} style={{ color: 'var(--mocha-soft)', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-line', transition: 'color 0.3s', display: 'block' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--rose)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--mocha-soft)'}>{value}</a>
                        : <p style={{ color: 'var(--mocha-soft)', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{value}</p>
                      }
                    </div>
                  </div>
                </FadeIn>
              ))}
              <FadeIn delay={0.35}>
                <div style={{ marginTop: '32px' }}>
                  <div className="eyebrow" style={{ marginBottom: '16px' }}>Follow Us</div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {[{ Icon: Instagram, label: 'Instagram' }, { Icon: Facebook, label: 'Facebook' }].map(({ Icon, label }) => (
                      <a key={label} href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', border: '1.5px solid var(--border)', color: 'var(--muted)', fontSize: '0.75rem', letterSpacing: '0.1em', transition: 'all 0.3s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--rose)'; e.currentTarget.style.color = 'var(--rose)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
                      ><Icon size={13} />{label}</a>
                    ))}
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div style={{ marginTop: '32px', background: 'var(--surface-2)', border: '1.5px solid var(--border)', padding: '28px 32px' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--mocha)', marginBottom: '10px' }}>Ready to visit us?</p>
                  <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginBottom: '18px', lineHeight: 1.75 }}>Book online and we'll confirm within 2 hours.</p>
                  <Link to="/book" className="btn btn-rose" style={{ padding: '12px 24px', fontSize: '0.68rem' }}>Book Now <ArrowRight size={12} /></Link>
                </div>
              </FadeIn>
            </div>

            {/* Form */}
            <div>
              <FadeIn delay={0.1}><div className="eyebrow" style={{ marginBottom: '18px' }}>Send a Message</div></FadeIn>
              <FadeIn delay={0.12}><h2 className="display-sm" style={{ color: 'var(--mocha)', marginBottom: '40px' }}>Write to <em style={{ color: 'var(--rose)' }}>Us</em></h2></FadeIn>
              {!sent ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <FadeIn delay={0.14}><div><label className="form-label">Your Name *</label><input className="form-input" type="text" required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" /></div></FadeIn>
                  <FadeIn delay={0.16}><div><label className="form-label">Email *</label><input className="form-input" type="email" required value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" /></div></FadeIn>
                  <FadeIn delay={0.18}>
                    <div><label className="form-label">Subject *</label>
                      <select className="form-input" required value={form.subject} onChange={e => set('subject', e.target.value)}>
                        <option value="">Select a subject</option>
                        {['General Enquiry', 'Booking Request', 'Bridal Package', 'Group Booking', 'Feedback', 'Other'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.2}><div><label className="form-label">Message *</label><textarea className="form-input" rows={6} required value={form.message} onChange={e => set('message', e.target.value)} placeholder="How can we help you?" style={{ resize: 'vertical' }} /></div></FadeIn>
                  <FadeIn delay={0.22}>
                    <button type="submit" className="btn btn-dark" disabled={loading} style={{ alignSelf: 'flex-start', opacity: loading ? 0.7 : 1 }}>
                      {loading ? 'Sending…' : <>Send Message <ArrowRight size={13} /></>}
                    </button>
                  </FadeIn>
                </form>
              ) : (
                <FadeIn>
                  <div style={{ background: 'var(--surface-2)', border: '1.5px solid var(--rose-2)', padding: '48px', textAlign: 'center' }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      style={{ width: '60px', height: '60px', background: 'var(--rose)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px' }}>
                      <Check size={24} color="white" />
                    </motion.div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 300, color: 'var(--mocha)', marginBottom: '10px' }}>Message Received</h3>
                    <p style={{ color: 'var(--muted)', lineHeight: 1.75 }}>Thank you, <span style={{ color: 'var(--rose)' }}>{form.name.split(' ')[0]}</span>. We'll be in touch within 24 hours.</p>
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
