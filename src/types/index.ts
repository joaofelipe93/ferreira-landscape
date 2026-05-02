export type PublishStatus = 'draft' | 'published'

export interface SeoMeta {
  seo_title: string
  seo_description: string
}

export interface Page extends SeoMeta {
  id: string
  title: string
  slug: string
  hero_image: string
  sections: PageSection[]
  status: PublishStatus
  updated_at: string
}

export interface PageSection {
  id: string
  type: 'hero' | 'features' | 'stats' | 'testimonials' | 'cta' | 'content'
  data: Record<string, unknown>
}

export interface Service extends SeoMeta {
  id: string
  title: string
  slug: string
  hero_image: string
  summary: string
  content: string
  icon: string
  category: string
  benefits: string[]
  process_steps: ProcessStep[]
  faq: FaqItem[]
  cta_text: string
  status: PublishStatus
  updated_at: string
}

export interface ProcessStep {
  step: number
  title: string
  description: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Location extends SeoMeta {
  id: string
  city: string
  state: string
  slug: string
  hero_image: string
  description: string
  services_offered: string[]
  contact_phone: string
  contact_email: string
  address: string
  map_coordinates: { lat: number; lng: number }
  status: PublishStatus
  updated_at: string
}

export interface BlogPost extends SeoMeta {
  id: string
  title: string
  slug: string
  excerpt: string
  cover_image: string
  content: string
  author: string
  tags: string[]
  published_at: string
  status: PublishStatus
  updated_at: string
}

export interface Testimonial {
  id: string
  name: string
  company: string
  location: string
  photo?: string
  quote: string
  rating: number
  status: PublishStatus
  updated_at: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string
  bio: string
  linkedin_url: string
  order: number
  status: PublishStatus
  updated_at: string
}

export interface Stat {
  id: string
  label: string
  value: string
  icon: string
  order: number
}

export interface MediaItem {
  id: string
  filename: string
  url: string
  alt: string
  size: number
  type: string
  uploaded_at: string
}
