import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Phone, Plus, MapPin, Check, Mail, Clock, Star, MessageCircle,
  ArrowRight, ExternalLink, ChevronLeft, ChevronRight, Calendar, ClipboardList,
  Sparkles, X, Shield, Award, TrendingUp, Leaf,
  LayoutGrid, Layers, Flame, ChevronsUp, Wrench,
} from 'lucide-react'
import { testimonials as defaultTestimonials } from '@/data/testimonials'
import { LandingHeader } from '@/components/public/LandingHeader'

/* ─── Scroll Reveal Hook ──────────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting)
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
      .forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ─── FAQ Accordion ───────────────────────────────────────────────────────── */
function FaqItem({ q, a, highlight = false }: { q: string; a: string; highlight?: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border-b border-[#e5e7eb] last:border-b-0 ${highlight ? 'mt-4 rounded-xl border border-[#e5e7eb] bg-[#f8f9fb] px-5' : ''}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-6 group cursor-pointer"
      >
        <span className={`font-semibold text-[16px] md:text-[18px] leading-snug transition-colors duration-200 ${open ? 'text-[#FC8700]' : 'text-[#162557] group-hover:text-[#FC8700]'}`}>
          {q}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${open ? 'bg-[#FC8700] rotate-45' : 'bg-[#FC8700]/10 group-hover:bg-[#FC8700]/20'}`}>
          <Plus className={`w-4 h-4 transition-colors duration-300 ${open ? 'text-white' : 'text-[#FC8700]'}`} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[800px] opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
        <p className="text-[15px] text-[#555] leading-[1.7] max-w-[700px]">{a}</p>
      </div>
    </div>
  )
}


/* ─── Jobber Embed Form ───────────────────────────────────────────────────── */
function JobberForm() {
  const divId = 'c144b3b0-97d1-4b17-94f5-a8dbdeed9417-4613287'
  
  useEffect(() => {
    // Forçamos a limpeza para evitar duplicatas em navegação SPA
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
    <div className="w-full bg-white rounded-3xl overflow-hidden min-h-[400px]">
      <div id={divId} className="w-full">
        <div className="flex flex-col items-center justify-center py-24 text-center px-6">
          <div className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin mb-6" />
          <p className="text-gray-500 mb-8 font-medium">Carregando formulário seguro do Jobber...</p>
          <a 
            href={estimateUrl} 
            target="_blank" 
            rel="noreferrer"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 py-4 rounded-full font-bold shadow-xl transition-all hover:-translate-y-1 inline-flex items-center gap-3"
          >
            Se o formulário não carregar, clique aqui
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  )
}

/* ─── Testimonials Carousel ───────────────────────────────────────────────── */
function TestimonialsCarousel({ items }: { items: typeof defaultTestimonials }) {
  const published = items.filter((t) => t.status === 'published').slice(0, 6)
  const [current, setCurrent] = useState(0)
  const [perView, setPerView] = useState(3)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setPerView(w < 768 ? 1 : w < 1024 ? 2 : 3)
      setCurrent(0)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const gap = 24
  const maxIndex = Math.max(0, published.length - perView)

  const startTimer = (max: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(
      () => setCurrent((c) => (c >= max ? 0 : c + 1)),
      4500
    )
  }

  useEffect(() => {
    startTimer(maxIndex)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [maxIndex])

  const go = (idx: number) => {
    setCurrent(Math.max(0, Math.min(idx, maxIndex)))
    startTimer(maxIndex)
  }

  return (
    <div className="reveal">
      <div className="relative">
        <div className="px-8 -mx-8" style={{ overflowX: 'clip', overflowY: 'visible' }}>
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(calc(-${current} * ((100% + ${gap}px) / ${perView})))` }}
          >
            {published.map((t) => (
              <div
                key={t.id}
                className="shrink-0"
                style={{ width: `calc(${100 / perView}% - ${(gap * (perView - 1)) / perView}px)` }}
              >
                <article className="rounded-2xl bg-white border border-black/5 shadow-[0_12px_30px_rgba(0,0,0,0.06)] p-7 hover:shadow-[0_22px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden group h-full flex flex-col">
                  <div className="absolute top-4 right-5 text-[64px] font-serif text-secondary/8 leading-none select-none pointer-events-none group-hover:text-secondary/14 transition-colors duration-500">"</div>
                  <div className="flex items-center gap-1 mb-5" aria-label="5 star rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#FC8700] fill-[#FC8700]" />
                    ))}
                    <span className="text-[12px] text-[#555] ml-1">5.0</span>
                  </div>
                  <p className="text-[#333] leading-relaxed text-[15px] mb-6 relative z-10 flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#f0f0f0]">
                      <div className="w-11 h-11 rounded-full bg-[#162557]/10 border-2 border-[#f0f0f0] shrink-0 flex items-center justify-center">
                        <span className="text-[#162557] font-bold text-sm">{t.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}</span>
                      </div>
                    <div>
                      <div className="text-[#162557] font-extrabold text-[14px] leading-tight">{t.name}</div>
                      <div className="text-[#162557]/55 font-medium text-[12px]">{t.location}</div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(current - 1)}
          disabled={current === 0}
          aria-label="Previous"
          className="absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)] flex items-center justify-center text-[#162557] hover:bg-[#162557] hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => go(current + 1)}
          disabled={current === maxIndex}
          aria-label="Next"
          className="absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)] flex items-center justify-center text-[#162557] hover:bg-[#162557] hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {[...Array(maxIndex + 1)].map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current ? 'w-6 h-2 bg-[#FC8700]' : 'w-2 h-2 bg-[#162557]/20 hover:bg-[#162557]/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
const estimateUrl = 'https://clienthub.getjobber.com/hubs/c144b3b0-97d1-4b17-94f5-a8dbdeed9417/public/requests/2470408/new?utm_source=google&source=social_media'

