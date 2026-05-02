import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useUiStore } from '@/stores/uiStore'
import { Analytics } from '@vercel/analytics/react'

// Layouts
import { PublicLayout } from '@/layouts/PublicLayout'
import { AdminLayout } from '@/layouts/AdminLayout'

// Public Pages
import { ComingSoonPage } from '@/pages/public/ComingSoonPage'
import { HomePage } from '@/pages/public/HomePage'
import { ServicesPage } from '@/pages/public/ServicesPage'
import { ServiceDetailPage } from '@/pages/public/ServiceDetailPage'
import { LocationsPage } from '@/pages/public/LocationsPage'
import { LocationDetailPage } from '@/pages/public/LocationDetailPage'
import { BlogPage } from '@/pages/public/BlogPage'
import { BlogPostPage } from '@/pages/public/BlogPostPage'
import { AboutPage } from '@/pages/public/AboutPage'
import { TeamPage } from '@/pages/public/TeamPage'
import { ContactPage } from '@/pages/public/ContactPage'
import { DesignSystemPage } from '@/pages/public/DesignSystemPage'
import { LawnCarePage } from '@/pages/public/LawnCarePage'
import { HardscapeServicesPage } from '@/pages/public/HardscapeServicesPage'
import { SnowRemovalPage } from '@/pages/public/SnowRemovalPage'

import { PrivacyPolicyPage } from '@/pages/public/PrivacyPolicyPage'
import { TermsOfServicesPage } from '@/pages/public/TermsOfServicesPage'
import { NotFoundPage } from '@/pages/public/NotFoundPage'
import { NewPage } from '@/pages/public/NewPage'
import { ResultPage } from '@/pages/public/ResultPage'

// Admin Pages
import { DashboardPage } from '@/pages/admin/DashboardPage'
import { PagesAdminPage } from '@/pages/admin/PagesAdminPage'
import { ServicesAdminPage } from '@/pages/admin/ServicesAdminPage'
import { ServiceFormPage } from '@/pages/admin/ServiceFormPage'
import { LocationsAdminPage } from '@/pages/admin/LocationsAdminPage'
import { LocationFormPage } from '@/pages/admin/LocationFormPage'
import { BlogAdminPage } from '@/pages/admin/BlogAdminPage'
import { BlogFormPage } from '@/pages/admin/BlogFormPage'
import { TestimonialsAdminPage } from '@/pages/admin/TestimonialsAdminPage'
import { TestimonialFormPage } from '@/pages/admin/TestimonialFormPage'
import { TeamAdminPage } from '@/pages/admin/TeamAdminPage'
import { TeamFormPage } from '@/pages/admin/TeamFormPage'
import { MediaAdminPage } from '@/pages/admin/MediaAdminPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1 },
  },
})

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function DarkModeInit() {
  const darkMode = useUiStore((s) => s.darkMode)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])
  return null
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Analytics />
      <BrowserRouter>
        <ScrollToTop />
        <DarkModeInit />
        <Routes>
          {/* Primary entry point — now the live site */}
          <Route path="/" element={<HomePage />} />

          {/* Legacy/Alias routes */}
          <Route path="/site" element={<HomePage />} />
          <Route path="/lp" element={<HomePage />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />

          {/* Public Website */}
          <Route element={<PublicLayout />}>
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/locations/:slug" element={<LocationDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/lawn-care" element={<LawnCarePage />} />
            <Route path="/hardscape" element={<HardscapeServicesPage />} />
            <Route path="/hardscape-services" element={<HardscapeServicesPage />} />
            <Route path="/snow-removal" element={<SnowRemovalPage />} />
            <Route path="/design" element={<DesignSystemPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-services" element={<TermsOfServicesPage />} />
            <Route path="/new" element={<NewPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Route>

          {/* Admin CMS — only available in development */}
          {import.meta.env.DEV && (
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="pages" element={<PagesAdminPage />} />
              <Route path="services" element={<ServicesAdminPage />} />
              <Route path="services/new" element={<ServiceFormPage />} />
              <Route path="services/:id/edit" element={<ServiceFormPage />} />
              <Route path="locations" element={<LocationsAdminPage />} />
              <Route path="locations/new" element={<LocationFormPage />} />
              <Route path="locations/:id/edit" element={<LocationFormPage />} />
              <Route path="blog" element={<BlogAdminPage />} />
              <Route path="blog/new" element={<BlogFormPage />} />
              <Route path="blog/:id/edit" element={<BlogFormPage />} />
              <Route path="testimonials" element={<TestimonialsAdminPage />} />
              <Route path="testimonials/new" element={<TestimonialFormPage />} />
              <Route path="testimonials/:id/edit" element={<TestimonialFormPage />} />
              <Route path="team" element={<TeamAdminPage />} />
              <Route path="team/new" element={<TeamFormPage />} />
              <Route path="team/:id/edit" element={<TeamFormPage />} />
              <Route path="media" element={<MediaAdminPage />} />
            </Route>
          )}

          {/* 404 catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
