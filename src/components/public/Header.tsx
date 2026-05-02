import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ArrowRight, MapPin, Phone, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/#gallery' },
  { label: 'Service Areas', href: '/#service-areas' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: 'https://clienthub.getjobber.com/hubs/c144b3b0-97d1-4b17-94f5-a8dbdeed9417/public/requests/2470408/new?utm_source=google&source=social_media' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsCompact(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const phoneHref = 'tel:+17814908272'
  const phoneNumber = '+1 (781) 490-8272'

  return (
    <div className="sticky top-0 z-[100]">
      {/* Top Bar */}
      <div className="bg-[#162557] border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-2 flex flex-col md:flex-row items-center md:justify-between gap-1 md:gap-0">
          {/* Left — location */}
          <div className="flex items-center gap-[6px] text-[13px] font-medium tracking-[0.02em] text-white/80">
            <MapPin className="w-[13px] h-[13px] opacity-80 shrink-0" />
            <span>South Shore, MA Specialists</span>
          </div>

          {/* Right — phone + email */}
          <div className="flex items-center gap-6 md:gap-8">
            <a
              href="tel:+17814908272"
              className="flex items-center gap-[6px] text-[13px] font-medium tracking-[0.02em] text-white/80 hover:text-[#FC8700] transition-colors duration-200"
            >
              <Phone className="w-[13px] h-[13px] opacity-80 shrink-0" />
              (781) 490-8272
            </a>
            <a
              href="mailto:contact@ferreiralandscape.com"
              className="flex items-center gap-[6px] text-[13px] font-medium tracking-[0.02em] text-white/80 hover:text-[#FC8700] transition-colors duration-200"
            >
              <Mail className="w-[13px] h-[13px] opacity-80 shrink-0" />
              contact@ferreiralandscape.com
            </a>
          </div>
        </div>
      </div>

      <header className={cn(
        "bg-white/95 backdrop-blur-xl border-b border-primary/5 transition-all duration-500 ease-in-out",
        isCompact ? "py-3 shadow-[0_15px_40px_rgba(22,37,87,0.12)]" : "py-6 shadow-[0_10px_30px_rgba(22,37,87,0.04)]"
      )}>
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <div className="relative">
                  <picture>
                    <source srcSet="/logo_main.webp" type="image/webp" />
                    <img 
                      src="/logo_main.png" 
                      alt="Ferreira Landscape" 
                      className={cn("w-auto transition-all duration-500", isCompact ? "h-[42px]" : "h-[62px]")} 
                    />
                  </picture>
                </div>
              </Link>
            </div>

            {/* Centered Menu Section */}
            <nav className="hidden lg:flex flex-1 justify-center items-center gap-10 xl:gap-11">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) => cn(
                    'relative px-1 py-2 text-[12px] font-archivo font-light uppercase tracking-[0.12em] transition-all duration-300 group',
                    isActive ? 'text-secondary' : 'text-primary/70 hover:text-primary'
                  )}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-secondary rounded-full transition-all duration-500 group-hover:w-full" />
                </NavLink>
              ))}
            </nav>

            {/* Actions Section (Phone + CTA) */}
            <div className="flex items-center gap-7 xl:gap-9">
              {/* Phone Link */}
              <a
                href={phoneHref}
                className="hidden xl:block text-[15px] font-archivo font-medium tracking-[0.02em] text-primary/80 hover:text-secondary transition-all duration-300 whitespace-nowrap leading-none"
              >
                {phoneNumber}
              </a>

              {/* Conversion Button */}
              <div className="flex items-center gap-4">
                <a
                  href="https://clienthub.getjobber.com/hubs/c144b3b0-97d1-4b17-94f5-a8dbdeed9417/public/requests/2470408/new?utm_source=google&source=social_media"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 bg-secondary text-white font-archivo font-bold rounded-full transition-all duration-500 shadow-[0_12px_35px_rgba(252,135,0,0.25)] cubic-bezier(0.34, 1.56, 0.64, 1) hover:bg-[#ff9500] hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(252,135,0,0.35)] active:scale-95",
                    isCompact ? "px-7 py-3 text-[10px] tracking-widest uppercase" : "px-8 py-4 text-[11px] tracking-[0.15em] uppercase"
                  )}
                >
                  → GET FREE ESTIMATE
                </a>

                {/* Mobile Menu Toggle */}
                <button
                  className="lg:hidden p-3 rounded-2xl text-primary bg-primary/5 hover:bg-primary/10 transition-all active:scale-90"
                  onClick={() => setMobileOpen(!mobileOpen)}
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu sidebar */}
        {mobileOpen && (
          <div className="lg:hidden">
            <button
              className="fixed inset-0 bg-primary/60 backdrop-blur-md z-40 animate-fade-in"
              onClick={() => setMobileOpen(false)}
            />
            <div className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 shadow-2xl flex flex-col border-l border-primary/5 transition-transform duration-500">
              <div className="px-8 py-8 border-b border-primary/5 flex items-center justify-between bg-premium-cream/30">
                <Link to="/" onClick={() => setMobileOpen(false)}>
                  <picture>
                    <source srcSet="/logo_main.webp" type="image/webp" />
                    <img 
                      src="/logo_main.png" 
                      alt="Ferreira Landscape" 
                      className="h-[42px] w-auto" 
                    />
                  </picture>
                </Link>
                <button
                  className="p-3 rounded-2xl text-primary bg-primary/5 hover:bg-primary/10 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 px-6 py-8 overflow-y-auto bg-white">
                <div className="flex flex-col gap-1.5">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.href}
                      to={link.href}
                      className={({ isActive }) => cn(
                        'w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 text-[13px] font-archivo tracking-[0.1em] uppercase',
                        isActive ? 'bg-secondary/10 text-secondary font-bold' : 'text-primary/70 hover:bg-primary/5 hover:text-primary'
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-primary/5 space-y-4">
                  <a
                    href="https://clienthub.getjobber.com/hubs/c144b3b0-97d1-4b17-94f5-a8dbdeed9417/public/requests/2470408/new?utm_source=google&source=social_media"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-secondary hover:bg-[#ff9500] text-white font-archivo font-bold rounded-2xl py-5 shadow-xl transition-all flex items-center justify-center gap-3 uppercase text-[11px] tracking-widest active:scale-95"
                    onClick={() => setMobileOpen(false)}
                  >
                    GET FREE ESTIMATE <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}
