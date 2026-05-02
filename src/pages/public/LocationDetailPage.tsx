import { useParams, Link } from 'react-router-dom'
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionContainer } from '@/components/public/SectionContainer'
import { CtaBlock } from '@/components/public/CtaBlock'
import { useCmsStore } from '@/stores/cmsStore'

export function LocationDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const locations = useCmsStore((s) => s.locations)
  const location = locations.find((l) => l.slug === slug)

  if (!location) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Location not found</h1>
        <Button asChild>
          <Link to="/locations">Back to Locations</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="relative h-[60vh] flex items-end overflow-hidden">
        <img
          src={location.hero_image}
          alt={`${location.city}, ${location.state}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <Link
            to="/locations"
            className="text-sm text-gray-300 hover:text-white mb-4 flex items-center gap-1 transition-colors w-fit"
          >
            ← All Locations
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">{location.state}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            {location.city}, {location.state}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">{location.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Services Available in {location.city}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {location.services_offered.map((service) => (
                <div key={service} className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-800">{service}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Service Area</h3>
              <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Map integration available with Google Maps API</p>
                  <p className="text-xs mt-1">
                    Coordinates: {location.map_coordinates.lat}, {location.map_coordinates.lng}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-gray-900 mb-5">Contact This Office</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Address</p>
                    <p className="text-sm text-gray-800">{location.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <a
                      href={`tel:${location.contact_phone.replace(/\D/g, '')}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {location.contact_phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <a
                      href={`mailto:${location.contact_email}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {location.contact_email}
                    </a>
                  </div>
                </div>
              </div>
              <Button asChild className="w-full">
                <a
                  href="https://clienthub.getjobber.com/hubs/c144b3b0-97d1-4b17-94f5-a8dbdeed9417/public/requests/2470408/new?utm_source=google&source=social_media"
                  target="_blank"
                  rel="noreferrer"
                >
                  Request a Quote
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <SectionContainer className="bg-gray-50">
        <CtaBlock
          title={`Ready to Get Started in ${location.city}?`}
          subtitle={`Our ${location.city} team is standing by. Get a free estimate today.`}
        />
      </SectionContainer>
    </div>
  )
}
