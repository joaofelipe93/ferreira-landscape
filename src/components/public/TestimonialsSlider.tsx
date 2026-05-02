import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import type { Testimonial } from '@/types'

interface TestimonialsSliderProps {
  testimonials: Testimonial[]
}

export function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  const t = testimonials[current]

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
        <Quote className="absolute top-6 right-8 w-16 h-16 text-primary/10" />

        <div className="flex gap-1 mb-6">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12 bg-primary/10">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {t.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-gray-900">{t.name}</div>
            <div className="text-sm text-gray-500">
              {t.company} &bull; {t.location}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-colors',
                i === current ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
              )}
            />
          ))}
        </div>

        <Button variant="outline" size="icon" onClick={next} className="rounded-full">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
