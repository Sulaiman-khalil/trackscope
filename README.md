# 🎧 trackscope

**Automated techno track analysis and playlist visualization.**  
Built with Next.js, Tailwind CSS, and deployed via Vercel.

---

## 🚀 Features

- 🎵 Analyze raw track data (title, artist, BPM, key, genre)
- 🧠 Auto-fill missing BPM/key values with smart defaults
- 📊 Render tracks as cards or sortable tables
- 📥 Import Beatport-style JSON data
- 🔌 API route for external track analysis (`/api/analyze`)
- ⚡️ Instant deployment with Vercel

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/) (CI/CD + Hosting)

---

## 📁 Project Structure

src/ ├── app/ │ ├── page.tsx # Main UI │ └── api/analyze/route.ts # API endpoint ├── components/ │ ├── TrackCard.tsx │ └── TrackTable.tsx ├── lib/ │ ├── trackAnalyzer.ts │ └── beatportParser.ts

---

## 🧪 Local Dev

```bash
npm install
npm run dev
```

## 🌐 Deploy

Push to `main` → auto-deployed via Vercel.  
Custom config: [`vercel.json`](./vercel.json)

// 📦 Example Import
import { parseBeatportData } from "@/lib/beatportParser";

const raw = [
{ name: "Hypnotic Pulse", artist: "Rødhåd", bpm: 129, key: "2A" },
{ name: "Parallel Shift", artist: "Antigone" }
];

const tracks = parseBeatportData(raw);

🧠 Author
Built by @Sulaiman-khalil For techno heads, data nerds, and playlist perfectionists.
