# Iliada Beauty

Premium Beauty Salon — Strengelbach (CH). Video-led one-pager.
Next.js 14 (App Router) · React · Tailwind · Framer Motion.

Schweizer Orthografie: immer **ss**, nie **ß**.

## Deploy: GitHub + Vercel (nur Browser)

1. **GitHub** → New repository (z. B. `iliada-beauty`) → **Add file → Upload files**
   → den ganzen Ordnerinhalt hineinziehen → **Commit**.
   (`node_modules` NICHT hochladen — ist in `.gitignore`.)
2. **Vercel** → Add New… → Project → Repo importieren → Framework = Next.js
   (automatisch) → **Deploy**. Live-URL nach ~1 Min. Jeder Commit deployt neu.

## Assets (in /public)
- `logo.png`  — Logo (transparent)
- `salon.jpg` — Salonfoto (Hero-Poster + Salon-Sektion)
- `salon.mp4` — Hero-Hintergrundvideo (autoplay, muted, loop)

## Kategorie-Videos einsetzen (optional)
Kurze Clips (15–20 s, ohne Ton) als `/public/nails.mp4`, `/public/brows.mp4`,
`/public/peeling.mp4` ablegen und in `components/IliadaBeauty.jsx` im
`SERVICES`-Array bei der jeweiligen Kategorie `video: "/nails.mp4"` setzen.
Solange `video: null`, läuft ein animierter Platzhalter.

## Noch einsetzen
- Echte Galeriebilder pro Kategorie (ersetzen die Farbflächen in `SERVICES.shots`).
- Kontakt: Adresse, Telefon, E-Mail, Öffnungszeiten im `Footer`.
- Buchungslink (aktuell `href="#"`).

## Lokal (optional)
```bash
npm install
npm run dev   # http://localhost:3000
```
