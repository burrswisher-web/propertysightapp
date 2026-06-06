/* global React, ReactDOM, PhoneFrame, ScanMock, FindMock, ActivityMock, FindsListMock, FindsMapMock,
   TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakSelect */
const { useState, useEffect } = React;

// ────────────────────────────────────────────────────────────
// Headline options — the opening promise. Each surfaces the
// three things an agent gets: look up, log by address, photo.
// ────────────────────────────────────────────────────────────
const HEADLINES = {
  look_log_photo: {
    label: 'Look up · Log · Photograph',
    title: <>Look up the house. <span className="accent">Log the visit. Photograph the property.</span></>,
  },
  every_drive_by: {
    label: 'Every drive-by, a record',
    title: <>Every drive-by becomes a <span className="accent">record you can come back to.</span></>,
  },
  scout_partner: {
    label: 'Scout with a partner taking notes',
    title: <>Scout neighborhoods like you walked them <span className="accent">with a partner taking notes.</span></>,
  },
  point_scan_know: {
    label: 'Point · Scan · Know',
    title: <>Point at any property — <span className="accent">know who owns it.</span></>,
  },
};

// ════════════════════════════════════════════════════════════
// NAV
// ════════════════════════════════════════════════════════════
function Nav() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a className="nav-brand" href="#">
          <img src="assets/propertysight_icon.png" alt=""/>
          <span className="word">Property<span className="sight">Sight</span></span>
        </a>
        <div className="nav-links">
          <a href="#finds">Finds</a>
          <a href="#signals">Signals</a>
          <a href="#unlocks">Pricing</a>
          <a href="data-sources.html">Sources</a>
          <a href="privacy.html">Privacy</a>
          <a className="store-pill" href="#">Get the app</a>
        </div>
      </div>
    </nav>
  );
}

