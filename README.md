# Hyderabad Hosts - Restaurant Website with AR 3D Food Menu

A premium restaurant website for **Hyderabad Hosts**, a multi-cuisine restaurant in Madhapur, Hyderabad (est. 2004). Features an **Augmented Reality menu** that lets customers see 3D food models on their table before ordering — no app install needed, works entirely in the browser.

**Live Site:** [https://d-model-page.web.app](https://d-model-page.web.app)
**AR Menu:** [https://d-model-page.web.app/ar/?item=biryani](https://d-model-page.web.app/ar/?item=biryani)

---

## Features

### Restaurant Website (React + Vite)
- Mobile-first responsive design with separate mobile and desktop layouts
- Bottom navigation bar on mobile, full navbar on desktop
- Full-bleed hero with image background (mobile) / side-by-side layout (desktop)
- Complete menu with 60+ items across 4 categories (Arabian Mandi, Biryani, Rice & Noodles, Desserts)
- Tabbed menu with skeleton loading animation on tab switch
- Auto-scrolling specialties carousel (pause on hover/touch)
- AR Experience promo section
- Google Maps integration with real restaurant location
- Click-to-call phone numbers
- Links to Swiggy, Zomato, Instagram

### AR 3D Food Menu
- **No app install** — runs entirely in the mobile browser
- **WebXR Hit Test** for real surface detection (Chrome Android with ARCore)
- **Fallback mode** with camera + device orientation tracking for all other phones
- 3D plate model (`.glb`) with 3D biryani model placed on top
- **Shader-based smoke/steam effect** rising from the food
- Tap to place, pinch to resize, drag to reposition
- Reset button to re-place
- QR code cards page for printing and placing on restaurant tables
- Service Worker caching — models load instantly on revisit

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS (CDN) with Material Design 3 color system |
| Fonts | Noto Serif, Playfair Display, Plus Jakarta Sans, Montserrat (Google Fonts) |
| Icons | Material Symbols Outlined (Google Fonts) |
| 3D Rendering | Three.js v0.147 |
| 3D Model Loading | THREE.GLTFLoader |
| AR Surface Detection | WebXR Hit Test API |
| AR Fallback | Device Orientation API + Camera (getUserMedia) |
| Smoke Effect | Custom GLSL Shader (vertex + fragment) |
| Hosting | Firebase Hosting |
| Caching | Service Worker (Cache API) + HTTP Cache Headers |
| Model Optimization | gltf-transform CLI (Draco, Meshopt, WebP) |

---

## 3D Models

### Formats
All 3D models use the **glTF Binary (.glb)** format — the standard for web-based 3D.

| Model | File | Size | Triangles | Textures |
|-------|------|------|-----------|----------|
| Plate | `public/ar/plate.glb` | 81 KB | ~2K | Basic PBR |
| Biryani (optimized) | `public/ar/biryani-model.glb` | 1.8 MB | ~40K | 3x 1024px WebP |
| Biryani (original) | not in repo | 17.5 MB | 135K | 3x 2048px PNG |

### Model Optimization
The original biryani model was 17.5 MB — too heavy for mobile. Optimized using:

```bash
npx @gltf-transform/cli optimize biryani-model.glb biryani-model-opt.glb \
  --texture-compress webp \
  --texture-size 1024 \
  --simplify --simplify-ratio 0.3
```

**Result: 17.5 MB to 1.8 MB (90% reduction)**

What the optimization does:
- **Mesh simplification** — 135K triangles reduced to ~40K (Meshoptimizer)
- **Texture compression** — 2048px PNG to 1024px WebP
- **Buffer dedup** — removes redundant vertex data
- **Quantization** — reduces floating point precision where not visible

### Renderer Fixes for Smooth Mobile Rendering
- `logarithmicDepthBuffer: true` — eliminates z-fighting/flickering
- `powerPreference: 'high-performance'` — requests dedicated GPU
- `material.side = THREE.FrontSide` — disables doubleSided (prevents overlapping face glitches)
- `camera near=0.05, far=20` — tighter depth range for better precision
- Shadow casting disabled on complex food model (performance)

---

## Smoke/Steam Effect

The rising steam from the biryani uses a **custom GLSL shader** applied to a cylinder mesh — inspired by the [Three.js Journey Coffee Smoke lesson](https://threejs-journey.com/lessons/coffee-smoke-shader).

### How it works

**Geometry:** Open-ended cylinder (`CylinderGeometry`) positioned above the food model

**Vertex Shader:**
- Expands cylinder radius as vertices go higher (smoke widens as it rises)
- Applies sinusoidal twist distortion that increases with height (wavy curling motion)
- Adds wind drift using time-based sine waves

**Fragment Shader:**
- Scrolls the smoke texture (`smoke.png`) upward over time using UV animation
- Distorts UVs with sine waves for organic, flowing look
- Applies height-based opacity fade: thick at bottom, invisible at top
- Edge fade for soft cylinder boundaries

**Smoke Texture:** `public/ar/smoke.png` (377x329 RGBA) — a real smoke photograph with transparency, used as a repeating texture that scrolls through the cylinder.

**Performance:** Single mesh, single draw call, shader runs on GPU — zero CPU overhead.

---

## Project Structure

```
hyhosts/
├── index.html                    # Vite entry (fonts, Tailwind config, theme)
├── vite.config.js                # Vite configuration
├── package.json                  # Dependencies (React 19, Vite 8)
├── firebase.json                 # Firebase Hosting config (dist/, AR routing)
├── .firebaserc                   # Firebase project binding (d-model-page)
│
├── src/
│   ├── main.jsx                  # React entry point
│   ├── App.jsx                   # All sections (Navbar, Hero, Menu, AR, etc.)
│   └── data/
│       └── menu.js               # Full menu data + specialties + gallery images
│
├── public/
│   ├── biryani-hero.png          # Hero section food image
│   └── ar/
│       ├── index.html            # AR experience (Three.js + WebXR)
│       ├── menu.html             # Printable QR code cards
│       ├── plate.glb             # 3D plate model
│       ├── biryani-model.glb     # 3D biryani model (optimized)
│       ├── biryani.png           # Food image (fallback for non-3D items)
│       ├── smoke.png             # Smoke texture for shader
│       └── sw.js                 # Service Worker (model caching)
```

---

## Setup & Development

### Prerequisites
- Node.js 18+
- Firebase CLI (`npm install -g firebase-tools`)

### Install & Run
```bash
npm install
npm run dev        # Start dev server at localhost:5173
```

### Build & Deploy
```bash
npm run build      # Build to dist/
firebase deploy    # Deploy to Firebase Hosting
```

### AR Testing
- Open `http://localhost:5173/ar/?item=biryani` on your phone (same network)
- Or deploy and test at the live URL
- Supported URL params: `?item=biryani`, `?item=butter-chicken`, `?item=tandoori`, `?item=naan`, `?item=paneer`, `?item=haleem`, `?item=dosa`

---

## Adding New Food Items

### 1. Add a 3D model
Place the `.glb` file in `public/ar/` and optimize it:
```bash
npx @gltf-transform/cli optimize new-dish.glb new-dish-opt.glb \
  --texture-compress webp --texture-size 1024 --simplify --simplify-ratio 0.3
```

### 2. Update AR config
In `public/ar/index.html`, add to `ITEM_CONFIG`:
```js
'new-dish': { model: '/ar/new-dish.glb', plate: '/ar/plate.glb', plateScale: 2.0, foodScale: 2.0, foodY: 0 },
```

### 3. Update menu data
In `src/data/menu.js`, add the item to the appropriate category.

### 4. Update Service Worker cache
In `public/ar/sw.js`, add the new model to `PRECACHE` array and bump `CACHE_NAME`.

---

## Restaurant Info

| | |
|---|---|
| **Name** | Hyderabad Hosts - Multi-Cuisine Restaurant |
| **Since** | 2004 (21+ years) |
| **Address** | 1-98/90/22/1, Ground Floor, Madhapur Main Road, Opp. Fortune Towers, Metro Pillar No. 1735, Hi-Tech City, Hyderabad - 500 081 |
| **Phone** | +91 98 4999 1664, +91 91 6000 2000 |
| **Hours** | 11:30 AM - 11:45 PM, 7 days |
| **Cuisine** | Hyderabadi, Chinese, Mughlai, North Indian, Kebab |
| **Halal** | Yes, certified |
| **Instagram** | [@hyderabadhosts.restaurant](https://instagram.com/hyderabadhosts.restaurant) |

---

## License

This project was built as a portfolio/pitch project. All restaurant data belongs to Hyderabad Hosts.
