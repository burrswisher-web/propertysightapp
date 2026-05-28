# PropertySight Website

Marketing site for [propertysightapp.com](https://propertysightapp.com).

## Pages

- **`index.html`** — Sales landing page targeted at real estate agents.
- **`privacy.html`** — Privacy policy.
- **`data-sources.html`** — Where the property data comes from (BatchData, Federal Reserve, Google Maps & Solar).

## Local files

```
index.html              # entry — pulls in styles.css and the JSX scripts
privacy.html            # static; uses styles.css only
data-sources.html       # static; uses styles.css only
styles.css              # site-wide styles (imports assets/colors_and_type.css)
landing.jsx             # React app for the landing page (sections, tweaks)
phone-mockup.jsx        # Scan / Find / Activity / Finds list / Finds map mockups
tweaks-panel.jsx        # In-page Tweaks controls (hero layout, headline copy)
assets/
  colors_and_type.css   # design tokens (colors, type scale, spacing, motion)
  PropertySight_logo.png
  propertysight_icon.png
```

## Running locally

Open `index.html` in a browser through any static server, e.g.:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Opening `index.html` directly with `file://` will not work — Babel's JSX transform needs the scripts served over HTTP.

## Deploying

Every file is static. Push to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages). No build step.

## Editing the landing page

The landing page is React + JSX rendered in-browser via `@babel/standalone`. To change copy, edit `landing.jsx`. To change visual mockups, edit `phone-mockup.jsx`. To change styling tokens, edit `assets/colors_and_type.css`. To change layout, edit `styles.css`.

The hero supports three layout variations and four headline options via the in-page **Tweaks** panel (toggle from the toolbar in the design environment).
