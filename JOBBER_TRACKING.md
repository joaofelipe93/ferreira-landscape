# JOBBER_TRACKING.md
**Objetivo:** Determinar se é possível detectar o submit do formulário Jobber embedded  
para disparar evento de conversão no Google Ads.

---

## Como o Jobber Embed funciona

O snippet instalado em `HomePage.tsx` e `ContactPage.tsx` injeta um `<iframe>` via JavaScript:

```js
script.src = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js'
script.setAttribute('clienthub_id', '...')
script.setAttribute('form_url', 'https://clienthub.getjobber.com/...')
```

O formulário renderizado vive em `clienthub.getjobber.com` — domínio diferente do site.

---

## Investigação: 3 opções testadas

### Opção A — postMessage do iframe

**Status: ❌ Não disponível**

O Jobber embedded NÃO envia `postMessage` para o parent window após o submit. A comunicação cross-origin é bloqueada por same-origin policy. Confirmado via inspeção da rede: após submit, o iframe faz um POST para `clienthub.getjobber.com` internamente.

### Opção B — Redirect URL no painel do Jobber

**Status: ✅ DISPONÍVEL — Solução recomendada**

O Jobber Client Hub permite configurar uma **URL de redirecionamento após submit** nas configurações do formulário de work request:

- Painel: `Settings > Client Hub > Work Request Forms > [formulário] > After Submission`
- Configurar: `https://ferreiralandscape.com/thank-you-hardscape` ou `/thank-you-lawn-mowing`
- O Jobber redireciona o **iframe** para essa URL após submit

**Limitação:** O redirect acontece dentro do iframe, não na página principal. Para que a página principal navegue para a thank-you page, é necessário implementar detecção de mudança de URL do iframe via `postMessage` (workaround):

```js
// No embed snippet, após o form submit, Jobber muda a src do iframe.
// Detectamos via MutationObserver no src do iframe:
const observer = new MutationObserver(() => {
  const iframe = document.querySelector('iframe[src*="getjobber"]')
  if (iframe?.src?.includes('/thank-you') || iframe?.src?.includes('success')) {
    window.location.href = '/thank-you-lawn-mowing'
  }
})
```

### Opção C — Formulário HTML próprio via API do Jobber

**Status: 🟡 Viável mas complexo**

A Jobber API (OAuth 2.0 + GraphQL) permite criar work requests programaticamente via `requestCreate` mutation. Seria possível criar um formulário HTML customizado que:
1. Envia dados para um endpoint próprio
2. Endpoint chama Jobber API
3. Redireciona para thank-you page com controle total

**Problema:** Requer backend (Node/Vercel Function). Fora do escopo do BRIEFING.

---

## Recomendação

**Implementar Opção B + MutationObserver** como solução de curto prazo:

### Passo 1 — No painel do Jobber
1. Acessar: `Settings > Client Hub > Work Request`
2. Encontrar o formulário `form_id=4613287`
3. Configurar "After submission redirect" para `/thank-you-lawn`
4. Criar um segundo formulário para hardscape e configurar redirect para `/thank-you-hardscape`

### Passo 2 — No código (Sprint 1)
Criar `src/pages/public/ThankYouLawnPage.tsx` e `ThankYouHardscapePage.tsx`

Adicionar detecção de iframe submit ao componente `JobberForm`:

```tsx
useEffect(() => {
  const checkIframe = setInterval(() => {
    const iframe = document.querySelector('iframe') as HTMLIFrameElement | null
    if (!iframe) return
    try {
      const src = iframe.src || ''
      if (src.includes('success') || src.includes('thank')) {
        clearInterval(checkIframe)
        // Dispara evento de conversão
        window.gtag?.('event', 'generate_lead', { service: 'lawn' })
        window.location.href = '/thank-you-lawn'
      }
    } catch {
      // Cross-origin — esperado
    }
  }, 500)
  return () => clearInterval(checkIframe)
}, [])
```

### Passo 3 — Fallback confiável
Se a detecção via iframe falhar, usar **link externo direto do Jobber** (não o embed) que suporta `?redirect_to=` na URL. Todos os CTAs com `href=estimateUrl` já usam o link externo — esses confirmados como conversão ao chegar na thank-you page.

---

## Conteúdo das Thank-You Pages

### `/thank-you-lawn`
```
Title: "We Got Your Request! | Ferreira Landscape"
Headline: "Thanks! We'll call you within 2 hours."
Body: "Your lawn care request has been received. Our team will reach out shortly to confirm the details."
CTA: "Call us now: (781) 490-8272"
```

### `/thank-you-hardscape`
```
Title: "Project Request Received | Ferreira Landscape"  
Headline: "Thanks! We'll be in touch within 1 business day."
Body: "Your hardscape project request is in. We'll schedule a free on-site consultation to walk through your vision."
CTA: "Call us now: (781) 490-8272"
```

---

## Google Ads — Configuração de Conversão

Com as thank-you pages criadas, no Google Ads:

1. `Tools > Conversions > New Conversion > Website`
2. Tipo: **Page load** (não event — mais simples e confiável)
3. URL Rule: `URL contains /thank-you-hardscape` → "Hardscape Lead" (valor: $50)
4. URL Rule: `URL contains /thank-you-lawn` → "Lawn Care Lead" (valor: $10)
5. Counting: **One per click** (não inflar contagem)
6. Attribution: **Data-driven** se conta > 50 conversões/mês, senão **Last click**
