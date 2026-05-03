import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

const services = [
  { label: 'Lawn & Property Maintenance', href: '/services' },
  { label: 'Lawn Health & Restoration', href: '/services' },
  { label: 'Landscape Design & Installation', href: '/services' },
  { label: 'Hardscape Services', href: '/hardscape' },
  { label: 'Snow & Ice Management', href: '/services' },
]

const serviceAreas = [
  { label: 'Hingham, MA', href: '/locations' },
  { label: 'Cohasset, MA', href: '/locations' },
  { label: 'Duxbury, MA', href: '/locations' },
  { label: 'Scituate, MA', href: '/locations' },
  { label: 'Norwell, MA', href: '/locations' },
  { label: 'Hanover, MA', href: '/locations' },
]

const businessHours = [
  { day: 'Monday – Friday', hours: '7:00 AM – 6:00 PM' },
  { day: 'Saturday', hours: '8:00 AM – 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
]

export function Footer() {
  return (
    <footer className="bg-[#162556] text-gray-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Column 1: Logo + Contact */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="inline-block mb-5">
              <picture>
                <source srcSet="/logo_main_white.webp" type="image/webp" />
                <img src="/logo_main_white.png" alt="Ferreira Landscape" className="h-10 w-auto" />
              </picture>
            </Link>
            <h3 className="text-white font-semibold text-sm mb-4">Contact Ferreira Landscape</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-[#FC8700] flex-shrink-0" />
                <a href="tel:+17814908272" className="hover:text-[#FC8700] transition-colors">
                  +1 (781) 490-8272
                </a>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-[#FC8700] flex-shrink-0" />
                <a href="mailto:contact@ferreiralandscape.com" className="hover:text-[#FC8700] transition-colors">
                  contact@ferreiralandscape.com
                </a>
              </div>
              <div className="flex items-start gap-3 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-[#FC8700] flex-shrink-0 mt-0.5" />
                <span>66 High St, Hanson, MA 02341</span>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    to={s.href}
                    className="text-sm text-gray-400 hover:text-[#FC8700] transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Areas */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {serviceAreas.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-sm text-gray-400 hover:text-[#FC8700] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Business Hours + CTA */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-2 text-sm">
              {businessHours.map(({ day, hours }) => (
                <li key={day} className="flex justify-between gap-4 max-w-[220px] mx-auto md:mx-0">
                  <span className="text-gray-400">{day}</span>
                  <span className="text-gray-300 font-medium">{hours}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <a
                href="https://clienthub.getjobber.com/hubs/c144b3b0-97d1-4b17-94f5-a8dbdeed9417/public/requests/2470408/new?utm_source=google&source=social_media"
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center bg-[#FC8700] text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-[#e07800] transition-colors"
              >
                Get Free Estimate
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[13px] text-gray-500">
            &copy; {new Date().getFullYear()} Ferreira Landscape · South Shore, Massachusetts
          </p>
          <div className="flex items-center gap-4 text-[13px]">
            <Link
              to="/privacy-policy"
              className="text-gray-400 opacity-70 hover:opacity-100 hover:text-[#FC8700] transition-all duration-200 focus:outline-none"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              to="/terms-of-services"
              className="text-gray-400 opacity-70 hover:opacity-100 hover:text-[#FC8700] transition-all duration-200 focus:outline-none"
            >
              Terms of Services
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
