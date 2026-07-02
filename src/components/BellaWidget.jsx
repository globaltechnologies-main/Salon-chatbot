import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, Send, Heart } from 'lucide-react'

/* ─── CONFIG — keys loaded from .env ────────────────────────────── */
const GROQ_API_KEY   = import.meta.env.VITE_GROQ_API_KEY
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const GROQ_MODEL     = 'llama-3.3-70b-versatile'
const OPENAI_MODEL   = 'gpt-4o-mini'
const GROQ_URL       = 'https://api.groq.com/openai/v1/chat/completions'
const OPENAI_URL     = 'https://api.openai.com/v1/chat/completions'
const SHEETS_URL     = import.meta.env.VITE_SHEETS_URL || ''

const callLLM = async (messages) => {
  // Try Groq first
  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
      body: JSON.stringify({ model: GROQ_MODEL, messages, temperature: 0.7, max_tokens: 500 }),
    })
    if (res.status === 429 || res.status === 503) throw new Error('Groq limit reached')
    const data = await res.json()
    if (data.error) throw new Error('Groq error')
    return data.choices[0].message.content
  } catch (_) {
    // Fall back to OpenAI
    const res = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_API_KEY}` },
      body: JSON.stringify({ model: OPENAI_MODEL, messages, temperature: 0.7, max_tokens: 500 }),
    })
    const data = await res.json()
    return data.choices[0].message.content
  }
}

const today = new Date()
const todayStr = today.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
const currentTimeStr = today.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true })

const SYSTEM_PROMPT = `You are Bella, a warm friendly booking concierge for Luxe & Glow salon in Mayfair London.
Today is ${todayStr} and the current time is ${currentTimeStr}. Use both to validate dates and times.

Services & Pricing (these are fixed — never change or discount them):

HAIR (£45–£200):
- Blow Dry £45 — wash and blow dry only, no cutting or styling into updos
- Cut & Style £65 — haircut plus a styled finish (blowout, waves, curls)
- Updo & Bridal Styling £85 — buns, updos, braids, slick looks, wedding hair, special occasion styling
- Balayage £150 — hand-painted colour for a natural sun-kissed effect
- Full Colour £120 — all-over root-to-tip colour
- Keratin Treatment £200 — smoothing treatment to eliminate frizz for weeks

MAKEUP (£80–£200):
- Day Makeup £80 — natural, everyday glam
- Evening Makeup £110 — bold, dramatic looks for events or nights out
- Bridal Makeup £200 — long-wear, camera-ready wedding makeup with trial option

NAILS (£30–£55):
- Manicure £30 — shaping, cuticle care, polish on hands
- Pedicure £35 — shaping, cuticle care, polish on feet
- Gel Nails £45 — long-lasting gel polish, no chips for weeks
- Nail Art £55 — creative nail designs (includes manicure)

FACIALS (£50–£150):
- Express Facial £50 — quick 30-min cleanse, tone, moisturise
- HydraFacial £150 — deep cleanse, exfoliation, extraction, hydration — instant glow
- Anti-Aging Facial £120 — firming and lifting treatment

LASHES (£55–£80):
- Lash Lift £55 — lifts and curls your natural lashes, no extensions
- Classic Lashes £60 — one extension per natural lash, natural look
- Volume Lashes £80 — multiple extensions per lash, full dramatic look

BRIDAL PACKAGE £500 — includes Updo & Bridal Styling + Bridal Makeup + Manicure + Express Facial

Hours: Monday to Saturday, 9am to 7pm. Closed Sundays. Mayfair London.

DISCOUNT POLICY — strictly follow:
- You may offer a one-time 5% discount if the client asks for one. Apply it to the total price and mention the new amount.
- If the client asks for more than 5%, say warmly: "I'd love to help more, but anything beyond 5% needs manager approval — I'll make sure our manager reaches out to you to discuss. 💕"
- Never offer more than 5% yourself, no matter how much they ask.

