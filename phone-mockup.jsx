/* global React */
const { useState, useEffect } = React;

// ────────────────────────────────────────────────────────────
// Phone frame — a stylized device bezel, no notch/logos.
// Holds whichever app screen you pass in via children.
// ────────────────────────────────────────────────────────────
function PhoneFrame({ children, width = 300, style }) {
  const height = Math.round(width * 2.05);
  return (
    <div style={{
      width, height,
      borderRadius: 44,
      padding: 9,
      background: 'linear-gradient(160deg,#1E3A5F 0%,#0e1d31 100%)',
      boxShadow:
        '0 30px 60px -20px rgba(30,58,95,0.45),' +
        '0 12px 30px rgba(30,58,95,0.18),' +
        'inset 0 0 0 1px rgba(255,255,255,0.06)',
      position: 'relative',
      ...style,
    }}>
      {/* Side button hints */}
      <div style={{
        position: 'absolute', left: -2, top: 110, width: 3, height: 60,
        background: '#0a1424', borderRadius: 3,
      }} />
      <div style={{
        position: 'absolute', right: -2, top: 160, width: 3, height: 80,
        background: '#0a1424', borderRadius: 3,
      }} />
      <div style={{
        position: 'relative',
        width: '100%', height: '100%',
        borderRadius: 36,
        background: '#fff',
        overflow: 'hidden',
      }}>
        {/* Dynamic island */}
        <div style={{
          position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
          width: 100, height: 28, borderRadius: 14, background: '#0a1424',
          zIndex: 10,
        }} />
        {/* Status bar */}
        <div style={{
          position: 'absolute', top: 16, left: 0, right: 0,
          display: 'flex', justifyContent: 'space-between',
          padding: '0 26px',
          fontSize: 13, fontWeight: 600, color: '#1E3A5F',
          fontFamily: 'var(--font-sans)',
          zIndex: 11,
        }}>
          <span>9:41</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <SbIcon kind="signal" />
            <SbIcon kind="wifi" />
            <SbIcon kind="battery" />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

function SbIcon({ kind }) {
  if (kind === 'signal') {
    return (
      <svg width="16" height="10" viewBox="0 0 16 10" fill="#1E3A5F">
        <rect x="0"  y="7" width="2.5" height="3" rx="0.5"/>
        <rect x="4"  y="5" width="2.5" height="5" rx="0.5"/>
        <rect x="8"  y="3" width="2.5" height="7" rx="0.5"/>
        <rect x="12" y="1" width="2.5" height="9" rx="0.5"/>
      </svg>
    );
  }
  if (kind === 'wifi') {
    return (
      <svg width="14" height="10" viewBox="0 0 16 12" fill="#1E3A5F">
        <path d="M8 11.5l-2-2.5a3 3 0 014 0l-2 2.5z"/>
        <path d="M8 7.5a5.5 5.5 0 00-4 1.7l-1.5-1.9a8 8 0 0111 0L12 9.2A5.5 5.5 0 008 7.5z" opacity="0.75"/>
        <path d="M.5 4.2A13 13 0 0115.5 4.2L14 6.1a10 10 0 00-12 0L.5 4.2z" opacity="0.55"/>
      </svg>
    );
  }
  // battery
  return (
    <svg width="24" height="11" viewBox="0 0 24 11" fill="none">
      <rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="#1E3A5F" strokeOpacity="0.55"/>
      <rect x="2" y="2" width="16" height="7" rx="1.5" fill="#1E3A5F"/>
      <rect x="21.5" y="3.5" width="1.5" height="4" rx="0.5" fill="#1E3A5F" fillOpacity="0.55"/>
    </svg>
  );
}

// ────────────────────────────────────────────────────────────
// House illustration — reused across screens
// ────────────────────────────────────────────────────────────
function HouseScene({ style }) {
  return (
    <svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice"
         style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', ...style }}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6B8AA8"/>
          <stop offset="0.5" stopColor="#8FA9C4"/>
          <stop offset="1" stopColor="#B8C7D6"/>
        </linearGradient>
        <radialGradient id="vig">
          <stop offset="0.65" stopColor="#000" stopOpacity="0"/>
          <stop offset="1" stopColor="#000" stopOpacity="0.32"/>
        </radialGradient>
      </defs>
      <rect width="400" height="600" fill="url(#sky)"/>
      {/* Distant trees */}
      <ellipse cx="60" cy="380" rx="50" ry="14" fill="#5a7a98" opacity="0.5"/>
      <ellipse cx="340" cy="385" rx="56" ry="16" fill="#5a7a98" opacity="0.5"/>
      {/* House roof */}
      <polygon points="80,340 200,250 320,340" fill="#3a4a5e"/>
      <polygon points="80,340 200,250 200,260 92,348" fill="#2a3a4e" opacity="0.5"/>
      {/* House body */}
      <rect x="100" y="340" width="200" height="160" fill="#e6dfd2"/>
      <rect x="100" y="340" width="200" height="6" fill="#3a4a5e" opacity="0.3"/>
      {/* Door */}
      <rect x="180" y="400" width="40" height="100" fill="#5a4435"/>
      <circle cx="212" cy="452" r="2" fill="#d4c47a"/>
      {/* Street number plate above the door */}
      <rect x="184" y="378" width="32" height="16" rx="2" fill="#1E3A5F"/>
      <text x="200" y="390" textAnchor="middle"
            fontFamily="-apple-system, system-ui, sans-serif"
            fontSize="12" fontWeight="700" fill="#f5f7fb"
            letterSpacing="1">142</text>
      {/* Windows */}
      <rect x="120" y="370" width="40" height="40" fill="#9bb5c8" stroke="#3a4a5e" strokeWidth="2"/>
      <line x1="140" y1="370" x2="140" y2="410" stroke="#3a4a5e" strokeWidth="1.5"/>
      <line x1="120" y1="390" x2="160" y2="390" stroke="#3a4a5e" strokeWidth="1.5"/>
      <rect x="240" y="370" width="40" height="40" fill="#9bb5c8" stroke="#3a4a5e" strokeWidth="2"/>
      <line x1="260" y1="370" x2="260" y2="410" stroke="#3a4a5e" strokeWidth="1.5"/>
      <line x1="240" y1="390" x2="280" y2="390" stroke="#3a4a5e" strokeWidth="1.5"/>
      {/* Path */}
      <polygon points="180,500 220,500 240,560 160,560" fill="#9d917a"/>
      {/* Foreground bushes */}
      <ellipse cx="80" cy="510" rx="50" ry="22" fill="#4a6450"/>
      <ellipse cx="340" cy="510" rx="55" ry="24" fill="#4a6450"/>
      <rect x="0" y="0" width="400" height="600" fill="url(#vig)"/>
    </svg>
  );
}

// ────────────────────────────────────────────────────────────
// SCAN SCREEN MOCKUP — viewfinder + locked-on chip + shutter
// ────────────────────────────────────────────────────────────
function ScanMock() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000' }}>
      <HouseScene/>

      {/* Reticle — matches HouseScene's 400×600 / slice space so it frames the house */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
           viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
        <g stroke="#fff" strokeWidth="3" fill="none" opacity="0.9">
          <path d="M70 268 L70 240 L98 240"/>
          <path d="M330 268 L330 240 L302 240"/>
          <path d="M70 512 L70 540 L98 540"/>
          <path d="M330 512 L330 540 L302 540"/>
        </g>
      </svg>

      {/* Candidate name chip */}
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '8px 14px', borderRadius: 22,
          background: 'rgba(91,141,239,0.92)',
          color: '#fff', fontSize: 12, fontWeight: 500,
          boxShadow: '0 4px 14px rgba(0,0,0,0.28)',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
               stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18"/><path d="M3 10v11"/>
            <path d="M11 21V10l-4-4-4 4"/><path d="M21 21V8l-4-4-4 4v17"/>
          </svg>
          142 Oak Street
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
               stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>
      </div>

      {/* Hint */}
      <div style={{
        position: 'absolute', bottom: 122, left: 0, right: 0,
        textAlign: 'center', color: 'rgba(255,255,255,0.9)',
        fontSize: 11, textShadow: '0 1px 4px rgba(0,0,0,0.5)',
      }}>Tap to confirm</div>

      {/* Bottom controls */}
      <div style={{
        position: 'absolute', bottom: 36, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16,
      }}>
        {/* Add button */}
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'rgba(0,0,0,0.55)',
          border: '1px solid rgba(255,255,255,0.32)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
        {/* Shutter */}
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'var(--accent)',
          boxShadow: '0 0 18px rgba(91,141,239,0.55)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
            <circle cx="12" cy="13" r="3"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// FIND DETAIL MOCKUP — sheet-style view over property
// ────────────────────────────────────────────────────────────
function FindMock() {
  const rows = [
    ['Owner',       'Catherine M. Reyes'],
    ['Est. value',  '$1.24M'],
    ['Equity',      '$890K  · 72%'],
    ['Last sale',   '$540K · Mar 2011'],
    ['Year built',  '1947'],
  ];
  const signals = [
    { color: '#9CA3AF', label: 'Long-term', icon: 'schedule' },
    { color: '#34D399', label: 'High equity', icon: 'dollar' },
    { color: '#60A5FA', label: 'Absentee', icon: 'pin' },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000' }}>
      <HouseScene/>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }}/>

      {/* Sheet */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: '#fff',
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
        padding: '12px 16px 22px',
        boxShadow: '0 -2px 20px rgba(30,58,95,0.16)',
        height: '64%',
      }}>
        {/* Drag handle */}
        <div style={{
          width: 36, height: 4, background: 'var(--border)',
          borderRadius: 2, margin: '0 auto 12px',
        }}/>

        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>
          142 Oak Street
        </div>
        <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2 }}>
          San Francisco, CA 94117
        </div>

        {/* Signal chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 9 }}>
          {signals.map(s => (
            <span key={s.label} style={{
              display: 'inline-flex', alignItems: 'center', gap: 3,
              padding: '4px 7px', borderRadius: 10,
              background: s.color + '26',
              border: `0.5px solid ${s.color}66`,
              color: s.color, fontSize: 10, fontWeight: 600,
            }}>
              <SignalIcon kind={s.icon} color={s.color}/>
              {s.label}
            </span>
          ))}
        </div>

        {/* Tab strip */}
        <div style={{
          display: 'flex', gap: 14, marginTop: 14,
          borderBottom: '1px solid var(--border)',
        }}>
          {['Overview','Contact','Comps','Notes'].map((t,i) => (
            <span key={t} style={{
              fontSize: 10, fontWeight: 600, letterSpacing: 0.5,
              color: i === 0 ? 'var(--accent)' : 'var(--fg-muted)',
              textTransform: 'uppercase',
              padding: '0 0 8px',
              borderBottom: i === 0 ? '2px solid var(--accent)' : '2px solid transparent',
              marginBottom: -1,
            }}>{t}</span>
          ))}
        </div>

        {/* Rows */}
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {rows.map(([l,v]) => (
            <div key={l} style={{ display: 'flex' }}>
              <div style={{ width: 78, fontSize: 11, color: 'var(--fg-muted)' }}>{l}</div>
              <div style={{ flex: 1, fontSize: 11, fontWeight: 500, color: 'var(--fg)' }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Skip trace card */}
        <div style={{
          marginTop: 12, display: 'flex', alignItems: 'center', gap: 8,
          padding: 9, background: 'var(--accent-soft)',
          border: '1px solid rgba(91,141,239,0.4)', borderRadius: 8,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="var(--fg-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="11" width="16" height="10" rx="2"/>
            <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
          </svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--fg)' }}>Skip Trace</div>
            <div style={{ fontSize: 9, color: 'var(--fg-muted)' }}>Phone, email — 1 credit</div>
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
               stroke="var(--fg-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

function SignalIcon({ kind, color }) {
  const common = { width: 9, height: 9, viewBox: '0 0 24 24', fill: 'none',
                   stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (kind === 'schedule') {
    return <svg {...common}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>;
  }
  if (kind === 'dollar') {
    return <svg {...common}>
      <line x1="12" y1="2" x2="12" y2="22"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>;
  }
  if (kind === 'pin') {
    return <svg {...common}>
      <path d="M9.13 9.13A3 3 0 0 0 12 14a3 3 0 0 0 1.87-.69"/>
      <path d="M19.5 19.5 4.5 4.5"/>
      <path d="M12 21s-7-7-7-12a7 7 0 0 1 11.85-5.07"/>
    </svg>;
  }
  return null;
}

Object.assign(window, { PhoneFrame, ScanMock, FindMock, ActivityMock, FindsListMock, FindsMapMock, HouseScene });

// ────────────────────────────────────────────────────────────
// ACTIVITY MOCKUP — chronological feed of notes tied to finds
// ────────────────────────────────────────────────────────────
function ActivityMock() {
  const tags = [
    { id: 'all',     label: 'All',          selected: true },
    { id: 'follow',  label: 'Follow up',    selected: false },
    { id: 'listing', label: 'Listing soon', selected: false },
    { id: 'mailed',  label: 'Mailed',       selected: false },
    { id: 'called',  label: 'Called',       selected: false },
    { id: 'met',     label: 'Met owner',    selected: false },
  ];
  const items = [
    {
      time: 'May 17 · 3:42 PM',
      addr: '142 Oak Street, San Francisco',
      text: 'Met owner briefly — open to offers but not actively listing. Follow up in 60 days.',
      pill: { label: 'Follow up', color: '#FFC107' },
    },
    {
      time: 'May 17 · 11:08 AM',
      addr: '4823 Magnolia Avenue, Oakland',
      text: 'Mailed yellow letter. LLC owner — direct mail to registered agent address.',
      pill: { label: 'Mailed', color: '#60A5FA' },
    },
    {
      time: 'May 15 · 6:20 PM',
      addr: '17 Heritage Lane, Berkeley',
      text: 'Spoke to neighbor — owner is 82, kids live out of state.',
      pill: { label: 'Met owner', color: '#34D399' },
    },
    {
      time: 'May 14 · 9:55 AM',
      addr: '901 Castro Street #4B, Mountain View',
      text: 'NOD recorded last month. Sent compassionate-tone postcard.',
      pill: { label: 'Mailed', color: '#60A5FA' },
    },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'var(--bg)',
      paddingTop: 50,
    }}>
      {/* Header */}
      <div style={{ padding: '14px 16px 8px' }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--fg)', letterSpacing: -0.3 }}>
          Activity
        </div>
        {/* Filter chips */}
        <div style={{
          display: 'flex', gap: 5, marginTop: 10,
          overflow: 'hidden', maskImage: 'linear-gradient(90deg, #000 88%, transparent)',
        }}>
          {tags.map(t => (
            <div key={t.id} style={{
              padding: '6px 12px',
              borderRadius: 9999,
              background: t.selected ? 'var(--accent)' : 'var(--accent-soft)',
              border: t.selected ? 'none' : '1px solid var(--border)',
              color: t.selected ? '#fff' : 'var(--fg-muted)',
              fontSize: 10, fontWeight: 600,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>{t.label}</div>
          ))}
        </div>
      </div>

      {/* Activity list */}
      <div style={{
        marginTop: 4,
        background: 'var(--surface)',
      }}>
        {items.map((it, i) => (
          <div key={i} style={{
            padding: '11px 16px',
            borderBottom: '1px solid var(--border)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 8, marginBottom: 3,
            }}>
              <div style={{ fontSize: 9, color: 'var(--fg-muted)' }}>{it.time}</div>
              <span style={{
                fontSize: 8, fontWeight: 700, letterSpacing: 0.4,
                padding: '2px 6px', borderRadius: 4,
                background: it.pill.color + '24',
                color: it.pill.color,
                textTransform: 'uppercase',
              }}>{it.pill.label}</span>
            </div>
            <div style={{
              fontSize: 10, color: 'var(--fg-muted)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              marginBottom: 4,
            }}>{it.addr}</div>
            <div style={{
              fontSize: 11, color: 'var(--fg)', lineHeight: 1.4,
              display: '-webkit-box', WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2, overflow: 'hidden',
            }}>{it.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Tiny house thumbnail for the Finds list — variants
// ────────────────────────────────────────────────────────────
function HouseThumb({ variant = 'a', userPhoto }) {
  // If userPhoto is true, render an "agent uploaded" looking thumb —
  // saturated, framed differently — to convey "this is your photo, not ours".
  if (userPhoto) {
    return (
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
           style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id={`up-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f1c98a"/>
            <stop offset="1" stopColor="#dba56a"/>
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#up-${variant})`}/>
        <polygon points="14,52 50,24 86,52" fill="#5e3a26"/>
        <rect x="22" y="52" width="56" height="42" fill="#f7eedb"/>
        <rect x="42" y="68" width="16" height="26" fill="#3a2316"/>
        <rect x="28" y="58" width="12" height="12" fill="#88b8c8"/>
        <rect x="60" y="58" width="12" height="12" fill="#88b8c8"/>
        <ellipse cx="14" cy="96" rx="14" ry="6" fill="#3f6b3a"/>
        <ellipse cx="88" cy="96" rx="16" ry="7" fill="#3f6b3a"/>
        {/* "Photo" framing — slight inner border */}
        <rect x="2" y="2" width="96" height="96" fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="2"/>
      </svg>
    );
  }
  const palettes = {
    a: { sky: '#aac4d8', roof: '#3a4a5e', body: '#d5cfc4', door: '#5a4435' },
    b: { sky: '#c4b8d8', roof: '#4a3a5e', body: '#e8e0d2', door: '#7a5a35' },
    c: { sky: '#b8d8c4', roof: '#3a5e4a', body: '#dcd6c8', door: '#5a4a3a' },
    d: { sky: '#d8c4b8', roof: '#5e4a3a', body: '#e0dccc', door: '#3a4a5a' },
  };
  const p = palettes[variant] || palettes.a;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
         style={{ width: '100%', height: '100%' }}>
      <rect width="100" height="100" fill={p.sky}/>
      <polygon points="20,55 50,30 80,55" fill={p.roof}/>
      <rect x="28" y="55" width="44" height="35" fill={p.body}/>
      <rect x="44" y="70" width="12" height="20" fill={p.door}/>
      <rect x="32" y="60" width="8" height="8" fill="#9bb5c8"/>
      <rect x="60" y="60" width="8" height="8" fill="#9bb5c8"/>
    </svg>
  );
}

// ────────────────────────────────────────────────────────────
// FINDS LIST MOCKUP — list of found properties with thumbs
// ────────────────────────────────────────────────────────────
function FindsListMock() {
  const items = [
    {
      addr: '142 Oak Street',
      city: 'San Francisco · 4 days ago',
      signals: [{ c: '#9CA3AF', l: 'Long-term' }, { c: '#34D399', l: 'High equity' }],
      variant: 'a',
      userPhoto: true,
    },
    {
      addr: '4823 Magnolia Avenue',
      city: 'Oakland · 5 days ago',
      signals: [{ c: '#A78BFA', l: 'Investor' }, { c: '#60A5FA', l: 'Absentee' }],
      variant: 'b',
    },
    {
      addr: '17 Heritage Lane',
      city: 'Berkeley · 1 week ago',
      signals: [{ c: '#9CA3AF', l: 'Long-term' }],
      variant: 'c',
      userPhoto: true,
    },
    {
      addr: '901 Castro Street #4B',
      city: 'Mountain View · 9 days ago',
      signals: [{ c: '#F87171', l: 'Distress' }],
      variant: 'd',
    },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'var(--bg)',
      paddingTop: 50,
    }}>
      {/* Header */}
      <div style={{ padding: '14px 16px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--fg)', letterSpacing: -0.3 }}>
            Finds
          </div>
          {/* List/Calendar/Map segmented */}
          <div style={{
            display: 'inline-flex',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 9999,
            padding: 2,
          }}>
            {[
              { id: 'list', active: true, icon: 'bookmark' },
              { id: 'cal',  active: false, icon: 'cal' },
              { id: 'map',  active: false, icon: 'map' },
            ].map(v => (
              <div key={v.id} style={{
                background: v.active ? 'var(--accent)' : 'transparent',
                borderRadius: 9999,
                padding: '4px 7px',
                display: 'inline-flex', alignItems: 'center',
              }}>
                <SegIcon kind={v.icon} active={v.active}/>
              </div>
            ))}
          </div>
        </div>
        {/* Range chips */}
        <div style={{ display: 'flex', gap: 5, marginTop: 10 }}>
          {['Week','Month','Year','All'].map((c, i) => (
            <div key={c} style={{
              padding: '5px 11px',
              borderRadius: 9999,
              background: i === 1 ? 'var(--accent)' : 'var(--accent-soft)',
              border: i === 1 ? 'none' : '1px solid var(--border)',
              color: i === 1 ? '#fff' : 'var(--fg-muted)',
              fontSize: 10, fontWeight: 600,
            }}>{c}</div>
          ))}
        </div>
      </div>

      {/* List */}
      <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it, i) => (
          <div key={i} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(30,58,95,0.06)',
            padding: 9,
            display: 'flex', gap: 10,
          }}>
            <div style={{
              width: 50, height: 50, borderRadius: 8,
              overflow: 'hidden', flexShrink: 0,
              position: 'relative',
            }}>
              <HouseThumb variant={it.variant} userPhoto={it.userPhoto}/>
              {it.userPhoto && (
                <div style={{
                  position: 'absolute', bottom: 2, right: 2,
                  width: 12, height: 12, borderRadius: '50%',
                  background: 'var(--accent)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  border: '1.5px solid #fff',
                }}>
                  <svg width="7" height="7" viewBox="0 0 24 24" fill="#fff">
                    <circle cx="12" cy="13" r="3"/>
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
                          stroke="#fff" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 11, fontWeight: 600, color: 'var(--fg)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{it.addr}</div>
              <div style={{ fontSize: 9, color: 'var(--fg-muted)', marginTop: 1 }}>
                {it.city}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 4 }}>
                {it.signals.map((s, j) => (
                  <span key={j} style={{
                    fontSize: 8, fontWeight: 600,
                    padding: '2px 5px', borderRadius: 8,
                    background: s.c + '24',
                    border: `0.5px solid ${s.c}66`,
                    color: s.c,
                  }}>{s.l}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SegIcon({ kind, active }) {
  const stroke = active ? '#fff' : 'rgba(30,58,95,0.55)';
  const common = {
    width: 11, height: 11, viewBox: '0 0 24 24', fill: 'none',
    stroke, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  if (kind === 'bookmark') return (
    <svg {...common}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
  );
  if (kind === 'cal') return (
    <svg {...common}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  );
  if (kind === 'map') return (
    <svg {...common}><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"/></svg>
  );
  return null;
}

// ────────────────────────────────────────────────────────────
// FINDS MAP MOCKUP — stylized map with pins
// ────────────────────────────────────────────────────────────
function FindsMapMock() {
  const pins = [
    { x: 120, y: 200, color: '#34D399' },
    { x: 220, y: 270, color: '#5B8DEF' },
    { x: 80,  y: 340, color: '#A78BFA' },
    { x: 180, y: 160, color: '#5B8DEF' },
    { x: 250, y: 410, color: '#F87171' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#E8EEF5' }}>
      {/* Map background */}
      <svg viewBox="0 0 300 615" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <rect width="300" height="615" fill="#E8EEF5"/>
        {/* Roads */}
        <path d="M0,180 L300,160" stroke="#fff" strokeWidth="12"/>
        <path d="M80,0 L100,615" stroke="#fff" strokeWidth="9"/>
        <path d="M210,0 L195,615" stroke="#fff" strokeWidth="9"/>
        <path d="M0,380 L300,400" stroke="#fff" strokeWidth="7"/>
        <path d="M0,500 C80,490 180,510 300,500" stroke="#fff" strokeWidth="5" fill="none"/>
        <path d="M30,40 C90,80 170,40 260,90 S290,210 300,260" stroke="#fff" strokeWidth="5" fill="none"/>
        {/* Park */}
        <rect x="135" y="220" width="60" height="60" rx="6" fill="#cce0c8"/>
        <text x="165" y="256" fontSize="8" fill="#5a7456" textAnchor="middle" fontFamily="-apple-system">Park</text>
        {/* Water */}
        <path d="M0,540 L0,615 L300,615 L300,560 C220,540 130,580 50,540 Z" fill="#c8dbe8"/>
        {/* District labels */}
        <text x="40" y="80" fontSize="9" fill="#7a8a9c" fontFamily="-apple-system">Pacific Heights</text>
        <text x="220" y="440" fontSize="9" fill="#7a8a9c" fontFamily="-apple-system">Mission</text>
      </svg>

      {/* Status bar overlay (white) */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 48,
        background: 'rgba(245,247,251,0.0)',
        pointerEvents: 'none',
      }}/>

      {/* Header floating */}
      <div style={{
        position: 'absolute', top: 52, left: 12, right: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          padding: '6px 12px', borderRadius: 9999,
          fontSize: 11, fontWeight: 700, color: 'var(--fg)',
          boxShadow: '0 2px 10px rgba(30,58,95,0.12)',
        }}>Finds · 12</div>
        <div style={{
          display: 'inline-flex',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 9999,
          padding: 2,
        }}>
          {[
            { id: 'list', active: false, icon: 'bookmark' },
            { id: 'cal',  active: false, icon: 'cal' },
            { id: 'map',  active: true,  icon: 'map' },
          ].map(v => (
            <div key={v.id} style={{
              background: v.active ? 'var(--accent)' : 'transparent',
              borderRadius: 9999,
              padding: '4px 7px',
              display: 'inline-flex', alignItems: 'center',
            }}>
              <SegIcon kind={v.icon} active={v.active}/>
            </div>
          ))}
        </div>
      </div>

      {/* Pins */}
      {pins.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${(p.x/300)*100}%`,
          top: `${(p.y/615)*100}%`,
          transform: 'translate(-50%, -100%)',
        }}>
          <svg width="22" height="28" viewBox="0 0 28 36">
            <path d="M14 0 C6 0 0 6 0 14 C0 22 14 36 14 36 C14 36 28 22 28 14 C28 6 22 0 14 0 Z"
                  fill={p.color} stroke="#fff" strokeWidth="2"/>
            <circle cx="14" cy="14" r="5" fill="#fff"/>
          </svg>
        </div>
      ))}

      {/* Bottom selected-find card */}
      <div style={{
        position: 'absolute', left: 12, right: 12, bottom: 24,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        boxShadow: '0 6px 18px rgba(30,58,95,0.16)',
        padding: 10,
        display: 'flex', alignItems: 'center', gap: 9,
      }}>
        <div style={{
          width: 4, height: 32, borderRadius: 2, background: 'var(--accent)',
        }}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--fg)' }}>
            142 Oak Street
          </div>
          <div style={{ fontSize: 9, color: 'var(--fg-muted)', marginTop: 1 }}>
            San Francisco · 4 days ago
          </div>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
             stroke="var(--fg-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    </div>
  );
}
