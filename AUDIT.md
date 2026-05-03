# AUDIT.md — Ferreira Landscape
**Data:** 2026-05-02 | **Branch auditada:** main (pós-merge feat/copy-improvements)

---

## 1. Stack / CMS

| Item | Detalhe |
|---|---|
| Framework | React 19 + TypeScript 5.9 |
| Build | Vite 8 |
| Roteamento | React Router v7 |
| Estilização | Tailwind CSS v4 |
| Estado / CMS | Zustand + localStorage (sem backend) |
| Formulários | Jobber embedded (iframe/script externo) |
| Deploy | Vercel |
| Analytics | Vercel Analytics (apenas pageviews) |

---

## 2. Estrutura de Páginas

| URL | Componente | Observação |
|---|---|---|
| `/` | HomePage | Página principal — sem `document.title` próprio |
| `/lawn-care` | LawnCarePage | Página dedicada mowing |
| `/hardscape` | HardscapeServicesPage | Página dedicada hardscape |
| `/hardscape-services` | HardscapeServicesPage | **DUPLICATE** — mesma página em duas URLs |
| `/snow-removal` | SnowRemovalPage | |
| `/services` | ServicesPage | Hub genérico — sem `document.title` próprio |
| `/locations` | LocationsPage | Sem `document.title` próprio |
| `/about` | AboutPage | Sem `document.title` próprio |
| `/contact` | ContactPage | Sem `document.title` próprio |
| `/team` | TeamPage | Sem `document.title` próprio |
| `/blog` | BlogPage | Sem `document.title` próprio |
| `/new` | NewPage | **DUPLICATE** — clone do HomePage com código de tracking |
| `/result` | ResultPage | **EXPOSTO** — página de debug com dados de usuário |
| `/design` | DesignSystemPage | Dev-only, não protegida/noindexed |

---

## 3. Title Tags & Meta Descriptions

| Página | Title Tag | Chars | Meta Description | Chars |
|---|---|---|---|---|
| `/` (index.html) | "Ferreira Landscape \| Premium Lawn Care & Hardscape in South Shore, MA" | 71 ⚠️ | "South Shore's premier landscape care. Specialized in weekly lawn maintenance, **artisanal hardscapes**, and reliable snow removal for Hingham, Cohasset, and Duxbury estates." | 171 ⚠️ |
| `/lawn-care` | "Lawn Mowing & Maintenance \| Ferreira Landscape (South Shore, MA)" | 64 ✅ | "Professional lawn mowing and maintenance in South Shore, MA. Reliable weekly service, clean edges, and seasonal cleanups. Get your free estimate today." | 151 ✅ |
| `/hardscape` | "Hardscape Services — Patios, Walkways & Retaining Walls \| Ferreira Landscape (South Shore, MA)" | **95** 🔴 | "Custom patios, walkways, retaining walls, and outdoor living built to last. Hardscape design and installation in South Shore, MA. Free estimates." | 145 ✅ |
| `/snow-removal` | "Snow Removal & Ice Control \| Ferreira Landscape (South Shore, MA)" | 65 ✅ | "Snow removal and ice control across South Shore, MA. Driveway plowing, walkway clearing, and reliable winter response. Get a free estimate." | 139 ✅ |
| `/services` | *(herda index.html)* | — | *(herda index.html)* | — |
| `/about` | *(herda index.html)* | — | *(herda index.html)* | — |
| `/contact` | *(herda index.html)* | — | *(herda index.html)* | — |
| `/locations` | *(herda index.html)* | — | *(herda index.html)* | — |

> **Nota:** O site é SPA (React). Title tags são definidos via `document.title` no `useEffect` de cada página. Páginas sem esse hook herdam o título do `index.html` — que não é otimizado para as queries de cada rota.

---

## 4. H1 por Página

