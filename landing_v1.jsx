/* global React, ReactDOM, PhoneFrame, ScanMock, FindMock, ActivityMock, FindsListMock, FindsMapMock,
   TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakSelect */
const { useState, useEffect } = React;

// ────────────────────────────────────────────────────────────
// Headline copy options — sentence case, em-dash voice,
// no exclamation points. Each has its own subhead.
// ────────────────────────────────────────────────────────────
const HEADLINES = {
  point_scan_know: {
    label: 'Point · Scan · Know',
    title: <>Point at any property — <span className="accent">know who owns it.</span></>,
    sub: 'PropertySight turns the camera on your phone into a property scanner. Owner, value, equity, and the lead signals that matter — at the curb, in seconds.',
  },
  see_further: {
    label: 'See further than the curb',
    title: <>See further than <span className="accent">the curb.</span></>,
    sub: 'For agents who scout in person. Walk a block, point your phone at a house, and pull up the owner, the equity, and the signals that flag a real lead.',
  },
  address_book: {
    label: 'Address book of every building',
    title: <>The address book of <span className="accent">every building.</span></>,
    sub: 'Owner, value, equity, last sale, and lead signals — for any property you can see. No address typing. No tab switching. Tap, confirm, and the data is yours.',
  },
  walk_by_tap: {
    label: 'Walk by. Tap. Done.',
    title: <>Walk by. Tap. <span className="accent">Done.</span></>,
    sub: 'Scouting the neighborhood used to mean license-plate runs and clipboard notes. PropertySight gives you owner, value and equity from the sidewalk.',
  },
};

