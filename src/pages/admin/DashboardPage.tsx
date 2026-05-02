import { Link } from 'react-router-dom'
import { Wrench, MapPin, BookOpen, MessageSquare, Users, FileText, TrendingUp, Eye, Edit } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCmsStore } from '@/stores/cmsStore'
import { formatDate } from '@/lib/utils'

export function DashboardPage() {
  const services = useCmsStore((s) => s.services)
  const locations = useCmsStore((s) => s.locations)
  const blogPosts = useCmsStore((s) => s.blogPosts)
  const testimonials = useCmsStore((s) => s.testimonials)
  const teamMembers = useCmsStore((s) => s.teamMembers)

  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5)

  const stats = [
    { label: 'Services', value: services.length, published: services.filter((s) => s.status === 'published').length, href: '/admin/services', icon: Wrench, color: 'text-blue-600 bg-blue-50' },
    { label: 'Locations', value: locations.length, published: locations.filter((l) => l.status === 'published').length, href: '/admin/locations', icon: MapPin, color: 'text-green-600 bg-green-50' },
    { label: 'Blog Posts', value: blogPosts.length, published: blogPosts.filter((p) => p.status === 'published').length, href: '/admin/blog', icon: BookOpen, color: 'text-purple-600 bg-purple-50' },
    { label: 'Testimonials', value: testimonials.length, published: testimonials.filter((t) => t.status === 'published').length, href: '/admin/testimonials', icon: MessageSquare, color: 'text-yellow-600 bg-yellow-50' },
    { label: 'Team Members', value: teamMembers.length, published: teamMembers.filter((m) => m.status === 'published').length, href: '/admin/team', icon: Users, color: 'text-red-600 bg-red-50' },
    { label: 'Pages', value: 1, published: 1, href: '/admin/pages', icon: FileText, color: 'text-indigo-600 bg-indigo-50' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back. Here's an overview of your content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                <div className="text-xs text-green-600 mt-1">{stat.published} published</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Blog Posts */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Recent Blog Posts</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link to="/admin/blog">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{post.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {post.author} · {formatDate(post.updated_at)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <Badge variant={post.status === 'published' ? 'success' : 'secondary'} className="text-xs">
                      {post.status}
                    </Badge>
                    <Button asChild variant="ghost" size="icon" className="h-7 w-7">
                      <Link to={`/admin/blog/${post.id}/edit`}>
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'New Blog Post', href: '/admin/blog/new', icon: BookOpen },
                { label: 'New Service', href: '/admin/services/new', icon: Wrench },
                { label: 'New Location', href: '/admin/locations/new', icon: MapPin },
                { label: 'New Team Member', href: '/admin/team/new', icon: Users },
                { label: 'Add Testimonial', href: '/admin/testimonials/new', icon: MessageSquare },
                { label: 'View Website', href: '/', icon: Eye },
              ].map((action) => (
                <Button
                  key={action.label}
                  asChild
                  variant="outline"
                  className="h-auto py-3 flex flex-col gap-1.5 text-xs"
                >
                  <Link to={action.href} target={action.href === '/' ? '_blank' : undefined}>
                    <action.icon className="w-4 h-4" />
                    {action.label}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Overview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Content Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Services', data: services },
                { label: 'Locations', data: locations },
                { label: 'Blog Posts', data: blogPosts },
                { label: 'Testimonials', data: testimonials },
                { label: 'Team Members', data: teamMembers },
              ].map(({ label, data }) => {
                const published = data.filter((item) => item.status === 'published').length
                const pct = data.length > 0 ? Math.round((published / data.length) * 100) : 0
                return (
                  <div key={label}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{published}/{data.length} published</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              CMS Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                Set content to <strong>Draft</strong> to hide it from the public website.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                Slugs are auto-generated from titles but can be customized.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                Use the <strong>Media Library</strong> to manage all images centrally.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                All content is stored locally. Connect a backend to persist changes.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
