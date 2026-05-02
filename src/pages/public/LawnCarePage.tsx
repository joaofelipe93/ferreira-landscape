import { useEffect } from 'react'
import { ArrowRight, Check, Phone } from 'lucide-react'

export function LawnCarePage() {
  useEffect(() => {
    document.title = 'Lawn Mowing & Maintenance | Ferreira Landscape (South Shore, MA)'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Professional lawn mowing and maintenance in South Shore, MA. Reliable weekly service, clean edges, and seasonal cleanups. Get your free estimate today.')
  }, [])

  return (
    <div className="bg-white">
      <section className="bg-primary text-white pt-48 pb-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-archivo tracking-[0.5em] text-secondary uppercase mb-8">South Shore, MA</p>
            <h1 className="text-5xl md:text-[90px] font-serif mb-12 leading-[0.9] tracking-tight animate-fade-in-up">
              Lawn Mowing <br/>
              <span className="italic text-secondary">&amp; Maintenance.</span>
            </h1>
            <p className="text-[18px] md:text-2xl text-white/70 leading-relaxed font-sans font-light animate-fade-in-up [animation-delay:200ms]">
              Reliable weekly service for South Shore homeowners. Clean cuts, sharp edges, and a crew that shows up every time — no excuses.
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
           <img src="/lawn_mowing_hinghan.jpeg" className="w-full h-full object-cover grayscale" alt="" />
        </div>
      </section>

      <section className="py-32 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
             <div className="relative group lg:-ml-20">
                <div className="absolute -inset-10 bg-secondary/5 rounded-[4rem] -z-10" />
                <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-primary/5 h-[600px]">
                   <img
                    src="/lawn_care_real.webp"
                    alt="Manicured lawn in South Shore, MA"
                    className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
             </div>

             <div>
                <p className="text-[11px] font-archivo tracking-[0.5em] text-secondary uppercase mb-8">What's Included</p>
                <h2 className="text-4xl md:text-6xl font-serif text-primary mb-8 leading-[1.05] tracking-tight">
                  Everything your lawn needs.<br/>
                  <span className="italic text-sage">Nothing you don't.</span>
                </h2>
                <p className="text-[17px] text-slate leading-relaxed mb-12 font-sans font-light">
                  We serve Hingham, Cohasset, Duxbury, Scituate, Norwell, Marshfield, and surrounding South Shore communities. Weekly or bi-weekly — you choose the schedule that works for you.
                </p>

                <div className="space-y-8">
                  {[
                    { title: 'Weekly Mowing', desc: 'Precision cuts at the right height every visit, keeping your lawn healthy all season.' },
                    { title: 'Clean Edging', desc: 'Sharp definition along every walkway, driveway, and bed — every single time.' },
                    { title: 'Spring & Fall Cleanups', desc: 'Full property cleanup to prep for the season ahead. Leaves, debris, beds — all handled.' },
                    { title: 'Fertilization & Lawn Health', desc: 'Seasonal treatments to keep your grass thick, green, and weed-free.' },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-6 group">
                      <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary transition-all duration-700">
                        <Check className="w-5 h-5 text-secondary group-hover:text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-primary mb-1">{item.title}</h4>
                        <p className="text-slate text-base font-sans font-light leading-relaxed">{item.desc}</p>
                      </div>
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
