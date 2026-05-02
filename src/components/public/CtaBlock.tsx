import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CtaBlockProps {
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
  showPhone?: boolean
}

export function CtaBlock({
  title = 'Ready to Transform Your Outdoor Space?',
  subtitle = "Get a free, no-obligation estimate from one of our certified landscape professionals. We'll assess your property and design a custom plan.",
  primaryLabel = 'Get a Free Quote',
  primaryHref = 'https://clienthub.getjobber.com/hubs/c144b3b0-97d1-4b17-94f5-a8dbdeed9417/public/requests/2470408/new?utm_source=google&source=social_media',
  showPhone = true,
}: CtaBlockProps) {
  const isExternal = primaryHref.startsWith('http')

  return (
    <div className="relative bg-primary rounded-3xl overflow-hidden py-16 px-8 md:px-16 text-center text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white" />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-green-100 mb-8">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="xl" className="bg-white text-primary hover:bg-green-50">
            {isExternal ? (
              <a href={primaryHref} target="_blank" rel="noreferrer">
                {primaryLabel}
                <ArrowRight className="w-5 h-5" />
              </a>
            ) : (
              <Link to={primaryHref}>
                {primaryLabel}
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </Button>
          {showPhone && (
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10"
            >
              <a href="tel:+17814908272">
                <Phone className="w-5 h-5" />
                (781) 490-8272
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
