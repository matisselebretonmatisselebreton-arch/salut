# InvoicePilot — Vidéos marketing (Remotion)

Pubs dynamiques pour InvoicePilot, codées en React via [Remotion](https://www.remotion.dev/).

## Quickstart

```bash
cd video
npm install
npm run dev          # ouvre Remotion Studio (preview live + scrubbing)
```

Puis ouvre l'URL affichée (généralement http://localhost:3000) et choisis la composition :

- **MainAd-Vertical** — 1080×1920 (TikTok / Reels / Shorts)
- **MainAd-Horizontal** — 1920×1080 (YouTube / LinkedIn / site)
- **MainAd-Square** — 1080×1080 (Instagram feed / Facebook)

## Rendre les vidéos

```bash
npm run build:vertical     # → out/invoicepilot-vertical.mp4
npm run build:horizontal   # → out/invoicepilot-horizontal.mp4
npm run build:square       # → out/invoicepilot-square.mp4
npm run build:all          # les trois d'un coup
```

## Architecture

```
src/
├── Root.tsx              # déclare les 3 compositions (V/H/Square)
├── compositions/
│   └── MainAd.tsx        # orchestre les scènes via <Sequence>
├── scenes/               # une scène = une étape narrative
│   ├── 01-Hook.tsx       # 0-3s   "Tu factures encore sur Word ?"
│   ├── 02-Logo.tsx       # 3-6s   logo + tagline
│   └── 03-CreateInvoice  # 6-12s  démo mockup création facture
├── components/           # primitives réutilisables
│   ├── AnimatedNumber    # compteur 0 → X (spring)
│   ├── Cursor            # curseur animé avec clics
│   ├── AppFrame          # cadre navigateur autour des mockups
│   └── TextReveal        # texte mot par mot
├── ui/                   # répliques des écrans d'InvoicePilot
│   ├── theme.ts          # couleurs de marque
│   └── InvoiceForm.tsx   # mockup du form "Nouvelle facture"
└── index.ts              # entrypoint Remotion
```

## Prochaines scènes (à coder)

- [ ] **04-Dashboard** — CA qui monte, barres mensuelles, donut catégories
- [ ] **05-Features** — carousel rapide (QR SEPA, FEC, URSSAF, Relances, PWA)
- [ ] **06-SocialProof** — étoiles, "+2 400 freelances", avatars
- [ ] **07-Transformation** — split "Avant 3h / Après 20 min"
- [ ] **08-CTA** — logo final, URL, bouton qui pulse

Chaque scène est un composant React isolé, ajouté dans `compositions/MainAd.tsx` via `<Sequence from={...} durationInFrames={...} />`.
