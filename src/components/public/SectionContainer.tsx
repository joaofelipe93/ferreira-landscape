import { cn } from '@/lib/utils'

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  id?: string
  tight?: boolean
}

export function SectionContainer({ children, className, id, tight }: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn('py-16 lg:py-24', tight && 'py-10 lg:py-14', className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      {eyebrow && (
        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{title}</h2>
      {subtitle && (
        <p className={cn('mt-4 text-lg text-gray-600 max-w-2xl', centered && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
