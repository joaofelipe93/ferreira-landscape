import { useParams, Link } from 'react-router-dom'
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SectionContainer } from '@/components/public/SectionContainer'
import { BlogCard } from '@/components/public/BlogCard'
import { useCmsStore } from '@/stores/cmsStore'
import { formatDate } from '@/lib/utils'

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const allPosts = useCmsStore((s) => s.blogPosts).filter((p) => p.status === 'published')
  const post = allPosts.find((p) => p.slug === slug)
  const related = allPosts.filter((p) => p.id !== post?.id).slice(0, 3)

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <Button asChild>
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="relative h-[55vh] flex items-end overflow-hidden">
        <img
          src={post.cover_image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Link
            to="/blog"
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white mb-4 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <Badge key={tag} className="text-xs bg-primary/90">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatDate(post.published_at)}
          </span>
        </div>

        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-h2:text-2xl prose-h2:mt-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-gray-400" />
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <SectionContainer className="bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">More Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </SectionContainer>
      )}
    </div>
  )
}
