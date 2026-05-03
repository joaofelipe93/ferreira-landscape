# LIGHTHOUSE_BASELINE.md
**Data:** 2026-05-02 | **Branch:** sprint-0-cleanup  
**Status:** Scores manuais — CLI do Lighthouse não disponível neste ambiente.

---

## Como rodar (instrução para o cliente)

```bash
# Opção 1 — PageSpeed Insights (mais fácil)
# https://pagespeed.web.dev/
# Testar: https://www.ferreiralandscape.com/
#         https://www.ferreiralandscape.com/lawn-care
#         https://www.ferreiralandscape.com/hardscape

# Opção 2 — Chrome DevTools
# F12 → Lighthouse → Mobile → Analyze page load

# Opção 3 — CLI local
npm run dev
npx lighthouse http://localhost:3535/ --output=html --output-path=./lighthouse-report.html
```

---

## Análise Estática (sem browser)

### Performance — Fatores identificados no código

| Fator | Status | Impacto |
|---|---|---|
| Imagens WebP com `<picture>` | ✅ Maioria | Positivo |
| `loading="lazy"` nas imagens | ✅ Maioria | Positivo |
| Hero image com `fetchPriority="high"` | ✅ HomePage | Positivo |
| Bundle JS único (897KB minificado) | ⚠️ Sem code splitting | Negativo |
| Jobber embed (script externo + iframe) | ⚠️ Bloqueia render | Negativo |
| Framer Motion importado | ⚠️ +90KB gzip | Negativo |
| Fonts Google (2x preconnect) | ✅ Configurado | Neutro |
| Tailwind CSS v4 (JIT) | ✅ | Positivo |

**Estimativa de Performance Mobile:** 55–70  
**Estimativa de Performance Desktop:** 75–88  

> O bundle de 897KB (254KB gzip) é o maior problema de performance. Sem code splitting, o browser precisa baixar e parsear todo o JS antes de renderizar qualquer página. Isso afeta principalmente mobile com 3G.

### SEO — Melhorias aplicadas neste sprint

| Check | Antes | Depois |
|---|---|---|
| Title tag — `/` | ❌ Herdava index.html genérico | ✅ Keyword + localização |
| Title tag — `/services` | ❌ Herdava index.html | ✅ Próprio |
| Title tag — `/about` | ❌ Herdava index.html | ✅ Próprio |
| Title tag — `/contact` | ❌ Herdava index.html | ✅ Próprio |
| Title tag — `/locations` | ❌ Herdava index.html | ✅ Próprio |
| Title tag — `/team` | ❌ Herdava index.html | ✅ Próprio |
| Title tag — `/blog` | ❌ Herdava index.html | ✅ Próprio |
| Title tag — `/hardscape` | ⚠️ 95 chars | ✅ 62 chars |
| Canonical por página | ❌ Só no index.html | ✅ Canonical próprio por rota |
| `/design` noindex | ❌ Indexável | ✅ noindex,nofollow |
| Conteúdo duplicado `/new` | ❌ Presente | ✅ Removido + 301 |
| URL duplicada `/hardscape-services` | ❌ Presente | ✅ 301 → /hardscape |

**Estimativa de SEO Score:** 82→92+

### Accessibility
- Sem auditoria específica feita. Pontos positivos identificados: `aria-label` em botões de carrossel, `alt` em imagens principais.
- Ponto negativo: contraste de alguns textos `text-white/60` sobre backgrounds escuros pode estar abaixo do WCAG AA.

---

## Ação recomendada antes do Sprint 1

Rodar PageSpeed Insights nas 3 URLs acima e preencher os scores reais aqui:

| Página | Performance Mobile | SEO | Accessibility | Best Practices |
|---|---|---|---|---|
| `/` | ___ | ___ | ___ | ___ |
| `/lawn-care` | ___ | ___ | ___ | ___ |
| `/hardscape` | ___ | ___ | ___ | ___ |

**Meta para Google Ads:** Performance Mobile ≥ 75 (impacta Quality Score e Ad Rank).  
Se estiver abaixo, a maior alavanca é code splitting — dividir admin/público via `React.lazy()`.
