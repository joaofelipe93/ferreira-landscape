import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300 ${
        featured ? 'md:flex' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? 'md:w-1/2 h-56 md:h-auto' : 'h-48'}`}>
        <img
          src={post.cover_image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className={`p-6 ${featured ? 'md:w-1/2 flex flex-col justify-center' : ''}`}>
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <h3
          className={`font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-snug ${
            featured ? 'text-xl md:text-2xl' : 'text-lg'
          }`}
        >
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.published_at)}
            </span>
          </div>
          <span className="flex items-center gap-1 text-primary font-medium">
            Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  )
}
