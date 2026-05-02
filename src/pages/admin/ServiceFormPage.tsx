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
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  summary: z.string().min(1, 'Summary is required'),
  content: z.string().min(1, 'Content is required'),
  hero_image: z.string().url('Must be a valid URL'),
  cta_text: z.string().min(1, 'CTA text is required'),
  seo_title: z.string().min(1),
  seo_description: z.string().min(1),
  status: z.enum(['draft', 'published']),
  icon: z.string(),
  category: z.string().min(1, 'Category is required'),
})

type FormValues = z.infer<typeof schema>

export function ServiceFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = id === 'new' || !id
  const services = useCmsStore((s) => s.services)
  const addService = useCmsStore((s) => s.addService)
  const updateService = useCmsStore((s) => s.updateService)

  const existing = isNew ? null : services.find((s) => s.id === id)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: existing
      ? {
          title: existing.title,
          slug: existing.slug,
          summary: existing.summary,
          content: existing.content,
          hero_image: existing.hero_image,
          cta_text: existing.cta_text,
          seo_title: existing.seo_title,
          seo_description: existing.seo_description,
          status: existing.status,
          icon: existing.icon,
        }
      : {
          status: 'draft',
          icon: 'Scissors',
          title: '',
          slug: '',
          summary: '',
          content: '',
          hero_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
          cta_text: 'Get a Free Estimate',
          seo_title: '',
          seo_description: '',
        },
  })

  const titleValue = watch('title')
  useEffect(() => {
    if (isNew && titleValue) {
      setValue('slug', slugify(titleValue))
      setValue('seo_title', `${titleValue} | GreenScape Pro`)
    }
  }, [titleValue, isNew, setValue])

  const onSubmit = (data: FormValues) => {
    const now = new Date().toISOString()
    if (isNew) {
      addService({
        id: `svc-${Date.now()}`,
        ...data,
        category: data.category || '', // Garante que category está presente
        benefits: [],
        process_steps: [],
        faq: [],
        updated_at: now,
      })
    } else if (id) {
      updateService(id, { ...data, updated_at: now })
    }
    navigate('/admin/services')
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button asChild variant="ghost" size="icon">
          <Link to="/admin/services">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{isNew ? 'New Service' : 'Edit Service'}</h1>
          {existing && <p className="text-sm text-muted-foreground">/services/{existing.slug}</p>}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Content</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField label="Title" htmlFor="title" required error={errors.title?.message}>
                  <Input id="title" {...register('title')} placeholder="Service name" />
                </FormField>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Slug" htmlFor="slug" required error={errors.slug?.message} description="URL-friendly identifier">
                    <Input id="slug" {...register('slug')} placeholder="service-slug" />
                  </FormField>
                  <FormField label="Icon" htmlFor="icon" required>
                    <Select
                      defaultValue={existing?.icon ?? 'Scissors'}
                      onValueChange={(v) => setValue('icon', v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {['Scissors', 'Palette', 'Droplets', 'TreePine', 'Building2'].map((i) => (
                          <SelectItem key={i} value={i}>{i}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>
                <FormField label="Hero Image URL" htmlFor="hero_image" required error={errors.hero_image?.message}>
                  <Input id="hero_image" {...register('hero_image')} placeholder="https://..." />
                </FormField>
                <FormField label="Summary" htmlFor="summary" required error={errors.summary?.message} description="Short description shown in cards and listings">
                  <Textarea id="summary" {...register('summary')} rows={2} />
                </FormField>
                <FormField label="Full Content (HTML)" htmlFor="content" required error={errors.content?.message} description="Supports HTML markup">
                  <Textarea id="content" {...register('content')} rows={8} className="font-mono text-xs" />
                </FormField>
                <FormField label="CTA Button Text" htmlFor="cta_text" required error={errors.cta_text?.message}>
                  <Input id="cta_text" {...register('cta_text')} placeholder="Get a Free Estimate" />
                </FormField>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-base">SEO</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField label="SEO Title" htmlFor="seo_title" required error={errors.seo_title?.message}>
                  <Input id="seo_title" {...register('seo_title')} />
                </FormField>
                <FormField label="SEO Description" htmlFor="seo_description" required error={errors.seo_description?.message}>
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
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <Button type="submit" className="w-full">
                  <Save className="w-4 h-4" />
                  {isNew ? 'Create Service' : 'Save Changes'}
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/admin/services">Cancel</Link>
                </Button>
              </CardContent>
            </Card>

            {existing && (
              <Card>
                <CardHeader><CardTitle className="text-base">Preview</CardTitle></CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/services/${existing.slug}`} target="_blank">
                      View Live Page
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