| Página | H1 atual | Keyword presente? |
|---|---|---|
| `/` | "Your Home Deserves to Look as Good as It Feels to Live In." | ❌ Nenhuma keyword local ou de serviço |
| `/lawn-care` | "Lawn Mowing & Maintenance." | ✅ |
| `/hardscape` | "Patios, Walkways & Retaining Walls." | ✅ |
| `/snow-removal` | *(não auditado)* | — |
| `/services` | "Everything Your Property Needs." | ❌ Genérico |
| `/about` | "Artistry in Every Acre." | ❌ Zero keyword |
| `/contact` | "Your Property's Best Season Starts Now." | ❌ Não é CTA de contato |

---

## 5. CTAs Principais

| Localização | Texto atual | Tipo |
|---|---|---|
| HomePage hero | "Get Free Estimate" | Link externo Jobber |
| HomePage hero | "(781) 490-8272" | `tel:` link |
| HomePage serviços — lawn | "Get a Maintenance Quote" | Link externo Jobber |
| HomePage serviços — hardscape | "Get a Hardscape Estimate" | Link externo Jobber |
| HomePage serviços — snow | "Request Snow Removal" | Link externo Jobber |
| HomePage seção residencial | "Call +1 (781) 490-8272 — Free estimate, no obligation." | `tel:` link |
| HomePage seção comercial | "Build a Commercial Maintenance Plan" | Link externo Jobber |
| HomePage seção garantia | "Experience the Difference" | Link externo Jobber |
| HomePage final CTA | "Schedule Your Free Consultation Today" | Link externo Jobber |
| LawnCarePage hero | "Get a Free Estimate" | Link externo Jobber |
| HardscapeServicesPage hero | "Get a Free Estimate" | Link externo Jobber |
| Formulário (Jobber embed) | *(controlado pelo Jobber)* | Iframe |

**Problema:** Todos os CTAs externos apontam para a mesma URL do Jobber — não há separação de jornada Hardscape vs Lawn Care nos links.

---

## 6. Trust Signals

### Presentes
- "Licensed & Insured" — texto simples, hero e footer
- "500+ Projects Done" — floating badge no hero
- "10+ Years Experience" — floating badge no hero
- "5-Star Rated" — floating badge no hero
- "100+ Properties Maintained" — badge sobre imagem
- Carousel de testimonials (sem nome de cidade em todos)
- "100% Satisfaction Guarantee" — mencionado na seção garantia

### Ausentes / Incompletos
- ❌ Número da licença MA HIC — `[PLACEHOLDER]`
- ❌ Contagem real de reviews do Google com link direto
- ❌ Logos de fabricantes parceiros (Belgard, Techo-Bloc, Unilock)
- ❌ Badge BBB (se acreditado)
- ❌ Anos específicos em operação (o badge diz "10+" mas sem confirmação)
- ❌ Fotos de projetos com legenda "Installed in [City], MA" no hardscape
- ❌ Número exato de avaliações Google ("★★★★★ [X] reviews")

---

## 7. Schema Markup

| Schema | Onde | Status |
|---|---|---|
| `LandscapingBusiness` (LocalBusiness) | `index.html` | ✅ Presente — inclui endereço, telefone, horários, `areaServed` |
| `Service` | Páginas de serviço | ❌ Ausente |
| `FAQPage` | HomePage (tem accordion de FAQ) | ❌ Ausente |
| `AggregateRating` | Em nenhuma página | ❌ Ausente |
| `BreadcrumbList` | Em nenhuma página | ❌ Ausente |

---

## 8. Tracking Instalado

| Ferramenta | Status |
|---|---|
| Google Tag Manager | ❌ Não instalado |
| Google Analytics 4 | ❌ Não instalado |
| Google Ads Conversion Tracking | ❌ Não instalado |
| Meta/Facebook Pixel | ❌ Não instalado |
| CallRail / DNI | ❌ Não instalado — números sem class `.phone-number` |
| Vercel Analytics | ✅ Instalado (apenas pageviews, sem eventos) |
| Eventos `generate_lead` | ❌ Não configurados |
| Eventos `phone_click` | ❌ Não configurados |
| Thank-you pages | ❌ Não existem |

---

## 9. Canonical & Robots

