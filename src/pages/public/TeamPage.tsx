import { SectionContainer, SectionHeader } from '@/components/public/SectionContainer'
import { TeamCard } from '@/components/public/TeamCard'
import { CtaBlock } from '@/components/public/CtaBlock'
import { useCmsStore } from '@/stores/cmsStore'
import { useSEO } from '@/hooks/useSEO'

export function TeamPage() {
  useSEO({
    title: 'Our Team | Ferreira Landscape South Shore MA',
    description: 'Meet the Ferreira Landscape team — experienced landscaping professionals serving South Shore, MA families and businesses.',
    canonical: '/team',
  })
  const teamMembers = useCmsStore((s) => s.teamMembers)
    .filter((m) => m.status === 'published')
    .sort((a, b) => a.order - b.order)

  return (
    <div>
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Our People
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Meet the Team</h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            GreenScape Pro is powered by passionate professionals — certified arborists, landscape
            architects, and agronomists who love what they do.
          </p>
        </div>
      </div>

      <SectionContainer>
        <SectionHeader
          eyebrow="Leadership Team"
          title="The People Behind GreenScape Pro"
          subtitle="Our leadership team combines decades of industry expertise with a shared passion for sustainable, beautiful landscapes."
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="bg-primary/5 border-y border-primary/10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Growing Team</h2>
          <p className="text-gray-600 mb-6">
            We're always looking for talented, passionate professionals to join GreenScape Pro. From
            crew positions to management roles, we invest in our people.
          </p>
          <a
            href="mailto:careers@greenscapepro.com"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            careers@greenscapepro.com
          </a>
        </div>
      </SectionContainer>

      <SectionContainer>
        <CtaBlock />
      </SectionContainer>
    </div>
  )
}
