import { MessageCircle, Phone } from 'lucide-react'

export function WhatsAppButton() {
  const phoneNumber = '17814908272'
  const message = 'Hi Ferreira Landscape! I would like to request a free estimate.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col gap-4 items-end">
      {/* Secondary Call Button (Mobile Only) */}
      <a
        href={`tel:+${phoneNumber}`}
        className="md:hidden flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-[0_15px_30px_rgba(22,37,87,0.3)] hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Call Now"
      >
        <Phone className="w-6 h-6 fill-white/10" />
      </a>

      {/* Primary WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 bg-[#25D366] text-white p-4 md:p-5 rounded-full shadow-[0_15px_40px_rgba(37,211,102,0.4)] hover:shadow-[0_20px_50px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-500 ease-out"
        aria-label="Contact us on WhatsApp"
      >
        <div className="flex flex-col items-end overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-500 ease-in-out">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-70 leading-none mb-1 whitespace-nowrap">
            Instant Estimate
          </span>
          <span className="font-archivo text-sm font-bold whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </div>
        <div className="relative">
          <MessageCircle className="w-7 h-7 fill-white/10" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-pulse" />
        </div>
      </a>
    </div>
  )
}
