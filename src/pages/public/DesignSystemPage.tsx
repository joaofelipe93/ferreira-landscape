import { SectionContainer } from '@/components/public/SectionContainer'

const colors = [
  { name: 'Green Park', hex: '#26cf7b', class: 'bg-green-park', type: 'Primary 01' },
  { name: 'Blue Ocean', hex: '#162557', class: 'bg-blue-ocean', type: 'Primary 02' },
  { name: 'Green Dark', hex: '#052e25', class: 'bg-green-dark', type: 'Secondary 01' },
  { name: 'Asfalt', hex: '#1d1d1b', class: 'bg-asfalt', type: 'Secondary 02' },
  { name: 'Green Light', hex: '#f2ffe4', class: 'bg-green-light', type: 'Secondary 03' },
  { name: 'Gray', hex: '#dadada', class: 'bg-gray-brand', type: 'Secondary 04' },
]

const fontWeights = ['Thin', 'Light', 'Regular', 'Medium', 'Semi Bold', 'Bold', 'Black']

export function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-white">
      <SectionContainer>
        <header className="mb-16 border-b pb-8">
          <h1 className="text-4xl mb-2">Design System</h1>
          <p className="text-gray-500 font-sora">Ferreira Lawn & Garden — Visual Identity Guide</p>
        </header>

        {/* ── Typography ── */}
        <section className="mb-20">
          <h2 className="text-2xl mb-8 border-l-4 border-green-park pl-4 tracking-tight">Typography</h2>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Primary Headings</p>
              <h3 className="text-6xl font-archivo-black mb-4 tracking-tighter">ARCHIVO BLACK</h3>
              <p className="text-gray-600 max-w-md leading-relaxed mb-8 font-sora">
                Archivo is a grotesque sans-serif typeface family originally designed for highlights and headlines. 
                It is used for all main headings to provide a strong, professional presence.
              </p>
              <div className="flex flex-wrap gap-2">
                {fontWeights.map(w => (
                  <span key={w} className="px-3 py-1 bg-gray-100 rounded text-xs font-archivo-black tracking-widest">{w}</span>
                ))}
              </div>
            </div>

            <div className="font-sora">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Primary Body & Interface</p>
              <h3 className="text-5xl font-bold mb-4 tracking-tighter">Sora</h3>
              <p className="text-gray-600 max-w-md leading-relaxed mb-8">
                Sora is our secondary font. It was selected for its versatility and clarity, 
                ensuring that even when Archivo Black isn't used, our communications maintain 
                visual integrity.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Light', 'Regular', 'SemiBold', 'Bold'].map(w => (
                  <div key={w} className="p-4 border rounded-xl">
                    <p className={`text-xl mb-1 ${w === 'Bold' ? 'font-bold' : w === 'SemiBold' ? 'font-semibold' : w === 'Light' ? 'font-light' : 'font-normal'}`}>
                      {w}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Sora {w}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Colors ── */}
        <section className="mb-20">
          <h2 className="text-2xl mb-8 border-l-4 border-green-park pl-4 tracking-tight">Color Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sora">
            {colors.map((color) => (
              <div key={color.name} className="group">
                <div className={`h-40 ${color.class} rounded-2xl shadow-sm mb-4 transition-transform group-hover:scale-[1.02] border border-gray-100`} />
                <div className="flex justify-between items-start px-1">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{color.name}</h4>
                    <p className="text-[10px] text-gray-400 uppercase font-medium tracking-wider">{color.type}</p>
                  </div>
                  <code className="text-[10px] bg-gray-50 px-2 py-1 rounded text-gray-500 font-mono">{color.hex}</code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── UI Elements Preview ── */}
        <section className="font-sora">
          <h2 className="text-2xl mb-8 border-l-4 border-green-park pl-4 tracking-tight">UI Elements</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Buttons</p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-green-park text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity active:scale-95 duration-200">
                  Primary Action
                </button>
                <button className="bg-blue-ocean text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity active:scale-95 duration-200">
                  Blue Ocean
                </button>
                <button className="border-2 border-green-park text-green-park px-6 py-3 rounded-xl font-bold hover:bg-green-park/5 transition-colors active:scale-95 duration-200">
                  Outline Style
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Badges & Tags</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-park text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  ACTIVE SERVICE
                </span>
                <span className="bg-blue-ocean text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  NEW PROJECT
                </span>
                <span className="bg-green-park/10 text-green-park px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  LOW MAINTENANCE
                </span>
                <span className="bg-gray-brand/20 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  COMPLETED
                </span>
              </div>
            </div>
          </div>
        </section>
      </SectionContainer>
      
      <footer className="mt-20 py-10 text-center border-t border-gray-100">
        <p className="text-xs text-gray-400 font-sora">© {new Date().getFullYear()} Ferreira Lawn & Garden — Internal Use Only</p>
      </footer>
    </div>
  )
}
