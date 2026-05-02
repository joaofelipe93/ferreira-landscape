# CMS Roadmap — Ferreira Lawn & Garden

> Status legend: ✅ Done · 🔧 Partial · ⬜ Pending

---

## FASE 1 — Fundação & Autenticação

### 1.1 Autenticação & Rotas Protegidas
- [ ] Criar `AuthStore` (Zustand) com `user`, `token`, `login()`, `logout()`
- [ ] Criar tela `/admin/login` com form email + senha (validação Zod)
- [ ] Criar componente `<ProtectedRoute>` que redireciona para `/admin/login` se não autenticado
- [ ] Envolver todas as rotas `/admin/*` com `<ProtectedRoute>`
- [ ] Persistir token no localStorage via `zustand/middleware persist`
- [ ] Adicionar botão "Sair" no AdminLayout (sidebar + topbar)

### 1.2 Gestão de Usuários (Admin)
- [ ] Criar tipo `User` (`id`, `name`, `email`, `role: 'admin' | 'editor'`, `avatar`, `created_at`)
- [ ] Adicionar `users` no `cmsStore` com ações `addUser`, `updateUser`, `deleteUser`
- [ ] Criar `/admin/users` — listagem de usuários com tabela
- [ ] Criar `/admin/users/new` e `/admin/users/:id/edit` — formulário de usuário
- [ ] Adicionar rota e link no sidebar (apenas visível para role `admin`)
- [ ] Trocar "Admin" fixo no topbar pelo nome/avatar do usuário logado

---

## FASE 2 — Conteúdo Existente (Melhorias)

### 2.1 Editor de Texto Rico (Rich Text)
- [ ] Instalar editor leve (ex: `@tiptap/react` ou `react-quill-new`)
- [ ] Criar componente `<RichTextEditor value onChange />` reutilizável
- [ ] Substituir `<Textarea>` de "Content (HTML)" no `BlogFormPage` pelo editor
- [ ] Substituir textarea de conteúdo em `ServiceFormPage` pelo editor
- [ ] Substituir textarea de conteúdo em `LocationFormPage` pelo editor

### 2.2 Blog Posts ✅ (melhorias)
- [ ] Substituir campo "Author" (texto livre) por seletor do usuário logado
- [ ] Adicionar campo "Categoria" (`category`) no tipo `BlogPost` e no form
- [ ] Adicionar preview ao vivo da imagem de capa ao digitar URL
- [ ] Exibir contagem de palavras no editor de conteúdo

### 2.3 Services ✅ (melhorias)
- [ ] Adicionar ordenação (`order`) — drag-and-drop ou campos de ordem numérica
- [ ] Preview de ícone ao selecionar o campo `icon`

### 2.4 Locations ✅ (melhorias)
- [ ] Adicionar preview de mapa (Google Maps embed) a partir das coordenadas
- [ ] Validar formato de coordenadas lat/lng no Zod schema

### 2.5 Testimonials ✅ (melhorias)
- [ ] Adicionar campo de `source` (`'google' | 'yelp' | 'facebook' | 'direct'`)
- [ ] Renderizar estrelas visuais (★) em vez de número no formulário

### 2.6 Team Members ✅ (melhorias)
- [ ] Adicionar campo `instagram_url` e `facebook_url`
- [ ] Implementar reordenação visual dos membros (drag-and-drop ou botões ↑ ↓)

### 2.7 Stats ✅ → adicionar Admin UI
- [ ] Criar `/admin/stats` — listagem e edição inline das estatísticas
- [ ] Adicionar rota e link no sidebar

---

## FASE 3 — Módulos Novos

### 3.1 Gestão de Páginas (Page Builder)
- [ ] Criar `pagesStore` ou adicionar `pages` ao `cmsStore` com tipo `Page` já definido
- [ ] Criar `/admin/pages/:id/edit` — form de edição de página
- [ ] Habilitar botão "Edit" na `PagesAdminPage` (hoje desabilitado)
- [ ] Campos editáveis por página: `title`, `hero_image`, `seo_title`, `seo_description`, `status`
- [ ] Editor de seções da página (lista de `PageSection` com tipo `hero`, `features`, `stats`, `cta`, `content`)
- [ ] Adicionar botão "New Page" para criar páginas customizadas

