import { useState, useEffect, useRef } from "react";
import { MENU, SPECIALTIES, GALLERY } from "./data/menu";

const SWIGGY = "https://www.swiggy.com/restaurants/hyderabad-hosts-madhapur-hyderabad-349758";
const ZOMATO = "https://www.zomato.com/hyderabad/hyderabad-hosts-2-madhapur";
const PHONE1 = "tel:+919849991664";
const PHONE2 = "tel:+919160002000";
const INSTAGRAM = "https://instagram.com/hyderabadhosts.restaurant";
const MAPS_EMBED = "https://maps.google.com/maps?q=Hyderabad+Hosts+Madhapur+Main+Road+Opposite+Fortune+Towers+Hi-Tech+City+Hyderabad&t=&z=17&ie=UTF8&iwloc=&output=embed";
const MAPS_DIR = "https://www.google.com/maps/dir/?api=1&destination=17.448294,78.391487";
const AR_URL = "/ar/";
const MENU_TABS = ["mandi", "biryani", "rice-noodles", "desserts"];

function Icon({ name, className = "", fill }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={fill ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" } : undefined}
    >
      {name}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   NAVBAR — Mobile: simple top bar | Desktop: full nav
   ═══════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Home", "#"],
    ["About", "#about"],
    ["Menu", "#menu"],
    ["AR Menu", "#ar-menu"],
    ["Gallery", "#gallery"],
    ["Location", "#location"],
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-surface/90 backdrop-blur-md shadow-[0px_12px_32px_rgba(61,43,31,0.08)]" : "md:bg-transparent bg-background/80 backdrop-blur-md"}`}>
      <div className="flex justify-between items-center px-6 md:px-8 h-16 max-w-7xl mx-auto w-full">
        {/* Mobile: hamburger */}
        <button className="md:hidden text-primary hover:scale-105 transition-transform" onClick={() => setMobileOpen(!mobileOpen)}>
          <Icon name={mobileOpen ? "close" : "menu"} />
        </button>

        <a href="#" className="text-xl font-bold font-headline text-primary tracking-tighter md:text-2xl">
          <span className="md:hidden">HYDERABAD HOSTS</span>
          <span className="hidden md:inline">Hyderabad Hosts</span>
        </a>

        {/* Mobile: cart icon */}
        <button className="md:hidden text-primary hover:scale-105 transition-transform">
          <Icon name="shopping_bag" />
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">
              {label}
            </a>
          ))}
          <a href={SWIGGY} target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:scale-105 transition-all shadow-md text-sm">
            Order Now
          </a>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="md:hidden bg-surface/98 backdrop-blur-xl border-t border-outline-variant/20 px-6 pb-6">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMobileOpen(false)} className="block py-3 text-on-surface font-medium border-b border-outline-variant/10 font-label text-sm tracking-wide">
              {label}
            </a>
          ))}
          <a href={SWIGGY} target="_blank" rel="noopener noreferrer" className="block mt-4 bg-primary text-white px-6 py-3 rounded-lg font-bold text-center font-label text-xs tracking-widest uppercase">
            Order Now
          </a>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════
   BOTTOM NAV — Mobile only
   ═══════════════════════════════════════════════ */
