import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ContentTable } from '@/components/admin/ContentTable'
import { useCmsStore } from '@/stores/cmsStore'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types'

export function BlogAdminPage() {
  const blogPosts = useCmsStore((s) => s.blogPosts)
  const deleteBlogPost = useCmsStore((s) => s.deleteBlogPost)
  const updateBlogPost = useCmsStore((s) => s.updateBlogPost)

  const columns = [
    {
      key: 'title' as keyof BlogPost,
      label: 'Title',
      render: (p: BlogPost) => (
        <div className="flex items-center gap-3">
          <img
            src={p.cover_image}
            alt={p.title}
            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
          />
          <div>
            <div className="font-medium line-clamp-1">{p.title}</div>
            <div className="text-xs text-muted-foreground">/blog/{p.slug}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'author' as keyof BlogPost,
      label: 'Author',
      render: (p: BlogPost) => (
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarFallback className="text-xs">{p.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground text-sm">{p.author}</span>
        </div>
      ),
    },
    {
      key: 'tags' as keyof BlogPost,
      label: 'Tags',
      render: (p: BlogPost) => (
        <div className="flex flex-wrap gap-1">
          {p.tags.slice(0, 2).map((t) => (
            <Badge key={t} variant="secondary" className="text-xs py-0">{t}</Badge>
          ))}
          {p.tags.length > 2 && (
            <span className="text-xs text-muted-foreground">+{p.tags.length - 2}</span>
          )}
        </div>
      ),
    },
    {
      key: 'status' as keyof BlogPost,
      label: 'Status',
      render: (p: BlogPost) => (
        <Badge variant={p.status === 'published' ? 'success' : 'secondary'}>{p.status}</Badge>
      ),
    },
    {
      key: 'published_at' as keyof BlogPost,
      label: 'Published',
      render: (p: BlogPost) => (
        <span className="text-muted-foreground text-xs">{formatDate(p.published_at)}</span>
      ),
    },
  ]

  return (
    <ContentTable
      title="Blog Posts"
      items={blogPosts}
      columns={columns}
      newHref="/admin/blog/new"
      editHref={(p) => `/admin/blog/${p.id}/edit`}
      onDelete={deleteBlogPost}
      onToggleStatus={(id, status) =>
        updateBlogPost(id, { status, updated_at: new Date().toISOString() })
      }
      searchKey="title"
    />
  )
}