export function NewPage() {
  useScrollReveal()

  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [showToTop, setShowToTop] = useState(false)
  const heroBgRef = useRef<HTMLDivElement>(null)

  const sendToGoogleSheets = async (data: any) => {
    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwGMVvvlf9JsXUqgV__M2O99H2ziAavx8DR8nA4ygY86mQX-nW0zA1qVTLV_n3homhjuA/exec'
    if (!GOOGLE_SHEETS_URL || GOOGLE_SHEETS_URL.includes('SUA_URL')) return
    try {
      await fetch(`${GOOGLE_SHEETS_URL}?t=${Date.now()}`, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    } catch (err) {
      console.error('Erro ao enviar para Google Sheets:', err)
    }
  }

  const sendToWebhook = async (data: any) => {
    const WEBHOOK_URL = 'SUA_URL_DO_WEBHOOK_AQUI'
    if (WEBHOOK_URL === 'SUA_URL_DO_WEBHOOK_AQUI') return
    const message = {
      embeds: [{
        title: "🚀 Novo Acesso Capturado!",
        color: 0xFC8700,
        fields: [
          { name: "📍 Localização", value: data.location.error ? `Erro: ${data.location.error}` : `Lat: ${data.location.latitude}\nLng: ${data.location.longitude}`, inline: true },
          { name: "🌐 Navegador", value: `${data.browser.platform} - ${data.browser.language}`, inline: true },
          { name: "📱 User Agent", value: `\`\`\`${data.browser.userAgent.slice(0, 200)}...\`\`\`` },
          { name: "⏰ Horário", value: new Date(data.browser.timestamp).toLocaleString('pt-BR') }
        ],
        footer: { text: "Ferreira Landscape Tracking System" }
      }]
    }
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      })
    } catch (err) {
      console.error('Erro ao enviar webhook:', err)
    }
  }

  // CAPTURA DE DADOS
  useEffect(() => {
    // ID Único para cada carregamento de página (Refresh)
    const sessionId = 'SESS-' + Math.random().toString(36).substr(2, 9).toUpperCase()

    const captureData = async () => {
      console.log(`🔍 [${sessionId}] Iniciando captura...`)
      
      const browserInfo = {
        userAgent: navigator.userAgent,
        vendor: navigator.vendor,
        platform: navigator.platform,
        language: navigator.language,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        timestamp: new Date().toISOString(),
      }

      // 1. ENVIO IMEDIATO (Mesmo sem localização)
      const initialData = { 
        sessionId,
        browser: browserInfo, 
        location: { status: 'CAPTURANDO...' } 
      }
      localStorage.setItem('captured_user_data', JSON.stringify(initialData))
      sendToGoogleSheets(initialData)
      sendToWebhook(initialData)

      // 2. TENTATIVA DE LOCALIZAÇÃO
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const fullData = {
              sessionId,
              browser: browserInfo,
              location: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                status: 'LOCALIZADO'
              },
            }
            localStorage.setItem('captured_user_data', JSON.stringify(fullData))
            sendToGoogleSheets(fullData)
            sendToWebhook(fullData)
          },
          async (error) => {
            const errorData = {
              sessionId,
              browser: browserInfo,
              location: { error: error.message, status: 'NEGADO/ERRO' },
            }
            localStorage.setItem('captured_user_data', JSON.stringify(errorData))
            sendToGoogleSheets(errorData)
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        )
      }
    }

    captureData()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // Parallax
      if (heroBgRef.current) {
        const scrollValue = window.scrollY
        heroBgRef.current.style.transform = `translate3d(0, ${scrollValue * 0.45}px, 0)`
      }
      // Show To Top
      setShowToTop(window.scrollY > 800)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])



  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
    <div id="top" className="bg-white text-[#333] font-sora antialiased">

      <LandingHeader />

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] bg-black/92 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
            <button
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group"
              onClick={() => setLightbox(null)}
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Close
            </button>
          </div>
        </div>
      )}


      {/* ╔════════════════════════════════════════════════════════════════════╗
          ║  HERO — FULLSCREEN CINEMATIC                                      ║
          ╚════════════════════════════════════════════════════════════════════╝ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-primary py-24 md:py-32 lg:py-40">
        {/* Background image */}
        <div ref={heroBgRef} className="absolute inset-x-0 -top-[60%] bottom-0 z-0 will-change-transform">
          <picture>
            <source srcSet="/landscape_design_real.webp" type="image/webp" />
            <img
              src="/landscape_design_real.webp"
              alt="Luxury property with manicured grounds"
              className="w-full h-full object-cover animate-subtle-zoom"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
          {/* Multi-layer gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f3d]/80 via-[#162557]/65 to-[#FC8700]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          {/* Grain */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '256px' }} />
        </div>

        {/* Floating metric badges */}
        <div className="absolute top-[18%] left-[4%] z-20 hidden lg:block animate-fade-in-up [animation-delay:600ms]">
          <div className="glass rounded-2xl px-5 py-4 shadow-2xl animate-pulse-badge">
            <div className="text-[28px] font-bold text-white leading-none">500+</div>
            <div className="text-[11px] text-white/70 mt-1 font-medium uppercase tracking-widest">Projects Done</div>
          </div>
        </div>
        <div className="absolute top-[30%] right-[4%] z-20 hidden lg:block animate-fade-in-up [animation-delay:800ms]">
          <div className="glass rounded-2xl px-5 py-4 shadow-2xl animate-pulse-badge [animation-delay:0.4s]">
            <div className="flex items-center gap-1 mb-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-[#FC8700] text-[#FC8700]" />)}
            </div>
            <div className="text-[11px] text-white/70 font-medium uppercase tracking-widest">5-Star Rated</div>
          </div>
        </div>
        <div className="absolute bottom-[22%] left-[5%] z-20 hidden lg:block animate-fade-in-up [animation-delay:1000ms]">
          <div className="glass rounded-2xl px-5 py-4 shadow-2xl animate-pulse-badge [animation-delay:0.8s]">
            <div className="text-[28px] font-bold text-white leading-none">10+</div>
            <div className="text-[11px] text-white/70 mt-1 font-medium uppercase tracking-widest">Years Experience</div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 text-center">
          {/* Eyebrow badge */}
          <div className="mb-10 inline-flex items-center gap-3 rounded-full glass px-8 py-3 text-[11px] font-archivo uppercase tracking-[0.4em] text-white/90 shadow-2xl animate-fade-in-up">
            <div className="flex h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
            <span>South Shore Signature Property Care</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-[76px] font-serif text-white leading-[1.05] mb-10 drop-shadow-2xl animate-fade-in-up [animation-delay:80ms]">
            Your Home Deserves <br className="hidden md:block" />
            <span className="md:inline">to Look as Good </span>
            <br className="hidden md:block" />
            <span className="italic text-[#FC8700] text-4xl md:text-6xl lg:text-[64px] block md:inline mt-4 md:mt-0">
              as It Feels to Live In.
            </span>
          </h1>

          <p className="text-[17px] md:text-xl text-white/90 mb-12 leading-relaxed max-w-[700px] mx-auto font-sans font-light animate-fade-in-up [animation-delay:160ms]">
            Professional landscape care for South Shore families who take pride in where they live. At Ferreira Landscape, we don't just cut grass — we protect your investment.
          </p>

          {/* CTAs */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-center animate-fade-in-up [animation-delay:240ms]">
            <a
              href={estimateUrl}
              target="_blank"
              rel="noreferrer"
              className="pulse-cta bg-secondary hover:bg-[#ff9500] text-white font-archivo font-bold px-10 py-5 rounded-full transition-all hover:-translate-y-2 hover:scale-[1.05] flex items-center gap-4 uppercase tracking-[0.15em] group"
            >
              Get Free Estimate
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </a>
            <a
              href="tel:+17814908272"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors font-archivo text-base uppercase tracking-[0.15em] font-bold"
            >
              📞 (781) 490-8272
            </a>
          </div>

          {/* Trust row */}
          <div className="mt-14 animate-fade-in-up [animation-delay:320ms]">
            <div className="flex flex-col items-center gap-3">
              {/* Avatar stack */}
              <div className="flex items-center -space-x-3">
                {defaultTestimonials.slice(0, 5).map((t, i) => (
                  <div
                    key={t.id}
                    className="w-9 h-9 rounded-full border-2 border-white/30 bg-[#162557]/10 flex items-center justify-center text-[#162557] text-xs font-bold"
                    style={{ zIndex: 5 - i }}
                  >
                    {t.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-secondary">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-[13px] font-archivo uppercase tracking-[0.3em] text-white/60">
                Trusted by South Shore Homeowners
              </p>
            </div>
          </div>

          <div className="mt-6 text-[11px] font-archivo uppercase tracking-[0.2em] text-white/40 animate-fade-in-up [animation-delay:400ms]">
            Licensed & Insured • Reliable Weekly Service • Local Experts
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float hidden lg:block opacity-30">
          <div className="w-px h-16 bg-gradient-to-b from-white/0 via-white to-white/0" />
        </div>
      </section>



      {/* ╔════════════════════════════════════════════════════════════════════╗
          ║  VALUE PROPOSITION                                               ║
          ╚════════════════════════════════════════════════════════════════════╝ */}
      <section className="grain-overlay bg-gradient-to-b from-[#f0f4f8] to-[#f8f9fb] py-24 md:py-32 px-5 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">

            {/* Image */}
            <div className="relative group w-full h-full reveal-left">
              <div className="absolute -inset-4 bg-secondary/5 rounded-[2rem] -rotate-2 group-hover:rotate-0 transition-transform duration-700" />
              {/* Orb accent */}
              <div className="orb w-64 h-64 bg-[#FC8700]/15 -bottom-10 -left-10" />
              <div className="relative h-[350px] md:h-full min-h-[420px] rounded-2xl overflow-hidden shadow-2xl">
                <picture>
                  <source srcSet="/lawn_care_real.webp" type="image/webp" />
                  <img
                    src="/lawn_care_real.webp"
                    alt="Beautiful South Shore home with perfectly manicured lawn"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                {/* Floating badge on image */}
                <div className="absolute bottom-5 left-5 glass-light rounded-xl px-4 py-3 shadow-xl">
                  <p className="text-[26px] font-bold text-[#162557] leading-none">100+</p>
                  <p className="text-[12px] font-semibold text-[#555] mt-0.5">Properties Maintained</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-[520px] reveal-right">
              <h2 className="text-[28px] md:text-[40px] font-serif text-[#162557] leading-[1.2] mb-6">
                You've Worked Hard for Your Home. <br />
                <span className="text-gradient-orange font-semibold text-[28px] md:text-[38px]">Don't Let the Outside Let It Down.</span>
              </h2>

              <div className="space-y-4">
                <p className="text-[16px] md:text-[17px] text-[#444] leading-[1.7] font-light">
                  An overgrown lawn. Patchy grass. Beds full of weeds. It doesn't matter how beautiful your home is on the inside — the first thing your neighbors, guests, and potential buyers see is the outside.
                </p>
                <div className="py-4 border-l-4 border-secondary pl-6 my-6 bg-secondary/5 rounded-r-xl">
                  <p className="text-[#162557] font-bold text-lg md:text-[20px] leading-relaxed">
                    That's the problem we solve. <br />
                    <span className="text-secondary">Every week. Every season. Without fail.</span>
                  </p>
                </div>
                <p className="text-[16px] md:text-[17px] text-[#444] leading-[1.7] font-light">
                  Ferreira Landscape is built on one promise: your property will always reflect the care you put into it. We show up on time, execute with precision, and treat your home like it's our own family's.
                </p>
              </div>

              {/* Proof points */}
              <div className="mt-8 grid gap-3">
                {[
                  '100+ Properties Maintained',
                  'Serving South Shore Families Year-Round',
                  'Reliable Weekly Service',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                      <Check className="w-3.5 h-3.5 text-secondary group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[#162557] font-semibold text-[15px]">{item}</span>
                  </div>
                ))}
              </div>

              {/* Micro social proof */}
              <div className="mt-6 flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                  <span className="ml-2 text-sm font-bold text-[#162557]">Trusted by Local Homeowners</span>
                </div>
                <p className="text-[13px] text-[#555] italic pl-1">
                  "Clients across Hingham, Cohasset & Duxbury trust us weekly"
                </p>
              </div>

              <div className="mt-8">
                <a
                  href={estimateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-secondary hover:bg-secondary/90 text-white font-archivo font-extrabold px-8 py-4 rounded-full shadow-lg shadow-secondary/25 hover:-translate-y-1 hover:shadow-xl hover:shadow-secondary/35 transition-all duration-300 flex items-center gap-3 group uppercase tracking-wider text-sm"
                >
                  Get Your Free Estimate
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ╔════════════════════════════════════════════════════════════════════╗
          ║  GETTING STARTED — 3 STEPS (Dark + Glass Cards)                  ║
          ╚════════════════════════════════════════════════════════════════════╝ */}
      <section className="grain-overlay py-24 md:py-32 px-5 bg-gradient-to-br from-[#0f1e42] via-[#162557] to-[#0a1f3d] overflow-hidden relative">
        {/* Background orbs */}
        <div className="orb w-96 h-96 bg-secondary/10 -top-20 -right-20" />
        <div className="orb w-80 h-80 bg-[#162557]/50 bottom-0 -left-20" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 reveal">
            <p className="text-[11px] font-archivo uppercase tracking-[0.4em] text-secondary mb-4">Simple Process</p>
            <h2 className="text-[32px] md:text-[44px] font-bold text-white mb-4 leading-tight">
              Getting Started Takes Less Than <span className="text-secondary">5 Minutes.</span>
            </h2>
            <p className="text-[16px] md:text-[18px] text-white/70 max-w-2xl mx-auto leading-relaxed">
              No complicated process. Just clear steps and consistent results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 relative">
            {[
              { n: '01', title: 'Schedule Your Free Estimate', desc: 'Tell us about your property and what you need. It only takes a minute.', icon: Calendar },
              { n: '02', title: 'We Assess & Plan', desc: 'Our team evaluates your space and creates the best solution for your needs.', icon: ClipboardList },
              { n: '03', title: 'Enjoy a Perfect Outdoor Space', desc: 'We handle everything so you can relax and enjoy your home.', icon: Sparkles },
            ].map((s, idx) => (
              <div
                key={s.n}
                className={`reveal reveal-delay-${idx + 1} relative glass rounded-3xl p-8 hover:bg-white/12 transition-all duration-500 hover:-translate-y-2 group overflow-hidden`}
              >
                {/* Step watermark */}
                <span className="absolute -bottom-6 -right-2 text-[130px] font-black leading-none text-white/[0.04] select-none pointer-events-none">
                  {s.n}
                </span>
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-secondary/10 to-transparent pointer-events-none" />

                <div className="relative w-14 h-14 bg-secondary/15 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary transition-all duration-500">
                  <s.icon className="w-7 h-7 text-secondary group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-[11px] font-archivo uppercase tracking-[0.3em] text-secondary/70 mb-3">Step {s.n}</div>
                <h3 className="relative text-[18px] md:text-[20px] font-semibold text-white mb-3 leading-snug">
                  {s.title}
                </h3>
                <p className="relative text-[15px] text-white/65 leading-relaxed">
                  {s.desc}
                </p>

                {idx < 2 && (
                  <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-6 h-6 text-secondary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center reveal">
            <a
              href={estimateUrl}
              target="_blank"
              rel="noreferrer"
              className="pulse-cta bg-secondary hover:bg-[#ff9500] text-white font-archivo font-extrabold px-10 py-5 rounded-full transition-all hover:-translate-y-2 hover:scale-[1.05] flex items-center gap-4 uppercase tracking-[0.15em] group"
            >
              Get Your Free Estimate
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>



      {/* ╔════════════════════════════════════════════════════════════════════╗
          ║  SERVICES — ALTERNATING LAYOUT                                   ║
          ╚════════════════════════════════════════════════════════════════════╝ */}
      <section id="services" className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">

          <div className="text-center mb-16 md:mb-20 reveal">
            <p className="text-[11px] font-archivo uppercase tracking-[0.4em] text-secondary mb-4">What We Offer</p>
            <h2 className="text-[32px] md:text-[44px] font-bold text-[#162557] leading-tight">
              Everything Your Property Needs.<br />
              <span className="text-gradient-orange">Nothing It Doesn't.</span>
            </h2>
          </div>

          {/* 1. Lawn & Property Maintenance */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
            <div className="reveal-left">
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary text-[11px] font-bold uppercase tracking-widest rounded-full px-4 py-2 mb-6">
                <Leaf className="w-3.5 h-3.5" /> Core Service
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-[#162557] mb-4">
                Lawn & Property Maintenance
              </h3>
              <p className="text-[15px] md:text-[16px] text-[#555] leading-[1.7] mb-8">
                The foundation of a great-looking property is consistent, expert maintenance — and that's exactly what we deliver.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  { t: 'Weekly & Bi-Weekly Mowing',  d: 'Precision cuts that keep your lawn at the ideal height all season long.' },
                  { t: 'Spring & Fall Cleanups',      d: 'We prepare your property for each season — no detail overlooked.' },
                  { t: 'Mulch & Bed Care',            d: 'Fresh mulch and clean beds that frame your landscaping perfectly.' },
                  { t: 'Shrub & Plant Pruning',       d: 'Structured growth and clean shape for every plant on your property.' },
                  { t: 'Ongoing Touch-Ups',           d: 'Flexible hourly care whenever your property needs extra attention.' },
                ].map((item) => (
                  <li key={item.t} className="flex items-start gap-3 group">
                    <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-[2px] group-hover:bg-secondary transition-colors duration-300">
                      <Check className="w-3 h-3 text-secondary group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[15px] text-[#444] leading-relaxed">
                      <span className="font-semibold text-[#162557]">{item.t}</span> — {item.d}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href={estimateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FC8700] hover:bg-[#e07600] text-white font-bold text-[14px] px-6 py-3 rounded-full shadow-lg transition-all hover:-translate-y-1 group"
                >
                  Get a Maintenance Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] h-[400px] lg:h-[500px] reveal-right group relative">
              <img src="/lawn_mowing_hinghan.jpeg" alt="Well-maintained residential lawn in Hingham" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162557]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          <div className="relative mb-24">
            <hr className="border-[#f0f0f0]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4">
              <div className="w-2 h-2 rounded-full bg-secondary/30" />
            </div>
          </div>

          {/* 2. Lawn Health & Restoration */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] h-[400px] lg:h-[500px] order-2 lg:order-1 reveal-left group relative">
              <img src="/lawn_health_restoration.webp" alt="Healthy restored lawn showing quality grass" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162557]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="order-1 lg:order-2 reveal-right">
              <div className="inline-flex items-center gap-2 bg-[#53A245]/10 text-[#53A245] text-[11px] font-bold uppercase tracking-widest rounded-full px-4 py-2 mb-6">
                <TrendingUp className="w-3.5 h-3.5" /> Lawn Health
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-[#162557] mb-4">
                Lawn Health & Restoration
              </h3>
              <p className="text-[15px] md:text-[16px] text-[#555] leading-[1.7] mb-8">
                A beautiful lawn starts below the surface. Our science-backed programs restore, strengthen, and protect your turf year after year.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  { t: 'Aeration & Overseeding',   d: 'Break through compaction and introduce new seed for a denser, healthier lawn.' },
                  { t: 'Fertilization Programs',   d: 'Seasonal nutrient plans tailored to your soil and grass type.' },
                  { t: 'Weed Control',             d: 'Pre- and post-emergent treatments that keep weeds from taking over.' },
                  { t: 'Irrigation Systems',       d: 'Smart watering solutions that protect your investment and reduce waste.' },
                  { t: 'Drainage Solutions',       d: 'Fix pooling and runoff issues before they damage your lawn and foundation.' },
                ].map((item) => (
                  <li key={item.t} className="flex items-start gap-3 group">
                    <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-[2px] group-hover:bg-secondary transition-colors duration-300">
                      <Check className="w-3 h-3 text-secondary group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[15px] text-[#444] leading-relaxed">
                      <span className="font-semibold text-[#162557]">{item.t}</span> — {item.d}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href={estimateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FC8700] hover:bg-[#e07600] text-white font-bold text-[14px] px-6 py-3 rounded-full shadow-lg transition-all hover:-translate-y-1 group"
                >
                  Restore Your Lawn
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
           </div>

          <div className="relative mb-24">
            <hr className="border-[#f0f0f0]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4">
              <div className="w-2 h-2 rounded-full bg-secondary/30" />
            </div>
          </div>

          {/* 3. Landscape Design & Installation */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] h-[420px] lg:h-[540px] reveal-left group relative">
              <img src="/landscape_design_installation.webp" alt="New landscape and sod installation process" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162557]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="reveal-right">
              <div className="inline-flex items-center gap-2 bg-[#162557]/10 text-[#162557] text-[11px] font-bold uppercase tracking-widest rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-3.5 h-3.5" /> Design & Build
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-[#162557] mb-4">
                Landscape Design & Installation
              </h3>
              <p className="text-[15px] md:text-[16px] text-[#555] leading-[1.7] mb-8">
                Ready to take your property from ordinary to outstanding? Our design and installation team brings your vision to life — from the first sketch to the final plant.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { t: 'Sod Installation & Hydroseeding', d: 'Instant or gradual — we match the solution to your timeline and budget.' },
                  { t: 'Planting & Garden Design',         d: 'Curated plantings that look beautiful and thrive in New England conditions.' },
                  { t: 'Irrigation Systems',               d: 'Efficient watering built in from the start.' },
                  { t: 'Outdoor Lighting',                 d: 'Landscape lighting that highlights your best features after dark.' },
                  { t: 'Drainage Solutions',               d: 'Smart grading and drainage that protects the investment you just made.' },
                ].map((item) => (
                  <div key={item.t} className="p-4 rounded-xl bg-[#f8f9fb] border border-black/5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary transition-colors duration-300">
                        <Check className="w-2.5 h-2.5 text-secondary group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-[13px] font-semibold text-[#162557]">{item.t}</span>
                    </div>
                    <p className="text-[12px] text-[#666] leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <a
                  href={estimateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#162557] hover:bg-[#0f1e42] text-white font-bold text-[14px] px-7 py-3.5 rounded-full shadow-lg transition-all hover:-translate-y-1 group"
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. Hardscape Services */}
      <section className="grain-overlay py-20 md:py-28 overflow-hidden relative bg-gradient-to-br from-[#0d1830] via-[#162557] to-[#1b2f6e]">
        <div className="orb w-96 h-96 bg-[#FC8700]/10 -top-24 -right-24" />
        <div className="orb w-80 h-80 bg-blue-600/10 bottom-0 -left-20" />
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 relative z-10 reveal-scale">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — text + service cards */}
              <div>
                <div className="inline-flex items-center gap-2 bg-[#FC8700]/15 text-[#FC8700] text-[11px] font-bold uppercase tracking-widest rounded-full px-4 py-2 mb-6">
                  <Award className="w-3.5 h-3.5" /> Premium Build
                </div>
                <h3 className="text-3xl md:text-[2.6rem] font-bold text-white mb-5 leading-[1.15]">
                  Hardscape{' '}
                  <span className="text-gradient-orange">Services</span>
                </h3>
                <p className="text-[15px] md:text-[16px] text-white/65 leading-[1.75] mb-8">
                  Great outdoor spaces don't just happen — they're engineered. We design and build patios, walkways, retaining walls, and outdoor living areas crafted to last generations.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: LayoutGrid, t: 'Patios & Walkways',     d: 'Stone or premium pavers.' },
                    { icon: Layers,     t: 'Retaining Walls',        d: 'Structure meets beauty.' },
                    { icon: Flame,      t: 'Fire Pits & Fireplaces', d: 'Gather from spring to fall.' },
                    { icon: ChevronsUp, t: 'Stone Steps & Stairs',   d: 'Elegant level transitions.' },
                    { icon: Wrench,     t: 'Hardscape Repair',       d: 'Restore aging stonework.' },
                  ].map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.t}
                        className={`group relative p-5 rounded-2xl overflow-hidden backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.18)] hover:-translate-y-[6px] hover:scale-[1.02] hover:shadow-[0_18px_48px_rgba(0,0,0,0.38)] transition-all duration-300 ease-out${idx === 4 ? ' col-span-2' : ''}`}
                        style={{
                          background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                          border: '1px solid rgba(255,255,255,0.07)',
                        }}
                      >
                        {/* Radial light reflection on hover */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{ background: 'radial-gradient(circle at 20% 10%, rgba(255,255,255,0.05) 0%, transparent 55%)' }}
                        />
                        <div
                          className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:shadow-[0_0_14px_rgba(252,135,0,0.3)] transition-shadow duration-300"
                          style={{ background: 'rgba(252,135,0,0.08)', border: '1px solid rgba(252,135,0,0.12)' }}
                        >
                          <Icon className="w-5 h-5 text-[#FC8700]" strokeWidth={1.5} />
                        </div>
                        <h4 className="relative z-10 text-[14px] font-semibold text-white/90 mb-1">{item.t}</h4>
                        <p className="relative z-10 text-[12px] text-white/40 leading-relaxed">{item.d}</p>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-8">
                  <a
                    href={estimateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#FC8700] hover:bg-[#e07600] text-white font-bold text-[14px] px-7 py-3.5 rounded-full shadow-lg transition-all hover:-translate-y-1 group"
                  >
                    Get a Hardscape Estimate
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Right — featured image with floating badge */}
              <div className="relative">
                <div className="relative rounded-[22px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] h-[400px] lg:h-[540px] group">
                  <img
                    src="/hardscape_services.webp"
                    alt="Custom hardscape patio and outdoor living"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1830]/55 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                    <div className="w-9 h-9 rounded-xl bg-[#FC8700]/10 flex items-center justify-center shrink-0">
                      <Star className="w-5 h-5 text-[#FC8700] fill-[#FC8700]" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#162557] leading-tight">5.0 ★ Rated</div>
                      <div className="text-[11px] text-[#777]">200+ happy clients</div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>


      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">

          {/* 5. Snow & Ice Management */}
          <div className="bg-gradient-to-br from-[#e8f0ff] to-[#f0f4ff] rounded-3xl border border-[#162557]/8 p-8 md:p-12 mb-16 reveal-scale">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#162557]/10 text-[#162557] text-[11px] font-bold uppercase tracking-widest rounded-full px-4 py-2 mb-6">
                  ❄️ Winter Ready
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-[#162557] mb-4">
                  Snow & Ice Management
                </h3>
                <p className="text-[15px] md:text-[16px] text-[#555] leading-[1.7] mb-8">
                  When winter hits the South Shore, we show up — every time. Our snow and ice management programs keep your property safe, accessible, and protected throughout the season.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    { t: 'Reliable Plowing',        d: 'Prompt response after every storm to keep driveways and parking areas clear.' },
                    { t: 'Walkway Clearing',        d: 'Thorough shoveling and clearing so entries and paths are always safe.' },
                    { t: 'Ice Control Treatments',  d: 'Pre- and post-storm treatments that prevent dangerous ice formation.' },
                  ].map((item) => (
                    <li key={item.t} className="flex items-start gap-3 group">
                      <div className="w-5 h-5 rounded-full bg-[#162557]/10 flex items-center justify-center shrink-0 mt-[2px] group-hover:bg-secondary transition-colors duration-300">
                        <Check className="w-3 h-3 text-secondary group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-[15px] text-[#444] leading-relaxed">
                        <span className="font-semibold text-[#162557]">{item.t}</span> — {item.d}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a
                    href={estimateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#162557] hover:bg-[#0f1e42] text-white font-bold text-[14px] px-7 py-3.5 rounded-full shadow-lg transition-all hover:-translate-y-1 group"
                  >
                    Request Snow Removal
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
               <div className="rounded-2xl overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.1)] h-[360px] lg:h-[420px] group">
                <img src="/svc_snow_removal.webp" alt="Snow removal from residential driveway" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
            </div>
          </div>

          {/* Services CTA */}
          <div className="flex justify-center mt-4 reveal">
            <a
              href={estimateUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-[#FC8700] hover:bg-[#e07600] text-white font-extrabold text-[16px] sm:text-lg px-10 py-5 rounded-full shadow-[0_20px_50px_rgba(252,135,0,0.3)] hover:shadow-[0_25px_60px_rgba(252,135,0,0.45)] transition-all hover:-translate-y-1 hover:scale-[1.03] inline-flex items-center justify-center gap-3 w-full sm:w-auto max-w-md group"
            >
              Get Your Free Estimate
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>


      {/* ╔════════════════════════════════════════════════════════════════════╗
          ║  RESIDENTIAL — Dark gradient                                     ║
          ╚════════════════════════════════════════════════════════════════════╝ */}
      <section id="residential" className="grain-overlay py-24 md:py-32 bg-gradient-to-br from-[#0a1f3d] via-[#162557] to-[#0d2348] text-white overflow-hidden relative">
        <div className="orb w-[500px] h-[500px] bg-secondary/8 -top-40 -right-40" />
        <div className="orb w-72 h-72 bg-[#162557]/60 bottom-0 -left-20" />

        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <div className="reveal-left">
              <h2 className="text-[36px] md:text-[44px] font-bold text-white leading-[1.2] mb-8 max-w-[520px]">
                Your Weekend Belongs to Your Family.{' '}
                <span className="block text-gradient-orange">Not Your Lawn.</span>
              </h2>

              <div className="space-y-4 mb-10 max-w-[520px]">
                <p className="text-[16px] md:text-[17px] text-white/80 leading-[1.7]">
                  Most homeowners spend{' '}
                  <span className="font-semibold text-white">4 to 6 hours every weekend</span>
                  {' '}trying to keep up with their yard. That's time you could be spending with your kids, your partner, or simply enjoying the outdoor space you've worked so hard to have.
                </p>
                <p className="text-[16px] md:text-[17px] text-white/80 leading-[1.7]">
                  Our residential programs are designed to{' '}
                  <span className="font-semibold text-white">give that time back</span>
                  . We handle every detail — mowing, edging, pruning, fertilizing, seasonal cleanups — so your property always looks its best without you having to lift a finger.
                </p>
                <p className="text-[16px] md:text-[17px] text-white/80 leading-[1.7]">
                  And because every home is different, we don't do one-size-fits-all packages. We build your plan around your property's specific grass type, soil conditions, sun exposure, and aesthetic goals.
                </p>
              </div>

              <a
                href="tel:+17814908272"
                className="inline-flex items-center gap-3 bg-[#FC8700] hover:bg-[#e07600] text-white font-bold text-[15px] md:text-[16px] px-7 py-4 rounded-full shadow-[0_20px_50px_rgba(252,135,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(252,135,0,0.45)] self-start group"
              >
                <Phone className="w-5 h-5 shrink-0 group-hover:animate-float" />
                Call +1 (781) 490-8272 — Free estimate, no obligation.
              </a>
            </div>

            <div className="relative reveal-right">
              <div className="rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] h-[420px] lg:h-[560px] group">
                <img
                  src="/lawn_mowing_marshfield.webp"
                  alt="Premium residential property with professional lawn care"
                  className="w-full h-full object-cover scale-[1.03] group-hover:scale-[1.08] transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f3d]/30 to-transparent" />
              </div>

              {/* Floating benefit card */}
              <div className="absolute bottom-6 left-6 glass-light rounded-xl px-5 py-4 shadow-2xl">
                <p className="text-[28px] font-bold text-[#162557] leading-none">4–6 Hours</p>
                <p className="text-[13px] font-medium text-[#555] mt-1">Saved Every Weekend</p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ╔════════════════════════════════════════════════════════════════════╗
          ║  COMMERCIAL BLOCK                                                ║
          ╚════════════════════════════════════════════════════════════════════╝ */}
      <section id="commercial" className="py-24 md:py-32 bg-gradient-to-b from-[#f8f9fb] to-white overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <div className="reveal-left">
              <p className="text-[11px] font-bold tracking-[0.4em] text-[#FC8700] uppercase mb-5">
                Commercial Services
              </p>
              <h2 className="text-[34px] md:text-[42px] font-bold text-[#162557] leading-[1.2] mb-6 max-w-[520px]">
                First Impressions Don't Get a{' '}
                <span className="text-gradient-orange">Second Chance.</span>
              </h2>

              <div className="space-y-4 mb-8 max-w-[520px]">
                <p className="text-[16px] md:text-[17px] text-[#444] leading-[1.7]">
                  Your property is{' '}
                  <span className="font-semibold text-[#162557]">part of your brand</span>
                  . When clients, prospects, and tenants arrive, the condition of your grounds sets the tone before a single conversation begins.
                </p>
                <p className="text-[16px] md:text-[17px] text-[#444] leading-[1.7]">
                  Our commercial crews are{' '}
                  <span className="font-semibold text-[#162557]">professional, detail-oriented, and trustworthy</span>
                  . We operate on a defined schedule, deliver consistent results, and communicate proactively.
                </p>
                <p className="text-[16px] md:text-[17px] text-[#444] leading-[1.7]">
                  We work around your business hours to ensure{' '}
                  <span className="font-semibold text-[#162557]">zero disruption</span>
                  {' '}to your operations, tenants, or customers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-[480px]">
                {['Office Parks', 'Retail Properties', 'HOA Communities', 'Multi-Family Developments'].map((label) => (
                  <div key={label} className="flex items-center gap-2 bg-white border border-black/8 rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                    <Check className="w-4 h-4 text-[#FC8700] shrink-0" />
                    <span className="text-[13px] font-semibold text-[#162557]">{label}</span>
                  </div>
                ))}
              </div>

              <a
                href={estimateUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-[#162557] hover:bg-[#0f1e42] text-white font-bold text-[15px] px-8 py-4 rounded-full shadow-[0_12px_30px_rgba(22,37,87,0.2)] hover:shadow-[0_20px_50px_rgba(22,37,87,0.35)] transition-all duration-300 hover:-translate-y-1 group"
              >
                Build a Commercial Maintenance Plan
                <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] h-[420px] lg:h-[560px] reveal-right group relative">
              <img
                src="/mulching.webp"
                alt="Professional commercial landscaping and maintenance"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162557]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

          </div>
        </div>
      </section>


      {/* ╔════════════════════════════════════════════════════════════════════╗
          ║  SATISFACTION GUARANTEE                                          ║
          ╚════════════════════════════════════════════════════════════════════╝ */}
      <section id="guarantee" className="grain-overlay py-24 md:py-32 bg-gradient-to-br from-[#0a1f3d] via-[#162557] to-[#0d2040] text-white overflow-hidden relative">
        <div className="orb w-96 h-96 bg-secondary/12 top-0 right-0" />
        <div className="orb w-80 h-80 bg-[#53A245]/10 bottom-0 left-0" />

        <div className="max-w-[900px] mx-auto px-6 text-center relative z-10">

          {/* Shield icon with glow */}
          <div className="flex justify-center mb-8 reveal">
            <div className="relative">
              <div className="absolute inset-0 blur-2xl bg-secondary/40 rounded-full scale-150" />
              <div className="relative w-20 h-20 rounded-2xl glass border border-white/15 flex items-center justify-center shadow-2xl">
                <Shield className="w-10 h-10 text-[#FC8700]" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <h2 className="text-[36px] md:text-[48px] font-bold text-white leading-[1.15] mb-8 reveal">
            If It's Not Right,{' '}
            <span className="text-gradient-orange block">We Come Back. Period.</span>
          </h2>

          <div className="glass rounded-3xl p-8 md:p-10 mb-8 text-left reveal">
            <p className="text-[17px] md:text-[18px] text-white/85 leading-[1.8] mb-4">
              "We stand behind every job we do. If something isn't exactly as planned — a bed that needs a second pass, an edge that missed a line, an area that needs attention — we come back and fix it.
            </p>
            <p className="text-[18px] md:text-[20px] font-semibold text-white leading-[1.6]">
              No arguments. No extra charges. No questions asked."
            </p>
          </div>

          <p className="text-[17px] md:text-[18px] italic font-medium text-white/90 leading-[1.7] mb-6 max-w-[640px] mx-auto reveal">
            This isn't just a policy. It's how we were raised to do business.
          </p>
          <p className="text-[16px] md:text-[17px] text-white/70 leading-[1.7] max-w-[640px] mx-auto mb-12 reveal">
            Your property should make you proud every single time you pull into the driveway. That's the standard we hold ourselves to — and the promise we make to every client.
          </p>

          <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 reveal">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#FC8700] fill-[#FC8700]" />
              ))}
            </div>
            <span className="text-[13px] font-semibold text-white/90 tracking-wide">
              Trusted by South Shore Homeowners
            </span>
          </div>

          <div className="mt-12 reveal">
            <a
              href={estimateUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-[#FC8700] hover:bg-[#e07600] text-white font-bold text-[16px] px-10 py-4 rounded-full shadow-lg transition-all hover:-translate-y-1 group"
            >
              Experience the Difference
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>


      {/* ╔════════════════════════════════════════════════════════════════════╗
          ║  REVIEWS — SOCIAL PROOF (with client photos)                     ║
          ╚════════════════════════════════════════════════════════════════════╝ */}
      <section id="reviews" className="py-24 md:py-32 bg-gradient-to-b from-[#f5f6f7] to-[#f0f4f8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 reveal">
            <p className="text-[11px] font-archivo uppercase tracking-[0.4em] text-secondary mb-4">Client Reviews</p>
            <h2 className="text-3xl md:text-[44px] font-bold text-[#162557] mb-4 leading-tight">
              What Our Clients Are <span className="text-gradient-orange">Saying</span>
            </h2>
            <p className="text-[16px] md:text-[17px] text-[#555] leading-relaxed">
              Real feedback from South Shore homeowners — the kind of reliability you can feel after the first visit.
            </p>
          </div>

          {/* Stats bar */}
          <div className="max-w-4xl mx-auto mb-12 reveal">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { k: '100+', v: 'Happy clients' },
                { k: '5-star', v: 'Rated service' },
                { k: 'On-time', v: 'Reliable crews' },
                { k: 'Year-round', v: 'Seasonal coverage' },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-2xl border border-white bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] px-4 py-5 text-center hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="text-[#162557] text-xl md:text-2xl font-extrabold">{s.k}</div>
                  <div className="text-[#555] text-[12px] md:text-[13px] mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial cards — carousel */}
          <TestimonialsCarousel items={defaultTestimonials} />

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 reveal">
            <div className="flex items-center gap-3 text-[#555] text-[13px]">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 shadow-sm transition-all hover:border-[#FC8700]/40 hover:shadow-md hover:-translate-y-0.5"
              >
                <span className="font-extrabold text-[#162557]">Google</span>
                <span className="text-[#999]">•</span>
                <span>Reviews</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.yelp.com/biz/ferreira-landscape"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 shadow-sm transition-all hover:border-[#FC8700]/40 hover:shadow-md hover:-translate-y-0.5"
              >
                <span className="font-extrabold text-[#162557]">Yelp</span>
                <span className="text-[#999]">•</span>
                <span>Top rated</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <a
              href={estimateUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-[#FC8700] hover:bg-[#e07600] text-white font-extrabold px-8 py-4 rounded-full shadow-[0_18px_40px_rgba(252,135,0,0.25)] hover:shadow-[0_22px_50px_rgba(252,135,0,0.4)] transition-all hover:-translate-y-1 hover:scale-[1.03] inline-flex items-center gap-2 group"
            >
              Get Your Free Estimate
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>


      {/* ╔════════════════════════════════════════════════════════════════════╗
          ║  WHY CHOOSE FERREIRA (Dark glass cards)                          ║
          ╚════════════════════════════════════════════════════════════════════╝ */}
      <section id="about" className="py-24 md:py-32 bg-white scroll-mt-28 overflow-hidden relative">
        <div className="orb w-[600px] h-[600px] bg-secondary/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 relative z-10">

          <div className="text-center mb-14 md:mb-16 reveal">
            <p className="text-[11px] font-archivo uppercase tracking-[0.4em] text-secondary mb-4">Why Choose Us</p>
            <h2 className="text-[32px] md:text-[44px] font-bold text-[#162557] leading-tight">
              Why South Shore Families Choose <span className="text-gradient-orange">Ferreira Landscape</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-14">
            {([
              {
                icon: Clock,
                title: 'We Show Up',
                desc: "Scheduled visits, consistent crew, no excuses. You'll never wonder if we're coming.",
              },
              {
                icon: MapPin,
                title: 'We Know New England',
                desc: "Massachusetts soil, climate, and seasonal conditions aren't a learning curve for us. They're our specialty.",
              },
              {
                icon: Sparkles,
                title: 'We Care About Aesthetics',
                desc: 'Clean lines, balanced plantings, thoughtful design. We care about how your property looks, not just whether the grass is cut.',
              },
              {
                icon: MessageCircle,
                title: 'We Communicate Clearly',
                desc: "You always know what we did, what's coming next, and what to expect. No guesswork.",
              },
              {
                icon: Star,
                title: 'We Treat Your Home Like Ours',
                desc: 'Because to us, every property we care for is a reflection of who we are.',
              },
              {
                icon: Shield,
                title: 'We Stand Behind Our Work',
                desc: "If it's not right, we come back — no arguments, no extra charges, no questions asked.",
              },
            ] as const).map(({ icon: Icon, title, desc }, idx) => (
              <div
                key={title}
                className={`reveal reveal-delay-${Math.min(idx + 1, 6)} flex flex-col bg-[#f8f9fb] border border-[#162557]/5 rounded-2xl p-7 hover:bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden`}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-secondary/12 to-transparent pointer-events-none" />

                <div className="w-14 h-14 rounded-xl bg-secondary/15 flex items-center justify-center mb-5 group-hover:bg-secondary transition-all duration-500 relative">
                  <Icon className="w-7 h-7 text-secondary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#162557] mb-3 leading-snug relative">
                  {title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-[#555] leading-[1.7] relative">
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center reveal">
            <a
              href={estimateUrl}
              target="_blank"
              rel="noreferrer"
              className="pulse-cta bg-[#FC8700] hover:bg-[#e07600] text-white font-bold text-[16px] px-10 py-5 rounded-full transition-all hover:-translate-y-1 hover:scale-[1.03] inline-flex items-center gap-3 group"
            >
              Get Your Free Estimate
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>



      {/* ╔════════════════════════════════════════════════════════════════════╗
          ║  GALLERY — BENTO MASONRY + LIGHTBOX                             ║
          ╚════════════════════════════════════════════════════════════════════╝ */}
      <section id="gallery" className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 reveal">
            <p className="text-[11px] font-archivo uppercase tracking-[0.4em] text-secondary mb-4">Portfolio</p>
            <h2 className="text-3xl md:text-[44px] font-bold text-[#162557] mb-4 leading-tight">
              See the Difference <span className="text-gradient-orange">We Make</span>
            </h2>
            <p className="text-[16px] md:text-[17px] text-[#555] leading-relaxed">
              Real projects and real results — clean lines, healthy lawns, and outdoor spaces that feel finished.
            </p>
          </div>

          {/* Bento grid — 2 rows, varying sizes */}
          <div className="grid grid-cols-12 grid-rows-[260px_260px] gap-4 mb-4 reveal">
            {/* Large left — spans 2 rows */}
            <figure
              className="col-span-12 md:col-span-7 row-span-2 group relative rounded-2xl overflow-hidden cursor-pointer border border-black/5 shadow-[0_12px_30px_rgba(0,0,0,0.07)]"
              onClick={() => setLightbox({ src: '/lawn_care_real.webp', alt: 'Premium home with manicured landscape' })}
            >
              <img src="/lawn_care_real.webp" alt="Premium home with manicured landscape" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                <p className="text-white font-semibold text-[15px]">Premium Residential Landscape</p>
                <p className="text-white/70 text-[12px]">South Shore, MA</p>
              </div>

            </figure>
            {/* Top right */}
            <figure
              className="col-span-12 md:col-span-5 row-span-1 group relative rounded-2xl overflow-hidden cursor-pointer border border-black/5 shadow-[0_12px_30px_rgba(0,0,0,0.07)]"
              onClick={() => setLightbox({ src: '/gallery_patio.webp', alt: 'Outdoor living patio project' })}
            >
              <img src="/gallery_patio.webp" alt="Outdoor living patio project" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                <p className="text-white font-semibold text-[14px]">Outdoor Living Patio</p>
              </div>
            </figure>
            {/* Bottom right */}
            <figure
              className="col-span-12 md:col-span-5 row-span-1 group relative rounded-2xl overflow-hidden cursor-pointer border border-black/5 shadow-[0_12px_30px_rgba(0,0,0,0.07)]"
              onClick={() => setLightbox({ src: '/hardscape_service.webp', alt: 'Paver walkway and hardscape details' })}
            >
              <img src="/hardscape_service.webp" alt="Paver walkway and hardscape details" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                <p className="text-white font-semibold text-[14px]">Hardscape & Paver Work</p>
              </div>
            </figure>
          </div>

          {/* Second bento row */}
          <div className="grid grid-cols-12 grid-rows-[240px] gap-4 reveal">
            <figure
              className="col-span-12 md:col-span-4 row-span-1 group relative rounded-2xl overflow-hidden cursor-pointer border border-black/5 shadow-[0_12px_30px_rgba(0,0,0,0.07)]"
              onClick={() => setLightbox({ src: '/gallery_garden.webp', alt: 'Landscape planting and garden design' })}
            >
              <img src="/gallery_garden.webp" alt="Landscape planting and garden design" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                <p className="text-white font-semibold text-[14px]">Garden & Planting Design</p>
              </div>
            </figure>
            <figure
              className="col-span-12 md:col-span-4 row-span-1 group relative rounded-2xl overflow-hidden cursor-pointer border border-black/5 shadow-[0_12px_30px_rgba(0,0,0,0.07)]"
              onClick={() => setLightbox({ src: '/hero.webp', alt: 'Professional lawn care service result' })}
            >
              <img src="/hero.webp" alt="Professional lawn care service result" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                <p className="text-white font-semibold text-[14px]">Lawn Care Excellence</p>
              </div>
            </figure>
            <figure
              className="col-span-12 md:col-span-4 row-span-1 group relative rounded-2xl overflow-hidden cursor-pointer border border-black/5 shadow-[0_12px_30px_rgba(0,0,0,0.07)]"
              onClick={() => setLightbox({ src: '/snow_removal_service.webp', alt: 'Snow removal driveway cleared' })}
            >
              <img src="/snow_removal_service.webp" alt="Snow removal driveway cleared" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                <p className="text-white font-semibold text-[14px]">Winter Snow Removal</p>
              </div>
            </figure>
          </div>

          <p className="text-center text-[13px] text-[#999] mt-6 reveal">
            Click any photo to enlarge · Tap to close
          </p>
        </div>
      </section>


      {/* ╔════════════════════════════════════════════════════════════════════╗
          ║  SERVICE AREAS                                                   ║
          ╚════════════════════════════════════════════════════════════════════╝ */}
      <section id="service-areas" className="grain-overlay py-24 md:py-32 bg-gradient-to-br from-[#0f1e42] via-[#162557] to-[#0a1f3d] text-white text-center overflow-hidden relative">
        <div className="orb w-[500px] h-[500px] bg-secondary/8 top-1/2 right-0 translate-y-1/2" />

        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <p className="text-[11px] font-archivo tracking-[0.5em] text-secondary uppercase mb-6 reveal">Presence</p>
          <h2 className="text-[42px] md:text-[56px] font-bold leading-[1.2] tracking-tight mb-6 reveal">
            Proudly Serving the{' '}
            <span className="italic text-gradient-orange">South Shore Community</span>
          </h2>
          <p className="text-[17px] md:text-[18px] text-white/80 mb-8 reveal">
            We provide expert landscape care throughout:
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 mb-10 reveal">
            {['Hingham', 'Cohasset', 'Duxbury', 'Scituate', 'Norwell', 'Hanover', 'Marshfield', 'Pembroke', 'Halifax', 'Rockland', 'Weymouth'].map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-1.5 glass rounded-full px-5 py-2.5 text-[13px] font-semibold text-white/90 tracking-wide hover:bg-white/15 transition-colors duration-300 cursor-default"
              >
                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                {city}
              </span>
            ))}
          </div>

          <p className="text-[14px] md:text-[15px] text-white/60 max-w-[520px] mx-auto leading-relaxed reveal">
            Not sure if we cover your area? Give us a call — we're always looking to serve great properties.
          </p>
        </div>
      </section>



      {/* ╔════════════════════════════════════════════════════════════════════╗
          ║  FAQ — ACCORDION                                                 ║
          ╚════════════════════════════════════════════════════════════════════╝ */}
      <section id="faq" className="py-24 md:py-32 bg-[#f8f9fb] overflow-hidden">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <p className="text-[11px] font-archivo uppercase tracking-[0.4em] text-secondary mb-4">FAQ</p>
            <h2 className="text-[36px] md:text-[48px] font-bold text-[#162557]">
              Common Questions
            </h2>
          </div>
          <div className="bg-white rounded-3xl border border-black/5 px-6 md:px-10 pb-6 reveal">
            <FaqItem
              q="How often should my lawn be mowed?"
              a="During the growing season (May through October in Massachusetts), most lawns need weekly or bi-weekly mowing depending on grass type and growth rate. We'll recommend the right frequency for your specific property during your consultation."
            />
            <FaqItem
              q="What's the difference between sod and hydroseeding?"
              a="Sod gives you an instant lawn — it's rolled out and looks great immediately. Hydroseeding is a more cost-effective option that sprays a seed-and-mulch mixture across your lawn, growing in over a few weeks. Both produce excellent results; the right choice depends on your timeline and budget."
            />
            <FaqItem
              q="When should I schedule a spring cleanup?"
              a="Ideally, late March through April — once the ground has dried out and temperatures are consistently above freezing. Early cleanup prevents weeds from getting a head start and sets your lawn up for a strong growing season."
            />
            <FaqItem
              q="Do you offer one-time services or only ongoing programs?"
              a="Both. We offer ongoing maintenance programs as well as one-time services like cleanups, mulch installation, and aeration. That said, most clients find that ongoing programs deliver the best long-term results — and the best value."
            />
            <FaqItem
              q="What if I'm not happy with the work?"
              a="We come back and make it right — at no additional charge. We don't consider a job done until you're satisfied. That's our guarantee, and we stand behind it completely."
            />
            <FaqItem
              q="Do you serve both residential and commercial properties?"
              a="Yes. We work with homeowners, property managers, HOA communities, and commercial properties throughout the South Shore. Every program is customized to the property's specific needs."
            />
            <FaqItem
              q="Do you also design and build outdoor living spaces?"
              a="Absolutely. Our hardscape team designs and builds patios, walkways, retaining walls, fire pits, outdoor fireplaces, stone steps, and complete outdoor living areas. For larger projects, we work with a professional designer to create a 3D visual before construction begins — so you can see exactly what your space will look like."
            />
            <FaqItem
              q="How do I get started?"
              a="Call or text us at +1 (781) 490-8272, or send an email to contact@ferreiralandscape.com. We'll schedule a free on-site consultation, walk your property together, and build a plan around what it actually needs."
              highlight
            />
          </div>
        </div>
      </section>


      {/* ╔════════════════════════════════════════════════════════════════════╗
          ║  CONTACT / QUOTE FORM                                            ║
          ╚════════════════════════════════════════════════════════════════════╝ */}
      <section id="contact" className="py-24 md:py-32 bg-white overflow-hidden relative">
        <div className="orb w-[500px] h-[500px] bg-secondary/8 -bottom-40 -right-40 pointer-events-none" />
        <div className="orb w-[400px] h-[400px] bg-[#162557]/5 -top-32 -left-32 pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">

          {/* Heading */}
          <div className="text-center mb-10 reveal-scale">
            <p className="text-[11px] font-archivo uppercase tracking-[0.4em] text-secondary mb-4">Get In Touch</p>
            <h2 className="text-3xl md:text-[46px] font-bold text-[#162557] mb-4 leading-tight">
              Get a Fast Quote —{' '}
              <span className="text-gradient-orange">We'll Reply Within 1 Business Day</span>
            </h2>
            <p className="text-[14px] font-semibold text-secondary">
              ⚡ Spring slots are going fast. Request yours now.
            </p>
          </div>

          {/* Contact pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 reveal">
            <a href="tel:+17814908272" className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#f8f9fb] border border-[#162557]/10 text-[#162557] hover:bg-white hover:shadow-md transition-all text-[14px] font-semibold">
              <Phone className="w-4 h-4 text-secondary shrink-0" />
              +1 (781) 490-8272
            </a>
            <a href="mailto:contact@ferreiralandscape.com" className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#f8f9fb] border border-[#162557]/10 text-[#162557] hover:bg-white hover:shadow-md transition-all text-[14px] font-semibold">
              <Mail className="w-4 h-4 text-secondary shrink-0" />
              contact@ferreiralandscape.com
            </a>

          </div>

          {/* Jobber form card */}
          <div className="bg-white rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.25)] overflow-hidden reveal-scale">
            <JobberForm />
          </div>

          {/* Trust line */}
          <div className="flex items-center justify-center gap-2 mt-8 reveal">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />)}
            <span className="text-[13px] text-[#555] italic ml-1">"Trusted by 100+ South Shore homeowners"</span>
          </div>
        </div>
      </section>


      {/* ╔════════════════════════════════════════════════════════════════════╗
          ║  FINAL CTA — CINEMATIC                                           ║
          ╚════════════════════════════════════════════════════════════════════╝ */}
      <section className="relative py-28 md:py-40 overflow-hidden text-center text-white">
        <img src="/svc_lawn_care.webp" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center scale-105" />
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f3d]/92 via-[#162557]/85 to-[#0a1f3d]/90" />
        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '256px' }} />

        <div className="relative z-10 max-w-[900px] mx-auto px-6">
          <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-2.5 mb-8 text-[11px] uppercase tracking-widest font-archivo text-white/80">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Limited Spring Slots Available
          </div>

          <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.15] mb-6 reveal">
            Your Property's Best Season{' '}
            <span className="text-gradient-orange block">Starts Now.</span>
          </h2>

          <p className="text-[16px] md:text-[18px] text-white/85 leading-[1.7] mb-5 max-w-[720px] mx-auto reveal">
            Stop putting it off. Whether your lawn needs a fresh start, your beds need attention, your outdoor space needs a complete transformation — or you just want someone you can finally rely on — we're ready.
          </p>

          <p className="text-[17px] md:text-[18px] font-semibold text-white/95 mb-10 reveal">
            Ferreira Landscape. Consistent care. Exceptional results. Zero headaches.
          </p>

          <div className="mb-8 reveal">
            <a
              href={estimateUrl}
              target="_blank"
              rel="noreferrer"
              className="pulse-cta bg-[#FC8700] hover:bg-[#e07600] text-white font-bold text-[16px] px-12 py-5 rounded-full transition-all hover:-translate-y-1 hover:scale-[1.05] inline-flex items-center gap-3 w-full sm:w-auto justify-center group"
            >
              Schedule Your Free Consultation Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-8 text-[14px] text-white/70 reveal">
            <a href="tel:+17814908272" className="inline-flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-[#FC8700]" />
              Call +1 (781) 490-8272
            </a>
            <span className="text-white/25 hidden sm:inline">•</span>
            <span>Free Estimate</span>
            <span className="text-white/25 hidden sm:inline">•</span>
            <span>No Obligation</span>
            <span className="text-white/25 hidden sm:inline">•</span>
            <span>Licensed & Insured</span>
          </div>
        </div>
      </section>


      {/* ╔════════════════════════════════════════════════════════════════════╗
          ║  FOOTER                                                          ║
          ╚════════════════════════════════════════════════════════════════════╝ */}
      <footer className="grain-overlay bg-[#162557] text-gray-300 relative overflow-hidden">
        {/* Subtle orb */}
        <div className="orb w-[500px] h-[500px] bg-secondary/5 top-0 right-0" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-20 pb-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

            {/* Column 1 — Logo + Contact */}
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-5">
                <picture>
                  <source srcSet="/logo_main_white.webp" type="image/webp" />
                  <img src="/logo_main_white.png" alt="Ferreira Landscape" className="h-10 w-auto" />
                </picture>
              </div>
              <p className="text-[13px] text-white/50 leading-relaxed mb-5 text-center md:text-left">
                Premium landscape care for South Shore families. Reliable, consistent, and detail-obsessed.
              </p>
              <h3 className="text-white font-semibold text-sm mb-4">Contact Us</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Phone className="w-4 h-4 text-[#FC8700] flex-shrink-0" />
                  <a href="tel:+17814908272" className="hover:text-[#FC8700] transition-colors">+1 (781) 490-8272</a>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Mail className="w-4 h-4 text-[#FC8700] flex-shrink-0" />
                  <a href="mailto:contact@ferreiralandscape.com" className="hover:text-[#FC8700] transition-colors text-[12px]">contact@ferreiralandscape.com</a>
                </div>
                <div className="flex items-start gap-3 justify-center md:justify-start">
                  <MapPin className="w-4 h-4 text-[#FC8700] flex-shrink-0 mt-0.5" />
                  <span>66 High St, Hanson, MA 02341</span>
                </div>
              </div>
            </div>

            {/* Column 2 — Services */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Services</h3>
              <ul className="space-y-2.5">
                {[
                  { label: 'Lawn & Property Maintenance', to: '/services' },
                  { label: 'Lawn Health & Restoration', to: '/services' },
                  { label: 'Landscape Design & Installation', to: '/services' },
                  { label: 'Hardscape Services', to: '/hardscape-services' },
                  { label: 'Snow & Ice Management', to: '/services' },
                ].map((s) => (
                  <li key={s.label}>
                    <Link to={s.to} className="text-sm text-gray-400 hover:text-[#FC8700] transition-colors flex items-center gap-1.5 justify-center md:justify-start group">
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#FC8700] transition-all -ml-4 group-hover:ml-0" />
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Service Areas */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Service Areas</h3>
              <ul className="space-y-2.5">
                {[
                  { label: 'Hingham, MA', to: '/locations' },
                  { label: 'Cohasset, MA', to: '/locations' },
                  { label: 'Duxbury, MA', to: '/locations' },
                  { label: 'Scituate, MA', to: '/locations' },
                  { label: 'Norwell, MA', to: '/locations' },
                  { label: 'Hanover, MA', to: '/locations' },
                ].map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-gray-400 hover:text-[#FC8700] transition-colors flex items-center gap-1.5 justify-center md:justify-start group">
                      <MapPin className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#FC8700] transition-all" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Hours + CTA */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Business Hours</h3>
              <ul className="space-y-2.5 text-sm mb-10">
                {[
                  { day: 'Monday – Friday', hours: '7:00 AM – 6:00 PM' },
                  { day: 'Saturday', hours: '8:00 AM – 4:00 PM' },
                  { day: 'Sunday', hours: 'Closed' },
                ].map(({ day, hours }) => (
                  <li key={day} className="flex justify-between gap-4 max-w-[220px] mx-auto md:mx-0">
                    <span className="text-gray-400">{day}</span>
                    <span className="text-gray-300 font-medium">{hours}</span>
                  </li>
                ))}
              </ul>
              <a
                href={estimateUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center bg-[#FC8700] hover:bg-[#e07800] text-white text-sm font-bold px-5 py-3.5 rounded-xl shadow-[0_8px_24px_rgba(252,135,0,0.25)] hover:shadow-[0_12px_32px_rgba(252,135,0,0.4)] transition-all hover:-translate-y-0.5 inline-block"
              >
                Get Free Estimate →
              </a>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[13px] text-gray-500">
              &copy; {new Date().getFullYear()} Ferreira Landscape · South Shore, Massachusetts · Licensed & Insured
            </p>
            <div className="flex items-center gap-5 text-[13px]">
              <Link
                to="/privacy-policy"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-[#FC8700] transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-white/15">|</span>
              <Link
                to="/terms-of-services"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-[#FC8700] transition-colors"
              >
                Terms of Services
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
    {showToTop && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] w-12 h-12 rounded-full bg-[#162557] text-white shadow-2xl flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all duration-300 animate-fade-in group"
        aria-label="Back to top"
      >
        <ChevronsUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
      </button>
    )}
    </>
  )
}
