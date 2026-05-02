import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f8f9fb] text-[#162557] text-center overflow-hidden font-sora">

      {/* Ghost "404" background text */}
      <span
        className="absolute select-none pointer-events-none font-bold leading-none"
        style={{
          fontSize: 'clamp(180px, 32vw, 340px)',
          opacity: 0.045,
          color: '#162557',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      >
        404
      </span>

      {/* Content */}
      <div className="relative z-10 max-w-[600px] w-full px-5 flex flex-col items-center">

        {/* Logo */}
        <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
          <picture>
            <source srcSet="/logo_main.webp" type="image/webp" />
            <img
              src="/logo_main.png"
              alt="Ferreira Lawn & Garden"
              className="h-12 md:h-14 w-auto"
            />
          </picture>
        </div>

        {/* Headline */}
        <h1 className="text-[32px] sm:text-[40px] md:text-[44px] font-bold leading-tight tracking-tight mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          Page Not Found
        </h1>

        {/* Subtext */}
        <p
          className="text-[16px] leading-relaxed max-w-[460px] mb-8 animate-in fade-in duration-700 delay-200"
          style={{ opacity: 0.72 }}
        >
          The page you're looking for doesn't exist or may have been moved.
        </p>

        {/* Primary CTA */}
        <Link
          to="/site"
          className="inline-block bg-[#FC8700] text-white font-semibold text-sm tracking-wide px-7 py-[14px] rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md w-full sm:w-auto animate-in fade-in duration-700 delay-300"
        >
          Back to Home
        </Link>

        {/* Secondary CTA */}
        <div
          className="mt-8 animate-in fade-in duration-700 delay-400"
          style={{ opacity: 0.65 }}
        >
          <p className="text-sm mb-1">Or contact us:</p>
          <a
            href="tel:+17814908272"
            className="text-[#FC8700] font-semibold text-sm hover:underline transition-opacity duration-200 hover:opacity-90"
          >
            +1 (781) 490-8272
          </a>
        </div>
      </div>
    </div>
  )
}
