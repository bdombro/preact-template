import {appendLink} from './head'

/**
 * Injects the highlight.js library and applies it to all code tags.
 */
export async function applyHighlights() {
  // PrismJs is much smaller, but couldn't get it to work. Maybe wait for v2?
  if (applyHighlights.lock) return
  applyHighlights.lock = true
  appendLink({
    href: 'https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/styles/github-dark-dimmed.min.css',
  })
  // @ts-expect-error - dynamic import
  import('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js').then(
    m => {
      m.default.highlightAll()
      applyHighlights.lock = false
    }
  )
}
applyHighlights.lock = false
