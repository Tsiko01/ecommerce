export function setPageMetadata(title: string, description: string): void {
  document.title = `${title} | audiophile`
  let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
  if (!ogTitle) {
    ogTitle = document.createElement('meta')
    ogTitle.setAttribute('property', 'og:title')
    document.head.append(ogTitle)
  }
  ogTitle.content = `${title} | audiophile`
  let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.name = 'description'
    document.head.append(meta)
  }
  meta.content = description
  let og = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
  if (!og) {
    og = document.createElement('meta')
    og.setAttribute('property', 'og:description')
    document.head.append(og)
  }
  og.content = description
}
