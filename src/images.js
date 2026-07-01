/**
 * Luxe & Glow — Curated Unsplash image library
 * All images are free to use (Unsplash License).
 * Replace with your own professional salon photos for best results.
 */

const u = (id, w = 1200, q = 85) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`

export const IMG = {
  /* ── Hero ── woman getting makeup / salon beauty */
  hero:        u('photo-1457972729786-0411a3b2b626', 1800),   // woman makeup mirror

  /* ── Intro / brand story ── */
  intro:       u('photo-1560066984-138dadb4c035', 1200),      // salon interior mirrors
  introFloat:  u('photo-1596755389378-c31d21fd1273', 900),    // makeup cosmetics closeup

  /* ── Service panels ── */
  hair:        u('photo-1522337360788-8b13dee7a37e', 900),    // woman hair salon styling
  makeup:      u('photo-1487412720507-e7ab37603c6f', 900),    // woman beauty portrait
  nails:       u('photo-1604654894610-df63bc536371', 900),    // pink nail art manicure
  facial:      u('photo-1598440947619-2c35fc9aa908', 900),    // facial spa treatment
  bridal:      u('photo-1537633552985-df8429e8048b', 900),    // bride wedding beautiful
  lashes:      u('photo-1616683693504-3ea7e9ad6fec', 900),    // eye lash closeup

  /* ── About ── */
  aboutHero:   u('photo-1516975080664-ed2fc6a32937', 1400),
  team1:       u('photo-1529626455594-4ff0802cfb7e', 700),
  team2:       u('photo-1494790108377-be9c29b29330', 700),
  team3:       u('photo-1573496359142-b8d87734a5a2', 700),
  team4:       u('photo-1508214751196-bcfd4ca60f91', 700),    // woman beauty

  /* ── Gallery strip ── 8 verified beauty / salon images ── */
  g1: u('photo-1522337360788-8b13dee7a37e', 600),   // hair salon
  g2: u('photo-1487412720507-e7ab37603c6f', 600),   // beauty portrait
  g3: u('photo-1604654894610-df63bc536371', 600),   // nails
  g4: u('photo-1598440947619-2c35fc9aa908', 600),   // facial
  g5: u('photo-1596755389378-c31d21fd1273', 600),   // makeup
  g6: u('photo-1537633552985-df8429e8048b', 600),   // bridal
  g7: u('photo-1560066984-138dadb4c035', 600),      // salon interior
  g8: u('photo-1616683693504-3ea7e9ad6fec', 600),   // eye/lash

  /* ── CTA / Quote backgrounds ── */
  ctaBg:   u('photo-1487412720507-e7ab37603c6f', 1600),   // beauty portrait — warm & luxurious
  quoteBg: u('photo-1560066984-138dadb4c035',   1600),   // salon interior — confirmed correct
}
