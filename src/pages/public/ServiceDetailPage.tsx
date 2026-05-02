import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionContainer } from '@/components/public/SectionContainer'
import { CtaBlock } from '@/components/public/CtaBlock'
import { useCmsStore } from '@/stores/cmsStore'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const services = useCmsStore((s) => s.services)
  const service = services.find((s) => s.slug === slug)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Service not found</h1>
        <Button asChild>
          <Link to="/services">Back to Services</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[60vh] flex items-end overflow-hidden">
        <img
          src={service.hero_image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <Link
            to="/services"
            className="text-sm text-gray-300 hover:text-white mb-4 flex items-center gap-1 transition-colors w-fit"
          >
            ← All Services
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">{service.title}</h1>
          <p className="text-lg text-gray-300 max-w-2xl">{service.summary}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            {/* Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />

            {/* Process Steps */}
            {service.process_steps.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Process</h2>
                <div className="space-y-4">
                  {service.process_steps.map((step) => (
                    <div key={step.step} className="flex gap-4 p-5 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">0{step.step}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            {service.faq.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {service.faq.map((item, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      >
                        <span className="font-medium text-gray-900">{item.question}</span>
                        <ChevronDown
                          className={cn(
                            'w-5 h-5 text-gray-400 transition-transform flex-shrink-0',
                            openFaq === i && 'rotate-180'
                          )}
                        />
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Service Benefits</h3>
              <ul className="space-y-3 mb-6">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full" size="lg">
                <a
                  href="https://clienthub.getjobber.com/hubs/c144b3b0-97d1-4b17-94f5-a8dbdeed9417/public/requests/2470408/new?utm_source=google&source=social_media"
                  target="_blank"
                  rel="noreferrer"
                >
                  {service.cta_text}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <p className="text-sm font-semibold text-primary mb-2">Ready to Get Started?</p>
              <p className="text-sm text-gray-600 mb-4">
                Our team is available Monday–Saturday, 7am–6pm. Same-day estimates available for most services.
              </p>
              <a href="tel:+17814908272" className="text-lg font-bold text-primary hover:underline">
                (781) 490-8272
              </a>
            </div>
          </div>
        </div>
      </div>

      <SectionContainer className="bg-gray-50">
        <CtaBlock
          title={service.cta_text}
          primaryLabel="Request an Estimate"
        />
      </SectionContainer>
    </div>
  )
}
