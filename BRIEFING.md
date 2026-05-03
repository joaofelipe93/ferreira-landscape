# CONTEXTO DO PROJETO

Você é um especialista em CRO (Conversion Rate Optimization) e SEO on-page para sites
de lead generation de serviços locais nos EUA. Sua missão é fazer melhorias
CIRÚRGICAS no site existente da Ferreira Landscape — sem refatorar arquitetura,
sem trocar stack, sem reescrever do zero.

O site JÁ EXISTE e está funcionando. Você vai trabalhar apenas em:

- Copy (textos, headlines, CTAs, microcopy)
- SEO on-page (meta tags, schema, headings, alt text, internal linking)
- Pequenos ajustes estruturais para melhorar conversão (reordenar seções,
  adicionar trust signals, reforçar CTAs)
- Preparação técnica mínima para Google Ads (tracking, landing page focus,
  match anúncio→página)

NÃO faça:

- Migração de stack
- Refatoração de componentes
- Redesign visual completo
- Criação de novas features complexas
- Mudanças que quebrem o que já funciona

---

# NEGÓCIO

- Empresa: Ferreira Landscape
- Localização: South Shore, MA (Hingham, Cohasset, Duxbury, Marshfield, Hanson e arredores)
- Serviços principais com jornadas DIFERENTES:
  1. **Hardscape** — alto ticket ($8k-$80k+): pavers, patios, retaining walls,
     outdoor kitchens, fire pits, walkways
  2. **Lawn Mowing** — recorrência ($40-80/cut): manutenção semanal/quinzenal
- Público: homeowners classe média/alta + propriedades comerciais
- Objetivo: gerar LEADS QUALIFICADOS (formulários e ligações)
- Próximo passo: rodar Google Ads — site precisa estar pronto para receber tráfego pago

---

# PROBLEMAS A RESOLVER (em ordem de prioridade)

## 🔴 CRÍTICO — Match Anúncio → Landing Page

- Site provavelmente unificado misturando os dois serviços
- Sem CTAs específicos por serviço
- Headlines genéricas que não respondem a intenção de busca
- Quem busca "paver patio installation" não pode cair em página genérica de landscaping

## 🟠 ALTO — Copy fraca/genérica

- Falta de headlines com benefício + localização + diferencial
- CTAs genéricos ("Contact Us", "Submit") em vez de específicos
- Pouca prova social com peso (números, garantias, anos de experiência)
- Trust signals ausentes ou pouco visíveis

## 🟡 MÉDIO — SEO on-page

- Title tags e meta descriptions provavelmente não otimizadas para queries comerciais
- Schema markup ausente ou incompleto
- Headings (H1/H2/H3) sem hierarquia clara orientada a keywords
- Imagens sem alt text otimizado

## 🟢 BAIXO — Tracking

- Garantir que GTM/GA4/Conversion Tracking estejam prontos para Google Ads

---

# TAREFAS — EXECUTAR NESTA ORDEM

## FASE 1 — AUDITORIA RÁPIDA (sem mudar nada ainda)

1. Inspecione o código atual do site (HTML, CSS, conteúdo)
2. Liste em um arquivo `AUDIT.md`:
   - Stack/CMS atual identificado
   - Estrutura de páginas existente (URLs)
   - Title tags e meta descriptions de cada página
   - H1 de cada página
   - CTAs principais e seus textos
   - Trust signals presentes (e os que faltam)
   - Schema markup atual (se houver)
   - Tracking instalado (GTM, GA, Pixel, etc.)
3. Aponte os 10 problemas mais críticos para conversão e Google Ads
4. Aguarde minha aprovação antes de começar mudanças

## FASE 2 — COPY E CTAs (maior impacto, menor esforço)

### 2.1 Headlines e Hero

Reescreva headlines seguindo a fórmula:
**[Outcome desejado] + [Localização] + [Diferencial/Garantia/Prova]**

Exemplos do que QUERO ver:

