import { Check } from 'lucide-react'

// ── Copy & data ───────────────────────────────────────────────────────────────

const LAWN_MAINTENANCE = {
  title: 'Lawn & Property Maintenance',
  slug: 'lawn-care-maintenance',
  intro: "The foundation of a great-looking property is consistent, expert maintenance — and that's exactly what we deliver.",
  image: '/svc_lawn_care.png',
  items: [
    { title: 'Weekly & Bi-Weekly Mowing',  desc: 'Precision cuts that keep your lawn at the ideal height all season long.' },
    { title: 'Spring & Fall Cleanups',      desc: 'We prepare your property for each season — no detail overlooked.' },
    { title: 'Mulch & Bed Care',            desc: 'Fresh mulch and clean beds that frame your landscaping perfectly.' },
    { title: 'Shrub & Plant Pruning',       desc: 'Structured growth and clean shape for every plant on your property.' },
    { title: 'Ongoing Touch-Ups',           desc: 'Flexible hourly care whenever your property needs extra attention.' },
  ],
}

const LAWN_HEALTH = {
  title: 'Lawn Health & Restoration',
  slug: 'lawn-health-irrigation',
  intro: 'A beautiful lawn starts below the surface. Our science-backed programs restore, strengthen, and protect your turf year after year.',
  image: '/svc_irrigation.png',
  items: [
    { title: 'Aeration & Overseeding',   desc: 'Break through compaction and introduce new seed for a denser, healthier lawn.' },
    { title: 'Fertilization Programs',   desc: 'Seasonal nutrient plans tailored to your soil and grass type.' },
    { title: 'Weed Control',             desc: 'Pre- and post-emergent treatments that keep weeds from taking over.' },
    { title: 'Irrigation Systems',       desc: 'Smart watering solutions that protect your investment and reduce waste.' },
    { title: 'Drainage Solutions',       desc: 'Fix pooling and runoff issues before they damage your lawn and foundation.' },
  ],
}

const LANDSCAPE_DESIGN = {
  title: 'Landscape Design & Installation',
  slug: 'landscape-design-installation',
  intro: 'Ready to take your property from ordinary to outstanding? Our design and installation team brings your vision to life — from the first sketch to the final plant.',
  image: '/svc_landscape_design.png',
  items: [
    { title: 'Sod Installation & Hydroseeding', desc: 'Instant or gradual — we match the solution to your timeline and budget.' },
    { title: 'Planting & Garden Design',         desc: 'Curated plantings that look beautiful and thrive in New England conditions.' },
    { title: 'Irrigation Systems',               desc: 'Efficient watering built in from the start.' },
    { title: 'Outdoor Lighting',                 desc: 'Landscape lighting that highlights your best features after dark.' },
    { title: 'Drainage Solutions',               desc: 'Smart grading and drainage that protects the investment you just made.' },
  ],
}

const HARDSCAPE = {
  title: 'Hardscape Services',
  slug: 'hardscape-services',
  intro: "Great outdoor spaces don't just happen — they're engineered. Our hardscape team designs and builds patios, walkways, retaining walls, and outdoor living areas built for New England winters and crafted to last generations.",
  image: '/svc_hardscape.png',
  items: [
    { title: 'Patios & Walkways',      desc: 'Natural stone or premium pavers — we build surfaces that anchor your outdoor space.' },
    { title: 'Retaining Walls',        desc: 'Structural and beautiful, our walls manage grade changes while defining your landscape.' },
    { title: 'Fire Pits & Fireplaces', desc: 'Gathering spots your family will use from spring through late fall.' },
    { title: 'Stone Steps & Stairs',   desc: 'Safe, elegant transitions between your landscape levels.' },
    { title: 'Hardscape Repair',       desc: 'Restore settled, cracked, or aging stonework to like-new condition.' },
  ],
}

const SNOW = {
  title: 'Snow & Ice Management',
  slug: 'snow-ice-management',
  intro: 'When winter hits the South Shore, we show up — every time. Our snow and ice management programs keep your property safe, accessible, and protected throughout the season.',
  image: '/svc_snow_removal.png',
  items: [
    { title: 'Reliable Plowing',          desc: 'Prompt response after every storm to keep driveways and parking areas clear.' },
    { title: 'Walkway Clearing',          desc: 'Thorough shoveling and clearing so entries and paths are always safe.' },
    { title: 'Ice Control Treatments',    desc: 'Pre- and post-storm treatments that prevent dangerous ice formation.' },
  ],
}

// ── Shared micro-components ───────────────────────────────────────────────────

function ItemList({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.title} className="flex items-start gap-3">
          <Check className="w-5 h-5 text-[#FC8700] shrink-0 mt-[2px]" />
          <span className="text-[15px] text-[#444] leading-relaxed">
            <span className="font-semibold text-[#162557]">{item.title}</span>
            {' '}— {item.desc}
          </span>
        </li>
      ))}
    </ul>
  )
}

function SectionImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    </div>
  )
}

// ── ServicesPage ──────────────────────────────────────────────────────────────

