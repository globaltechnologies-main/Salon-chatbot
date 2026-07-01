import { Link } from 'react-router-dom'
import { Instagram, Facebook, Phone, MapPin, Clock, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', paddingTop: '80px', paddingBottom: '40px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '56px', marginBottom: '64px' }}>

          {/* Brand */}
          <div>
            <Link to="/">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, letterSpacing: '0.1em', color: 'var(--mocha)', marginBottom: '4px' }}>
                LUXE <span style={{ color: 'var(--rose)', fontStyle: 'italic' }}>&amp;</span> GLOW
              </div>
            </Link>
            <div className="eyebrow" style={{ marginBottom: '18px', color: 'var(--muted)' }}>Luxury Female Salon</div>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.85, maxWidth: '260px' }}>
              Mayfair's most beloved sanctuary for women who refuse to settle. Beauty elevated to pure art.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {[Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: '38px', height: '38px', border: '1.5px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--muted)', transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--rose)'; e.currentTarget.style.color = 'var(--rose)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="eyebrow" style={{ marginBottom: '22px' }}>Navigate</div>
            {[
              { to: '/', label: 'Home' },
              { to: '/services', label: 'Services & Prices' },
              { to: '/book', label: 'Book Appointment' },
              { to: '/about', label: 'Our Story' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <div key={to} style={{ marginBottom: '12px' }}>
                <Link to={to} style={{ color: 'var(--muted)', fontSize: '0.875rem', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--rose)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                >{label}</Link>
              </div>
            ))}
          </div>

          {/* Services */}
          <div>
            <div className="eyebrow" style={{ marginBottom: '22px' }}>Services</div>
            {['Hair', 'Makeup', 'Nails', 'Facials', 'Waxing & Threading', 'Lashes & Brows', 'Bridal Packages'].map(s => (
              <div key={s} style={{ marginBottom: '12px' }}>
                <Link to="/services" style={{ color: 'var(--muted)', fontSize: '0.875rem', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--rose)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                >{s}</Link>
              </div>
            ))}
          </div>

          {/* Visit */}
          <div>
            <div className="eyebrow" style={{ marginBottom: '22px' }}>Visit Us</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {[
                { Icon: MapPin, text: 'Mayfair, London\nUnited Kingdom' },
                { Icon: Clock,  text: 'Monday – Saturday\n9:00am – 7:00pm' },
                { Icon: Phone,  text: '+44 20 XXXX XXXX' },
              ].map(({ Icon, text }, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <Icon size={13} color="var(--rose)" style={{ marginTop: '4px', flexShrink: 0 }} />
                  <span style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.65, whiteSpace: 'pre-line' }}>{text}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '28px' }}>
              <Link to="/book" className="btn btn-rose" style={{ padding: '12px 28px', fontSize: '0.68rem' }}>Book Now</Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid var(--border)', paddingTop: '28px',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px',
        }}>
          <span style={{ color: 'var(--muted)', fontSize: '0.775rem' }}>
            © {new Date().getFullYear()} Luxe &amp; Glow · All rights reserved
          </span>
          <span style={{ color: 'var(--rose-2)', fontSize: '0.775rem', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
            Made with <Heart size={11} fill="var(--rose)" color="var(--rose)" /> for extraordinary women
          </span>
        </div>
      </div>
    </footer>
  )
}
