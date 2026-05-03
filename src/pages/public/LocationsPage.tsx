import { SectionContainer, SectionHeader } from '@/components/public/SectionContainer'
import { LocationCard } from '@/components/public/LocationCard'
import { CtaBlock } from '@/components/public/CtaBlock'
import { useCmsStore } from '@/stores/cmsStore'
import { useSEO } from '@/hooks/useSEO'

export function LocationsPage() {
  useSEO({
    title: 'Service Areas South Shore MA | Ferreira Landscape',
    description: 'Ferreira Landscape serves Hingham, Cohasset, Duxbury, Scituate, Norwell, Marshfield, and surrounding South Shore communities.',
    canonical: '/locations',
  })
  const locations = useCmsStore((s) => s.locations).filter((l) => l.status === 'published')

  return (
    <div>
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Where We Serve
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Locations</h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            With 5 regional offices across the country, GreenScape Pro brings local expertise and
            national standards to your community.
          </p>
        </div>
      </div>

      <SectionContainer>
        <SectionHeader
          title="Find Your Local GreenScape Pro"
          subtitle="Each regional office is staffed by local experts who understand the unique climate, soil, and plant challenges in your area."
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="bg-gray-50">
        <CtaBlock
          title="Not Sure Which Office to Contact?"
          subtitle="Call our main line and we'll connect you with the right regional team for your property."
        />
      </SectionContainer>
    </div>
  )
}
