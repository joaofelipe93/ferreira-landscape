import { useEffect } from 'react'
import { ArrowRight, Check, Phone } from 'lucide-react'

export function SnowRemovalPage() {
  useEffect(() => {
    document.title = 'Snow Removal & Ice Control | Ferreira Landscape (South Shore, MA)'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Snow removal and ice control across South Shore, MA. Driveway plowing, walkway clearing, and reliable winter response. Get a free estimate.')
  }, [])

  return (
    <div className="bg-white">
      <section className="bg-[#162557] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-bold tracking-wider text-white/70 uppercase mb-3">Service</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Snow Removal &amp; Ice Control</h1>
          <p className="text-[16px] md:text-lg text-white/80 max-w-2xl leading-relaxed">
            Reliable winter service to keep driveways, walkways, and entrances safe across South Shore, MA.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="https://clienthub.getjobber.com/hubs/c144b3b0-97d1-4b17-94f5-a8dbdeed9417/public/requests/2470408/new?utm_source=google&source=social_media"
              target="_blank"
              rel="noreferrer"
              className="bg-[#FC8700] hover:bg-[#e07600] text-white font-extrabold px-7 py-4 rounded-full inline-flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              Request a Free Estimate <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="tel:+17814908272"
              className="bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-4 rounded-full border border-white/25 inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call (781) 490-8272
            </a>
          </div>
        </div>
      </section>

      <section className="py-18 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#162557] mb-4">
              Stay safe — even when winter hits hard.
            </h2>
            <p className="text-[#555] leading-relaxed mb-6">
              We clear snow quickly and apply ice control to reduce hazards. Professional scheduling, reliable response, and clear communication —
              so you’re never guessing.
            </p>

            <ul className="space-y-3 text-[#444]">
              {[
                'Driveway plowing',
                'Walkway & entry clearing',
                'Ice control treatments',
                'Storm-ready scheduling',
                'Commercial and residential options',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#FC8700] mt-0.5 flex-shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl overflow-hidden border border-black/5 shadow-[0_16px_50px_rgba(0,0,0,0.08)]">
            <img
              src="/svc_snow_removal.png"
              alt="Snow removal service clearing driveway"
              className="w-full h-[320px] md:h-[420px] object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

