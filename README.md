<div align="center">

# ✈️ Tripply

**AI-powered travel planning, beautifully curated.**

[Live Demo](https://tripply.vercel.app) · [Report Bug](https://github.com/YuZaGa/Tripply/issues)

</div>

---

![Tripply Dashboard](public/screen.png)

## ✨ What is Tripply?

Tripply transforms the way you plan travel. Tell it where you want to go, your budget, travel style, and dates — and it generates a **complete, day-by-day itinerary** with hotels, restaurants, landmarks, and timing, all powered by Google's Gemini AI.

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **AI Engine** | Google Gemini (via server-side API route) |
| **Database** | Firebase Firestore |
| **Styling** | Tailwind CSS + custom design system |
| **Places & Photos** | Google Places API |
| **Deployment** | Vercel |
| **Analytics** | Vercel Analytics |

## 🔐 Security

API keys are handled securely:

- **Gemini & Places API keys** → Server-only (Next.js API routes, never exposed to browser)
- **Firebase key** → Client-side (safe by design, protected by Firestore security rules)
- **Google Places client key** → Protected with HTTP referrer restrictions
- **Rate limiting** on all API routes to prevent abuse

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Google Cloud account (Gemini API + Places API enabled)
- Firebase project

### Installation

```bash
git clone https://github.com/YuZaGa/Tripply.git
cd Tripply
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Server-side only (API routes — never exposed to browser)
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite
GOOGLE_PLACES_API_KEY=your_google_places_api_key

# Client-side (bundled into browser JS)
NEXT_PUBLIC_GOOGLE_PLACE_API_KEY=your_google_places_api_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
```

### Run

```bash
npm run dev       # Development server at http://localhost:3000
npm run build     # Production build
npm start         # Start production server
```

## 📁 Project Structure

```
app/
├── layout.jsx                  # Root layout (Header, Footer, fonts)
├── page.jsx                    # Landing page
├── create-trip/page.jsx        # Trip creation form
├── view-trip/[tripId]/page.jsx # Trip dashboard
└── api/
    ├── generate-trip/route.js  # Gemini AI proxy (server-only)
    └── search-places/route.js  # Places API proxy (server-only)
components/                     # All UI components
service/                        # Firebase config, API clients
constants/                      # Options, prompts, dummy data
```

## 📄 License

Open source under the [MIT License](LICENSE).

---

<div align="center">
  <p>Made with 💖 by <a href="https://yumngauhar.fyi">YuZaGa</a></p>
</div>