### 3.2 Configurações Globais do Site
- [ ] Criar tipo `SiteSettings` (`site_name`, `tagline`, `logo_url`, `favicon_url`, `contact_phone`, `contact_email`, `contact_address`, `social_facebook`, `social_instagram`, `social_linkedin`, `google_analytics_id`)
- [ ] Criar `settingsStore` (Zustand persist) com action `updateSettings`
- [ ] Criar `/admin/settings` — formulário de configurações globais
- [ ] Consumir `site_name` no `AdminLayout` (sidebar title) substituindo "GreenScape CMS"
- [ ] Consumir `contact_*` e `social_*` no `Footer` e `ContactPage` públicos
- [ ] Adicionar rota e ícone de engrenagem no sidebar

### 3.3 Gerenciador de Cores & Branding (Theme Editor)
- [ ] Criar tipo `ThemeSettings` com todos os tokens da paleta:
  - `color_primary` (Forest Green)
  - `color_primary_dark` (Leaf Green)
  - `color_accent` (Safety Orange)
  - `color_accent_hover` (Dark Orange)
  - `color_background`
  - `color_foreground`
  - `color_muted`
  - `color_border`
- [ ] Criar `themeStore` (Zustand persist) com action `updateTheme` e `resetTheme`
- [ ] No `App.tsx`, aplicar os valores do store como CSS custom properties no `document.documentElement`
- [ ] Criar `/admin/theme` — página do editor de tema:
  - [ ] Seletores de cor (`<input type="color">`) para cada token
  - [ ] Preview em tempo real (painel lateral com Header + CTA + Button)
  - [ ] Botão "Resetar para Padrão" (restaura paleta Ferreira)
  - [ ] Botão "Salvar Tema"
- [ ] Adicionar link "Theme" no sidebar

### 3.4 Biblioteca de Mídia (Media Library)
- [ ] Definir `MediaItem` já tipado — confirmar campos: `id`, `filename`, `url`, `alt`, `size`, `type`, `uploaded_at`
- [ ] Adicionar `mediaItems` no `cmsStore` com ações `addMedia`, `deleteMedia`, `updateMediaAlt`
- [ ] Criar `/admin/media` completo:
  - [ ] Grid de imagens com preview em thumbnail
  - [ ] Upload simulado (FileReader → base64 ou URL.createObjectURL)
  - [ ] Campo de edição de `alt text` inline
  - [ ] Filtro por tipo (`image/jpeg`, `image/png`, `image/webp`, etc.)
  - [ ] Botão de exclusão com confirmação (Alert Dialog)
  - [ ] Botão "Copiar URL" para usar em outros formulários
- [ ] Criar componente `<MediaPicker>` — modal que abre a biblioteca e retorna a URL selecionada
- [ ] Substituir os campos "Image URL" em todos os forms por `<MediaPicker>`

### 3.5 Formulário de Contato (Submissions)
- [ ] Criar tipo `ContactSubmission` (`id`, `name`, `email`, `phone`, `service`, `message`, `received_at`, `read: boolean`)
- [ ] Adicionar `submissions` no `cmsStore` com ações `addSubmission`, `markAsRead`, `deleteSubmission`
- [ ] Na `ContactPage`, conectar o form ao `cmsStore.addSubmission` em vez de apenas exibir alerta
- [ ] Criar `/admin/contact` — listagem de submissões:
  - [ ] Badge "Novo" para submissões não lidas
  - [ ] Marcar como lido ao abrir
  - [ ] Filtro por lido / não lido
  - [ ] Botão de exclusão
- [ ] Adicionar indicador de "N novas mensagens" no sidebar ao lado de "Contact"

---

## FASE 4 — UX & Qualidade do Admin

### 4.1 Notificações (Toast)
- [ ] Instalar `sonner` ou usar `@radix-ui/react-toast`
- [ ] Criar hook `useToast` reutilizável
- [ ] Adicionar toast de sucesso em todos os formulários de criação/edição
- [ ] Adicionar toast de sucesso em todas as exclusões
- [ ] Adicionar toast de erro em falhas de validação críticas

