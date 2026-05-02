import { Calendar, Home, Users, MapPin, Star, Droplets } from 'lucide-react'
import type { Stat } from '@/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  Home,
  Users,
  MapPin,
  Star,
  Droplets,
}

interface StatsSectionProps {
  stats: Stat[]
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon] ?? Star
        return (
          <div key={stat.id} className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        )
      })}
    </div>
  )
}
