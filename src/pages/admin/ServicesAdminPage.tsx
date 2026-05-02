import { Badge } from '@/components/ui/badge'
import { ContentTable } from '@/components/admin/ContentTable'
import { useCmsStore } from '@/stores/cmsStore'
import { formatDate } from '@/lib/utils'
import type { Service } from '@/types'

export function ServicesAdminPage() {
  const services = useCmsStore((s) => s.services)
  const deleteService = useCmsStore((s) => s.deleteService)
  const updateService = useCmsStore((s) => s.updateService)

  const columns = [
    {
      key: 'title' as keyof Service,
      label: 'Title',
      render: (s: Service) => (
        <div>
          <div className="font-medium">{s.title}</div>
          <div className="text-xs text-muted-foreground">/services/{s.slug}</div>
        </div>
      ),
    },
    {
      key: 'summary' as keyof Service,
      label: 'Summary',
      render: (s: Service) => (
        <span className="text-muted-foreground line-clamp-1 max-w-xs">{s.summary}</span>
      ),
    },
    {
      key: 'status' as keyof Service,
      label: 'Status',
      render: (s: Service) => (
        <Badge variant={s.status === 'published' ? 'success' : 'secondary'}>{s.status}</Badge>
      ),
      width: 'w-24',
    },
    {
      key: 'updated_at' as keyof Service,
      label: 'Updated',
      render: (s: Service) => (
        <span className="text-muted-foreground text-xs">{formatDate(s.updated_at)}</span>
      ),
      width: 'w-36',
    },
  ]

  return (
    <ContentTable
      title="Services"
      items={services}
      columns={columns}
      newHref="/admin/services/new"
      editHref={(s) => `/admin/services/${s.id}/edit`}
      onDelete={deleteService}
      onToggleStatus={(id, status) => updateService(id, { status, updated_at: new Date().toISOString() })}
      searchKey="title"
    />
  )
}