### 4.2 Confirmações de Exclusão
- [ ] Criar componente `<DeleteConfirmDialog>` reutilizável (usa `alert-dialog.tsx` já existente)
- [ ] Aplicar em todos os botões de deletar: Services, Locations, Blog, Testimonials, Team, Media, Users, Submissions

### 4.3 Busca & Filtros nas Listagens
- [ ] Adicionar input de busca em: Blog, Services, Locations, Team, Testimonials, Media
- [ ] Adicionar filtro de status (`draft` / `published` / `all`) em todas as listagens de conteúdo
- [ ] Adicionar ordenação por coluna nas tabelas (clique no header)

### 4.4 Paginação
- [ ] Criar componente `<Pagination>` reutilizável
- [ ] Aplicar em Blog, Media (se muitos itens)

### 4.5 Dashboard Melhorias
- [ ] Adicionar card de "Submissões não lidas" no Dashboard
- [ ] Adicionar link rápido "Configurações" e "Tema" nos Quick Actions
- [ ] Trocar cores hardcoded (`text-blue-600`, `text-green-600`, etc.) por variáveis de tema

### 4.6 Sidebar
- [ ] Adicionar seção "Configurações" no final da sidebar com: Settings, Theme, Users
- [ ] Adicionar badge de contagem em "Contact" (submissões não lidas)
- [ ] Renomear "GreenScape CMS" → nome vindo do `settingsStore.site_name`

---

## FASE 5 — Público & SEO

### 5.1 Head / Meta Tags Dinâmicas
- [ ] Instalar `react-helmet-async`
- [ ] Criar componente `<SeoHead title description image />` reutilizável
- [ ] Aplicar em todas as páginas públicas (Home, Services, ServiceDetail, Locations, LocationDetail, Blog, BlogPost, About, Team, Contact)
- [ ] Consumir `seo_title` e `seo_description` dos dados do CMS

### 5.2 Sitemap & Robots
- [ ] Criar `public/robots.txt` básico
- [ ] Criar script de geração de `sitemap.xml` (ou página `/sitemap.xml` servida pelo Vite)

### 5.3 Página 404
- [ ] Criar componente `NotFoundPage`
- [ ] Adicionar rota `path="*"` no App.tsx

---

## FASE 6 — Backend & Persistência Real (Futuro)

### 6.1 API / Backend
- [ ] Escolher stack: Supabase / PocketBase / custom Node.js + PostgreSQL
- [ ] Migrar `cmsStore` de localStorage para chamadas de API (React Query mutations)
- [ ] Migrar autenticação para JWT real (backend) ou Supabase Auth
- [ ] Implementar upload real de arquivos (S3, Cloudflare R2, ou Supabase Storage)

### 6.2 Deploy
- [ ] Configurar CI/CD (GitHub Actions ou Vercel)
- [ ] Configurar variáveis de ambiente (`.env`) para API URL, chaves, etc.
- [ ] Deploy do frontend (Vercel / Netlify)
- [ ] Deploy do backend (Railway / Render / Fly.io)

---

## Resumo de Prioridades

| Prioridade | Fase | Justificativa |
|---|---|---|
| 🔴 Alta | 1 — Autenticação | Sem login, o CMS é público para qualquer um |
| 🔴 Alta | 3.2 — Configurações | Site name, contato e redes sociais hardcoded |
| 🔴 Alta | 3.3 — Tema/Cores | Cliente precisa controlar a paleta |
| 🟡 Média | 2.1 — Rich Text | UX de edição de conteúdo muito limitada hoje |
| 🟡 Média | 3.4 — Mídia | Imagens são URLs manuais, sem controle centralizado |
| 🟡 Média | 3.5 — Contato | Formulário público não grava nada |
| 🟡 Média | 4.1 — Toast | Sem feedback visual ao salvar/deletar |
| 🟢 Baixa | 3.1 — Pages | Estrutura existe, precisa de editor |
| 🟢 Baixa | 5 — SEO | Importante mas não urgente |
| 🟢 Baixa | 6 — Backend | Fase final, depende das anteriores |
