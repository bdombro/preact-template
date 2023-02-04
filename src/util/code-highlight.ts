export async function applyHighlights() {
  // PrismJs is much smaller, but couldn't get it to work. Maybe wait for v2?
  if (applyHighlights.lock) return
  applyHighlights.lock = true
  if (!document.getElementById('hcss')) {
    const link = document.createElement('link')
    link.id = 'hcss'
    link.rel = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/styles/github-dark-dimmed.min.css'
    document.head.appendChild(link)
  }
  // @ts-expect-error - dynamic import
  import('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js').then(m => {
    m.default.highlightAll()
    applyHighlights.lock = false
  })
}
applyHighlights.lock = false

export function watchForCodeTagEvent() {
  addEventListener('codetag-added', () => {
    applyHighlights()
  })
}
