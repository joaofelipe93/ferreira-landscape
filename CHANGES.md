# CHANGES.md — Sprint 0 Cleanup
**Branch:** sprint-0-cleanup  
**Data:** 2026-05-02  
**Objetivo:** Infraestrutura limpa antes de Sprint 1 (copy & CTAs)

---

## 1. Páginas deletadas

### `src/pages/public/NewPage.tsx` — DELETADO

**Antes:** Página `/new` — clone quase idêntico da HomePage com código de rastreamento que capturava `navigator.userAgent`, geolocalização via `navigator.geolocation`, e gravava no `localStorage` como `captured_user_data`. Acessível publicamente.

**Depois:** Arquivo deletado. Rota removida de `App.tsx`. Redirect 301 `/new → /` adicionado em `vercel.json`.

**Motivo:** Risco de privacidade. Dados do usuário coletados sem consentimento e expostos via `/result`. Sem utilidade para o produto.

---

### `src/pages/public/ResultPage.tsx` — DELETADO

**Antes:** Página `/result` — exibia os dados capturados pelo `NewPage.tsx` (userAgent, IP geolocation, sessionId) em formato de debug. Acessível publicamente.

**Depois:** Arquivo deletado. Rota removida de `App.tsx`. Redirect 301 `/result → /` adicionado em `vercel.json`.

**Motivo:** Risco de privacidade. Expunha dados de navegação coletados dos visitantes.

---

## 2. Rotas e redirects

### `src/App.tsx`

**Antes:**
```tsx
import { NewPage } from '@/pages/public/NewPage'
import { ResultPage } from '@/pages/public/ResultPage'
// ...
<Route path="/new" element={<NewPage />} />
<Route path="/result" element={<ResultPage />} />
<Route path="/hardscape-services" element={<HardscapeServicesPage />} />
```

**Depois:** Imports e rotas `/new`, `/result`, `/hardscape-services` removidos do roteador React.

---

### `vercel.json` — Redirects adicionados

**Antes:** Sem redirects no arquivo.

**Depois:**
```json
"redirects": [
  { "source": "/admin",       "destination": "/not-found", "permanent": false },
  { "source": "/admin/(.*)",  "destination": "/not-found", "permanent": false },
  { "source": "/hardscape-services", "destination": "/hardscape", "permanent": true },
  { "source": "/new",         "destination": "/",          "permanent": true },
  { "source": "/result",      "destination": "/",          "permanent": true }
]
```

| URL | Destino | Status |
|---|---|---|
| `/admin` | `/not-found` | 302 (segurança) |
| `/admin/*` | `/not-found` | 302 (segurança) |
| `/hardscape-services` | `/hardscape` | 301 (SEO) |
| `/new` | `/` | 301 (SEO) |
| `/result` | `/` | 301 (SEO) |

---

### `src/components/public/Footer.tsx`

**Antes:** Link no menu de serviços apontava para `/hardscape-services`.

**Depois:** Link atualizado para `/hardscape`.

---

## 3. Proteção da rota `/design`

### `src/pages/public/DesignSystemPage.tsx`

**Antes:** Sem meta tags. Página indexável pelos buscadores.

**Depois:** `useSEO({ ..., noindex: true })` — página recebe `<meta name="robots" content="noindex,nofollow">`.

---

## 4. Sistema de meta tags (`useSEO`)

### `src/hooks/useSEO.ts` — CRIADO

**Antes:** Nenhum mecanismo centralizado. Algumas páginas usavam `useEffect` inline ad-hoc para setar `document.title`. A maioria das páginas não tinha title, description nem canonical próprios — herdavam o genérico do `index.html`.

**Depois:** Hook `useSEO({ title, description, canonical?, noindex? })` criado em `src/hooks/useSEO.ts`. Gerencia:
- `document.title`
- `<meta name="description">`
- `<link rel="canonical">`
- `<meta name="robots" content="noindex,nofollow">` (quando `noindex: true`)

---

### Páginas atualizadas com `useSEO`

Todas as 11 páginas públicas agora têm title, description e canonical próprios:

| Página | Title (antes) | Title (depois) | Chars |
|---|---|---|---|
| `/` | "Ferreira Landscape" (genérico do index.html) | "Landscaping & Hardscape in South Shore MA \| Ferreira Landscape" | 62 |
| `/lawn-care` | "Ferreira Landscape" (genérico) | "Lawn Mowing Service South Shore MA \| Ferreira Landscape" | 56 |
| `/hardscape` | "Ferreira Landscape" (genérico) | "Paver Patio & Hardscape Installation South Shore MA \| Ferreira" | 62 |
| `/services` | "Ferreira Landscape" (genérico) | "Landscaping Services South Shore MA \| Ferreira Landscape" | 57 |
| `/about` | "Ferreira Landscape" (genérico) | "About Ferreira Landscape \| South Shore MA Crew" | 48 |
| `/contact` | "Ferreira Landscape" (genérico) | "Contact Us \| Ferreira Landscape South Shore MA" | 48 |
| `/locations` | "Ferreira Landscape" (genérico) | "Service Areas \| South Shore MA Landscaping \| Ferreira" | 55 |
| `/team` | "Ferreira Landscape" (genérico) | "Meet the Team \| Ferreira Landscape South Shore MA" | 51 |
| `/blog` | "Ferreira Landscape" (genérico) | "Lawn & Landscape Tips \| Ferreira Landscape Blog" | 49 |
| `/snow-removal` | "Ferreira Landscape" (genérico) | "Snow Removal South Shore MA \| Ferreira Landscape" | 50 |
| `/design` | "Ferreira Landscape" (genérico) | "Design System \| Ferreira Landscape" + noindex | 36 |

**Estimativa de impacto SEO:** Score 82 → 92+ (Google Search Console mostrará melhora em 2–4 semanas após reindexação).

---

## 5. Documentação criada

| Arquivo | Conteúdo |
|---|---|
| `AUDIT.md` | Auditoria completa do site: 10 problemas críticos ordenados por impacto |
| `PHONE_OCCURRENCES.md` | Mapeamento das 27+ ocorrências do número (781) 490-8272 com linha/arquivo/contexto |
| `JOBBER_TRACKING.md` | Investigação de como rastrear submit do formulário Jobber para Google Ads conversions |
| `LIGHTHOUSE_BASELINE.md` | Análise estática de performance + instruções para medir scores reais via PageSpeed |

---

## 6. Resumo de impacto

### SEO
- 11 páginas passam a ter title/description/canonical únicos (antes: 0)
- 3 URLs duplicadas eliminadas com redirect 301 correto
- Página `/design` removida do índice

### Privacidade / Segurança
- 2 páginas que coletavam e expunham dados de usuários deletadas
- Painel admin bloqueado via redirect no servidor (belt-and-suspenders com a proteção React)

### Manutenibilidade
- `useSEO` hook centraliza toda gestão de meta tags — mudanças futuras em 1 lugar

---

## Pendências para Sprint 1

- [ ] Adicionar classe `.phone-number` em todos os 27 elementos com o número de telefone (CallRail DNI)
- [ ] Criar `/thank-you-lawn` e `/thank-you-hardscape` (conversão Google Ads)
- [ ] Configurar redirect no painel Jobber Client Hub (Opção B do JOBBER_TRACKING.md)
- [ ] Medir scores reais no PageSpeed Insights e preencher LIGHTHOUSE_BASELINE.md
- [ ] Reescrever copy das landing pages (branch `feat/copy-improvements` aguarda merge)
