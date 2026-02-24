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
| **Auth** | Firebase Auth (Google Sign-In) |
| **Database** | Firebase Firestore |
| **Styling** | Tailwind CSS + custom design system |
| **Places & Photos** | Google Places API |
| **Deployment** | Vercel |
| **Analytics** | Vercel Analytics |

## 🔐 Security & Usage Limits

**API keys** are handled securely:
- **Gemini & Places API keys** → Server-only (Next.js API routes, never exposed to browser)
- **Firebase key** → Client-side (safe by design, protected by Firestore rules)
- **Rate limiting** on all API routes

**Trip generation limits** (tracked in Firestore, resets monthly):
| | Anonymous | Signed In |
|---|---|---|
| Trips/month | 3 | 7 |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Google Cloud account (Gemini API + Places API enabled)
- Firebase project (Auth + Firestore)

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

# Firebase Admin SDK (server-side token verification)
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

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
├── layout.jsx                  # Root layout (Header, Footer, AuthProvider)
├── page.jsx                    # Landing page
├── create-trip/page.jsx        # Trip creation form
├── view-trip/[tripId]/page.jsx # Trip dashboard
└── api/
    ├── generate-trip/route.js  # Gemini AI proxy + usage enforcement
    ├── search-places/route.js  # Places API proxy
    └── usage/route.js          # Usage stats for trip counter
components/
├── AuthContext.jsx             # Google Sign-In context
├── Header.jsx                  # Nav with auth + trip counter badge
├── CreateTrip.jsx              # Trip creation form
├── ViewTrip.jsx                # Trip dashboard
└── ...                         # UI components
service/
├── firebaseConfig.jsx          # Firebase client SDK
├── usageService.js             # Server-side usage tracking (Firebase Admin)
├── AIModel.jsx                 # Gemini API client
└── GlobalApi.jsx               # Places API client
```

## 📄 License

Open source under the [MIT License](LICENSE).

---

<div align="center">
  <p>Made with 💖 by <a href="https://yumngauhar.fyi">YuZaGa</a></p>
</div>
