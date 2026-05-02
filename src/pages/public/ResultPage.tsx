import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Globe, MapPin, Monitor, Clock, 
  ArrowLeft, ShieldCheck, Zap, 
  Cpu, Layout, Languages, Map, Edit2, CheckCircle, Trash2
} from 'lucide-react'
import { LandingHeader } from '@/components/public/LandingHeader'

export function ResultPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const savedData = localStorage.getItem('captured_user_data')
    if (savedData) {
      setData(JSON.parse(savedData))
    }
  }, [])

  const clearData = () => {
    localStorage.removeItem('captured_user_data')
    setData(null)
  }

  const handleManualUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const lat = parseFloat(formData.get('lat') as string)
    const lng = parseFloat(formData.get('lng') as string)
    
    if (isNaN(lat) || isNaN(lng)) return

    setData((prev: any) => ({
      ...prev,
      location: {
        ...prev?.location,
        latitude: lat,
        longitude: lng,
        accuracy: 0,
        manual: true
      }
    }))
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#162557] font-sora antialiased">
      <LandingHeader />
      
      <main className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Resultados da <span className="text-[#FC8700]">Captura</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Dados do dispositivo e localização coletados na página anterior.
            </p>
            <div className="mt-4 flex items-center gap-2 text-green-600 bg-green-50 w-fit px-4 py-2 rounded-full text-xs font-bold border border-green-100">
              <ShieldCheck className="w-4 h-4" />
              NOTIFICAÇÃO ENVIADA AO ADMINISTRADOR
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={clearData}
              className="hidden md:flex items-center gap-2 text-red-500 hover:text-red-700 font-bold transition-colors text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Limpar Tudo
            </button>
            <Link 
              to="/new" 
              className="hidden md:flex items-center gap-2 text-[#162557] hover:text-[#FC8700] font-bold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar para New
            </Link>
          </div>
        </div>

        {!data ? (
          <div className="bg-white rounded-[2rem] shadow-2xl p-12 text-center border border-black/5">
            <div className="w-20 h-20 bg-[#FC8700]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-[#FC8700] animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Nenhum dado encontrado</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Parece que você acessou esta página diretamente ou a captura ainda não foi concluída.
            </p>
            <Link to="/new" className="bg-[#162557] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-[#FC8700] transition-all">
              Ir para página de captura
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Localização */}
            <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-black/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-[100%] transition-all group-hover:scale-110" />
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#FC8700]/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#FC8700]" />
                </div>
                <h2 className="text-xl font-bold tracking-tight">Geolocalização</h2>
              </div>

              {data.location?.error ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-sm font-medium">Erro: {data.location.error}</span>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-4 border-b border-gray-100">
                    <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Latitude</span>
                    <span className="font-mono font-bold text-lg">{data.location.latitude.toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-100">
                    <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Longitude</span>
                    <span className="font-mono font-bold text-lg">{data.location.longitude.toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Precisão</span>
                    <span className="font-bold text-lg text-secondary">{data.location.accuracy.toFixed(0)} metros</span>
                  </div>
                </div>
              )}
            </div>

            {/* Navegador */}
            <div className="bg-[#162557] rounded-[2rem] shadow-xl p-8 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100%] transition-all group-hover:scale-110" />
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="text-xl font-bold tracking-tight">Navegador</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-2 text-white/50">
                    <Monitor className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">Plataforma</span>
                  </div>
                  <p className="font-bold">{data.browser.platform}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-2 text-white/50">
                    <Languages className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">Idioma</span>
                  </div>
                  <p className="font-bold">{data.browser.language}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-2 text-white/50">
                    <Layout className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">Resolução</span>
                  </div>
                  <p className="font-bold">{data.browser.screenSize}</p>
                </div>
              </div>
            </div>

            {/* Detalhes do User Agent */}
            <div className="md:col-span-2 bg-white rounded-[2rem] shadow-xl p-8 border border-black/5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="text-xl font-bold tracking-tight">User Agent String</h2>
              </div>
              <div className="bg-[#f8f9fb] p-6 rounded-2xl border border-gray-100 break-all font-mono text-sm leading-relaxed text-gray-600">
                {data.browser.userAgent}
              </div>
              <div className="mt-8 flex items-center gap-2 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>Capturado em: {new Date(data.browser.timestamp).toLocaleString('pt-BR')}</span>
              </div>
            </div>

            {/* Visualização no Mapa */}
            {!data.location?.error && (
              <div className="md:col-span-2 bg-white rounded-[2rem] shadow-xl overflow-hidden border border-black/5">
                <div className="p-8 flex items-center justify-between border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#FC8700]/10 rounded-xl flex items-center justify-center">
                      <Map className="w-6 h-6 text-[#FC8700]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold tracking-tight">Visualização no Mapa</h2>
                      <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Google Maps Live View</p>
                    </div>
                  </div>
                  {data.location.manual && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
                      <Edit2 className="w-3 h-3" />
                      SIMULADO
                    </div>
                  )}
                </div>
                <div className="h-[450px] w-full bg-gray-100">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={`https://maps.google.com/maps?q=${data.location.latitude},${data.location.longitude}&z=15&output=embed`}
                  />
                </div>
              </div>
            )}

            {/* Simulador de Localização Diferente */}
            <div className="md:col-span-2 bg-[#f0f4ff] rounded-[2rem] p-8 border border-blue-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Simular Localização Diferente</h2>
                  <p className="text-sm text-gray-500">Teste o sistema com outras coordenadas.</p>
                </div>
              </div>

              <form onSubmit={handleManualUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Latitude</label>
                  <input 
                    name="lat" 
                    type="text" 
                    placeholder="-23.550520" 
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Longitude</label>
                  <input 
                    name="lng" 
                    type="text" 
                    placeholder="-46.633308" 
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="flex items-end">
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Atualizar Mapa
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        <div className="mt-16 text-center">
           <Link to="/" className="text-[#162557] font-bold hover:text-secondary transition-colors underline underline-offset-8">
             Voltar para a Página Inicial
           </Link>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 text-center text-gray-400 text-sm">
        <p>&copy; 2026 Ferreira Landscape • Dashboard de Diagnóstico</p>
      </footer>
    </div>
  )
}
