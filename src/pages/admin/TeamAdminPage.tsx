import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ContentTable } from '@/components/admin/ContentTable'
import { useCmsStore } from '@/stores/cmsStore'
import type { TeamMember } from '@/types'

export function TeamAdminPage() {
  const teamMembers = useCmsStore((s) => s.teamMembers)
  const deleteTeamMember = useCmsStore((s) => s.deleteTeamMember)
  const updateTeamMember = useCmsStore((s) => s.updateTeamMember)

  const columns = [
    {
      key: 'name' as keyof TeamMember,
      label: 'Member',
      render: (m: TeamMember) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9">
            <AvatarImage src={m.photo} alt={m.name} />
            <AvatarFallback className="text-xs">{m.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm">{m.name}</div>
            <div className="text-xs text-muted-foreground">{m.role}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'bio' as keyof TeamMember,
      label: 'Bio',
      render: (m: TeamMember) => (
        <span className="text-muted-foreground text-xs line-clamp-2 max-w-xs">{m.bio}</span>
      ),
    },
    {
      key: 'order' as keyof TeamMember,
      label: 'Order',
      render: (m: TeamMember) => (
        <span className="text-muted-foreground text-sm">#{m.order}</span>
      ),
      width: 'w-16',
    },
    {
      key: 'status' as keyof TeamMember,
      label: 'Status',
      render: (m: TeamMember) => (
        <Badge variant={m.status === 'published' ? 'success' : 'secondary'}>{m.status}</Badge>
      ),
      width: 'w-24',
    },
  ]

  return (
    <ContentTable
      title="Team Members"
      items={teamMembers}
      columns={columns}
      newHref="/admin/team/new"
      editHref={(m) => `/admin/team/${m.id}/edit`}
      onDelete={deleteTeamMember}
      onToggleStatus={(id, status) =>
        updateTeamMember(id, { status, updated_at: new Date().toISOString() })
      }
      searchKey="name"
    />
  )
}