- Canonical global: `https://ferreiralandscape.com/` apenas no `index.html`
- Nenhuma página individual tem canonical próprio
- `/result` (debug page) — sem `noindex`, publicamente acessível
- `/design` (design system) — sem `noindex`, publicamente acessível
- `/hardscape-services` duplica `/hardscape` — sem canonical apontando para o principal

---

## 10. Observações de Performance / Mobile

- Telefone em `tel:` links: ✅ presente na maioria dos CTAs
- Header sticky: ✅ `LandingHeader` com `sticky top-0`
- Imagens WebP: ✅ maioria usa `<picture>` com `.webp`
- `loading="lazy"`: ✅ na maioria das imagens
- Formulário principal: Jobber embed (iframe externo — PageSpeed penaliza)

---

---

# 🚨 10 PROBLEMAS MAIS CRÍTICOS

## #1 — ZERO tracking de conversão (BLOQUEADOR para Google Ads) 🔴
Não existe GTM, GA4, nem Google Ads conversion tag. Rodar tráfego pago agora é dinheiro jogado fora — nenhum dado de qual keyword ou anúncio gera lead. Sem isso, impossível otimizar lances.

## #2 — Sem thank-you pages separadas por serviço 🔴
Todos os formulários (Jobber embed + links externos) não redirecionam para uma URL única de confirmação. Sem `/thank-you-hardscape` e `/thank-you-lawn-mowing`, não há como configurar conversões distintas no Google Ads para os dois serviços.

## #3 — H1 da HomePage sem nenhuma keyword 🔴
`"Your Home Deserves to Look as Good as It Feels to Live In."` — não contém "lawn mowing", "hardscape", "South Shore" nem "MA". Para Google Ads Quality Score e SEO orgânico, o H1 da landing page mais importante do site está completamente desotimizado.

## #4 — URL duplicada: `/hardscape` e `/hardscape-services` apontam para a mesma página 🟠
Dilui autoridade de link e cria confusão no Google. Uma precisa de redirect 301 para a outra ou canonical definido.

## #5 — NewPage (`/new`) é clone do HomePage sem propósito claro 🟠
Existem dois arquivos quase idênticos (HomePage.tsx e NewPage.tsx). A URL `/new` está indexável e sem `noindex`, criando conteúdo duplicado. Se é a landing page de ads, precisa ser a URL canônica — se não, precisa sumir.

## #6 — Title tag da HardscapeServicesPage tem 95 caracteres (limite é 60) 🟠
`"Hardscape Services — Patios, Walkways & Retaining Walls | Ferreira Landscape (South Shore, MA)"` — Google vai truncar e reescrever. Perde o controle da mensagem nos resultados de busca.

## #7 — 7 páginas herdam o title/meta genérico do index.html 🟠
`/services`, `/about`, `/contact`, `/locations`, `/team`, `/blog` e `/` usam o mesmo title "Ferreira Landscape | Premium Lawn Care & Hardscape in South Shore, MA". Google exibe o mesmo snippet para rotas diferentes — canibaliza keywords e desperdiça CTR orgânico.

## #8 — ResultPage (`/result`) é uma página de debug publicamente acessível 🟠
Exibe dados de localização e dispositivo do usuário capturados via tracking. Precisa ser protegida (autenticação) ou removida da build de produção imediatamente por questões de privacidade e reputação.

## #9 — Sem Service schema e FAQPage schema nas páginas de serviço 🟡
Apesar de ter `LandscapingBusiness` global e accordion de FAQ na HomePage, não há `Service` JSON-LD em `/lawn-care` ou `/hardscape`, nem `FAQPage` schema na seção de perguntas. Perde rich snippets e visibilidade nos resultados de busca locais.

## #10 — Números de telefone sem class `.phone-number` para CallRail DNI 🟡
Existem 37+ ocorrências do número `(781) 490-8272` no código. Nenhuma tem a classe `.phone-number`. Quando o CallRail for instalado para rastrear chamadas vindas de cada anúncio, precisará substituir o número dinamicamente — sem a classe isso vai requerer trabalho manual em cada arquivo.

---

**Aguardando aprovação para iniciar Fase 2.**
