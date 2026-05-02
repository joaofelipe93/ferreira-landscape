import { useEffect } from 'react'
import { ArrowRight, Check, Phone } from 'lucide-react'

export function HardscapeServicesPage() {
  useEffect(() => {
    document.title = 'Hardscape Services — Patios, Walkways & Retaining Walls | Ferreira Landscape (South Shore, MA)'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Custom patios, walkways, retaining walls, and outdoor living built to last. Hardscape design and installation in South Shore, MA. Free estimates.')
  }, [])

  return (
    <div className="bg-white">
      <section className="bg-primary text-white pt-48 pb-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-archivo tracking-[0.5em] text-secondary uppercase mb-8">South Shore, MA</p>
            <h1 className="text-5xl md:text-[82px] font-serif mb-12 leading-[0.95] tracking-tight animate-fade-in-up">
              Patios, Walkways <br/>
              <span className="italic text-secondary">&amp; Retaining Walls.</span>
            </h1>
            <p className="text-[18px] md:text-2xl text-white/70 leading-relaxed font-sans font-light animate-fade-in-up [animation-delay:200ms]">
              Custom hardscape design and installation for South Shore homeowners. Built with quality materials, built to last — and backed by our satisfaction guarantee.
            </p>

            <div className="mt-16 flex flex-col sm:flex-row gap-8 animate-fade-in-up [animation-delay:400ms]">
              <a
                href="https://clienthub.getjobber.com/hubs/c144b3b0-97d1-4b17-94f5-a8dbdeed9417/public/requests/2470408/new?utm_source=google&source=social_media"
                target="_blank"
                rel="noreferrer"
                className="bg-secondary hover:bg-secondary/90 text-white font-archivo text-base px-12 py-6 rounded-full inline-flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(252,135,0,0.3)] transition-all hover:-translate-y-2 uppercase tracking-widest"
              >
                Get a Free Estimate <ArrowRight className="w-6 h-6" />
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
           <img src="/hardscape_services.webp" className="w-full h-full object-cover grayscale" alt="" />
        </div>
      </section>

      <section className="py-32 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
             <div className="relative group lg:-ml-20">
                <div className="absolute -inset-10 bg-secondary/5 rounded-[4rem] -z-10" />
                <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-primary/5 h-[600px]">
                   <img
                    src="/hardscape_services.webp"
                    alt="Custom patio and hardscape in South Shore, MA"
                    className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
             </div>

             <div>
                <p className="text-[11px] font-archivo tracking-[0.5em] text-secondary uppercase mb-8">What We Build</p>
                <h2 className="text-4xl md:text-6xl font-serif text-primary mb-8 leading-[1.05] tracking-tight">
                  Built to last.<br/>
                  <span className="italic text-sage">Built to impress.</span>
                </h2>
                <p className="text-[17px] text-slate leading-relaxed mb-12 font-sans font-light">
                  From a new patio to a full outdoor living area — we design and build hardscapes that add real value to your home. We use premium New England stone and materials that hold up through every Massachusetts winter.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: 'Patios & Outdoor Living', desc: 'Natural stone or premium pavers. Designed around how you actually use your backyard.' },
                    { title: 'Walkways & Front Steps', desc: 'First impressions start at the front door. Clean, durable entries that last for years.' },
                    { title: 'Retaining Walls', desc: 'Structural walls that solve grade problems and look great doing it.' },
                    { title: 'Fire Pits & Features', desc: 'Extend your outdoor season with a built-in fire pit or fireplace your family will love.' },
                    { title: 'Stone Steps & Stairs', desc: 'Natural granite or fieldstone steps that connect your outdoor levels safely and beautifully.' },
                    { title: 'Outdoor Kitchens', desc: 'Full outdoor cooking setups built for the way you entertain.' },
                  ].map((item) => (
                    <div key={item.title} className="p-7 rounded-3xl bg-white border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-500 group">
                      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-secondary transition-colors">
                        <Check className="w-5 h-5 text-secondary group-hover:text-white" />
                      </div>
                      <h4 className="text-base font-semibold text-primary mb-2">{item.title}</h4>
                      <p className="text-slate text-[14px] font-sans font-light leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-14">
                  <a
                    href="https://clienthub.getjobber.com/hubs/c144b3b0-97d1-4b17-94f5-a8dbdeed9417/public/requests/2470408/new?utm_source=google&source=social_media"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-secondary hover:bg-secondary/90 text-white font-archivo text-sm px-10 py-5 rounded-full inline-flex items-center gap-4 shadow-[0_20px_50px_rgba(252,135,0,0.25)] transition-all hover:-translate-y-2 uppercase tracking-widest"
                  >
                    Get a Free Estimate <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}