- ❌ "Premium Landscaping Services" (genérico)
- ✅ "Award-Winning Paver Patios in South Shore MA — Free 3D Design in 48 Hours"

Para o site Ferreira:

- **Home:** se hoje é genérica, transforme em hub com escolha de jornada clara
  (Hardscape vs Lawn Care) — sem reformular layout, apenas mudando textos e
  reorganizando blocos existentes
- **Hardscape:** headline focada em transformação + autoridade
- **Lawn Care:** headline focada em pricing + rapidez + sem contrato

### 2.2 CTAs específicos

Substitua todos os CTAs genéricos por específicos:

| Atual (provável) | Substituir por                            |
| ---------------- | ----------------------------------------- |
| "Contact Us"     | Hardscape: "Get My Free Design + Quote"   |
| "Contact Us"     | Lawn Care: "Get Instant Quote"            |
| "Submit"         | "Send My Request" / "Get My Free Quote"   |
| "Learn More"     | "See Our Patio Projects" / "View Pricing" |
| "Call Now"       | Manter, mas garantir tel: link no mobile  |

### 2.3 Trust signals (adicionar onde faltarem)

Inclua em pontos estratégicos (header, perto de CTAs, footer):

- "Licensed & Insured | MA HIC #[PLACEHOLDER]"
- "[X]+ Years Serving South Shore MA" (placeholder se não tiver número)
- "100% Satisfaction Guarantee" ou similar
- Avaliação Google: "★★★★★ [X] Reviews on Google" (placeholder)
- Logos de fabricantes parceiros se for revendedor (Belgard, Techo-Bloc, Unilock)
- Badge BBB se acreditado

### 2.4 Microcopy redutor de fricção

Adicione perto de cada formulário:

- Acima do botão: "We respond within 2 hours during business days"
- Abaixo do botão: "100% no obligation. We hate spam too."
- Em campos opcionais: marcar claramente como "(optional)"

### 2.5 Provas sociais reforçadas

- Reviews em destaque com nome real, cidade e foto do projeto quando possível
- Números: "500+ lawns mowed weekly" / "100+ patios installed"
- Antes/depois claros para hardscape (mesmo que seja apenas reordenar fotos existentes)

## FASE 3 — SEO ON-PAGE

### 3.1 Title tags (60 caracteres máx)

Fórmula: **[Keyword principal] | [Diferencial] | [Marca]**

Exemplos:

- Home: "Landscaping & Hardscape in South Shore MA | Ferreira Landscape"
- Hardscape: "Paver Patio Installation South Shore MA | Ferreira Landscape"
- Lawn Care: "Lawn Mowing Service South Shore MA | From $XX/cut | Ferreira"

### 3.2 Meta descriptions (155 caracteres máx)

Cada uma deve ter:

- Keyword principal
- Benefício claro
- CTA implícito
- Localização

### 3.3 Hierarquia de Headings

- 1 único H1 por página com a keyword principal
- H2s que respondem perguntas comerciais ("How much does a paver patio cost?",
  "What areas do you serve?", "How quickly can you start?")
- H3s para subseções

### 3.4 Schema Markup (adicionar via JSON-LD)

- LocalBusiness no header global do site
- Service schema em cada página de serviço
- FAQPage schema nas seções de FAQ
- AggregateRating se aplicável (com dados reais)
- BreadcrumbList se houver breadcrumbs

### 3.5 Imagens

- Alt text descritivo focado em keyword + contexto
  (ex: "paver patio with fire pit installed in Hingham MA")
- Comprimir e converter para WebP onde possível
- Lazy loading nativo (loading="lazy")

### 3.6 Internal linking estratégico

- Home linka para páginas de serviço com âncoras descritivas
- Páginas de serviço linkam entre si quando relevante
  (ex: "Pair your new patio with our [weekly lawn care]")
- Footer com links para todas as páginas de serviço

### 3.7 URLs (só se possível sem quebrar links existentes)

Se tiver URLs ruins (ex: /page-1, /services-2), proponha redirecionamentos 301
para URLs limpas:

