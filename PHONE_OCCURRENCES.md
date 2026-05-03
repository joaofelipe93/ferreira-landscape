# PHONE_OCCURRENCES.md
**Número:** (781) 490-8272 | `tel:+17814908272`  
**Total de ocorrências:** 27  
**Classe `.phone-number` presente:** ❌ Em nenhuma

> Para CallRail DNI funcionar, todos os elementos visíveis precisam da classe `.phone-number`.  
> Links `tel:` devem manter o href — o CallRail substitui apenas o texto visível.

---

## Páginas Públicas (`src/pages/public/`)

| Arquivo | Linha | Contexto | Tipo | `tel:` href? |
|---|---|---|---|---|
| `HomePage.tsx` | 352 | Hero CTA secundário | Link | ✅ |
| `HomePage.tsx` | 355 | Texto visível do link hero | Texto em `<a>` | — |
| `HomePage.tsx` | 935 | Seção Residential CTA | Link | ✅ |
| `HomePage.tsx` | 939 | Texto visível seção Residential | Texto em `<a>` | — |
| `HomePage.tsx` | 1436 | FAQ resposta "How do I get started?" | Texto puro | ❌ |
| `HomePage.tsx` | 1467 | Contact pills acima do formulário | Link | ✅ |
| `HomePage.tsx` | 1469 | Texto visível contact pill | Texto em `<a>` | — |
| `HomePage.tsx` | 1535 | Final CTA — linha de rodapé | Link | ✅ |
| `HomePage.tsx` | 1537 | Texto visível final CTA | Texto em `<a>` | — |
| `HomePage.tsx` | 1575 | Footer interno da HomePage | Link | ✅ |
| `LawnCarePage.tsx` | 38 | Hero CTA secundário | Link | ✅ |
| `LawnCarePage.tsx` | 44 | Texto visível do link hero | Texto em `<a>` | — |
| `HardscapeServicesPage.tsx` | 38 | Hero CTA secundário | Link | ✅ |
| `HardscapeServicesPage.tsx` | 44 | Texto visível do link hero | Texto em `<a>` | — |
| `SnowRemovalPage.tsx` | 31 | Hero CTA secundário | Link | ✅ |
| `SnowRemovalPage.tsx` | 35 | Texto visível do link hero | Texto em `<a>` | — |
| `ContactPage.tsx` | 8 | Meta description (texto invisível) | Meta tag | ❌ (não precisa) |
| `ContactPage.tsx` | 99 | Card de contato na página | Texto puro | ❌ |
| `NotFoundPage.tsx` | 66 | Link de contato na 404 | Link | ✅ |
| `NotFoundPage.tsx` | 69 | Texto visível na 404 | Texto em `<a>` | — |
| `ServiceDetailPage.tsx` | 138 | Sidebar de contato da página de serviço | Link | ✅ |
| `ServiceDetailPage.tsx` | 139 | Texto visível | Texto em `<a>` | — |
| `PrivacyPolicyPage.tsx` | 25 | Informações de contato | Texto puro | ❌ |
| `PrivacyPolicyPage.tsx` | 110 | Informações de contato | Texto puro | ❌ |
| `PrivacyPolicyPage.tsx` | 238 | Informações de contato | Texto puro | ❌ |
| `TermsOfServicesPage.tsx` | 18 | Informações de contato | Texto puro | ❌ |
| `TermsOfServicesPage.tsx` | 114 | Link de contato | Link | ✅ |
| `TermsOfServicesPage.tsx` | 218 | Link de contato | Link | ✅ |

## Componentes (`src/components/public/`)

| Arquivo | Linha | Contexto | Tipo | `tel:` href? |
|---|---|---|---|---|
| `Footer.tsx` | 45–46 | Footer global — coluna de contato | Link | ✅ |
| `Header.tsx` | 27–28 | Variáveis, não renderizadas diretamente | Constante | — |
| `Header.tsx` | 44–48 | Header sticky — CTA de telefone | Link | ✅ |
| `LandingHeader.tsx` | 102–106 | Header landing — CTA de telefone | Link | ✅ |
| `CtaBlock.tsx` | 52–54 | Bloco CTA reutilizável | Link | ✅ |
| `WhatsAppButton.tsx` | 4 | Número base para WhatsApp (string) | Variável | ❌ (não renderiza tel:) |

---

## Ação necessária para CallRail DNI

Adicionar `className="phone-number"` em **todos os elementos visíveis** (textos em `<a>` e textos puros que mostram o número). Os `href="tel:..."` devem ser mantidos.

**Exemplo:**
```html
<!-- Antes -->
<a href="tel:+17814908272">(781) 490-8272</a>

<!-- Depois -->
<a href="tel:+17814908272" className="phone-number">(781) 490-8272</a>
```

**Prioridade alta** (páginas de ads):
1. `LandingHeader.tsx` — aparece em todas as páginas
2. `HomePage.tsx` — hero + contact section
3. `LawnCarePage.tsx` — landing page mowing
4. `HardscapeServicesPage.tsx` — landing page hardscape
