export function AboutPage() {


  return (
    <div className="bg-white">
      {/* ╔══════════════════════════════════════════════════════════════════════╗
          ║  HERO — THE BOUTIQUE STORY                                         ║
          ╚══════════════════════════════════════════════════════════════════════╝ */}
      <section className="bg-primary text-white pt-48 pb-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-archivo tracking-[0.5em] text-secondary uppercase mb-8">The Stewardship</p>
            <h1 className="text-5xl md:text-[100px] font-serif mb-12 leading-[0.9] tracking-tight animate-fade-in-up">
              Artistry in <br/>
              <span className="italic text-secondary">Every Acre.</span>
            </h1>
            <p className="text-[18px] md:text-2xl text-white/60 leading-relaxed font-sans font-light animate-fade-in-up [animation-delay:200ms]">
              Ferreira Landscape & Garden was born from a singular vision: to treat the South Shore&apos;s most distinguished properties with the surgical precision of an architect and the organic touch of a gardener.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
           <img src="https://picsum.photos/seed/about-texture/1200/1800" className="w-full h-full object-cover grayscale" alt="texture" />
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════════════════╗
          ║  THE PHILOSOPHY — EDITORIAL LAYOUT                                 ║
          ╚══════════════════════════════════════════════════════════════════════╝ */}
      <section className="py-48 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
             <div className="lg:pl-10 order-2 lg:order-1">
                <p className="text-[11px] font-archivo tracking-[0.5em] text-secondary uppercase mb-8">Our Mission</p>
                <h2 className="text-4xl md:text-7xl font-serif text-primary mb-12 leading-[1.05] tracking-tight">
                  Curating <br/>
                  <span className="italic text-sage">Legacy Grounds.</span>
                </h2>
                <div className="space-y-10 text-[18px] md:text-xl text-slate leading-relaxed font-sans font-light">
                  <p>
                    Since 2012, we have intentionally limited our client roster. We believe that true property excellence cannot be mass-produced. It requires an intimate understanding of the soil, the salt air of the South Shore, and the lifestyle of the homeowners we serve.
                  </p>
                  <p>
                    Every estate under our care is assigned a signature steward — a professional dedicated to learning the nuances of your property. We don&apos;t just maintain; we curate.
                  </p>
                  
                  <div className="pt-10 grid grid-cols-2 gap-8">
                     <div>
                        <div className="text-4xl font-serif mb-2">12+</div>
                        <div className="text-[10px] font-archivo uppercase tracking-widest text-primary/40">Years of Craft</div>
                     </div>
                     <div>
                        <div className="text-4xl font-serif mb-2">40+</div>
                        <div className="text-[10px] font-archivo uppercase tracking-widest text-primary/40">Distinguished Estates</div>
                     </div>
                  </div>
                </div>
             </div>

             <div className="relative group order-1 lg:order-2">
                <div className="absolute -inset-10 bg-secondary/5 rounded-[4rem] -z-10" />
                <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-primary/5 h-[700px]">
                   <img
                    src="https://picsum.photos/seed/ferreira-philosophy/1200/1800"
                    alt="Manicured estate"
                    className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110"
                  />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════════════════╗
          ║  VALUES — BOUTIQUE CARDS                                           ║
          ╚══════════════════════════════════════════════════════════════════════╝ */}
      <section className="py-48 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-32">
             <p className="text-[11px] font-archivo tracking-[0.5em] text-secondary uppercase mb-8">Pillars</p>
             <h2 className="text-5xl md:text-8xl font-serif text-primary leading-[1]">
                The Boutique <br/>
                <span className="italic text-sage">Standard.</span>
             </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-24">
            {[
              { t: 'Intentional Growth', d: 'We design for the next decade, not just the next season, ensuring your property matures with grace.' },
              { t: 'Artisanal Masonry', d: 'Our hardscape teams are masters of New England stone, building structures that endure for generations.' },
              { t: 'White-Glove Service', d: 'Quiet, professional presence on your property, leaving behind only perfection.' },
            ].map((v) => (
              <div key={v.t} className="group">
                 <h3 className="text-3xl font-serif italic text-primary mb-6 group-hover:text-secondary transition-colors duration-700">{v.t}</h3>
                 <div className="w-12 h-0.5 bg-primary/10 group-hover:w-full group-hover:bg-secondary/30 transition-all duration-1000 mb-8" />
                 <p className="text-slate text-[17px] leading-relaxed font-sans font-light">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
