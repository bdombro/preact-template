/**
 * Append an element to the head of the document
 *
 * Tip: Will skip if already added before
 *
 * @param type - The type of element to append (e.g. 'link', 'script')
 * @param attrs - The attributes to set on the element. Tip: use innerHTML to set content
 */
export function appendElement(type: string, attrs: Record<string, string>) {
  // check if already added
  const key = JSON.stringify({type, ...attrs})
  if (appendElement.cache.has(key)) return
  appendElement.cache.add(key)
  document.head.appendChild(Object.assign(document.createElement(type), attrs))
}
appendElement.cache = new Set()

/**
 * Append a link element to the head of the document
 *
 * @param attrs - The attributes, excluding rel, to set on the element. Tip: use innerHTML to set content
 */
export function appendLink(attrs: Record<string, string>) {
  appendElement('link', {...attrs, rel: 'stylesheet'})
}

/**
 * Append a script element to the head of the document
 *
 * @param attrs - The attributes to set on the element. Tip: use innerHTML to set content
 */
export function appendScript(attrs: Record<string, string>) {
  appendElement('script', attrs)
}

/**
 * setPageMeta: Allows setting common page attrs.
 * - Intelligently use the attrs, only setting if changed
 * - Resets back to initial if omitted, based on initial introspection
 * - Stores element handles in memory to remove need to query the dom
 *   on every update
 *
 * @param object: an object of key/val pairs of meta attrs to set
 *
 * @dependency: The page should already have default meta tags. Example:
 *
 * ```html
 * <title>Preact Template</title>
 * <meta property="og:title" content="Preact template" />
 * <meta property="og:site_name" content="Preact Template" />
 * <meta property="og:locale" content="en_US" />
 * <link rel="canonical" href="https://preact-template.com" />
 * <meta
 *   name="description"
 *   content="A template to build tiny Preact applications"
 * />
 * <meta
 *   property="og:description"
 *   content="A template to build tiny Preact applications"
 * />
 * <meta
 *   property="og:url"
 *   content="https://github.com/bdombro/preact-template"
 * />
 * <meta
 *   property="og:image"
 *   content="https://preact-template.com/apple-touch-icon.png"
 * />
 * ```
 */
interface SetPageMetaProps {
  title: string
  siteName?: string
  description?: string
  image?: string
  locale?: string
}
export const setPageMeta = (function createSetPageMeta() {
  // Wrapper class on meta elements to simplify usage and make more DRY
  class MetaClass {
    get: () => string
    orig: string
    last?: string
    set: (val: string) => string
    constructor(getter: () => Element) {
      this.get = () =>
        isTest
          ? ''
          : this.last || getter().getAttribute('content') || throwError(`No content for ${getter}`)
      this.set = (v: string) => {
        if (isTest) return v
        getter().setAttribute('content', v)
        return (this.last = v)
      }
      this.orig = this.last = this.get()
    }
    upsert(val?: string): string {
      if (isTest) return val || ''
      if (!val) return (val = this.orig)
      if (this.last !== val) return this.set(val)
      return this.last
    }
  }

  const byName = (name: string) => {
    return find(`meta[name="${name}"]`)
  }
  const byProp = (prop: string) => {
    return find(`meta[property="${prop}"]`)
  }
  const find = (selector: string) => {
    if (isTest) return document.createElement('div')
    return document.head.querySelector(selector) || throwError(`Missing: ${selector}`)
  }

  const getLink = () => find('link[rel="canonical"]') as HTMLLinkElement
  const siteNameE = byProp('og:site_name').getAttribute('content') || ''
  const ogTitleMc = new MetaClass(() => byProp('og:title'))
  const localeMc = new MetaClass(() => byProp('og:locale'))
  const descriptionMc = new MetaClass(() => byName('description'))
  const ogDescriptionMc = new MetaClass(() => byProp('og:description'))
  const ogUrlMc = new MetaClass(() => byProp('og:url'))
  const ogSiteNameMc = new MetaClass(() => byProp('og:site_name'))
  const ogImageMc = new MetaClass(() => byProp('og:image'))

  return function setPageMeta(p: SetPageMetaProps) {
    const title = p.title ? `${p.title} - ${siteNameE}` : siteNameE
    if (title !== document.title) document.title = title

    const link = getLink()
    if (link.href !== location.href) link.href = location.href

    const locale = localeMc.upsert(p.locale)
    const description = descriptionMc.upsert(p.description)
    const siteName = ogSiteNameMc.upsert(p.siteName)
    const image = ogImageMc.upsert(p.image)

    ogTitleMc.upsert(p.title)
    ogDescriptionMc.upsert(p.description)
    ogUrlMc.upsert(location.href)

    return {
      description,
      image,
      locale,
      siteName,
      title,
    }
  }
})()