BOOKING RULES — follow strictly:
1. Collect name, service, date, time and contact one at a time through warm natural conversation.
2. Never leave any field empty or assume. Ask again if unclear.
3. DATE & TIME VALIDATION — reject any of the following and ask the client to choose again:
   - Past dates (today is ${todayStr} — anything before today is invalid)
   - Today's date with a time that has already passed (current time is ${currentTimeStr} — e.g. if it's 5pm, a 9am slot today is no longer available)
   - Dates that don't exist (e.g. June 31st, Feb 30th)
   - Sundays (we are closed)
   - Times before 9am or after 7pm
4. If the client mentions a wedding or event date, remember it. If they try to book ON or AFTER that date, gently point out their appointment should be before the event and suggest 1-2 days prior.
5. RELATIVE DATES — understand phrases like "tomorrow", "next Monday", "this Friday", "in 3 days" and calculate the correct date from today (${todayStr}).
6. MULTIPLE SERVICES — if the client wants more than one service, list them all, add up the total price, and include all services in the booking.
7. SERVICES NOT ON MENU — if a client asks for something we don't offer (e.g. massage, tattoo, threading), politely let them know we don't offer that and suggest the closest service we do.
8. CANCELLATIONS / RESCHEDULING — if the client wants to cancel or change an existing booking, let them know to call the salon directly as you can only handle new bookings.
9. CONTACT — accept either a phone number or an email address as contact. If the number looks too short or too long (valid UK numbers are 11 digits), gently ask them to double-check.
10. Always write dates in full format: "DayName, DD Month YYYY" (e.g. "Monday, 27 July 2026").
11. When you have ALL 5 details, show the full summary (name, service, date, time, contact, price) and ask if everything looks correct — end with: SUMMARY:{"name":"...","service":"...","date":"...","time":"...","contact":"...","price":"£..."}
12. If the client expresses any form of agreement or confirmation in any language or phrasing — you MUST end your reply with the BOOKING tag on the very last line, no exceptions:
BOOKING:{"name":"...","service":"...","date":"...","time":"...","contact":"...","price":"£..."}
Never say "BOOKING CONFIRMED" without also including this tag. The tag is mandatory for the system to work.
13. If the client changes ANY detail after the summary, show a fresh SUMMARY with corrected info before emitting BOOKING.
14. Never emit BOOKING more than once for the same appointment.
15. RUDE OR INAPPROPRIATE MESSAGES — respond calmly, warmly, and professionally. Do not engage with or mirror any rude behaviour.

