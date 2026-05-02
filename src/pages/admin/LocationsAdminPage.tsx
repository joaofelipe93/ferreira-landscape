import { Badge } from '@/components/ui/badge'
import { ContentTable } from '@/components/admin/ContentTable'
import { useCmsStore } from '@/stores/cmsStore'
import { formatDate } from '@/lib/utils'
import type { Location } from '@/types'

export function LocationsAdminPage() {
  const locations = useCmsStore((s) => s.locations)
  const deleteLocation = useCmsStore((s) => s.deleteLocation)
  const updateLocation = useCmsStore((s) => s.updateLocation)

  const columns = [
    {
      key: 'city' as keyof Location,
      label: 'City',
      render: (l: Location) => (
        <div>
          <div className="font-medium">{l.city}, {l.state}</div>
          <div className="text-xs text-muted-foreground">/locations/{l.slug}</div>
        </div>
      ),
    },
    {
      key: 'contact_phone' as keyof Location,
      label: 'Phone',
      render: (l: Location) => <span className="text-muted-foreground">{l.contact_phone}</span>,
    },
    {
      key: 'services_offered' as keyof Location,
      label: 'Services',
      render: (l: Location) => (
        <span className="text-muted-foreground text-xs">{l.services_offered.length} services</span>
      ),
    },
    {
      key: 'status' as keyof Location,
      label: 'Status',
      render: (l: Location) => (
        <Badge variant={l.status === 'published' ? 'success' : 'secondary'}>{l.status}</Badge>
      ),
    },
    {
      key: 'updated_at' as keyof Location,
      label: 'Updated',
      render: (l: Location) => (
        <span className="text-muted-foreground text-xs">{formatDate(l.updated_at)}</span>
      ),
    },
  ]

  return (
    <ContentTable
      title="Locations"
      items={locations}
      columns={columns}
      newHref="/admin/locations/new"
      editHref={(l) => `/admin/locations/${l.id}/edit`}
      onDelete={deleteLocation}
      onToggleStatus={(id, status) => updateLocation(id, { status, updated_at: new Date().toISOString() })}
      searchKey="city"
    />
  )
}
