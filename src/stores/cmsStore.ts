import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Service, Location, BlogPost, Testimonial, TeamMember, Stat } from '@/types'
import { services as initialServices } from '@/data/services'
import { locations as initialLocations } from '@/data/locations'
import { blogPosts as initialBlogPosts } from '@/data/blog'
import { testimonials as initialTestimonials } from '@/data/testimonials'
import { teamMembers as initialTeamMembers } from '@/data/team'
import { stats as initialStats } from '@/data/stats'

interface CmsState {
  services: Service[]
  locations: Location[]
  blogPosts: BlogPost[]
  testimonials: Testimonial[]
  teamMembers: TeamMember[]
  stats: Stat[]

  // Service actions
  addService: (service: Service) => void
  updateService: (id: string, data: Partial<Service>) => void
  deleteService: (id: string) => void

  // Location actions
  addLocation: (location: Location) => void
  updateLocation: (id: string, data: Partial<Location>) => void
  deleteLocation: (id: string) => void

  // Blog actions
  addBlogPost: (post: BlogPost) => void
  updateBlogPost: (id: string, data: Partial<BlogPost>) => void
  deleteBlogPost: (id: string) => void

  // Testimonial actions
  addTestimonial: (testimonial: Testimonial) => void
  updateTestimonial: (id: string, data: Partial<Testimonial>) => void
  deleteTestimonial: (id: string) => void

  // Team actions
  addTeamMember: (member: TeamMember) => void
  updateTeamMember: (id: string, data: Partial<TeamMember>) => void
  deleteTeamMember: (id: string) => void

  // Stats actions
  updateStat: (id: string, data: Partial<Stat>) => void
}

export const useCmsStore = create<CmsState>()(
  persist(
    (set) => ({
      services: initialServices,
      locations: initialLocations,
      blogPosts: initialBlogPosts,
      testimonials: initialTestimonials,
      teamMembers: initialTeamMembers,
      stats: initialStats,

      addService: (service) =>
        set((state) => ({ services: [...state.services, service] })),
      updateService: (id, data) =>
        set((state) => ({
          services: state.services.map((s) => (s.id === id ? { ...s, ...data } : s)),
        })),
      deleteService: (id) =>
        set((state) => ({ services: state.services.filter((s) => s.id !== id) })),

      addLocation: (location) =>
        set((state) => ({ locations: [...state.locations, location] })),
      updateLocation: (id, data) =>
        set((state) => ({
          locations: state.locations.map((l) => (l.id === id ? { ...l, ...data } : l)),
        })),
      deleteLocation: (id) =>
        set((state) => ({ locations: state.locations.filter((l) => l.id !== id) })),

      addBlogPost: (post) =>
        set((state) => ({ blogPosts: [...state.blogPosts, post] })),
      updateBlogPost: (id, data) =>
        set((state) => ({
          blogPosts: state.blogPosts.map((p) => (p.id === id ? { ...p, ...data } : p)),
        })),
      deleteBlogPost: (id) =>
        set((state) => ({ blogPosts: state.blogPosts.filter((p) => p.id !== id) })),

      addTestimonial: (testimonial) =>
        set((state) => ({ testimonials: [...state.testimonials, testimonial] })),
      updateTestimonial: (id, data) =>
        set((state) => ({
          testimonials: state.testimonials.map((t) => (t.id === id ? { ...t, ...data } : t)),
        })),
      deleteTestimonial: (id) =>
        set((state) => ({ testimonials: state.testimonials.filter((t) => t.id !== id) })),

      addTeamMember: (member) =>
        set((state) => ({ teamMembers: [...state.teamMembers, member] })),
      updateTeamMember: (id, data) =>
        set((state) => ({
          teamMembers: state.teamMembers.map((m) => (m.id === id ? { ...m, ...data } : m)),
        })),
      deleteTeamMember: (id) =>
        set((state) => ({ teamMembers: state.teamMembers.filter((m) => m.id !== id) })),

      updateStat: (id, data) =>
        set((state) => ({
          stats: state.stats.map((s) => (s.id === id ? { ...s, ...data } : s)),
        })),
    }),
    { name: 'cms-store' }
  )
)
