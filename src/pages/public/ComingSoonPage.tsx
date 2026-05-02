export function ComingSoonPage() {
  return (
    <div
      className="min-h-screen flex flex-col text-white font-sora"
      style={{
        background: 'linear-gradient(160deg, #144f52 0%, #1f6a6d 50%, #16585b 100%)',
      }}
    >
      {/* Top notice bar */}
      <div className="text-center pt-6 pb-2 animate-in fade-in duration-700">
        <p
          className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: '#f97316' }}
        >
          A brand new experience is coming
        </p>
      </div>

      {/* Hero — occupies remaining space, vertically centered */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        {/* Logo */}
        <div className="mb-12 lg:mb-14 animate-in fade-in slide-in-from-top-4 duration-1000">
          <picture>
            <source srcSet="/logo_main_white.webp" type="image/webp" />
            <img
              src="/logo_main_white.png"
              alt="Ferreira Lawn & Garden"
              className="h-20 md:h-24 w-auto"
            />
          </picture>
        </div>

        <div className="max-w-[900px] w-full">
          {/* Headline */}
          <h1
            className="
              text-[36px] sm:text-5xl md:text-[60px] lg:text-[72px]
              font-semibold tracking-tight leading-[1.05]
              mb-6
              animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200
            "
          >
            SOMETHING{' '}
            <span style={{ color: '#f97316' }}>REMARKABLE</span>
            <br className="hidden sm:block" />
            {' '}IS GROWING.
          </h1>

          {/* Subtitle */}
          <p
            className="
              text-[15px] sm:text-base md:text-[17px] lg:text-[18px]
              leading-relaxed font-light
              max-w-[680px] mx-auto
              animate-in fade-in duration-1000 delay-400
            "
            style={{ opacity: 0.85 }}
          >
            We're crafting a premium digital home for Ferreira Lawn &amp; Garden.
            Soon, you'll discover a new standard in landscape excellence.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-center pb-6 pt-2 animate-in fade-in duration-700 delay-600"
        style={{ opacity: 0.6 }}
      >
        <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.18em]">
          © {new Date().getFullYear()} Ferreira Lawn &amp; Garden · Massachusetts
        </p>
      </footer>
    </div>
  )
}
