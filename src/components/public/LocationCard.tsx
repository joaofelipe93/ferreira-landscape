import { Link } from 'react-router-dom'
import { MapPin, Phone, ArrowRight } from 'lucide-react'
import type { Location } from '@/types'

interface LocationCardProps {
  location: Location
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <Link
      to={`/locations/${location.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={location.hero_image}
          alt={`${location.city}, ${location.state}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{location.state}</span>
          </div>
          <h3 className="text-xl font-bold">{location.city}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
          {location.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Phone className="w-3.5 h-3.5 text-primary" />
            <span>{location.contact_phone}</span>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-primary">
            View Office{' '}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  )
}
