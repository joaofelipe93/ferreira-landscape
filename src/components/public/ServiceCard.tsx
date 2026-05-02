import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import type { Service } from '@/types'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.05)] border border-black/5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-[200px] overflow-hidden shrink-0">
        <img
          src={service.hero_image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-[19px] font-bold text-[#162557] mb-2 leading-snug group-hover:text-[#FC8700] transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-[14px] text-[#666] leading-relaxed mb-5">
          {service.summary}
        </p>

        {service.benefits.length > 0 && (
          <ul className="space-y-2 mb-6">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-[13px] text-[#444]">
                <Check className="w-4 h-4 text-[#FC8700] shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        )}


      </div>
    </Link>
  )
}