- /paver-patio-installation
- /retaining-walls
- /lawn-mowing-service
- /service-area

**IMPORTANTE:** Se mudar URL, criar redirect 301. Nunca quebrar link existente.

## FASE 4 — PREPARAÇÃO PARA GOOGLE ADS

### 4.1 Foco da landing page

Cada página de serviço precisa ter:

- 1 objetivo único (não competir hardscape com lawn care na mesma página)
- CTA principal acima da dobra
- Telefone clicável visível em mobile (sticky se possível, sem refatorar)
- Formulário curto (máximo 4-5 campos)
- Velocidade aceitável (testar em PageSpeed Insights, mobile ≥75)

### 4.2 Formulários

**Hardscape:** qualificação de lead com 4 campos:

- ZIP code
- Tipo de projeto (dropdown)
- Budget range (dropdown: $5-15k / $15-30k / $30k+ / Not sure)
- Timeline (dropdown: ASAP / 1-3 months / 3-6 months / Just exploring)

**Lawn Mowing:** rapidez máxima, 3 campos:

- Address (autocomplete se possível)
- Phone
- Email

### 4.3 Tracking essencial

Verificar/instalar:

- Google Tag Manager (container no <head>)
- Google Analytics 4 via GTM
- Eventos prontos para virar conversões no Google Ads:
  - `generate_lead` em form submit (com parâmetro service: "hardscape" ou "lawn")
  - `phone_click` em todos os tel: links
  - `scroll_75` (engajamento)
- Container preparado para CallRail (DNI) — colocar class .phone-number
  em todos os números de telefone visíveis

### 4.4 Thank-you pages

Cada formulário deve enviar para uma URL única (`/thank-you-hardscape` e
`/thank-you-lawn-care`) — facilita configurar conversões no Google Ads.

Conteúdo da thank-you:

- "Thanks! We'll respond within 2 hours."
- Telefone direto para urgências
- Próximos passos claros

---

# ENTREGÁVEIS

1. **AUDIT.md** — auditoria inicial (Fase 1)
2. **CHANGES.md** — log de todas as mudanças feitas, página por página, com
   antes/depois das principais alterações de copy
3. **SEO_CHECKLIST.md** — checklist do que foi feito de SEO on-page por página
4. **ADS_BRIEFING.md** — documento curto para o gestor de tráfego com:
   - URLs finais de cada landing page
   - Eventos de conversão configurados (nomes e quando disparam)
   - IDs de formulários
   - URLs de thank-you pages
5. Código commitado em branches separadas por fase (ou commits claros)

---

# REGRAS IMPORTANTES

1. **NÃO refatore o que está funcionando.** Se um componente está OK, deixe quieto.
2. **NÃO mude design visual** sem necessidade. Foco é copy + SEO + tracking.
3. **NÃO invente dados.** Se não souber o número exato de anos, licença, reviews —
   use `[PLACEHOLDER: descrição]` para eu preencher depois.
4. **NÃO quebre URLs existentes.** Se mudar URL, sempre criar redirect 301.
5. **SEMPRE mostre antes/depois** das mudanças críticas no CHANGES.md.
6. **SEMPRE separe a jornada Hardscape vs Lawn Mowing** — nunca misturar CTAs.
7. **SEMPRE mantenha o telefone clicável** em mobile.
8. **SEMPRE priorize impacto**: melhorias que afetam conversão antes de polimento.
9. **Antes de mudanças grandes** (ex: reordenar seções inteiras de uma página),
   me mostre o plano e aguarde aprovação.
10. **Comente no código** o motivo de mudanças não-óbvias
    (ex: "// CTA changed from generic to service-specific for Google Ads quality score").

---

# COMECE POR

1. Inspecionando o site atual e identificando a stack/CMS
2. Criando o AUDIT.md com a análise
3. Apontando os 10 problemas mais críticos
4. Aguardando minha aprovação antes de iniciar a Fase 2 (Copy e CTAs)

Pronto? Comece pela Fase 1.