export function ServicesPage() {
  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="bg-primary text-white pt-48 pb-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-archivo tracking-[0.5em] text-secondary uppercase mb-8">Capabilities</p>
            <h1 className="text-5xl md:text-[100px] font-serif mb-12 leading-[0.9] tracking-tight animate-fade-in-up">
              Everything Your <br/>
              <span className="italic text-secondary">Property Needs.</span>
            </h1>
            <p className="text-[18px] md:text-2xl text-white/60 leading-relaxed font-sans font-light animate-fade-in-up [animation-delay:200ms]">
              From weekly maintenance to complete landscape transformations, we serve South Shore families with the precision and consistency your home deserves.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none" aria-hidden="true">
          <img src="/svc_lawn_care.png" className="w-full h-full object-cover grayscale" alt="" />
        </div>
      </section>

      {/* ── SERVICES SECTION ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">

          {/* Section headline */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-[32px] md:text-[40px] font-semibold text-[#162557] leading-tight">
              Everything Your Property Needs. Nothing It Doesn't.
            </h2>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              1. LAWN & PROPERTY MAINTENANCE
              Layout: Text (left) · Image (right)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-24">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-[#162557] mb-4">
                {LAWN_MAINTENANCE.title}
              </h3>
              <p className="text-[15px] md:text-[16px] text-[#555] leading-[1.7] mb-8">
                {LAWN_MAINTENANCE.intro}
              </p>
              <ItemList items={LAWN_MAINTENANCE.items} />
            </div>
            <SectionImage
              src={LAWN_MAINTENANCE.image}
              alt="Well-maintained residential lawn"
              className="h-[400px] lg:h-[480px]"
            />
          </div>

          <hr className="border-black/8 mb-20 md:mb-24" />

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              2. LAWN HEALTH & RESTORATION
              Layout: Image (left) · Text (right)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-24">
            <SectionImage
              src={LAWN_HEALTH.image}
              alt="Healthy irrigated lawn"
              className="h-[400px] lg:h-[480px] order-2 lg:order-1"
            />
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl md:text-3xl font-semibold text-[#162557] mb-4">
                {LAWN_HEALTH.title}
              </h3>
              <p className="text-[15px] md:text-[16px] text-[#555] leading-[1.7] mb-8">
                {LAWN_HEALTH.intro}
              </p>
              <ItemList items={LAWN_HEALTH.items} />
            </div>
          </div>

          <hr className="border-black/8 mb-20 md:mb-24" />

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              3. LANDSCAPE DESIGN & INSTALLATION
              Layout: Image (left) · Text + 2-col feature grid (right)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20 md:mb-24">
            <SectionImage
              src={LANDSCAPE_DESIGN.image}
              alt="Landscape design and planting installation"
              className="h-[420px] lg:h-[520px]"
            />
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-[#162557] mb-4">
                {LANDSCAPE_DESIGN.title}
              </h3>
              <p className="text-[15px] md:text-[16px] text-[#555] leading-[1.7] mb-8">
                {LANDSCAPE_DESIGN.intro}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {LANDSCAPE_DESIGN.items.map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl bg-[#f8f9fb] border border-black/5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="w-4 h-4 text-[#FC8700] shrink-0" />
                      <span className="text-[13px] font-semibold text-[#162557]">{item.title}</span>
                    </div>
                    <p className="text-[12px] text-[#666] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-black/8 mb-20 md:mb-24" />

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              4. HARDSCAPE SERVICES
              Layout: Full-width block — text + image top, 3-col cards below
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="bg-[#f8f9fb] rounded-3xl p-8 md:p-12 mb-20 md:mb-24">
            <div className="grid lg:grid-cols-2 gap-12 items-start mb-10">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold text-[#162557] mb-4">
                  {HARDSCAPE.title}
                </h3>
                <p className="text-[15px] md:text-[16px] text-[#555] leading-[1.7]">
                  {HARDSCAPE.intro}
                </p>
              </div>
              <SectionImage
                src={HARDSCAPE.image}
                alt="Custom hardscape patio and outdoor living area"
                className="h-[300px] lg:h-[360px]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {HARDSCAPE.items.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#FC8700]/10 flex items-center justify-center mb-3">
                    <Check className="w-4 h-4 text-[#FC8700]" />
                  </div>
                  <h4 className="text-[15px] font-semibold text-[#162557] mb-2">{item.title}</h4>
                  <p className="text-[13px] text-[#666] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              5. SNOW & ICE MANAGEMENT
              Layout: Text (left) · Image (right) — tinted background
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="bg-[#f0f4ff] rounded-3xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold text-[#162557] mb-4">
                  {SNOW.title}
                </h3>
                <p className="text-[15px] md:text-[16px] text-[#555] leading-[1.7] mb-8">
                  {SNOW.intro}
                </p>
                <ItemList items={SNOW.items} />
              </div>
              <SectionImage
                src={SNOW.image}
                alt="Snow removal from residential driveway"
                className="h-[360px] lg:h-[400px]"
              />
            </div>
          </div>

          {/* ── Bottom CTA ── */}
          <div className="mt-16 md:mt-20 flex justify-center">
            <a
              href="https://clienthub.getjobber.com/hubs/c144b3b0-97d1-4b17-94f5-a8dbdeed9417/public/requests/2470408/new?utm_source=google&source=social_media"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-[#FC8700] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#FC8700]/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Your Free Estimate
            </a>
          </div>

        </div>
      </section>
    </div>
  )
}
