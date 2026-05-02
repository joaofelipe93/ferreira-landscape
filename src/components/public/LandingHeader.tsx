import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Menu, X, ArrowRight, MapPin, Phone } from 'lucide-react'

type NavItem = { label: string; sectionId: string }

const NAV: NavItem[] = [
  { label: 'Home', sectionId: 'top' },
  { label: 'Services', sectionId: 'services' },
  { label: 'About', sectionId: 'about' },
  { label: 'Portfolio', sectionId: 'gallery' },
  { label: 'Service Areas', sectionId: 'service-areas' },
  { label: 'FAQ', sectionId: 'faq' },
  { label: 'Contact', sectionId: 'contact' },
]

export function LandingHeader() {
  const headerRef = useRef<HTMLDivElement | null>(null)
  const [isCompact, setIsCompact] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('top')

  const estimateUrl = 'https://clienthub.getjobber.com/hubs/c144b3b0-97d1-4b17-94f5-a8dbdeed9417/public/requests/2470408/new?utm_source=google&source=social_media'

  const sectionIds = useMemo(() => NAV.map((n) => n.sectionId), [])

  const scrollToSection = (id: string) => {
    if (id === 'contact') {
      window.open(estimateUrl, '_blank', 'noreferrer')
      setMobileOpen(false)
      return
    }
    const el = document.getElementById(id)
    if (!el) return
    const y = window.scrollY + el.getBoundingClientRect().top - (isCompact ? 80 : 100)
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
    setMobileOpen(false)
    const hash = id === 'top' ? window.location.pathname : `#${id}`
    window.history.pushState(null, '', hash)
  }

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY
      setIsCompact(scrollPos > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((x): x is HTMLElement => Boolean(x))

    if (!els.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))
        const top = visible[0]
        if (top?.target?.id) setActiveSection(top.target.id)
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '-10% 0px -60% 0px',
      }
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [sectionIds])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  return (
    <>
      {/* Header Container */}
      <div ref={headerRef} className="sticky top-0 z-[100]">
        {/* Top Bar */}
        <div className="bg-[#162557] border-b border-white/10 relative z-10">
          <div className="max-w-[1440px] mx-auto px-8 py-2 flex flex-col md:flex-row items-center md:justify-end lg:justify-between gap-1 md:gap-0">
            {/* Left — location */}
            <div className="hidden lg:flex items-center gap-[6px] text-[13px] font-light tracking-[0.02em] text-white/80">
              <MapPin className="w-[13px] h-[13px] opacity-80 shrink-0" />
              <span>South Shore, MA Specialists</span>
            </div>
            {/* Right — phone + email */}
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 lg:gap-8">
              <a
                href="tel:+17814908272"
                className="flex items-center gap-[6px] text-[12px] sm:text-[13px] font-light tracking-[0.02em] text-white/80 hover:text-[#FC8700] transition-colors duration-200 whitespace-nowrap"
              >
                <Phone className="w-[13px] h-[13px] opacity-80 shrink-0" />
                (781) 490-8272
              </a>
              <a
                href="mailto:contact@ferreiralandscape.com"
                className="flex items-center gap-[6px] text-[12px] sm:text-[13px] font-light tracking-[0.02em] text-white/80 hover:text-[#FC8700] transition-colors duration-200 whitespace-nowrap"
              >
                <Mail className="w-[13px] h-[13px] opacity-80 shrink-0" />
                contact@ferreiralandscape.com
              </a>
            </div>
          </div>
        </div>

        {/* Main Header Content */}
        <div
          className={[
            'bg-white/95 backdrop-blur-xl border-b border-primary/5',
            'transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)',
            isCompact ? 'py-2 sm:py-3 shadow-[0_15px_40px_rgba(22,37,87,0.12)]' : 'py-4 sm:py-6 shadow-[0_10px_30px_rgba(22,37,87,0.04)]',
          ].join(' ')}
        >
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => scrollToSection('top')}
                  className="flex items-center text-left group"
                  aria-label="Go to top"
                >
                  <div className="relative">
                    <picture>
                      <source srcSet="/logo_main.webp" type="image/webp" />
                      <img
                        src="/logo_main.png"
                        alt="Ferreira Landscape"
                        className={['w-auto transition-all duration-500 ease-in-out', isCompact ? 'h-[36px] sm:h-[42px]' : 'h-[50px] sm:h-[62px]'].join(' ')}
                      />
                    </picture>
                  </div>
                </button>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex flex-1 justify-center items-center gap-10 xl:gap-11">
                {NAV.map((item) => {
                  const isActive = activeSection === item.sectionId
                  return (
                    <button
                      key={item.sectionId}
                      type="button"
                      onClick={() => scrollToSection(item.sectionId)}
                      className={[
                        'relative text-[12px] font-archivo tracking-[0.1em] uppercase font-normal transition-all duration-300 py-2',
                        isActive ? 'text-secondary' : 'text-primary/70 hover:text-primary',
                      ].join(' ')}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                      <span className={[
                        'absolute bottom-0 left-0 h-[2px] bg-secondary rounded-full transition-all duration-500',
                        isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                      ].join(' ')} />
                    </button>
                  )
                })}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-4">
                <a
                  href={estimateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={[
                    'hidden sm:inline-flex items-center justify-center gap-2',
                    'bg-secondary text-white font-archivo font-bold',
                    'rounded-full shadow-[0_12px_35px_rgba(252,135,0,0.25)]',
                    'transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)',
                    'hover:bg-[#ff9500] hover:scale-[1.03] active:scale-95',
                    isCompact ? 'px-7 py-3 text-[10px] tracking-widest uppercase' : 'px-8 py-4 text-[11px] tracking-[0.15em] uppercase',
                  ].join(' ')}
                >
                  → GET FREE ESTIMATE
                </a>

                {/* Mobile Toggle */}
                <button
                  type="button"
                  className="lg:hidden p-3 rounded-2xl text-primary bg-primary/5 hover:bg-primary/10 transition-all"
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar — OUTSIDE of sticky container */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-[200]">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl flex flex-col"
            >
              <div className="px-6 py-6 border-b border-primary/5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false)
                    scrollToSection('top')
                  }}
                  className="flex items-center"
                >
                  <picture>
                    <source srcSet="/logo_main.webp" type="image/webp" />
                    <img
                      src="/logo_main.png"
                      alt="Ferreira Landscape"
                      className="h-[38px] w-auto"
                    />
                  </picture>
                </button>
                <button
                  type="button"
                  className="p-2.5 rounded-xl text-primary bg-primary/5 hover:bg-primary/10 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 px-6 py-8 overflow-y-auto">
                <div className="flex flex-col gap-1">
                  {NAV.map((item) => {
                    const isActive = activeSection === item.sectionId
                    return (
                      <button
                        key={item.sectionId}
                        type="button"
                        onClick={() => {
                          setMobileOpen(false)
                          scrollToSection(item.sectionId)
                        }}
                        className={[
                          'w-full text-left px-5 py-3.5 rounded-xl transition-all duration-300',
                          isActive 
                            ? 'bg-secondary/8 text-secondary font-bold' 
                            : 'text-primary/70 hover:bg-primary/5 hover:text-primary',
                          'text-[14px] font-archivo tracking-wider uppercase',
                        ].join(' ')}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="p-6 border-t border-primary/5 bg-primary/[0.02]">
                <a
                  href={estimateUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="w-full bg-secondary hover:bg-[#ff9500] text-white font-archivo font-bold rounded-xl py-4 shadow-lg shadow-secondary/20 transition-all flex items-center justify-center gap-3 uppercase text-[12px] tracking-widest"
                >
                  Get Free Estimate <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
