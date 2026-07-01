import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Check, ArrowRight, Calendar, Clock, User } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { IMG } from '../images'

const serviceCategories = {
  'Hair':           ['Cut & Blowdry', 'Colour', 'Highlights', 'Balayage', 'Keratin Treatment', 'Conditioning', 'Hair Spa', 'Extensions'],
  'Makeup':         ['Day / Party', 'Editorial', 'Engagement', 'Bridal Makeup'],
  'Nails':          ['Manicure', 'Pedicure', 'Gel Manicure', 'Gel Pedicure', 'Nail Art', 'Acrylics', 'Gel Extensions'],
  'Facials':        ['Express Cleanup', 'Gold Facial', 'HydraFacial', 'Vitamin C Facial', 'Microdermabrasion', 'LED Therapy', 'Chemical Peel'],
  'Waxing':         ['Full Arms', 'Full Legs', 'Underarms', 'Half Leg', 'Full Body', 'Brazilian'],
  'Threading':      ['Brows', 'Upper Lip', 'Full Face'],
  'Lashes & Brows': ['Lash Lift', 'Lash Tint', 'Brow Lamination', 'HD Brows', 'Classic Lash Extensions', 'Volume Lash Extensions'],
  'Bridal Packages':['Silver Package', 'Gold Package', 'Platinum Package'],
}
const times = ['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM']

function PageHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  return (
    <section ref={ref} style={{ minHeight: '50vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', paddingTop: '120px', paddingBottom: '80px' }}>
      <motion.div style={{ position: 'absolute', inset: '-20%', y }}>
        <img src={IMG.makeup} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(253,244,238,0.97) 0%, rgba(253,244,238,0.88) 55%, rgba(248,235,228,0.55) 100%)' }} />
      </motion.div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="eyebrow" style={{ marginBottom: '18px' }}>Reserve Your Visit</div>
          <h1 className="display-lg" style={{ color: 'var(--mocha)', marginBottom: '20px' }}>
            Book Your<br /><em style={{ color: 'var(--rose)' }}>Experience</em>
          </h1>
          <p className="body-lg" style={{ color: 'var(--mocha-soft)', maxWidth: '440px' }}>
            Secure your appointment. We'll confirm within 2 hours during business hours.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default function BookNow() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', category: '', service: '', date: '', time: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Replace '' below with your n8n webhook URL when ready
    const WEBHOOK = ''
    try {
      if (WEBHOOK) {
        await fetch(WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      } else {
        await new Promise(r => setTimeout(r, 1200))
      }
    } catch {}
    setLoading(false)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <PageHero />
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          {!submitted ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'start' }}>
              {/* Form */}
              <div>
                <FadeIn><div className="eyebrow" style={{ marginBottom: '12px' }}>Your Details</div></FadeIn>
                <FadeIn delay={0.05}><h2 className="display-sm" style={{ color: 'var(--mocha)', marginBottom: '40px' }}>Fill in Your <em style={{ color: 'var(--rose)' }}>Information</em></h2></FadeIn>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <FadeIn delay={0.08}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div><label className="form-label">First Name *</label><input className="form-input" type="text" required value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Isabella" /></div>
                      <div><label className="form-label">Last Name *</label><input className="form-input" type="text" required value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Laurent" /></div>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.1}><div><label className="form-label">Email *</label><input className="form-input" type="email" required value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" /></div></FadeIn>
                  <FadeIn delay={0.12}><div><label className="form-label">Phone *</label><input className="form-input" type="tel" required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+44 7XXX XXXXXX" /></div></FadeIn>
                  <FadeIn delay={0.14}>
                    <div><label className="form-label">Service Category *</label>
                      <select className="form-input" required value={form.category} onChange={e => { set('category', e.target.value); set('service', '') }}>
                        <option value="">Select a category</option>
                        {Object.keys(serviceCategories).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </FadeIn>
                  {form.category && (
                    <FadeIn delay={0.04}>
                      <div><label className="form-label">Specific Service *</label>
                        <select className="form-input" required value={form.service} onChange={e => set('service', e.target.value)}>
                          <option value="">Select a service</option>
                          {serviceCategories[form.category].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </FadeIn>
                  )}
                  <FadeIn delay={0.16}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div><label className="form-label">Date *</label><input className="form-input" type="date" required value={form.date} min={new Date().toISOString().split('T')[0]} onChange={e => set('date', e.target.value)} style={{ colorScheme: 'light' }} /></div>
                      <div><label className="form-label">Time *</label>
                        <select className="form-input" required value={form.time} onChange={e => set('time', e.target.value)}>
                          <option value="">Select time</option>
                          {times.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.18}><div><label className="form-label">Special Requests</label><textarea className="form-input" rows={4} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Any allergies, preferences or special requests..." style={{ resize: 'vertical' }} /></div></FadeIn>
                  <FadeIn delay={0.2}>
                    <button type="submit" className="btn btn-dark" disabled={loading} style={{ alignSelf: 'flex-start', opacity: loading ? 0.7 : 1 }}>
                      {loading ? 'Sending Request…' : <> Request Appointment <ArrowRight size={13} /></>}
                    </button>
                    <p style={{ marginTop: '12px', fontSize: '0.78rem', color: 'var(--muted)' }}>Confirmed within 2 hours during business hours.</p>
                  </FadeIn>
                </form>
              </div>

              {/* Info panel */}
              <FadeIn delay={0.15}>
                <div style={{ position: 'sticky', top: '120px' }}>
                  <div style={{ background: 'var(--surface-2)', border: '1.5px solid var(--border)', padding: '44px 40px', marginBottom: '20px' }}>
                    <div className="eyebrow" style={{ marginBottom: '24px' }}>Salon Info</div>
                    {[
                      { Icon: Clock,    label: 'Hours',        value: 'Mon – Sat · 9:00am – 7:00pm' },
                      { Icon: Calendar, label: 'Bookings',     value: 'Same-day subject to availability' },
                      { Icon: User,     label: 'Consultation', value: 'Free 15-min for new clients' },
                    ].map(({ Icon, label, value }, i) => (
                      <div key={label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: i < 2 ? '24px' : 0, paddingBottom: i < 2 ? '24px' : 0, borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                        <div style={{ width: '38px', height: '38px', background: 'var(--rose-dim)', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={15} color="var(--rose)" />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--rose)', marginBottom: '5px', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{label}</div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--mocha-soft)', lineHeight: 1.6 }}>{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: 'var(--surface-3)', border: '1.5px solid var(--border)', padding: '28px 32px' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--mocha)', marginBottom: '10px' }}>"Your comfort is our priority."</p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.75 }}>Every appointment includes a welcome consultation and complimentary refreshments.</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          ) : (
            <FadeIn>
              <div className="text-center" style={{ maxWidth: '560px', margin: '0 auto', padding: '60px 0' }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: '72px', height: '72px', background: 'var(--rose)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
                  <Check size={28} color="white" />
                </motion.div>
                <div className="eyebrow" style={{ marginBottom: '14px' }}>Request Received</div>
                <h2 className="display-md" style={{ color: 'var(--mocha)', marginBottom: '18px' }}>
                  Thank You,<br /><em style={{ color: 'var(--rose)' }}>{form.firstName}!</em>
                </h2>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '12px' }}>We'll confirm your booking at <strong style={{ color: 'var(--mocha-soft)' }}>{form.email}</strong> within 2 hours.</p>
                {form.service && (
                  <div style={{ background: 'var(--surface-2)', border: '1.5px solid var(--border)', padding: '22px', margin: '28px 0', textAlign: 'left' }}>
                    {[['Service', `${form.category} · ${form.service}`], ['Date', form.date], ['Time', form.time]].map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '8px' }}>
                        <span style={{ color: 'var(--muted)' }}>{k}</span>
                        <span style={{ color: 'var(--mocha)', fontWeight: 400 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={() => { setSubmitted(false); setForm({ firstName: '', lastName: '', email: '', phone: '', category: '', service: '', date: '', time: '', notes: '' }) }}
                  className="btn btn-outline-rose">Book Another Appointment</button>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  )
}
