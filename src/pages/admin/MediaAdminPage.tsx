import { useState } from 'react'
import { Upload, Grid, List, Copy, ExternalLink, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const mockMedia = [
  { id: 'm1', filename: 'hero-lawn-care.jpg', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', type: 'image/jpeg', size: 245000, uploaded_at: '2025-11-01' },
  { id: 'm2', filename: 'landscape-design.jpg', url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80', type: 'image/jpeg', size: 312000, uploaded_at: '2025-10-15' },
  { id: 'm3', filename: 'irrigation-system.jpg', url: 'https://images.unsplash.com/photo-1622301052613-8f6e5c7de80c?w=400&q=80', type: 'image/jpeg', size: 187000, uploaded_at: '2025-10-10' },
  { id: 'm4', filename: 'tree-care.jpg', url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80', type: 'image/jpeg', size: 225000, uploaded_at: '2025-09-28' },
  { id: 'm5', filename: 'commercial-property.jpg', url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80', type: 'image/jpeg', size: 298000, uploaded_at: '2025-09-15' },
  { id: 'm6', filename: 'austin-skyline.jpg', url: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=400&q=80', type: 'image/jpeg', size: 356000, uploaded_at: '2025-09-01' },
  { id: 'm7', filename: 'denver-mountains.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', type: 'image/jpeg', size: 412000, uploaded_at: '2025-08-20' },
  { id: 'm8', filename: 'team-ceo.jpg', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', type: 'image/jpeg', size: 145000, uploaded_at: '2025-08-10' },
]

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

export function MediaAdminPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const filtered = mockMedia.filter((m) =>
    m.filename.toLowerCase().includes(search.toLowerCase())
  )

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopied(id)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Media Library</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{mockMedia.length} files</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" disabled>
            <Upload className="w-4 h-4" />
            Upload Files
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <Input
          placeholder="Search files..."
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-1 ml-auto">
          <Button
            variant={view === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setView('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={view === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setView('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="mb-3 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
        Media upload is available when connected to a storage backend (AWS S3, Cloudinary, etc.). Click a file to copy its URL.
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative bg-muted rounded-xl overflow-hidden border hover:border-primary/30 cursor-pointer transition-all"
              onClick={() => copyUrl(item.url, item.id)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.url}
                  alt={item.filename}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                {copied === item.id ? (
                  <Badge className="bg-green-500">Copied!</Badge>
                ) : (
                  <Copy className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="p-2">
                <p className="text-xs font-medium truncate">{item.filename}</p>
                <p className="text-xs text-muted-foreground">{formatBytes(item.size)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filtered.map((item) => (
                <div key={item.id} className="flex items-center gap-4 px-6 py-3">
                  <img
                    src={item.url}
                    alt={item.filename}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.filename}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.type} · {formatBytes(item.size)} · {item.uploaded_at}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyUrl(item.url, item.id)}
                      title="Copy URL"
                    >
                      {copied === item.id ? (
                        <span className="text-xs text-green-600">✓</span>
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </Button>
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
