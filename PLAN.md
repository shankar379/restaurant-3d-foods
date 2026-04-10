# Hyderabad Hosts - Restaurant Website Plan

## Context
Building a premium React + Vite website for **Hyderabad Hosts**, a multi-cuisine restaurant in Madhapur, Hyderabad (since 2004, 21+ years). The current project only has static AR pages on Firebase Hosting. The website should match the restaurant's cream/gold/Islamic aesthetic from their menu card, with auto-scrolling food cards, skeleton loading, and all real restaurant data.

---

## Design System

### Colors (from menu image)
- Background: `#f2e8d8` (warm cream), `#f8f2e8` (light cream)
- Gold accent: `#c9a227`, `#d4b44a` (light gold)
- Text: `#3d2b1f` (dark brown), `#5c4033` (light brown)
- Green accent: `#2ecc71` (veg badges, prices)

### Typography (Google Fonts)
- Headings: **Playfair Display** (serif, elegant — matches the menu's ornate style)
- Body: **Montserrat** (clean sans-serif)

### Pattern
- Islamic geometric star patterns as SVG overlays (matching menu card's gold lattice design)

---

## Tech Stack
- **React 18** + **Vite**
- **Tailwind CSS v4** (CSS-first config with `@theme`)
- **Framer Motion** (scroll animations, tab transitions, stagger effects)
- **Embla Carousel** + autoplay plugin (auto-scrolling food cards)
- **react-intersection-observer** (scroll spy, lazy reveals)
- Firebase Hosting (deploy `dist/`)

---

## Restaurant Data (verified from menu image + internet research)

| Field | Value |
|-------|-------|
| Name | Hyderabad Hosts - Multi-Cuisine Restaurant |
| Tagline | "A Little more than your Expectations" |
| Since | 2004 (Celebrating 21 years) |
| Halal | Yes |
| Phone | 98 4999 1664, 91 6000 2000 |
| Address | 1-98/90/22/1, Ground Floor, Madhapur Main Road, Opposite Fortune Towers, Metro Pillar No. 1735, Hi-Tech City, Hyderabad - 500 081 |
| Hours | 11:30 AM - 11:45 PM, 7 days |
| Rating | 3.7/5 (3342+ reviews) |
| Price for two | ~Rs 850 |
| Coords | 17.448294, 78.391487 |
| Instagram | @hyderabadhosts.restaurant |
| Zomato | zomato.com/hyderabad/hyderabad-hosts-2-madhapur |
| Swiggy | swiggy.com/restaurants/hyderabad-hosts-madhapur-hyderabad-349758 |
| Cuisines | Hyderabadi, Chinese, Mughlai, North Indian, Kebab |

---

## Website Sections (top to bottom)

### 1. Navbar (sticky)
- Transparent on hero → solid cream with shadow on scroll
- Links: Home, About, Menu, AR Menu, Gallery, Location
- Right side: Phone click-to-call + "Order Now" gold button → Swiggy/Zomato
- Mobile: hamburger → full-screen overlay

### 2. Hero (full viewport)
- Cream gradient background + Islamic geometric SVG pattern overlay
- "Since 2004" badge top
- "HYDERABAD HOSTS" large Playfair Display heading
- "Multi-Cuisine Restaurant" subtitle
- Tagline in italic
- CTA buttons: "View Menu" (scroll) + "Order Now" (Swiggy link)
- Halal badge + cuisine tags
- Scroll-down animated chevron
- Framer Motion staggered fade-in

### 3. About
- 21-year legacy story, halal certified, multi-cuisine
- Animated stat counters (useInView): 21+ Years, 3342+ Reviews, 7 Days/Week, Halal
- Islamic geometric divider

### 4. Specialties Carousel (auto-scrolling)
- **Embla Carousel** with autoplay plugin (3s interval, pause on hover)
- 6-8 featured dishes as cards (cream bg, gold border hover)
- Each card: color gradient placeholder for image, dish name, price, "View in AR" link
- Responsive: 1 card mobile / 2 tablet / 3 desktop
- Navigation dots below

### 5. Full Menu (tabbed)
- Horizontal scrollable tabs: Arabian Mandi | Biryani | Rice & Noodles | Desserts
- Active tab: gold underline with Framer Motion `layoutId` slide
- Grid of MenuCard components (3 cols desktop, 2 tablet, 1 mobile)
- **Skeleton loading**: 300ms simulated delay on tab switch → pulse skeleton cards → fade in real cards
- MenuCard handles both single price AND multi-variant items (expandable)
- All items from the actual menu image (full data)

### 6. AR Experience (promo section)
- Dark brown/gold gradient background (stands out)
- "See Your Dish in 3D" headline
- Description + "Try AR Menu" CTA → links to `/ar/`
- Phone mockup SVG showing AR concept

### 7. Gallery
- "Our Kitchen's Pride" heading
- 3-col masonry grid (placeholder gradient images until real photos added)
- Hover overlay with dish name
- Framer Motion scroll reveal

### 8. Location
- Two columns: Google Maps iframe embed + contact info
- Address, phone (click-to-call), hours, "Get Directions" button
- Maps embed with restaurant coordinates

### 9. Footer
- Dark brown bg, cream text
- 3 columns: Quick Links, Contact Info, Social (Instagram, Zomato, Swiggy)
- Copyright: "2004-2026 Hyderabad Hosts"

---

## File Structure

```
hyhosts/
├── index.html                  # Vite entry (Google Fonts, meta, OG tags)
├── vite.config.js
├── package.json
├── firebase.json               # Updated: public → dist
├── .firebaserc                 # Unchanged
├── public/
│   ├── ar/
│   │   ├── index.html          # Preserved AR experience
│   │   └── menu.html           # Preserved AR QR cards
│   └── favicon.svg
├── src/
│   ├── main.jsx
│   ├── index.css               # Tailwind v4 @theme config
│   ├── App.jsx                 # Assembles all sections
│   ├── data/
│   │   ├── restaurant.js       # Brand constants
│   │   └── menu.js             # Full menu data (all items + prices)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Specialties.jsx # Embla auto-scroll carousel
│   │   │   ├── Menu.jsx        # Tabbed menu + skeleton
│   │   │   ├── ARExperience.jsx
│   │   │   ├── Gallery.jsx
│   │   │   └── Location.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── SectionHeading.jsx
│   │       ├── MenuCard.jsx
│   │       ├── MenuSkeleton.jsx
│   │       ├── IslamicPattern.jsx  # SVG geometric pattern
│   │       └── Badge.jsx
│   └── hooks/
│       └── useScrollSpy.js
```

---

## Implementation Order

| Step | Task | Details |
|------|------|---------|
| 1 | **Scaffold** | Move AR files → `public/ar/`, run `npm create vite@latest`, install deps, configure Tailwind v4 |
| 2 | **Data layer** | Create `restaurant.js` + `menu.js` with ALL items from menu image |
| 3 | **Layout shell** | `App.jsx` + `Navbar.jsx` + `Footer.jsx` with basic styling |
| 4 | **UI primitives** | `Button`, `SectionHeading`, `IslamicPattern`, `Badge`, `MenuCard`, `MenuSkeleton` |
| 5 | **Hero section** | Full hero with Framer Motion staggered animations |
| 6 | **About section** | Stats counters, story, Islamic divider |
| 7 | **Menu section** | Tabs + grid + skeleton loading + all menu data |
| 8 | **Specialties carousel** | Embla setup with autoplay |
| 9 | **AR + Gallery + Location** | Remaining sections |
| 10 | **Polish** | Scroll animations, responsive testing, performance |
| 11 | **Deploy** | Update firebase.json → `dist/`, build, deploy |

---

## Critical File Changes

| File | Change |
|------|--------|
| `firebase.json` | Change `"public": "public"` → `"public": "dist"`, add AR rewrite before SPA catch-all |
| `public/index.html` → `public/ar/index.html` | Move existing AR page |
| `public/menu.html` → `public/ar/menu.html` | Move existing QR page |

---

## Verification Plan
1. `npm run dev` → check all sections render, scroll nav works, carousel auto-scrolls
2. Click all nav links → smooth scroll to correct sections
3. Switch menu tabs → skeleton shows then items appear
4. Visit `/ar/` → existing AR experience still works
5. Visit `/ar/menu.html` → QR cards still render
6. Mobile responsive test (Chrome DevTools)
7. `npm run build` → dist/ has all files
8. `firebase deploy` → live site works at d-model-page.web.app