// ────────────────────────────────────────────────────────────
// Hero
// ────────────────────────────────────────────────────────────
function Hero({ layout, headlineKey }) {
  const h = HEADLINES[headlineKey] || HEADLINES.point_scan_know;
  return (
    <section className="hero">
      <div className="container">
        <div className={`hero-grid ${layout}`}>
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="dot"/> For real estate agents
            </div>
            <h1 className="hero-headline">{h.title}</h1>
            <p className="hero-sub">{h.sub}</p>

            <div className="hero-cta-row">
              <a className="store-badge" href="#" aria-label="Download on the App Store">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8-.7 0-1.9-.8-3.1-.8-1.6 0-3 .9-3.8 2.4-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.4 1.2 0 1.6-.7 3-.7 1.4 0 1.8.7 3.1.7 1.3 0 2.1-1.1 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.5-1-2.6-3.8zM14.2 5.8c.7-.8 1.1-1.9 1-3-1 0-2.2.7-2.9 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.5 2.9-1.3z"/>
                </svg>
                <span className="stack">
                  <span className="small">Download on the</span>
                  <span className="big">App Store</span>
                </span>
              </a>
              <a className="store-badge" href="#" aria-label="Get it on Google Play"
                 style={{ background: '#1E3A5F' }}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <defs>
                    <linearGradient id="gp-a" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#5B8DEF"/>
                      <stop offset="1" stopColor="#34D399"/>
                    </linearGradient>
                  </defs>
                  <path fill="url(#gp-a)"
                        d="M3.6 2.5c-.3.3-.5.7-.5 1.3v16.4c0 .6.2 1 .5 1.3L12 13l-8.4-10.5z"/>
                  <path fill="#FFC107" d="M15.4 9.6L18.7 11.5c1 .6 1 1.4 0 2L15.4 15.4 12 12l3.4-2.4z"/>
                  <path fill="#34D399" d="M3.6 2.5l8.4 8.4L15.4 9.6 5.4 3.7c-.6-.3-1.3-.4-1.8-1.2z"/>
                  <path fill="#F87171" d="M3.6 21.5c.5-.8 1.2-.9 1.8-1.2l10-5.9-3.4-3.4-8.4 10.5z"/>
                </svg>
                <span className="stack">
                  <span className="small">Get it on</span>
                  <span className="big">Google Play</span>
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

// Hero phone — different layouts use different mockup compositions
function HeroPhone({ layout }) {
  if (layout === 'inverted') {
    // Single, dramatic phone, slightly tilted, find detail
    return (
      <div style={{
        position: 'relative',
        display: 'flex', justifyContent: 'center',
      }}>
        <div style={{ transform: 'rotate(-3deg)' }}>
          <PhoneFrame width={300}><FindMock/></PhoneFrame>
        </div>
        {/* Soft halo */}
        <div style={{
          position: 'absolute', inset: -40, zIndex: -1,
          background: 'radial-gradient(closest-side, rgba(91,141,239,0.18), transparent 70%)',
        }}/>
      </div>
    );
  }
  if (layout === 'centered') {
    // Two phones, fanned, framing the centered hero text below it
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
  // Default split — scan phone in front, find phone offset behind
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

// ────────────────────────────────────────────────────────────
// How it works
// ────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      n: 'STEP 01',
      title: 'Point',
      body: 'Open the app at the curb. The viewfinder reads your GPS, bearing, and image — no address typing.',
      illus: <StepIllus kind="point"/>,
    },
    {
      n: 'STEP 02',
      title: 'Scan',
      body: 'Tap once. PropertySight matches what you see against parcel and ownership records.',
      illus: <StepIllus kind="scan"/>,
    },
    {
      n: 'STEP 03',
      title: 'Discover',
      body: 'Confirm the house and the find is yours — owner, value, equity, and lead signals are included. Skip trace and comps are available to purchase.',
      illus: <StepIllus kind="discover"/>,
    },
  ];
  return (
    <section className="section">
      <div className="container">
        <div className="section-eyebrow">How it works</div>
        <h2 className="section-title">Three taps from the sidewalk to the owner.</h2>
        <p className="section-sub">Designed for door-knocking, drive-by scouting, and listing-prep walks. No address book to flip through. No tab between Zillow and the county recorder.</p>

        <div className="steps">
          {steps.map(s => (
            <div className="step" key={s.title}>
              <div className="step-illus">{s.illus}</div>
              <div className="step-num">{s.n}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepIllus({ kind }) {
  if (kind === 'point') {
    return (
      <svg viewBox="0 0 120 80" width="120" height="80" fill="none">
        {/* Phone */}
        <rect x="14" y="14" width="36" height="56" rx="6" fill="var(--accent-strong)"/>
        <rect x="17" y="17" width="30" height="50" rx="3" fill="var(--surface)"/>
        <circle cx="32" cy="42" r="9" fill="none" stroke="var(--accent)" strokeWidth="2"/>
        {/* Beam */}
        <path d="M50 32 L110 22 L110 56 L50 46 Z" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3"/>
        {/* House */}
        <polygon points="95,30 110,18 110,30" fill="var(--accent-strong)"/>
        <rect x="95" y="30" width="15" height="14" fill="var(--accent-strong)"/>
      </svg>
    );
  }
  if (kind === 'scan') {
    return (
      <svg viewBox="0 0 120 80" width="120" height="80" fill="none">
        <rect x="42" y="14" width="36" height="56" rx="6" fill="var(--accent-strong)"/>
        <rect x="45" y="17" width="30" height="50" rx="3" fill="var(--surface)"/>
        {/* Scanning lines */}
        <line x1="48" y1="32" x2="72" y2="32" stroke="var(--accent)" strokeWidth="1.5"/>
        <line x1="48" y1="40" x2="65" y2="40" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6"/>
        <line x1="48" y1="48" x2="68" y2="48" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4"/>
        {/* Shutter dot */}
        <circle cx="60" cy="60" r="3.5" fill="var(--accent)"/>
        {/* Glow */}
        <circle cx="60" cy="60" r="8" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.4"/>
        <circle cx="60" cy="60" r="12" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.2"/>
      </svg>
    );
  }
  // discover
  return (
    <svg viewBox="0 0 120 80" width="120" height="80" fill="none">
      <rect x="14" y="14" width="92" height="56" rx="8" fill="var(--surface)" stroke="var(--border)"/>
      <rect x="22" y="22" width="40" height="8" rx="2" fill="var(--fg)"/>
      <rect x="22" y="34" width="28" height="5" rx="1.5" fill="var(--fg-muted)" opacity="0.4"/>
      <rect x="22" y="46" width="50" height="5" rx="1.5" fill="var(--fg-muted)" opacity="0.4"/>
      <rect x="22" y="56" width="35" height="5" rx="1.5" fill="var(--fg-muted)" opacity="0.4"/>
      {/* Signal pills */}
      <rect x="75" y="22" width="22" height="10" rx="3" fill="#34D39926" stroke="#34D39966"/>
      <rect x="75" y="36" width="22" height="10" rx="3" fill="#60A5FA26" stroke="#60A5FA66"/>
    </svg>
  );
}

// ────────────────────────────────────────────────────────────
// What you get — facts + signal legend
// ────────────────────────────────────────────────────────────
function WhatYouGet() {
  const includedItems = [
    'Owner of record',
    'Address & coordinates',
    'Year built · beds · baths · sq ft',
    'Lead signals (motivation flags)',
    'Your own photos & notes',
  ];

  const tiers = [
    {
      name: 'Get Financials',
      icon: 'dollar',
      lines: ['Estimated value', 'Equity & loan-to-value', 'Last sale price + date', 'Tax assessment'],
    },
    {
      name: 'Get Comps',
      icon: 'compare',
      lines: ['3 nearby recent sales', 'Side-by-side comparison', 'Distance & sale date'],
    },
    {
      name: 'Get Permits + Distress',
      icon: 'warning',
      lines: ['Permit history', 'NOD, liens, pre-foreclosure', 'Code violations'],
    },
    {
      name: 'Get Owner Contact',
      icon: 'phone',
      lines: ['Phone & email', 'DNC / TCPA flagged', 'Skip-trace refunds if unverified'],
    },
  ];

  const signals = [
    { color: '#9CA3AF', label: 'Long-term owner', sub: '15+ years at the address' },
    { color: '#60A5FA', label: 'Absentee',        sub: 'Owner address ≠ property' },
    { color: '#A78BFA', label: 'Investor-owned',  sub: 'LLC, trust, or REI holder' },
    { color: '#34D399', label: 'High equity',     sub: 'Owes little. Owns most.' },
    { color: '#F87171', label: 'Distress',        sub: 'NOD, lien, or pre-foreclosure' },
  ];

  return (
    <section className="section surface">
      <div className="container">
        <div className="section-eyebrow">What's in a scan</div>
        <h2 className="section-title">Identification comes with your subscription. The deep data is yours when you want it.</h2>
        <p className="section-sub">Every scan in your monthly plan identifies the property and surfaces the signals on it. Unlock just the layers your next move actually requires.</p>

        {/* Included block */}
        <div className="tier-included">
          <div className="tier-included-head">
            <div className="tier-pill tier-pill-free">Included with every scan</div>
            <div className="tier-included-title">Included in your monthly subscription scans.</div>
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

        {/* Tier cards */}
        <div className="tier-head">
          <div className="tier-pill tier-pill-paid">Available to purchase</div>
          <div className="tier-included-title">Buy only the tier you need, when you need it.</div>
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

        {/* Lead signals subsection */}
        <div style={{ marginTop: 80 }}>
          <div className="section-eyebrow" style={{ marginBottom: 10 }}>Lead signals</div>
          <h3 style={{
            fontSize: 22, fontWeight: 700, letterSpacing: '-0.3px',
            margin: 0, maxWidth: 540,
          }}>The motivation flags you'd otherwise spend an evening building.</h3>
          <div className="signal-row">
            {signals.map(s => (
              <span key={s.label} className="signal-chip" style={{
                background: s.color + '24',
                border: `1px solid ${s.color}66`,
                color: s.color,
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: s.color, display: 'inline-block',
                }}/>
                {s.label}
              </span>
            ))}
          </div>
          <div style={{
            marginTop: 24, display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
          }}>
            {signals.map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)' }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 2 }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
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
    <svg {...common}>
      <line x1="12" y1="2" x2="12" y2="22"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  );
  if (kind === 'compare') return (
    <svg {...common}>
      <rect x="3" y="4" width="7" height="16" rx="1.5"/>
      <rect x="14" y="8" width="7" height="12" rx="1.5"/>
    </svg>
  );
  if (kind === 'warning') return (
    <svg {...common}>
      <path d="m10.29 3.86-8.55 14.83A2 2 0 0 0 3.46 22h17.08a2 2 0 0 0 1.72-3.31L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
  if (kind === 'phone') return (
    <svg {...common}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
  return null;
}

// ────────────────────────────────────────────────────────────
// Compliance band
// ────────────────────────────────────────────────────────────
// Finds — the log of every property you've scanned, with map
function FindsSection() {
  const features = [
    {
      icon: 'map',
      title: 'Every property you\u2019ve scanned, plotted on a map.',
      body: 'A private map of your neighborhood walks. Switch between list, calendar, and map views to find the property you\u2019re thinking of.',
    },
    {
      icon: 'photo',
      title: 'Drop in your own photos of the house.',
      body: 'Add the picture you took at the curb. Add the picture of the side gate. Every Find can hold your own photos — not just the satellite view.',
    },
    {
      icon: 'time',
      title: 'Pulled up anytime, never lost in a feed.',
      body: 'Search by address, sort by date, filter by signal. The list is your own — nobody else sees the properties you\u2019ve worked.',
    },
  ];
  return (
    <section className="section surface">
      <div className="container">
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
            <div className="section-eyebrow">Your Finds</div>
            <h2 className="section-title">A private map of every house you've scouted.</h2>
            <p className="section-sub">Every confirmed scan becomes a Find. Open the Finds tab and the whole list is there — by date, by neighborhood, on the map.</p>

            <div className="activity-bullets">
              {features.map(f => (
                <div className="activity-bullet" key={f.title}>
                  <div className="bullet-ic"><FindsIcon kind={f.icon}/></div>
                  <div>
                    <div className="bullet-title">{f.title}</div>
                    <div className="bullet-body">{f.body}</div>
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

function FindsIcon({ kind }) {
  const common = {
    width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'var(--accent)', strokeWidth: 1.8,
    strokeLinecap: 'round', strokeLinejoin: 'round',
  };
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

function ActivitySection() {
  const bullets = [
    {
      icon: 'note',
      title: 'Write notes against the property — not in a separate notebook.',
      body: 'Every drive-by, mailer, call, and conversation lives on the Find itself. Open the address a month later and the whole history is right there.',
    },
    {
      icon: 'tag',
      title: 'Tag the next step: Follow up, Listing soon, Mailed, Called.',
      body: 'Filter the feed down to who you need to circle back to. Categories match what an agent actually does — add your own.',
    },
    {
      icon: 'timeline',
      title: 'A timeline of everything you\u2019ve done in the field.',
      body: 'Activity is chronological and searchable. Pull up a neighborhood\u2019s worth of follow-ups before the door-knocking walk.',
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="activity-grid">
          <div className="activity-copy">
            <div className="section-eyebrow">Activity log</div>
            <h2 className="section-title">Pin every follow-up to the property it belongs to.</h2>
            <p className="section-sub">Scouting is one thing. Closing is another. PropertySight's Activity tab gives you a single place to write what happened — so the next visit picks up where the last one left off.</p>

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
  return null;
}

function Compliance() {
  return (
    <section className="section">
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
            <h3>Built around DNC and TCPA from day one.</h3>
            <p>
              Every skip-traced contact is flagged against the National Do Not Call registry.
              Refunds are automatic — if a record can't be confirmed, your credit is returned
              with a note. The compliance disclaimer ships in the app, not buried in a settings menu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Footer
// ────────────────────────────────────────────────────────────
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
              The address book of every building. Built for agents who scout in person.
            </p>
          </div>
          <div>
            <div className="col-title">App</div>
            <ul>
              <li><a href="#">Download for iOS</a></li>
              <li><a href="#">Download for Android</a></li>
              <li><a href="#features">How it works</a></li>
              <li><a href="#signals">Lead signals</a></li>
            </ul>
          </div>
          <div>
            <div className="col-title">Company</div>
            <ul>
              <li><a href="privacy.html">Privacy policy</a></li>
              <li><a href="mailto:contact@propertysightapp.com">Contact</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Compliance</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-meta">
          <span>© 2026 PropertySight. All rights reserved.</span>
          <span>propertysightapp.com</span>
        </div>
      </div>
    </footer>
  );
}

// ────────────────────────────────────────────────────────────
// Nav
// ────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a className="nav-brand" href="#">
          <img src="assets/propertysight_icon.png" alt=""/>
          <span className="word">Property<span className="sight">Sight</span></span>
        </a>
        <div className="nav-links">
          <a href="#features">How it works</a>
          <a href="#signals">Lead signals</a>
          <a href="privacy.html">Privacy</a>
          <a className="store-pill" href="#">Get the app</a>
        </div>
      </div>
    </nav>
  );
}

// ────────────────────────────────────────────────────────────
// Tweakable defaults — wrapped in EDITMODE markers
// ────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "split",
  "headline": "point_scan_know"
}/*EDITMODE-END*/;

// ────────────────────────────────────────────────────────────
// App root
// ────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [t.layout, t.headline]);

  return (
    <>
      <Nav/>
      <main>
        <Hero layout={t.layout} headlineKey={t.headline}/>
        <div id="features"/>
        <HowItWorks/>
        <div id="signals"/>
        <WhatYouGet/>
        <div id="finds"/>
        <FindsSection/>
        <div id="activity"/>
        <ActivitySection/>
        <Compliance/>
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
