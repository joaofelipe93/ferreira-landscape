import { Link } from 'react-router-dom'
import { ExternalLink, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const staticPages = [
  { title: 'Home', path: '/', editHref: '#', status: 'published' },
  { title: 'Services', path: '/services', editHref: '#', status: 'published' },
  { title: 'Locations', path: '/locations', editHref: '#', status: 'published' },
  { title: 'Blog', path: '/blog', editHref: '#', status: 'published' },
  { title: 'About', path: '/about', editHref: '#', status: 'published' },
  { title: 'Team', path: '/team', editHref: '#', status: 'published' },
  { title: 'Contact', path: '/contact', editHref: '#', status: 'published' },
]

export function PagesAdminPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Pages</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your website's static pages and their content.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Website Pages</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {staticPages.map((page) => (
              <div key={page.path} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-medium">{page.title}</p>
                  <p className="text-sm text-muted-foreground">{page.path}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="success">{page.status}</Badge>
                  <Button asChild variant="ghost" size="sm">
                    <Link to={page.path} target="_blank">
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" disabled>
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 p-4 bg-muted/50 rounded-xl border">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> Page content editing is managed through individual content sections. Dynamic content (services, blog posts, team members, etc.) can be edited in their respective sections. Full page builder functionality is available when connected to a headless CMS backend.
        </p>
      </div>
    </div>
  )
}