// ════════════════════════════════════════════════════════════
// HERO — the 3-pillar promise
// ════════════════════════════════════════════════════════════
function Hero({ layout, headlineKey }) {
  const h = HEADLINES[headlineKey] || HEADLINES.look_log_photo;
  return (
    <section className="hero">
      <div className="container">
        <div className={`hero-grid ${layout}`}>
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="dot"/> Built for real estate agents
            </div>
            <h1 className="hero-headline">{h.title}</h1>
            <p className="hero-sub">PropertySight turns every drive-by into a record you can work later. Point your phone at any house to pull the owner, value, equity, and lead signals — then log your visit, your conversation, and your own photos against the address.</p>

            {/* Three pillars */}
            <div className="pillars">
              <Pillar icon="lookup" title="Look it up"
                      body="Owner, value, equity, and lead signals from the sidewalk."/>
              <Pillar icon="log" title="Log it by address"
                      body="Notes, calls, mailers, and the next step — pinned to the property."/>
              <Pillar icon="photo" title="Photograph the property"
                      body="Your own shots of the curb, the gate, the porch — attached to the find."/>
            </div>

            <div className="hero-cta-row">
              <a className="store-badge" href="#" aria-label="Get it on Google Play"
                 style={{ background: '#1E3A5F' }}>
                <svg viewBox="0 0 512 512" aria-hidden="true">
                  <path fill="#34D399" d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1z"/>
                  <path fill="#5B8DEF" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z"/>
                  <path fill="#FFC107" d="m425.2 225.6-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z"/>
                  <path fill="#F87171" d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                </svg>
                <span className="stack">
                  <span className="small">Get it on</span>
                  <span className="big">Google Play</span>
                </span>
              </a>
              <a className="store-badge" href="#" aria-label="Download on the App Store">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8-.7 0-1.9-.8-3.1-.8-1.6 0-3 .9-3.8 2.4-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.4 1.2 0 1.6-.7 3-.7 1.4 0 1.8.7 3.1.7 1.3 0 2.1-1.1 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.5-1-2.6-3.8zM14.2 5.8c.7-.8 1.1-1.9 1-3-1 0-2.2.7-2.9 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.5 2.9-1.3z"/>
                </svg>
                <span className="stack">
                  <span className="small">Download on the</span>
                  <span className="big">App Store</span>
                </span>
              </a>
            </div>

            <div className="hero-meta">
              <span>Free to try</span>
              <span className="sep"/>
              <span>No card required</span>
              <span className="sep"/>
              <span>iOS · Android</span>
            </div>
          </div>

          <div className="hero-visual">
            <HeroPhone layout={layout}/>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillar({ icon, title, body }) {
  return (
    <div className="pillar">
      <div className="pillar-ic"><PillarIcon kind={icon}/></div>
      <div className="pillar-title">{title}</div>
      <div className="pillar-body">{body}</div>
    </div>
  );
}

function PillarIcon({ kind }) {
  const common = {
    width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'var(--accent)', strokeWidth: 1.8,
    strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  if (kind === 'lookup') return (
    <svg {...common}>
      <path d="M3 21h18"/><path d="M3 10v11"/>
      <path d="M11 21V10l-4-4-4 4"/>
      <path d="M21 21V8l-4-4-4 4v17"/>
      <circle cx="14" cy="14" r="1" fill="var(--accent)"/>
    </svg>
  );
  if (kind === 'log') return (
    <svg {...common}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="8" y1="13" x2="16" y2="13"/>
      <line x1="8" y1="17" x2="13" y2="17"/>
    </svg>
  );
  if (kind === 'photo') return (
    <svg {...common}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>
  );
  return null;
}

function HeroPhone({ layout }) {
  if (layout === 'inverted') {
    return (
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <div style={{ transform: 'rotate(-3deg)' }}>
          <PhoneFrame width={300}><FindMock/></PhoneFrame>
        </div>
        <div style={{
          position: 'absolute', inset: -40, zIndex: -1,
          background: 'radial-gradient(closest-side, rgba(91,141,239,0.18), transparent 70%)',
        }}/>
      </div>
    );
  }
  if (layout === 'centered') {
    return (
      <div style={{
        position: 'relative',
        display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        gap: 28,
      }}>
        <div style={{ transform: 'translateY(18px) rotate(-5deg)' }}>
          <PhoneFrame width={260}><ScanMock/></PhoneFrame>
        </div>
        <div style={{ transform: 'rotate(4deg)' }}>
          <PhoneFrame width={280}><FindMock/></PhoneFrame>
        </div>
        <div style={{
          position: 'absolute', inset: -60, zIndex: -1,
          background: 'radial-gradient(closest-side, rgba(91,141,239,0.16), transparent 70%)',
        }}/>
      </div>
    );
  }
  // default split
  return (
    <div style={{
      position: 'relative', width: '100%',
      display: 'flex', justifyContent: 'center',
      minHeight: 640,
    }}>
      <div style={{
        position: 'absolute', right: 0, top: 40,
        transform: 'rotate(6deg)', zIndex: 1,
      }}>
        <PhoneFrame width={250}><FindMock/></PhoneFrame>
      </div>
      <div style={{
        position: 'absolute', left: 0, top: 0,
        transform: 'rotate(-3deg)', zIndex: 2,
      }}>
        <PhoneFrame width={280}><ScanMock/></PhoneFrame>
      </div>
      <div style={{
        position: 'absolute', inset: -40, zIndex: 0,
        background: 'radial-gradient(closest-side, rgba(91,141,239,0.18), transparent 70%)',
      }}/>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// SCENE 01 — AT THE CURB → THE ROUTE, REMEMBERED (Finds)
// ════════════════════════════════════════════════════════════
function SceneFinds() {
  const bullets = [
    { icon: 'map',   title: 'A private map of your scouting walks.',
      body: 'List, calendar, and map views. The whole neighborhood you worked Saturday, plotted by pin and visible by week, month, or year.' },
    { icon: 'photo', title: 'Drop in your own photos of the property.',
      body: 'The shot you took at the curb. The shot of the side gate. The porch. Every find holds your own photos — not just the satellite view.' },
    { icon: 'time',  title: 'Pulled up whenever you need them, by address.',
      body: 'Search the list. Filter by signal. The properties you scanned are yours — nobody else sees what you\'re working.' },
  ];
  return (
    <section className="section surface" id="finds">
      <div className="container">
        <div className="scene-eyebrow"><span className="scene-num">01</span> At the curb</div>
        <h2 className="section-title">Every house on the route becomes a Find.</h2>
        <p className="section-sub">Scouting used to mean license-plate runs and clipboard notes. Now every confirmed scan saves itself — visible by date, by neighborhood, on the map. Drop in your own photos. Add a note. Move on.</p>

        <div className="finds-grid">
          <div className="finds-visual">
            <div className="finds-phones">
              <div style={{ transform: 'rotate(-4deg) translateY(20px)', zIndex: 1, position: 'relative' }}>
                <PhoneFrame width={258}><FindsListMock/></PhoneFrame>
              </div>
              <div style={{ transform: 'rotate(5deg) translateY(-10px)', zIndex: 2, position: 'relative', marginLeft: -36 }}>
                <PhoneFrame width={268}><FindsMapMock/></PhoneFrame>
              </div>
            </div>
            <div style={{
              position: 'absolute', inset: -40, zIndex: 0,
              background: 'radial-gradient(closest-side, rgba(91,141,239,0.14), transparent 70%)',
            }}/>
          </div>

          <div className="finds-copy">
            <div className="activity-bullets">
              {bullets.map(b => (
                <div className="activity-bullet" key={b.title}>
                  <div className="bullet-ic"><BulletIcon kind={b.icon}/></div>
                  <div>
                    <div className="bullet-title">{b.title}</div>
                    <div className="bullet-body">{b.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// SCENE 02 — BEFORE YOU KNOCK → THE SIGNALS
// ════════════════════════════════════════════════════════════
function SceneSignals() {
  const signals = [
    { color: '#9CA3AF', label: 'Long-term owner', sub: '15+ years at the address — the kind of owner who might be ready for a change but hasn\'t listed yet.' },
    { color: '#60A5FA', label: 'Absentee',        sub: 'Owner\'s address doesn\'t match the property. The kind of door you knock with a different script.' },
    { color: '#A78BFA', label: 'Investor-owned',  sub: 'LLC, trust, or known REI holder. Different motivations, different conversation.' },
    { color: '#34D399', label: 'High equity',     sub: 'They owe little. They own most. The single best predictor of a deal that can close.' },
    { color: '#F87171', label: 'Distress',        sub: 'NOD, lien, or pre-foreclosure on the record. Treated with the right tone and timing.' },
  ];

  return (
    <section className="section" id="signals">
      <div className="container">
        <div className="scene-eyebrow"><span className="scene-num">02</span> Before you knock</div>
        <h2 className="section-title">Five flags tell you which houses are worth working.</h2>
        <p className="section-sub">Every find is checked against the signals the moment you confirm it. So when you walk a block, you already know which doors to knock first.</p>

        <div className="signal-grid">
          {signals.map(s => (
            <div key={s.label} className="signal-card">
              <div className="signal-card-head">
                <span className="signal-dot" style={{ background: s.color }}/>
                <span className="signal-card-label" style={{ color: s.color }}>{s.label}</span>
              </div>
              <div className="signal-card-body">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// SCENE 03 — BACK AT YOUR DESK → WHAT EVERY SCAN UNLOCKS
// ════════════════════════════════════════════════════════════
function SceneUnlocks() {
  const includedItems = [
    'Owner of record',
    'Address & coordinates',
    'Year built · beds · baths · sq ft',
    'Lead signals (motivation flags)',
    'Your own photos & notes',
  ];

  const tiers = [
    { name: 'Get Financials',          icon: 'dollar',
      lines: ['Estimated value', 'Equity & loan-to-value', 'Last sale price + date', 'Tax assessment'] },
    { name: 'Get Comps',               icon: 'compare',
      lines: ['3 nearby recent sales', 'Side-by-side comparison', 'Distance & sale date'] },
    { name: 'Get Permits + Distress',  icon: 'warning',
      lines: ['Permit history', 'NOD, liens, pre-foreclosure', 'Code violations'] },
    { name: 'Get Owner Contact',       icon: 'phone',
      lines: ['Phone & email', 'DNC / TCPA flagged', 'Skip-trace refunds if unverified'] },
  ];

  return (
    <section className="section surface" id="unlocks">
      <div className="container">
        <div className="scene-eyebrow"><span className="scene-num">03</span> Back at your desk</div>
        <h2 className="section-title">Unlock the layer you need, only when you need it.</h2>
        <p className="section-sub">The basics come with your monthly subscription. When a find is worth deeper diligence, unlock one or all four tiers — only on the properties that earned it.</p>

        <div className="tier-included">
          <div className="tier-included-head">
            <div className="tier-pill tier-pill-free">Included with every scan</div>
            <div className="tier-included-title">In your monthly subscription scans.</div>
          </div>
          <ul className="included-list">
            {includedItems.map(t => (
              <li key={t}>
                <span className="check">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                       stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="tier-head">
          <div className="tier-pill tier-pill-paid">Available to purchase</div>
          <div className="tier-included-title">Buy a tier only on the finds worth deeper work.</div>
        </div>
        <div className="tier-grid">
          {tiers.map(t => (
            <div className="tier-card" key={t.name}>
              <div className="tier-ic"><TierIcon kind={t.icon}/></div>
              <div className="tier-name">{t.name}</div>
              <ul className="tier-lines">
                {t.lines.map(l => <li key={l}>{l}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TierIcon({ kind }) {
  const common = {
    width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'var(--accent)', strokeWidth: 1.8,
    strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  if (kind === 'dollar') return (
    <svg {...common}><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  );
  if (kind === 'compare') return (
    <svg {...common}><rect x="3" y="4" width="7" height="16" rx="1.5"/><rect x="14" y="8" width="7" height="12" rx="1.5"/></svg>
  );
  if (kind === 'warning') return (
    <svg {...common}><path d="m10.29 3.86-8.55 14.83A2 2 0 0 0 3.46 22h17.08a2 2 0 0 0 1.72-3.31L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  );
  if (kind === 'phone') return (
    <svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  );
  return null;
}

// ════════════════════════════════════════════════════════════
// SCENE 04 — NEXT TUESDAY → THE FOLLOW-UP DOESN'T FALL OFF
// ════════════════════════════════════════════════════════════
function SceneActivity() {
  const bullets = [
    { icon: 'note', title: 'Write what happened, against the property.',
      body: 'Every drive-by, mailer, call, and conversation lives on the find itself. Open the address a month later — the whole history is right there.' },
    { icon: 'tag',  title: 'Tag the next step.',
      body: 'Follow up. Listing soon. Mailed. Called. Met owner. Filter the feed down to who you need to circle back to this week.' },
    { icon: 'timeline', title: 'A field log you can actually search.',
      body: 'Chronological by default, searchable by address or tag. Pull up a whole neighborhood\'s worth of follow-ups before the next door-knocking walk.' },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="scene-eyebrow"><span className="scene-num">04</span> Next Tuesday</div>
        <h2 className="section-title">Open the address a month later — the whole history is still there.</h2>
        <p className="section-sub">PropertySight's Activity tab pins every follow-up to the property it belongs to. So the next visit picks up where the last one left off.</p>

        <div className="activity-grid">
          <div className="activity-copy">
            <div className="activity-bullets">
              {bullets.map(b => (
                <div className="activity-bullet" key={b.title}>
                  <div className="bullet-ic"><BulletIcon kind={b.icon}/></div>
                  <div>
                    <div className="bullet-title">{b.title}</div>
                    <div className="bullet-body">{b.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="activity-visual">
            <div style={{ transform: 'rotate(3deg)' }}>
              <PhoneFrame width={280}><ActivityMock/></PhoneFrame>
            </div>
            <div style={{
              position: 'absolute', inset: -40, zIndex: -1,
              background: 'radial-gradient(closest-side, rgba(91,141,239,0.14), transparent 70%)',
            }}/>
          </div>
        </div>
      </div>
    </section>
  );
}

function BulletIcon({ kind }) {
  const common = {
    width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'var(--accent)', strokeWidth: 1.8,
    strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  if (kind === 'note') return (
    <svg {...common}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="8" y1="13" x2="16" y2="13"/>
      <line x1="8" y1="17" x2="13" y2="17"/>
    </svg>
  );
  if (kind === 'tag') return (
    <svg {...common}>
      <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  );
  if (kind === 'timeline') return (
    <svg {...common}>
      <circle cx="5" cy="5" r="2"/>
      <circle cx="5" cy="19" r="2"/>
      <line x1="5" y1="7" x2="5" y2="17"/>
      <line x1="9" y1="5" x2="20" y2="5"/>
      <line x1="9" y1="12" x2="15" y2="12"/>
      <line x1="9" y1="19" x2="20" y2="19"/>
    </svg>
  );
  if (kind === 'map') return (
    <svg {...common}>
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"/>
      <line x1="9" y1="3" x2="9" y2="18"/>
      <line x1="15" y1="6" x2="15" y2="21"/>
    </svg>
  );
  if (kind === 'photo') return (
    <svg {...common}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>
  );
  if (kind === 'time') return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9"/>
      <polyline points="12 7 12 12 15 14"/>
    </svg>
  );
  return null;
}

// ════════════════════════════════════════════════════════════
// COMPLIANCE + SOURCES — fused, smaller treatment
// ════════════════════════════════════════════════════════════
function Compliance() {
  return (
    <section className="section surface">
      <div className="container">
        <div className="compliance">
          <div className="ic">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <div>
            <h3>Built on records you can name. Sourced from BatchData, the Federal Reserve, and Google.</h3>
            <p>Skip-traced contacts are flagged against the National Do Not Call registry, and unverified records are refunded automatically. <a href="data-sources.html" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>See where each field comes from →</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// CLOSING CTA
// ════════════════════════════════════════════════════════════
function ClosingCTA() {
  return (
    <section className="section closing">
      <div className="container">
        <div className="closing-card">
          <h2>Scout it. Scan it. It's in your pocket.</h2>
          <p>The app is free to try — no card, no signup form to fight with. Download it before your next scouting drive.</p>
          <div className="hero-cta-row" style={{ justifyContent: 'center', marginTop: 28 }}>
            <a className="store-badge" href="#" aria-label="Get it on Google Play"
               style={{ background: '#1E3A5F' }}>
              <svg viewBox="0 0 512 512" aria-hidden="true">
                <path fill="#34D399" d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1z"/>
                <path fill="#5B8DEF" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z"/>
                <path fill="#FFC107" d="m425.2 225.6-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z"/>
                <path fill="#F87171" d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
              </svg>
              <span className="stack">
                <span className="small">Get it on</span>
                <span className="big">Google Play</span>
              </span>
            </a>
            <a className="store-badge" href="#" aria-label="Download on the App Store">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8-.7 0-1.9-.8-3.1-.8-1.6 0-3 .9-3.8 2.4-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.4 1.2 0 1.6-.7 3-.7 1.4 0 1.8.7 3.1.7 1.3 0 2.1-1.1 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.5-1-2.6-3.8zM14.2 5.8c.7-.8 1.1-1.9 1-3-1 0-2.2.7-2.9 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.5 2.9-1.3z"/></svg>
              <span className="stack">
                <span className="small">Download on the</span>
                <span className="big">App Store</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// FOOTER
// ════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            <a className="nav-brand" href="#">
              <img src="assets/propertysight_icon.png" alt=""/>
              <span className="word">Property<span className="sight">Sight</span></span>
            </a>
            <p style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 14, maxWidth: 320, lineHeight: 1.6 }}>
              Look up the house. Log the visit. Photograph the property. Built for agents who scout in person.
            </p>
          </div>
          <div>
            <div className="col-title">App</div>
            <ul>
              <li><a href="#">Download for iOS</a></li>
              <li><a href="#">Download for Android</a></li>
              <li><a href="#finds">Your Finds</a></li>
              <li><a href="#signals">Lead signals</a></li>
              <li><a href="#unlocks">Pricing</a></li>
            </ul>
          </div>
          <div>
            <div className="col-title">Company</div>
            <ul>
              <li><a href="data-sources.html">Data sources</a></li>
              <li><a href="privacy.html">Privacy policy</a></li>
              <li><a href="mailto:contact@propertysightapp.com">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-meta">
          <span>© 2026 PropertySight LLC. All rights reserved.</span>
          <span>propertysightapp.com</span>
        </div>
      </div>
    </footer>
  );
}

// ════════════════════════════════════════════════════════════
// TWEAKS + APP ROOT
// ════════════════════════════════════════════════════════════
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "split",
  "headline": "look_log_photo"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  return (
    <>
      <Nav/>
      <main>
        <Hero layout={t.layout} headlineKey={t.headline}/>
        <SceneFinds/>
        <SceneSignals/>
        <SceneUnlocks/>
        <SceneActivity/>
        <Compliance/>
        <ClosingCTA/>
      </main>
      <Footer/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero layout"/>
        <TweakRadio label="Layout"
                    value={t.layout}
                    onChange={(v) => setTweak('layout', v)}
                    options={[
                      { value: 'split',    label: 'Split' },
                      { value: 'centered', label: 'Centered' },
                      { value: 'inverted', label: 'Inverted' },
                    ]}/>

        <TweakSection label="Headline copy"/>
        <TweakSelect label="Variant"
                     value={t.headline}
                     onChange={(v) => setTweak('headline', v)}
                     options={Object.entries(HEADLINES).map(([value, h]) => ({
                       value, label: h.label,
                     }))}/>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
