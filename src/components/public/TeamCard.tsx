import { Linkedin } from 'lucide-react'
import type { TeamMember } from '@/types'

interface TeamCardProps {
  member: TeamMember
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="relative h-56 overflow-hidden">
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {member.linkedin_url && (
          <a
            href={member.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
        <p className="text-sm font-medium text-primary mb-3">{member.role}</p>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{member.bio}</p>
      </div>
    </div>
  )
}
