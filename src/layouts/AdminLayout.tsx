import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  Leaf, LayoutDashboard, FileText, Wrench, MapPin, BookOpen,
  MessageSquare, Users, Image, Menu, X, Moon, Sun, ExternalLink,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/stores/uiStore'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Pages', href: '/admin/pages', icon: FileText },
  { label: 'Services', href: '/admin/services', icon: Wrench },
  { label: 'Locations', href: '/admin/locations', icon: MapPin },
  { label: 'Blog Posts', href: '/admin/blog', icon: BookOpen },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'Media', href: '/admin/media', icon: Image },
]

export function AdminLayout() {
  const { darkMode, toggleDarkMode, sidebarOpen, setSidebarOpen } = useUiStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className={cn('min-h-screen flex bg-background', darkMode && 'dark')}>
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar-background border-r border-sidebar-border transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-16',
          'hidden md:flex',
        )}
      >
        <div className={cn('flex items-center h-16 px-4 border-b border-sidebar-border', sidebarOpen ? 'justify-between' : 'justify-center')}>
          {sidebarOpen && (
            <Link to="/admin" className="flex items-center gap-2 font-bold text-sidebar-foreground">
              <div className="w-7 h-7 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm">GreenScape <span className="text-sidebar-primary">CMS</span></span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors p-1 rounded"
          >
            {sidebarOpen ? <ChevronRight className="w-4 h-4 rotate-180" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ label, href, icon: Icon, exact }) => (
            <NavLink
              key={href}
              to={href}
              end={exact}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group',
                  isActive
                    ? 'bg-sidebar-primary text-white'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground',
                  !sidebarOpen && 'justify-center px-2'
                )
              }
              title={!sidebarOpen ? label : undefined}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          {sidebarOpen ? (
            <div className="space-y-2">
              <Button asChild variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent">
                <Link to="/" target="_blank">
                  <ExternalLink className="w-4 h-4" />
                  View Website
                </Link>
              </Button>
            </div>
          ) : (
            <Link to="/" target="_blank" title="View Website" className="flex justify-center p-2 text-sidebar-foreground/70 hover:text-sidebar-foreground">
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-sidebar-background flex flex-col">
            <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
              <span className="font-bold text-sidebar-foreground text-sm">GreenScape CMS</span>
              <button onClick={() => setMobileOpen(false)} className="text-sidebar-foreground/60">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1">
              {navItems.map(({ label, href, icon: Icon, exact }) => (
                <NavLink
                  key={href}
                  to={href}
                  end={exact}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-sidebar-primary text-white'
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                    )
                  }
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className={cn('flex-1 flex flex-col min-w-0 transition-all duration-300', sidebarOpen ? 'md:ml-64' : 'md:ml-16')}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-background border-b flex items-center justify-between px-4 md:px-6">
          <button
            className="md:hidden p-2 rounded text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-muted-foreground"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2 pl-1">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">A</span>
              </div>
              <span className="text-sm font-medium hidden sm:block">Admin</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
