import { useParams, useNavigate, Link } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FormField } from '@/components/admin/FormField'
import { useCmsStore } from '@/stores/cmsStore'

const schema = z.object({
  name: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
  quote: z.string().min(10),
  rating: z.number().min(1).max(5),
  status: z.enum(['draft', 'published']),
})

type FormValues = z.infer<typeof schema>

export function TestimonialFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = id === 'new' || !id
  const testimonials = useCmsStore((s) => s.testimonials)
  const addTestimonial = useCmsStore((s) => s.addTestimonial)
  const updateTestimonial = useCmsStore((s) => s.updateTestimonial)
  const existing = isNew ? null : testimonials.find((t) => t.id === id)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: existing
      ? { name: existing.name, company: existing.company, location: existing.location, quote: existing.quote, rating: existing.rating, status: existing.status }
      : { status: 'draft', rating: 5, name: '', company: '', location: '', quote: '' },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const now = new Date().toISOString()
    if (isNew) {
      addTestimonial({ id: `test-${Date.now()}`, ...data, updated_at: now })
    } else if (id) {
      updateTestimonial(id, { ...data, updated_at: now })
    }
    navigate('/admin/testimonials')
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button asChild variant="ghost" size="icon">
          <Link to="/admin/testimonials"><ArrowLeft className="w-4 h-4" /></Link>
        </Button>
        <h1 className="text-2xl font-bold">{isNew ? 'New Testimonial' : 'Edit Testimonial'}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader><CardTitle className="text-base">Testimonial Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Customer Name" htmlFor="name" required error={errors.name?.message}>
                    <Input id="name" {...register('name')} placeholder="John Smith" />
                  </FormField>
                  <FormField label="Company / Role" htmlFor="company" required error={errors.company?.message}>
                    <Input id="company" {...register('company')} placeholder="Homeowner or Company" />
                  </FormField>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Location" htmlFor="location" required error={errors.location?.message}>
                    <Input id="location" {...register('location')} placeholder="Austin, TX" />
                  </FormField>
                  <FormField label="Rating" htmlFor="rating" required>
                    <Select
                      defaultValue={String(existing?.rating ?? 5)}
                      onValueChange={(v) => setValue('rating', parseInt(v))}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[5, 4, 3, 2, 1].map((r) => (
                          <SelectItem key={r} value={String(r)}>{r} Stars</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>
                <FormField label="Testimonial Quote" htmlFor="quote" required error={errors.quote?.message} description="Write in first person, without quotation marks">
                  <Textarea id="quote" {...register('quote')} rows={4} placeholder="Write their testimonial here..." />
                </FormField>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader><CardTitle className="text-base">Publish</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField label="Status">
                  <Select
                    defaultValue={existing?.status ?? 'draft'}
                    onValueChange={(v) => setValue('status', v as 'draft' | 'published')}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <Button type="submit" className="w-full">
                  <Save className="w-4 h-4" />
                  {isNew ? 'Add Testimonial' : 'Save Changes'}
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/admin/testimonials">Cancel</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
