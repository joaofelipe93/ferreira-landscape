import { ArrowRight, Check, Phone } from 'lucide-react'
import { useSEO } from '@/hooks/useSEO'

export function HardscapeServicesPage() {
  useSEO({
    title: 'Paver Patio & Hardscape Installation South Shore MA | Ferreira',
    description: 'Custom patios, walkways, retaining walls, and fire pits in South Shore, MA. Free design consultation. Serving Hingham, Cohasset & Duxbury.',
    canonical: '/hardscape',
  })

  return (
    <div className="bg-white">
      {/* ╔══════════════════════════════════════════════════════════════════════╗
          ║  HERO — ARCHITECTURAL SERVICE PAGE                                 ║
          ╚══════════════════════════════════════════════════════════════════════╝ */}
      <section className="bg-primary text-white pt-48 pb-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-archivo tracking-[0.5em] text-secondary uppercase mb-8">Masonry & Design</p>
            <h1 className="text-5xl md:text-[100px] font-serif mb-12 leading-[0.9] tracking-tight animate-fade-in-up">
              Artisanal <br/>
              <span className="italic text-secondary">Hardscapes.</span>
            </h1>
            <p className="text-[18px] md:text-2xl text-white/60 leading-relaxed font-sans font-light animate-fade-in-up [animation-delay:200ms]">
              Crafting legacy outdoor spaces. From architectural stone walls to bespoke patio environments, we build the foundations of your sanctuary with precision and permanence.
            </p>

            <div className="mt-16 flex flex-col sm:flex-row gap-8 animate-fade-in-up [animation-delay:400ms]">
              <a
                href="https://clienthub.getjobber.com/hubs/c144b3b0-97d1-4b17-94f5-a8dbdeed9417/public/requests/2470408/new?utm_source=google&source=social_media"
                target="_blank"
                rel="noreferrer"
                className="bg-secondary hover:bg-secondary/90 text-white font-archivo text-base px-12 py-6 rounded-full inline-flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(252,135,0,0.3)] transition-all hover:-translate-y-2 uppercase tracking-widest"
              >
                Start Your Design <ArrowRight className="w-6 h-6" />
              </a>
              <a
                href="tel:+17814908272"
                className="flex items-center gap-4 text-white hover:text-secondary transition-colors font-archivo text-base uppercase tracking-widest group"
              >
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:bg-white/10">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                (781) 490-8272
              </a>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
           <img src="https://picsum.photos/seed/masonry-abstract/1200/1800" className="w-full h-full object-cover grayscale" alt="texture" />
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════════════════╗
          ║  DETAILS — ARCHITECTURAL PERSPECTIVE                               ║
          ╚══════════════════════════════════════════════════════════════════════╝ */}
      <section className="py-48 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
             <div className="relative group lg:-ml-20">
                <div className="absolute -inset-10 bg-secondary/5 rounded-[4rem] -z-10" />
                <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-primary/5 h-[700px]">
                   <img
                    src="https://picsum.photos/seed/ferreira-hardscape-lifestyle/1200/1800"
                    alt="Bespoke outdoor living area"
                    className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
             </div>

             <div>
                <p className="text-[11px] font-archivo tracking-[0.5em] text-secondary uppercase mb-8">The Palette</p>
                <h2 className="text-4xl md:text-7xl font-serif text-primary mb-12 leading-[1.05] tracking-tight">
                  Spaces of <br/>
                  <span className="italic text-sage">Lasting Beauty.</span>
                </h2>
                <p className="text-[18px] md:text-xl text-slate leading-relaxed mb-16 font-sans font-light">
                  A patio is more than a surface; it is the stage for your family&apos;s most important memories. We use only premium New England stone and structural techniques that stand for generations.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { title: 'Signature Patios', desc: 'Bespoke outdoor living rooms crafted from natural stone and premium pavers.' },
                    { title: 'Architectural Entries', desc: 'Walkways and grand steps that define the first impression of your estate.' },
                    { title: 'Structural Masonry', desc: 'Retaining walls that blend geological permanence with visual grace.' },
                    { title: 'Sanctuary Features', desc: 'Artful fire features and water elements for complete sensory immersion.' },
                    { title: 'Stone Stairs', desc: 'Natural granite or fieldstone steps that connect your landscape levels.' },
                    { title: 'Outdoor Kitchens', desc: 'Full culinary environments built for the ultimate hosting experience.' },
                  ].map((item) => (
                    <div key={item.title} className="p-8 rounded-3xl bg-white border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-500 group">
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors">
                        <Check className="w-5 h-5 text-secondary group-hover:text-white" />
                      </div>
                      <h4 className="text-xl font-serif italic mb-3">{item.title}</h4>
                      <p className="text-slate text-[15px] font-sans font-light leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}

