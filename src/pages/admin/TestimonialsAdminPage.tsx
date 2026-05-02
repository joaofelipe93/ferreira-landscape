import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ContentTable } from '@/components/admin/ContentTable'
import { useCmsStore } from '@/stores/cmsStore'
import type { Testimonial } from '@/types'

export function TestimonialsAdminPage() {
  const testimonials = useCmsStore((s) => s.testimonials)
  const deleteTestimonial = useCmsStore((s) => s.deleteTestimonial)
  const updateTestimonial = useCmsStore((s) => s.updateTestimonial)

  const columns = [
    {
      key: 'name' as keyof Testimonial,
      label: 'Customer',
      render: (t: Testimonial) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 bg-primary/10">
            <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">{t.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.company}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'location' as keyof Testimonial,
      label: 'Location',
      render: (t: Testimonial) => <span className="text-muted-foreground text-sm">{t.location}</span>,
    },
    {
      key: 'rating' as keyof Testimonial,
      label: 'Rating',
      render: (t: Testimonial) => (
        <div className="flex gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      ),
    },
    {
      key: 'quote' as keyof Testimonial,
      label: 'Quote',
      render: (t: Testimonial) => (
        <span className="text-muted-foreground text-xs line-clamp-1 max-w-xs italic">"{t.quote}"</span>
      ),
    },
    {
      key: 'status' as keyof Testimonial,
      label: 'Status',
      render: (t: Testimonial) => (
        <Badge variant={t.status === 'published' ? 'success' : 'secondary'}>{t.status}</Badge>
      ),
    },
  ]

  return (
    <ContentTable
      title="Testimonials"
      items={testimonials}
      columns={columns}
      newHref="/admin/testimonials/new"
      editHref={(t) => `/admin/testimonials/${t.id}/edit`}
      onDelete={deleteTestimonial}
      onToggleStatus={(id, status) =>
        updateTestimonial(id, { status, updated_at: new Date().toISOString() })
      }
      searchKey="name"
    />
  )
}
