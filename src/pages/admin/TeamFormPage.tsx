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
  role: z.string().min(1),
  photo: z.string().url(),
  bio: z.string().min(10),
  linkedin_url: z.string().url().or(z.literal('')),
  order: z.number().min(1),
  status: z.enum(['draft', 'published']),
})

type FormValues = z.infer<typeof schema>

export function TeamFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = id === 'new' || !id
  const teamMembers = useCmsStore((s) => s.teamMembers)
  const addTeamMember = useCmsStore((s) => s.addTeamMember)
  const updateTeamMember = useCmsStore((s) => s.updateTeamMember)
  const existing = isNew ? null : teamMembers.find((m) => m.id === id)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: existing
      ? { name: existing.name, role: existing.role, photo: existing.photo, bio: existing.bio, linkedin_url: existing.linkedin_url, order: existing.order, status: existing.status }
      : { status: 'draft', order: teamMembers.length + 1, name: '', role: '', photo: '', bio: '', linkedin_url: '' },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const now = new Date().toISOString()
    if (isNew) {
      addTeamMember({ id: `team-${Date.now()}`, ...data, updated_at: now })
    } else if (id) {
      updateTeamMember(id, { ...data, updated_at: now })
    }
    navigate('/admin/team')
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button asChild variant="ghost" size="icon">
          <Link to="/admin/team"><ArrowLeft className="w-4 h-4" /></Link>
        </Button>
        <h1 className="text-2xl font-bold">{isNew ? 'New Team Member' : 'Edit Team Member'}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader><CardTitle className="text-base">Member Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Full Name" htmlFor="name" required error={errors.name?.message}>
                    <Input id="name" {...register('name')} />
                  </FormField>
                  <FormField label="Job Title / Role" htmlFor="role" required error={errors.role?.message}>
                    <Input id="role" {...register('role')} placeholder="CEO, Landscape Designer, etc." />
                  </FormField>
                </div>
                <FormField label="Photo URL" htmlFor="photo" required error={errors.photo?.message}>
                  <Input id="photo" {...register('photo')} placeholder="https://..." />
                </FormField>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="LinkedIn URL" htmlFor="linkedin_url" error={errors.linkedin_url?.message}>
                    <Input id="linkedin_url" {...register('linkedin_url')} placeholder="https://linkedin.com/in/..." />
                  </FormField>
                  <FormField label="Display Order" htmlFor="order" required error={errors.order?.message}>
                    <Input id="order" type="number" {...register('order')} min={1} />
                  </FormField>
                </div>
                <FormField label="Bio" htmlFor="bio" required error={errors.bio?.message} description="Professional biography displayed on the team page">
                  <Textarea id="bio" {...register('bio')} rows={5} />
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
                  {isNew ? 'Add Member' : 'Save Changes'}
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/admin/team">Cancel</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
