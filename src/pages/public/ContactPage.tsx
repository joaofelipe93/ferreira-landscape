import { useEffect, useState } from 'react'
import { Phone, Mail, ArrowRight } from 'lucide-react'
import { useSEO } from '@/hooks/useSEO'

export function ContactPage() {
  useSEO({
    title: 'Contact Us — Free Estimate | Ferreira Landscape South Shore',
    description: 'Get a free estimate for lawn care or hardscape in South Shore, MA. Call (781) 490-8272 or submit our form. We respond within 1 business day.',
    canonical: '/contact',
  })
  const [submitted, setSubmitted] = useState(false)
  const divId = 'c144b3b0-97d1-4b17-94f5-a8dbdeed9417-4613287'

  useEffect(() => {
    const container = document.getElementById(divId)
    if (container) {
      container.innerHTML = ''
      const script = document.createElement('script')
      script.src = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js'
      script.setAttribute('clienthub_id', 'c144b3b0-97d1-4b17-94f5-a8dbdeed9417')
      script.setAttribute('form_url', 'https://clienthub.getjobber.com/client_hubs/c144b3b0-97d1-4b17-94f5-a8dbdeed9417/public/work_request/embedded_work_request_form?form_id=4613287')
      container.appendChild(script)
    }
  }, [])

  return (
    <div className="bg-white">
      {/* ╔══════════════════════════════════════════════════════════════════════╗
          ║  HERO — THE CONCIERGE                                              ║
          ╚══════════════════════════════════════════════════════════════════════╝ */}
      <section className="bg-primary text-white pt-48 pb-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-archivo tracking-[0.5em] text-secondary uppercase mb-8">Inquiry</p>
            <h1 className="text-5xl md:text-[100px] font-serif mb-12 leading-[0.9] tracking-tight animate-fade-in-up">
              Your Property&apos;s <br/>
              <span className="italic text-secondary">Best Season Starts Now.</span>
            </h1>
            <p className="text-[18px] md:text-2xl text-white/60 leading-relaxed font-sans font-light animate-fade-in-up [animation-delay:200ms]">
              Professional landscape care for South Shore families who take pride in where they live. Every transformation begins with a free consultation.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
           <img src="https://picsum.photos/seed/contact-texture/1200/1800" className="w-full h-full object-cover grayscale" alt="texture" />
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════════════════╗
          ║  CONTACT FORM — BOUTIQUE LAYOUT                                    ║
          ╚══════════════════════════════════════════════════════════════════════╝ */}
      <section className="py-48 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-32 items-start">
            
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="bg-cream rounded-[3rem] p-24 text-center border border-primary/5">
                  <h2 className="text-4xl font-serif italic text-primary mb-6">Estimate Request Received.</h2>
                  <p className="text-slate text-lg font-sans font-light mb-12 max-w-md mx-auto">
                    Thank you for reaching out. A team member will contact you within one business day to schedule your free estimate consultation.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="text-[11px] font-archivo tracking-[0.4em] uppercase text-secondary hover:text-primary transition-colors">
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
              <div className="w-full bg-cream rounded-[3rem] overflow-hidden min-h-[400px] border border-primary/5 p-8">
                <div id="c144b3b0-97d1-4b17-94f5-a8dbdeed9417-4613287" className="w-full">
                  <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                    <div className="w-10 h-10 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin mb-6" />
                    <p className="text-primary/60 mb-8 font-medium">Carregando formulário seguro do Jobber...</p>
                    <a 
                      href="https://clienthub.getjobber.com/hubs/c144b3b0-97d1-4b17-94f5-a8dbdeed9417/public/requests/2470408/new?utm_source=google&source=social_media" 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all hover:-translate-y-1 inline-flex items-center gap-3"
                    >
                      Abrir formulário em nova aba
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="bg-cream rounded-[3rem] p-16 space-y-16 border border-primary/5">
                <div>
                   <h3 className="text-3xl font-serif italic text-primary mb-8">Concierge Support</h3>
                   <div className="space-y-8">
                      <div className="flex items-center gap-6 group">
                         <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center group-hover:bg-secondary transition-all duration-500">
                            <Phone className="w-5 h-5 text-secondary group-hover:text-white" />
                         </div>
                         <div>
                            <p className="text-[10px] font-archivo tracking-widest uppercase text-primary/40 mb-1">Private Line</p>
                            <p className="text-xl font-serif text-primary">(781) 490-8272</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-6 group">
                         <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center group-hover:bg-secondary transition-all duration-500">
                            <Mail className="w-5 h-5 text-secondary group-hover:text-white" />
                         </div>
                         <div>
                            <p className="text-[10px] font-archivo tracking-widest uppercase text-primary/40 mb-1">Direct Email</p>
                            <p className="text-xl font-serif text-primary">contact@ferreiralandscape.com</p>
                         </div>
                      </div>
                   </div>
                </div>

                <div>
                   <h3 className="text-3xl font-serif italic text-primary mb-8">Service Hours</h3>
                   <div className="space-y-4 text-slate font-sans font-light">
                      <div className="flex justify-between border-b border-primary/5 pb-4">
                         <span>Monday – Friday</span>
                         <span className="text-primary font-medium">8:00 – 17:00</span>
                      </div>
                      <div className="flex justify-between border-b border-primary/5 pb-4">
                         <span>Saturday</span>
                         <span className="text-primary font-medium">8:00 – 12:00</span>
                      </div>
                      <div className="flex justify-between">
                         <span>Sunday</span>
                         <span className="italic text-secondary">Private Stewardship Only</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
