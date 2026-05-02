import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { SectionContainer } from '@/components/public/SectionContainer'
import { BlogCard } from '@/components/public/BlogCard'
import { useCmsStore } from '@/stores/cmsStore'
import { cn } from '@/lib/utils'

export function BlogPage() {
  const allPosts = useCmsStore((s) => s.blogPosts).filter((p) => p.status === 'published')
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags)))

  const filtered = allPosts.filter((post) => {
    const matchSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchTag = !activeTag || post.tags.includes(activeTag)
    return matchSearch && matchTag
  })

  return (
    <div>
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Expert Knowledge
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Landscape Blog</h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Tips, guides, and seasonal insights from our team of certified landscape professionals.
          </p>
        </div>
      </div>

      <SectionContainer>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search articles..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                !activeTag
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                  activeTag === tag
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">No articles found matching your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </SectionContainer>
    </div>
  )
}
