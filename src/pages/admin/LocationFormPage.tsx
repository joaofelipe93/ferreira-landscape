import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
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
import { slugify } from '@/lib/utils'

const schema = z.object({
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required'),
  slug: z.string().min(1),
  description: z.string().min(1),
  hero_image: z.string().url(),
  contact_phone: z.string().min(1),
  contact_email: z.string().email(),
  address: z.string().min(1),
  seo_title: z.string().min(1),
  seo_description: z.string().min(1),
  status: z.enum(['draft', 'published']),
})

type FormValues = z.infer<typeof schema>

export function LocationFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = id === 'new' || !id
  const locations = useCmsStore((s) => s.locations)
  const addLocation = useCmsStore((s) => s.addLocation)
  const updateLocation = useCmsStore((s) => s.updateLocation)
  const existing = isNew ? null : locations.find((l) => l.id === id)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: existing
      ? {
          city: existing.city,
          state: existing.state,
          slug: existing.slug,
          description: existing.description,
          hero_image: existing.hero_image,
          contact_phone: existing.contact_phone,
          contact_email: existing.contact_email,
          address: existing.address,
          seo_title: existing.seo_title,
          seo_description: existing.seo_description,
          status: existing.status,
        }
      : { status: 'draft', city: '', state: '', slug: '', description: '', hero_image: '', contact_phone: '', contact_email: '', address: '', seo_title: '', seo_description: '' },
  })

  const cityVal = watch('city')
  const stateVal = watch('state')
  useEffect(() => {
    if (isNew && cityVal && stateVal) {
      setValue('slug', slugify(`${cityVal}-${stateVal}`))
      setValue('seo_title', `Landscaping in ${cityVal}, ${stateVal} | GreenScape Pro`)
    }
  }, [cityVal, stateVal, isNew, setValue])

  const onSubmit = (data: FormValues) => {
    const now = new Date().toISOString()
    if (isNew) {
      addLocation({
        id: `loc-${Date.now()}`,
        ...data,
        services_offered: [],
        map_coordinates: { lat: 0, lng: 0 },
        updated_at: now,
      })
    } else if (id) {
      updateLocation(id, { ...data, updated_at: now })
    }
    navigate('/admin/locations')
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button asChild variant="ghost" size="icon">
          <Link to="/admin/locations"><ArrowLeft className="w-4 h-4" /></Link>
        </Button>
        <h1 className="text-2xl font-bold">{isNew ? 'New Location' : 'Edit Location'}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Location Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="City" htmlFor="city" required error={errors.city?.message}>
                    <Input id="city" {...register('city')} placeholder="Austin" />
                  </FormField>
                  <FormField label="State" htmlFor="state" required error={errors.state?.message}>
                    <Input id="state" {...register('state')} placeholder="TX" maxLength={2} />
                  </FormField>
                </div>
                <FormField label="Slug" htmlFor="slug" required error={errors.slug?.message}>
                  <Input id="slug" {...register('slug')} placeholder="austin-tx" />
                </FormField>
                <FormField label="Hero Image URL" htmlFor="hero_image" required error={errors.hero_image?.message}>
                  <Input id="hero_image" {...register('hero_image')} placeholder="https://..." />
                </FormField>
                <FormField label="Description" htmlFor="description" required error={errors.description?.message}>
                  <Textarea id="description" {...register('description')} rows={3} />
                </FormField>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-base">Contact Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Phone" htmlFor="contact_phone" required error={errors.contact_phone?.message}>
                    <Input id="contact_phone" {...register('contact_phone')} placeholder="(555) 000-0000" />
                  </FormField>
                  <FormField label="Email" htmlFor="contact_email" required error={errors.contact_email?.message}>
                    <Input id="contact_email" {...register('contact_email')} placeholder="city@company.com" />
                  </FormField>
                </div>
                <FormField label="Address" htmlFor="address" required error={errors.address?.message}>
                  <Input id="address" {...register('address')} placeholder="123 Main St, City, ST 00000" />
                </FormField>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-base">SEO</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField label="SEO Title" htmlFor="seo_title" required>
                  <Input id="seo_title" {...register('seo_title')} />
                </FormField>
                <FormField label="SEO Description" htmlFor="seo_description" required>
                  <Textarea id="seo_description" {...register('seo_description')} rows={2} />
                </FormField>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Publish</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField label="Status" required>
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
                  {isNew ? 'Create Location' : 'Save Changes'}
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/admin/locations">Cancel</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