Keep replies short, warm and use occasional emojis.`

const WELCOME = {
  role: 'bella',
  text: "Hi gorgeous! 💕 I'm Bella, your personal Luxe & Glow concierge. I can help you explore our services, check pricing, or book an appointment. How can I help you today?",
}

const writeToSheet = (booking) => {
  if (!SHEETS_URL) return
  fetch(SHEETS_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({ ...booking, timestamp: new Date().toISOString() }),
  }).catch(() => {})
}

export default function BellaWidget() {
  const [open, setOpen]         = useState(false)
  const [messages, setMessages] = useState([WELCOME])
  const [history, setHistory]   = useState([])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setMessages(m => [...m, { role: 'user', text }])
    setLoading(true)

    const newHistory = [...history, { role: 'user', content: text }]

    try {
      const aiReply = await callLLM([{ role: 'system', content: SYSTEM_PROMPT }, ...newHistory])
      let displayReply = aiReply

      // Strip SUMMARY tag from display
      displayReply = displayReply.replace(/SUMMARY:\{.*?\}/s, '').trim()

      // BOOKING tag — write to sheet
      const bookingMatch = aiReply.match(/BOOKING:(\{.*?\})/s)
      if (bookingMatch) {
        try { writeToSheet(JSON.parse(bookingMatch[1])) } catch (_) {}
        displayReply = displayReply.replace(/BOOKING:\{.*?\}/s, '').trim()
      }

      setMessages(m => [...m, { role: 'bella', text: displayReply }])
      setHistory([...newHistory, { role: 'assistant', content: aiReply }])
    } catch (_) {
      setMessages(m => [...m, { role: 'bella', text: "So sorry, I'm having a little moment! Please call us or try again shortly. 💕" }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close Bella' : 'Chat with Bella'}
        style={{
          position: 'fixed', bottom: '28px', right: '28px', zIndex: 9000,
          width: '58px', height: '58px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #c07878, #9e6b71)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(192,120,120,0.45)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 14px 44px rgba(192,120,120,0.55)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(192,120,120,0.45)' }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={22} color="#fff" /></motion.div>
            : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><MessageCircle size={22} color="#fff" /></motion.div>
          }
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', bottom: '98px', right: '28px', zIndex: 8999,
              width: 'min(380px, calc(100vw - 40px))',
              height: '520px',
              background: 'var(--white)',
              border: '1.5px solid var(--border)',
              borderRadius: '24px',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 24px 80px rgba(192,120,120,0.28)',
              overflow: 'visible',
            }}
          >
            {/* Floating heart */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)',
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--rose), var(--mauve))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(176,96,96,0.4)',
                zIndex: 10,
              }}
            >
              <Heart size={16} fill="#fff" color="#fff" />
            </motion.div>

            {/* Inner wrapper */}
            <div style={{ borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>

              {/* Header */}
              <div style={{ background: 'linear-gradient(135deg, var(--rose), var(--mauve))', padding: '22px 20px 16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#fff', fontWeight: 500, flexShrink: 0 }}>B</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 400, color: '#fff', lineHeight: 1 }}>Bella</div>
                  <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '3px' }}>Luxe &amp; Glow Concierge</div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#a8e6c8' }} />
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)' }}>Online</span>
                </div>
              </div>

              {/* Messages */}
              <div
                ref={el => { if (el) el.scrollTop = el.scrollHeight }}
                style={{ flex: 1, overflowY: 'auto', padding: '18px 14px', display: 'flex', flexDirection: 'column', gap: '10px', scrollbarWidth: 'thin', scrollbarColor: 'var(--border) transparent' }}
              >
                {messages.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                    style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
                  >
                    <div style={{
                      maxWidth: '82%', padding: '11px 15px',
                      background: msg.role === 'user' ? 'var(--rose)' : 'var(--surface-2)',
                      color: msg.role === 'user' ? '#fff' : 'var(--mocha)',
                      fontSize: '0.86rem', lineHeight: 1.6,
                      border: `1px solid ${msg.role === 'user' ? 'transparent' : 'var(--border)'}`,
                      borderRadius: msg.role === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    }}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{ padding: '11px 16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '14px 14px 14px 2px', display: 'flex', gap: '5px', alignItems: 'center' }}>
                      {[0, 1, 2].map(i => (
                        <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.18 }}
                          style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--rose-2)' }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div style={{ borderTop: '1px solid var(--border)', padding: '12px 14px', display: 'flex', gap: '8px', background: 'var(--surface)' }}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                  placeholder="Ask Bella anything…"
                  style={{ flex: 1, background: 'var(--white)', border: '1.5px solid var(--border)', color: 'var(--mocha)', padding: '10px 14px', fontSize: '0.86rem', outline: 'none', borderRadius: '100px', fontFamily: 'var(--font-body)', fontWeight: 300, transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = 'var(--rose-2)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
                <button onClick={send} disabled={!input.trim() || loading}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: input.trim() && !loading ? 'var(--rose)' : 'var(--surface-3)', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: input.trim() && !loading ? '#fff' : 'var(--muted)', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed', flexShrink: 0, transition: 'background 0.2s, color 0.2s' }}
                ><Send size={14} /></button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
