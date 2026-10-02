import { useEffect } from 'react'

export interface PageMeta {
  title: string
  description?: string
  /** Open Graph 图片路径（默认使用品牌封面） */
  image?: string
}

const SITE_NAME = '同日新能源'

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, name] = selector.match(/\[(?:name|property)="([^"]+)"\]/) || []
    if (name) el.setAttribute(attr.startsWith('property') ? 'property' : 'name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/**
 * 页面级 SEO：进入路由时更新 title / description / Open Graph。
 * 各页面在组件内调用：usePageMeta({ title: '...', description: '...' })
 */
export function usePageMeta({ title, description, image }: PageMeta) {
  useEffect(() => {
    document.title = title.includes(SITE_NAME) ? title : `${title} - ${SITE_NAME}`
    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
    }
    setMeta('meta[property="og:title"]', 'content', document.title)
    if (image) setMeta('meta[property="og:image"]', 'content', image)
    // 返回首页时无需恢复默认（每次路由都会重设 title）
  }, [title, description, image])
}
