import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  noindex?: boolean
}

const BASE_URL = 'https://ferreiralandscape.com'

export function useSEO({ title, description, canonical, noindex = false }: SEOProps) {
  useEffect(() => {
    document.title = title

    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', description)
    }

    // Canonical
    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : null
    let linkCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonicalUrl) {
      if (!linkCanonical) {
        linkCanonical = document.createElement('link')
        linkCanonical.setAttribute('rel', 'canonical')
        document.head.appendChild(linkCanonical)
      }
      linkCanonical.setAttribute('href', canonicalUrl)
    }

    // Robots noindex
    let metaRobots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (noindex) {
      if (!metaRobots) {
        metaRobots = document.createElement('meta')
        metaRobots.setAttribute('name', 'robots')
        document.head.appendChild(metaRobots)
      }
      metaRobots.setAttribute('content', 'noindex,nofollow')
    } else if (metaRobots) {
      metaRobots.setAttribute('content', 'index,follow')
    }
  }, [title, description, canonical, noindex])
}
