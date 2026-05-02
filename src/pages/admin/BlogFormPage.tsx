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
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  cover_image: z.string().url(),
  content: z.string().min(1),
  author: z.string().min(1),
  tags: z.string(),
  published_at: z.string().min(1),
  seo_title: z.string().min(1),
  seo_description: z.string().min(1),
  status: z.enum(['draft', 'published']),
})

type FormValues = z.infer<typeof schema>

export function BlogFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = id === 'new' || !id
  const blogPosts = useCmsStore((s) => s.blogPosts)
  const addBlogPost = useCmsStore((s) => s.addBlogPost)
  const updateBlogPost = useCmsStore((s) => s.updateBlogPost)
  const existing = isNew ? null : blogPosts.find((p) => p.id === id)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: existing
      ? {
          title: existing.title,
          slug: existing.slug,
          excerpt: existing.excerpt,
          cover_image: existing.cover_image,
          content: existing.content,
          author: existing.author,
          tags: existing.tags.join(', '),
          published_at: existing.published_at.split('T')[0],
          seo_title: existing.seo_title,
          seo_description: existing.seo_description,
          status: existing.status,
        }
      : {
          status: 'draft',
          title: '',
          slug: '',
          excerpt: '',
          cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
          content: '',
          author: '',
          tags: '',
          published_at: new Date().toISOString().split('T')[0],
          seo_title: '',
          seo_description: '',
        },
  })

  const titleVal = watch('title')
  useEffect(() => {
    if (isNew && titleVal) {
      setValue('slug', slugify(titleVal))
      setValue('seo_title', `${titleVal} | GreenScape Pro Blog`)
    }
  }, [titleVal, isNew, setValue])

  const onSubmit = (data: FormValues) => {
    const now = new Date().toISOString()
    const tags = data.tags.split(',').map((t) => t.trim()).filter(Boolean)
    if (isNew) {
      addBlogPost({
        id: `blog-${Date.now()}`,
        ...data,
        tags,
        published_at: new Date(data.published_at).toISOString(),
        updated_at: now,
      })
    } else if (id) {
      updateBlogPost(id, { ...data, tags, published_at: new Date(data.published_at).toISOString(), updated_at: now })
    }
    navigate('/admin/blog')
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button asChild variant="ghost" size="icon">
          <Link to="/admin/blog"><ArrowLeft className="w-4 h-4" /></Link>
        </Button>
        <h1 className="text-2xl font-bold">{isNew ? 'New Blog Post' : 'Edit Blog Post'}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Post Content</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField label="Title" htmlFor="title" required error={errors.title?.message}>
                  <Input id="title" {...register('title')} placeholder="Post title" />
                </FormField>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Slug" htmlFor="slug" required error={errors.slug?.message}>
                    <Input id="slug" {...register('slug')} />
                  </FormField>
                  <FormField label="Author" htmlFor="author" required error={errors.author?.message}>
                    <Input id="author" {...register('author')} placeholder="Author name" />
                  </FormField>
                </div>
                <FormField label="Cover Image URL" htmlFor="cover_image" required error={errors.cover_image?.message}>
                  <Input id="cover_image" {...register('cover_image')} placeholder="https://..." />
                </FormField>
                <FormField label="Excerpt" htmlFor="excerpt" required error={errors.excerpt?.message} description="Short preview text shown in listings">
                  <Textarea id="excerpt" {...register('excerpt')} rows={2} />
                </FormField>
                <FormField label="Content (HTML)" htmlFor="content" required error={errors.content?.message} description="Full article content. Supports HTML markup.">
                  <Textarea id="content" {...register('content')} rows={14} className="font-mono text-xs" />
                </FormField>
                <FormField label="Tags" htmlFor="tags" description="Comma-separated: Lawn Care, Spring, Tips">
                  <Input id="tags" {...register('tags')} placeholder="Lawn Care, Spring, Tips" />
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
                <FormField label="Publish Date" htmlFor="published_at" required>
                  <Input id="published_at" type="date" {...register('published_at')} />
                </FormField>
                <Button type="submit" className="w-full">
                  <Save className="w-4 h-4" />
                  {isNew ? 'Create Post' : 'Save Changes'}
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/admin/blog">Cancel</Link>
                </Button>
              </CardContent>
            </Card>

            {existing && (
              <Card>
                <CardHeader><CardTitle className="text-base">Preview</CardTitle></CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/blog/${existing.slug}`} target="_blank">View Live Post</Link>
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