function BottomNav() {
  const items = [
    { icon: "history_edu", label: "Heritage", href: "#about" },
    { icon: "restaurant_menu", label: "Menu", href: "#menu" },
    { icon: "view_in_ar", label: "AR Menu", href: "#ar-menu" },
    { icon: "auto_awesome", label: "Order", href: SWIGGY, external: true },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-surface/90 backdrop-blur-lg rounded-t-3xl border-t border-outline/15 shadow-[0px_-8px_24px_rgba(61,43,31,0.06)]">
      {items.map((item, i) => (
        <a
          key={item.label}
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          className={`flex flex-col items-center justify-center transition-colors ${i === 0 ? "text-primary bg-surface-container rounded-xl px-4 py-1" : "text-secondary hover:text-primary"}`}
        >
          <Icon name={item.icon} />
          <span className="text-[10px] font-semibold tracking-wide font-label mt-1">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════
   HERO — Mobile: full-bleed image bg | Desktop: side-by-side
   ═══════════════════════════════════════════════ */
function Hero() {
  return (
    <header className="relative min-h-screen flex items-end md:items-center justify-center pt-16 overflow-hidden">
      {/* Mobile: full-bleed background image */}
      <div className="md:hidden absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA23SJ7Xxgscomlik-muFD-aVpJxwI4_elZk4PoC_EHzDhFPsdF_oxw0-qCuPdZv4zRpsOFp0VeSaPN3xeGLHBvEvKyhymDcz8S0kwEe2z7tYuJpvrP60Y1kJ92e3A32KoTcwO7OfA_3dE5oiTsoNXGYBj__cH7yYOKYP-a1a1UFe5G8zn8lzAyTW2dbBg3xB02OyAWJEwmvT3g4-AKBNU_6p8m3-yFfI7pNly-4GtK_sxfKSIPsuSoLPH3xaVKNUlT9mSC3dOMrrc"
          alt="Hyderabadi Biryani"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 islamic-pattern opacity-30" />
      </div>

      {/* Desktop: cream bg with pattern */}
      <div className="hidden md:block absolute inset-0 islamic-pattern bg-[#f8f2e8]/80" />

      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text content */}
        <div className="text-left pb-12 md:pb-0">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary-container/30 px-3 py-1 rounded-full mb-6">
            <Icon name="verified" className="text-primary-container text-sm" fill />
            <span className="text-[10px] font-bold tracking-[0.2em] text-primary-container uppercase font-label">Since 2004</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold md:font-black leading-tight mb-4 tracking-tighter font-headline">
            <span className="text-white md:text-on-surface">HYDERABAD</span><br />
            <span className="text-primary-container md:text-primary italic">HOSTS</span>
          </h1>

          <p className="text-surface-container-low/90 md:text-secondary text-lg md:text-2xl leading-relaxed max-w-xs md:max-w-none mb-8 md:font-light md:italic">
            <span className="md:hidden">Experience the royal culinary legacy of the Nizams in the heart of the city.</span>
            <span className="hidden md:inline">&ldquo;A Little more than your Expectations&rdquo;</span>
          </p>

          {/* Mobile buttons: stacked */}
          <div className="flex flex-col md:flex-row gap-4 md:flex-wrap md:items-center mb-8 md:mb-10">
            <a href={SWIGGY} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto py-4 md:px-10 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-bold text-sm md:text-lg tracking-widest md:tracking-normal uppercase md:normal-case font-label md:font-body shadow-lg text-center active:scale-95 md:hover:scale-105 transition-all">
              Order Now
            </a>
            <a href="#menu" className="w-full md:w-auto py-4 md:px-10 border border-primary-container/50 md:border-outline text-primary-container md:text-primary bg-surface/5 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-xl font-bold text-sm md:text-lg tracking-widest md:tracking-normal uppercase md:normal-case font-label md:font-body text-center active:scale-95 transition-all md:hover:bg-white">
              View Menu
            </a>
          </div>

          <div className="inline-flex items-center gap-3 bg-white/50 md:bg-white/50 backdrop-blur px-5 py-2 rounded-full border border-tertiary/20 shadow-sm">
            <Icon name="verified" className="text-tertiary" fill />
            <span className="font-bold text-tertiary tracking-wide uppercase text-sm">Halal Certified</span>
          </div>
        </div>

        {/* Desktop: hero image */}
        <div className="hidden md:block relative group">
          <div className="absolute -inset-4 bg-primary/10 rounded-[2rem] rotate-3 blur-2xl group-hover:rotate-6 transition-transform" />
          <img
            src="/biryani-hero.png"
            alt="Signature Hyderabadi Biryani"
            className="relative z-10 w-full h-[500px] object-cover rounded-[2rem] shadow-2xl border-4 border-white"
          />
          <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-surface-container">
            <div className="text-primary font-black text-4xl leading-none">21+</div>
            <div className="text-secondary text-sm font-bold tracking-widest uppercase">Years of Flavor</div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════
   ABOUT — Mobile: single col + border-left cards | Desktop: centered
   ═══════════════════════════════════════════════ */
function About() {
  const stats = [
    { val: "21+", label: "Years of Heritage" },
    { val: "3342+", label: "Google Reviews" },
    { val: "7 Days", label: "Authentic Service" },
    { val: "100%", label: "Halal Selection" },
  ];

  return (
    <section className="py-16 md:py-24 bg-surface md:bg-surface-container" id="about">
      <div className="max-w-4xl mx-auto px-6">
        {/* Mobile label */}
        <span className="md:hidden text-primary font-label text-[10px] font-bold tracking-[0.3em] uppercase block mb-2">The Legacy</span>

        {/* Desktop divider */}
        <div className="hidden md:flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-12 bg-primary" />
          <Icon name="star" className="text-primary" />
          <div className="h-[1px] w-12 bg-primary" />
        </div>

        <h2 className="text-3xl md:text-5xl font-bold font-headline text-on-surface mb-4 md:mb-8 md:text-center">
          <span className="md:hidden">A Journey Through Time</span>
          <span className="hidden md:inline">The Legacy of Nizam&rsquo;s Heritage</span>
        </h2>

        <p className="text-secondary leading-relaxed mb-12 md:mb-16 md:text-center md:text-lg">
          Founded in 2004, Hyderabad Hosts was born from a passion to preserve the royal culinary traditions of the Deccan.
          For over two decades, we have been curators of authentic flavors, blending ancient recipes with modern hospitality.
        </p>

        {/* Mobile: 2-col with border-left | Desktop: 4-col */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="p-6 bg-surface-container md:bg-surface rounded-3xl md:rounded-2xl shadow-sm border-l-4 md:border-l-0 border-primary md:border md:border-outline-variant/10">
              <div className="text-3xl font-bold md:font-black text-primary font-headline mb-2">{s.val}</div>
              <div className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-outline md:text-secondary font-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mobile: restaurant interior image */}
        <div className="md:hidden relative mt-8 rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAIhAXCl78iGcqBQfteYTXo0wcnqEsmQbSZAc_MWE6osFLS8ogrZw11bNHkTHFpViov15eCoI5lCaovo8MiY932EhjnQRh5XWZg1ogXiJhKS9kHo8mrgZ6zv8w3hFF-SpFaNW1n86W-i5tPIZB5wZNHtNZPaKNt-_gkgm-cvNVfgCV1QHVy3V25lJsvahQSuUkMDutUHgUoJhxSNSXLQK5vggR-O3JDnPsUuLnxyD-JCfjcKr18mjVS9iLer0096gLtz0oqCAGZBg"
            alt="Restaurant Interior"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SPECIALTIES CAROUSEL — Mobile: 85% width | Desktop: multi-card
   ═══════════════════════════════════════════════ */
function Specialties() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let id;
    const scroll = () => {
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += 1;
      }
      id = requestAnimationFrame(scroll);
    };
    id = requestAnimationFrame(scroll);
    const pause = () => cancelAnimationFrame(id);
    const resume = () => { id = requestAnimationFrame(scroll); };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);
    return () => {
      cancelAnimationFrame(id);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-surface-container-low md:bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="px-6 mb-8 md:mb-12 flex justify-between items-end">
          <div>
            <span className="text-primary font-label text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase">
              <span className="md:hidden">Signature Dishes</span>
              <span className="hidden md:inline">Chef&rsquo;s Recommendations</span>
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-headline mt-2">
              <span className="md:hidden">The Royal Favorites</span>
              <span className="hidden md:inline">Our Chef&rsquo;s Specialties</span>
            </h2>
          </div>
        </div>

        <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 gap-6 pb-8">
          {[...SPECIALTIES, ...SPECIALTIES].map((item, i) => (
            <div key={i} className="min-w-[85%] md:min-w-[400px] snap-center shrink-0 group space-y-4">
              <div className="relative rounded-[2.5rem] md:rounded-3xl overflow-hidden aspect-square md:aspect-auto md:h-[450px] shadow-xl">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex justify-between items-end mb-2">
                    <h3 className="text-xl md:text-2xl font-bold font-headline text-white">{item.name}</h3>
                    <span className="text-primary-fixed font-bold text-xl md:text-2xl shrink-0">&nbsp;&#8377;{item.price}</span>
                  </div>
                  <p className="text-white/70 text-sm italic line-clamp-2 mb-3">{item.desc}</p>
                  <a href={`/ar/?item=${item.arItem}`} className="inline-flex items-center gap-2 text-primary-fixed hover:underline font-bold text-sm font-label">
                    <Icon name="view_in_ar" className="text-sm" /> View in 3D
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MENU — Mobile: list style | Desktop: card grid
   ═══════════════════════════════════════════════ */
function MenuSection() {
  const [activeTab, setActiveTab] = useState("mandi");
  const [loading, setLoading] = useState(false);

  const switchTab = (tab) => {
    if (tab === activeTab) return;
    setLoading(true);
    setActiveTab(tab);
    setTimeout(() => setLoading(false), 300);
  };

  const category = MENU[activeTab];

  return (
    <section className="py-16 md:py-24 bg-surface md:bg-surface-container-low" id="menu">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold font-headline mb-6 md:mb-4 md:text-center">Explore Our Menu</h2>
        <p className="hidden md:block text-secondary max-w-2xl mx-auto text-center mb-16">From the spice-rich kitchens of the Nizams to the soul-satisfying Arabian deserts.</p>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-3 md:gap-4 md:justify-center mb-8 md:mb-12 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap">
          {MENU_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              className={`whitespace-nowrap px-6 py-2 md:py-3 md:px-8 rounded-full font-label text-[10px] md:text-base font-bold tracking-widest md:tracking-normal uppercase md:normal-case transition-all shrink-0 ${
                activeTab === tab
                  ? "bg-primary text-white shadow-lg"
                  : "border border-outline-variant text-secondary md:bg-white md:text-on-surface-variant hover:bg-primary/10"
              }`}
            >
              {MENU[tab].name}
            </button>
          ))}
        </div>

        {/* Skeleton */}
        {loading ? (
          <div className="space-y-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:space-y-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                {/* Mobile skeleton */}
                <div className="md:hidden flex justify-between mb-2">
                  <div className="h-5 bg-surface-container rounded w-2/3" />
                  <div className="h-5 bg-surface-container rounded w-16" />
                </div>
                <div className="md:hidden h-3 bg-surface-container rounded w-full mb-2" />
                <div className="md:hidden w-full h-px bg-outline-variant/15 mt-4" />
                {/* Desktop skeleton */}
                <div className="hidden md:block bg-surface p-6 rounded-3xl border border-outline-variant/10">
                  <div className="flex justify-between mb-4">
                    <div className="h-6 bg-surface-container rounded w-2/3" />
                    <div className="h-6 bg-surface-container rounded w-16" />
                  </div>
                  <div className="h-4 bg-surface-container rounded w-full mb-2" />
                  <div className="h-4 bg-surface-container rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Mobile: list view */}
            <div className="md:hidden space-y-6">
              {category.items.map((item) => {
                const priceEntries = Object.entries(item.prices);
                const minPrice = Math.min(...Object.values(item.prices));
                return (
                  <div key={item.name}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="space-y-1 flex-1 mr-4">
                        <div className="flex items-center gap-2">
                          <h5 className="text-lg font-bold font-headline">{item.name}</h5>
                          {item.veg ? (
                            <span className="w-2 h-2 rounded-full bg-tertiary" title="Veg" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-error" title="Non-Veg" />
                          )}
                        </div>
                        {priceEntries.length > 1 && (
                          <div className="flex flex-wrap gap-1">
                            {priceEntries.map(([label, price]) => (
                              <span key={label} className="text-[10px] text-secondary">{label}: &#8377;{price}</span>
                            ))}
                          </div>
                        )}
                        {item.tag && (
                          <span className="text-[10px] font-bold tracking-widest uppercase text-tertiary font-label">{item.tag}</span>
                        )}
                      </div>
                      <span className="text-primary font-bold shrink-0">
                        &#8377;{priceEntries.length > 1 ? `${minPrice}+` : minPrice}
                      </span>
                    </div>
                    <div className="w-full h-px bg-outline-variant/15" />
                  </div>
                );
              })}
            </div>

            {/* Desktop: card grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item) => {
                const priceEntries = Object.entries(item.prices);
                const minPrice = Math.min(...Object.values(item.prices));
                return (
                  <div key={item.name} className="bg-surface p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-outline-variant/10">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        {item.veg && (
                          <span className="w-4 h-4 border-2 border-tertiary rounded-sm flex items-center justify-center">
                            <span className="w-2 h-2 bg-tertiary rounded-full" />
                          </span>
                        )}
                        <h4 className="text-lg font-bold font-headline">{item.name}</h4>
                      </div>
                      <span className="text-primary font-black whitespace-nowrap">
                        {priceEntries.length > 1 ? `\u20B9${minPrice}+` : `\u20B9${minPrice}`}
                      </span>
                    </div>
                    {priceEntries.length > 1 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {priceEntries.map(([label, price]) => (
                          <span key={label} className="text-xs bg-surface-container px-2 py-1 rounded-full text-on-surface-variant">
                            {label}: &#8377;{price}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.tag && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="w-2 h-2 rounded-full bg-tertiary" />
                        <span className="text-[10px] uppercase tracking-widest font-bold text-tertiary">{item.tag}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="mt-12 md:mt-16 text-center">
          <a href="/ar/menu.html" className="inline-flex items-center gap-3 text-primary font-bold hover:gap-5 transition-all font-label text-xs md:text-base tracking-widest md:tracking-normal uppercase md:normal-case">
            View AR Menu QR Cards <Icon name="qr_code" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   AR EXPERIENCE — Mobile: compact card | Desktop: full section
   ═══════════════════════════════════════════════ */
function ARExperience() {
  return (
    <section id="ar-menu">
      {/* Mobile: compact dark card */}
      <div className="md:hidden px-6 py-12">
        <div className="bg-on-surface rounded-[2rem] p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 islamic-pattern opacity-10" />
          <div className="relative z-10 space-y-6">
            <div className="w-12 h-12 bg-primary-container rounded-2xl flex items-center justify-center text-on-primary-container">
              <Icon name="view_in_ar" />
            </div>
            <h3 className="text-2xl font-bold font-headline text-white leading-tight">See Your Dish<br />in 3D</h3>
            <p className="text-surface-variant text-sm leading-relaxed">Experience our royal platters in Augmented Reality before you order.</p>
            <a href={AR_URL} className="inline-flex items-center gap-3 text-primary-container font-label text-[10px] font-bold tracking-widest uppercase">
              Launch AR Experience <Icon name="arrow_forward" className="text-sm" />
            </a>
          </div>
        </div>
      </div>

      {/* Desktop: full two-col section */}
      <div className="hidden md:block py-24 bg-[#3d2b1f] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full islamic-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary-container font-bold tracking-widest uppercase text-sm">The Future of Dining</span>
            <h2 className="text-5xl md:text-6xl font-headline mt-4 mb-8">
              See Your Dish <br /> <span className="text-primary-container italic">in 3D</span>
            </h2>
            <p className="text-stone-400 text-lg leading-relaxed mb-10">
              Why just look at a menu when you can see the actual dish on your table? Use our AR menu to visualize textures,
              portion sizes, and presentation before you order.
            </p>
            <div className="flex flex-col gap-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Icon name="qr_code_scanner" className="text-primary-container" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Scan the QR</h4>
                  <p className="text-stone-500">Available at every table or on our website.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Icon name="view_in_ar" className="text-primary-container" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Visualize in AR</h4>
                  <p className="text-stone-500">Place the 3D model right on your tabletop.</p>
                </div>
              </div>
            </div>
            <a href={AR_URL} className="inline-flex bg-primary-container text-stone-900 px-8 py-4 rounded-xl font-bold items-center gap-3 hover:scale-105 transition-transform">
              Try AR Menu Now <Icon name="rocket_launch" />
            </a>
          </div>
          <div className="relative">
            <img
              src="/biryani-hero.png"
              alt="Delicious Mutton Biryani - AR Experience"
              className="rounded-[3rem] shadow-2xl border-8 border-stone-800 w-full object-cover aspect-[4/5]"
              loading="lazy"
            />
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-primary-container rounded-full flex flex-col items-center justify-center text-stone-900 animate-pulse">
              <Icon name="view_in_ar" className="text-4xl" />
              <span className="text-xs font-black uppercase mt-1">Immersive</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   GALLERY — Desktop only (hidden on mobile for cleaner feel)
   ═══════════════════════════════════════════════ */
function GallerySection() {
  return (
    <section className="hidden md:block py-24 bg-surface" id="gallery">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-headline">Our Kitchen&rsquo;s Pride</h2>
          <div className="mt-4 flex justify-center items-center gap-3">
            <div className="h-[1px] w-8 bg-outline" />
            <span className="text-secondary font-bold tracking-widest text-xs uppercase italic">A visual journey through flavor</span>
            <div className="h-[1px] w-8 bg-outline" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY.map((img, i) => (
            <div key={i} className={`${img.span || ""} relative overflow-hidden rounded-3xl group ${!img.span ? "h-64" : ""}`}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   LOCATION — Mobile: compact | Desktop: two-col with map
   ═══════════════════════════════════════════════ */
function Location() {
  return (
    <section className="py-16 md:py-24 bg-surface-container" id="location">
      <div className="max-w-7xl mx-auto px-6">
        {/* Mobile label */}
        <span className="md:hidden text-primary font-label text-[10px] font-bold tracking-[0.3em] uppercase block mb-2">Visit Us</span>

        <div className="md:grid md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-8">
              <span className="md:hidden">The Heritage Manor</span>
              <span className="hidden md:inline">Visit the Heritage</span>
            </h2>

            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start gap-4 md:gap-6">
                <div className="mt-1 w-8 h-8 md:w-14 md:h-14 rounded-full md:rounded-2xl bg-primary/10 md:bg-white md:shadow-sm flex items-center justify-center text-primary shrink-0">
                  <Icon name="location_on" className="text-lg md:text-2xl" />
                </div>
                <div>
                  <p className="text-on-surface font-semibold md:text-xl md:mb-1">Our Location</p>
                  <p className="text-sm text-secondary">1-98/90/22/1, Ground Floor, Madhapur Main Road,<br />Opposite Fortune Towers, Metro Pillar No. 1735,<br />Hi-Tech City, Hyderabad - 500 081</p>
                </div>
              </div>
              <div className="flex items-start gap-4 md:gap-6">
                <div className="mt-1 w-8 h-8 md:w-14 md:h-14 rounded-full md:rounded-2xl bg-primary/10 md:bg-white md:shadow-sm flex items-center justify-center text-primary shrink-0">
                  <Icon name="call" className="text-lg md:text-2xl" />
                </div>
                <div>
                  <p className="text-on-surface font-semibold md:text-xl md:mb-1">Reservations</p>
                  <a href={PHONE1} className="text-sm text-secondary hover:text-primary block">+91 98 4999 1664</a>
                  <a href={PHONE2} className="text-sm text-secondary hover:text-primary block">+91 91 6000 2000</a>
                  <p className="text-[10px] md:text-xs text-primary font-bold mt-1 uppercase tracking-widest font-label">Call or WhatsApp</p>
                </div>
              </div>
              <div className="flex items-start gap-4 md:gap-6">
                <div className="mt-1 w-8 h-8 md:w-14 md:h-14 rounded-full md:rounded-2xl bg-primary/10 md:bg-white md:shadow-sm flex items-center justify-center text-primary shrink-0">
                  <Icon name="schedule" className="text-lg md:text-2xl" />
                </div>
                <div>
                  <p className="text-on-surface font-semibold md:text-xl md:mb-1">Open Daily</p>
                  <p className="text-sm text-secondary">11:30 AM &mdash; 11:45 PM</p>
                </div>
              </div>
            </div>

            {/* Mobile: CTA button */}
            <a href={PHONE1} className="md:hidden mt-8 w-full py-5 bg-on-surface text-surface flex items-center justify-center gap-3 rounded-2xl font-label text-xs font-bold tracking-widest uppercase active:scale-95 transition-all">
              <Icon name="call" /> Reserve a Table
            </a>

            {/* Desktop: directions + event card */}
            <div className="hidden md:block">
              <div className="mt-12 flex gap-4">
                <a href={MAPS_DIR} target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform inline-flex items-center gap-2">
                  <Icon name="directions" /> Get Directions
                </a>
              </div>
              <div className="mt-8 p-8 bg-primary rounded-3xl text-white">
                <h4 className="text-2xl font-headline mb-4">Hosting an Event?</h4>
                <p className="mb-6 opacity-80">We offer premium catering for weddings, corporate events, and private parties.</p>
                <a href={PHONE1} className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:bg-surface transition-colors inline-block">Inquire Now</a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-8 md:mt-0 h-48 md:h-[600px] rounded-3xl md:rounded-[2rem] overflow-hidden shadow-inner md:shadow-2xl md:border-4 md:border-white">
            <iframe
              src={MAPS_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hyderabad Hosts Location"
              className="md:grayscale-0 grayscale contrast-125 opacity-80 md:opacity-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="pb-28 md:pb-16 pt-12 md:pt-16 px-6 md:px-8 bg-surface-container md:bg-stone-900 md:text-stone-100">
      {/* Mobile footer */}
      <div className="md:hidden flex flex-col items-center text-center space-y-6">
        <div className="text-2xl italic font-headline text-primary tracking-tighter">Hyderabad Hosts</div>
        <nav className="flex flex-wrap justify-center gap-6">
          {["Menu", "AR Menu", "Location", "Careers"].map((l) => (
            <a key={l} href="#" className="text-secondary font-label text-sm uppercase tracking-widest hover:text-primary">{l}</a>
          ))}
        </nav>
        <div className="flex gap-6">
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"><Icon name="photo_camera" className="text-primary cursor-pointer" /></a>
          <a href={ZOMATO} target="_blank" rel="noopener noreferrer"><Icon name="restaurant" className="text-primary cursor-pointer" /></a>
          <a href={SWIGGY} target="_blank" rel="noopener noreferrer"><Icon name="delivery_dining" className="text-primary cursor-pointer" /></a>
        </div>
        <p className="text-secondary text-[10px] font-label tracking-widest">&copy; 2004-2026 Hyderabad Hosts. All Rights Reserved.</p>
      </div>

      {/* Desktop footer */}
      <div className="hidden md:block max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-12">
          <div>
            <div className="text-2xl font-headline text-yellow-500 mb-6">Hyderabad Hosts</div>
            <p className="text-stone-400 text-sm leading-relaxed mb-8">Bringing the royal flavors of Hyderabad to your table since 2004.</p>
            <div className="flex gap-4">
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center hover:border-yellow-500 hover:text-yellow-500 transition-colors"><Icon name="photo_camera" className="text-sm" /></a>
              <a href={ZOMATO} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center hover:border-yellow-500 hover:text-yellow-500 transition-colors"><Icon name="restaurant" className="text-sm" /></a>
              <a href={SWIGGY} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center hover:border-yellow-500 hover:text-yellow-500 transition-colors"><Icon name="delivery_dining" className="text-sm" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-yellow-600 mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {[["Menu", "#menu"], ["AR Menu", "#ar-menu"], ["Gallery", "#gallery"], ["Location", "#location"]].map(([label, href]) => (
                <li key={label}><a href={href} className="text-stone-400 hover:text-stone-100 transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-yellow-600 mb-8">Contact</h4>
            <p className="text-stone-400 text-sm mb-4">Madhapur Main Road, Opp. Fortune Towers,<br />Hi-Tech City, Hyderabad - 500 081</p>
            <a href={PHONE1} className="text-stone-400 hover:text-yellow-500 block mb-1">+91 98 4999 1664</a>
            <a href={PHONE2} className="text-stone-400 hover:text-yellow-500 block mb-4">+91 91 6000 2000</a>
            <p className="text-stone-500 text-sm">Mon - Sun: 11:30 AM - 11:45 PM</p>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-stone-800 text-center">
          <p className="text-stone-500 text-xs tracking-widest uppercase">&copy; 2004-2026 Hyderabad Hosts. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Specialties />
        <MenuSection />
        <ARExperience />
        <GallerySection />
        <Location />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
